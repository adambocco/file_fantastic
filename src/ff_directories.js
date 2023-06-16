FileFantastic.prototype.initDirectories = function (params) {
    this.directory = params.directory === undefined ? '/' : params.directory;
    this.directories = [];
    this.loadExistingDirectories(params.directories === undefined ? [] : params.directories)
    
    this.changeDirectoryUrl = params.changeDirectoryUrl === undefined ? '/' : params.changeDirectoryUrl;
    this.createDirectoryUrl = params.createDirectoryUrl === undefined ? '/' : params.createDirectoryUrl;
    this.removeDirectoryUrl = params.removeDirectoryUrl === undefined ? '/' : params.removeDirectoryUrl;
    
    this.directoriesCreatable = params.creatable === undefined ? true : params.creatable;
    this.directoriesRemovable = params.removable === undefined ? true : params.removable;
    this.directoriesContainer = params.container === undefined ? document.createElement('div') : params.container;
    if (params.container) {
        this.directoriesContainer = this.directoriesContainer.constructor === String ? document.getElementById(this.directoriesContainer) : this.directoriesContainer;
    }

    this.displayDirectories = params.displayDirectories === undefined ? false : params.displayDirectories;
    this.showNavigatorChildren = params.showNavigatorChildren === undefined ? true : params.showNavigatorChildren;
}

FileFantastic.prototype.getDirectoryById = function (id) {
    const i = this.directories.map(f => f.id).indexOf(id);
    return this.directories[i];
}

FileFantastic.prototype.loadExistingDirectories = function (directories) {
    for (let directory of directories) {
        if (directory.indexOf('/') !== 0) {
            directory = (this.directory === '/' ? '' : this.directory) + '/' + directory;
        }
        this.addDirectory(directory);
    }
}

FileFantastic.prototype.updateDirectoriesContainer = function () {
    this.directoriesContainer.innerHTML = '';
    const container = this.createDirectoriesContainer();
    container.append(this.createDirectoryNavigator());
    if (this.directoriesCreatable) {
        container.append(this.createCreateDirectoryContainer());
    }
    this.directoriesContainer.append(container)
}

FileFantastic.prototype.createDirectoryDisplay = function (id) {
    const directory = this.getDirectoryById(id);
    const container = this.createDirectoryContainer(id);

    const buttonContainer = this.createDirectoryControlContainer();
    
    const changeDirectoryButton = this.createChangeDirectoryButton(() => {
        this.changeDirectory(directory.directory);
    });
    buttonContainer.append(changeDirectoryButton);

    if (this.directoriesCreatable) {
        const removeDirectoryButton = this.createRemoveDirectoryButton(() => {
            this.removeDirectory(directory.directory);
        });
        buttonContainer.append(removeDirectoryButton);
    }

    container.append(this.createDirectoryNamePreview(id), buttonContainer);
    return container;
}

FileFantastic.prototype.createDirectoryControlContainer = function () {
    const container = document.createElement('div');
    container.classList.add('ff-directory-control-container');
    container.id = 'ff-directory-control-container-' + this.id;
    return container;
}

FileFantastic.prototype.createDirectoryNamePreview = function (id) {
    const directory = this.getDirectoryById(id);
    const container = document.createElement('div');
    container.classList.add('ff-directory-preview-container');
    container.id = 'ff-directory-preview-container-' + id;

    const div = document.createElement('div');
    div.classList.add('ff-directory-name-preview');

    div.id = 'ff-directory-preview-' + id;
    div.append(directory.name);
    container.append(div);
    return container;
}

FileFantastic.prototype.createDirectoryContainer = function (id) {
    const container = document.createElement('div');
    container.classList.add('ff-directory-container', 'ff-directory-container-' + this.id);
    container.id = 'ff-directory-container-' + id;
    container.dataset.id = id;
    return container;
}

FileFantastic.prototype.createCreateDirectoryContainer = function () {
    const container = document.createElement('div');
    container.classList.add('ff-create-directory-container');
    container.id = 'ff-create-directory-container-' + this.id;

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.classList.add('ff-create-directory-name-input');
    nameInput.id = 'ff-create-directory-name-input-' + this.id;
    nameInput.placeholder = 'New folder...';

    const button = document.createElement('div');
    button.classList.add('ff-control-button', 'ff-create-directory-button')
    button.append(this.getIcon('createDirectory'));
    button.addEventListener('click', ev => {
        this.createDirectory(this.directory + (this.directory === '/' ? '' : '/') + nameInput.value);
    })

    container.append(nameInput, button);
    return container;
}

FileFantastic.prototype.addDirectory = function (directory) {
    const directoryObject = {
        isDirectory: true,
        directory: directory,
        name: directory.split('/').pop(),
        id: this.generateUID(),
    }
    this.directories.push(directoryObject);
    return directoryObject;
}


FileFantastic.prototype.getCreateDirectoryPayload = function (directory) {
    let payload = this.payloadType === 'json' ? {} : new FormData();
    if (directory.indexOf('/') !== 0) {
        directory = this.directory + (this.directory === '/' ? '' : '/') + directory; 
    }
    payload = this.addToPayload(payload, 'directory', directory);
    return payload;
}

FileFantastic.prototype.createDirectory = function (directory) {
    directory = directory.replace(/^[^\w]+$/, '');
    if (!directory) {
        this.handleEvent('createDirectoryMissingName', null, `Enter a name to create a folder`, 'warning');
        return false;
    }
    const payload = this.getCreateDirectoryPayload(directory);
    this.doXhr(this.createDirectoryUrl, payload, this.payloadType === 'json').then(response => {
        this.addDirectory(directory);
        if (response?.directory === directory) {
            this.handleEvent(
                'createdDirectory',
                { response: response, directory: directory },
                `Successfully created directory:<br><b>${directory}</b>`,
                'success'
            );
        } else {
            this.handleEvent(
                'createDirectoryFailed',
                { response: response, directory: directory },
                `Failed to create directory:<br><b>${directory}</b>`,
                'danger'
            );
        }
        this.update()
    })
}

FileFantastic.prototype.getRemoveDirectoryPayload = function (directory) {
    let payload = this.payloadType === 'json' ? {} : new FormData();
    payload = this.addToPayload(payload, 'directory', directory);
    return payload;
}

FileFantastic.prototype.removeDirectory = function (directory) {
    const payload = this.getRemoveDirectoryPayload(directory);
    this.doXhr(this.removeDirectoryUrl, payload, this.payloadType === 'json').then(response => {
        if (response?.directory === directory) {
            const removeIndex = this.directories.findIndex(d => d.directory === directory);
            this.directories.splice(removeIndex, 1);
            this.handleEvent(
                'removedDirectory',
                { response: response, directory: directory },
                `Successfully removed directory:<br><b>${directory}</b>`,
                'success'
            );
        } else {
            this.handleEvent(
                'removeDirectoryFailed',
                { response: response, directory: directory },
                `Failed to remove directory:<br><b>${directory}</b>`,
                'danger'
            );
        }
        this.update();
    })
}

FileFantastic.prototype.getParentDirectories = function () {
    const pathParts = this.directory.trim('/').split('/').filter(x => x);
    const parents = [];
    if (pathParts.length === 0) {
        return parents;
    } else if (pathParts.length === 1) {
        return ['/'];
    } else {
        pathParts.pop();
        pathParts.unshift('/');
        return pathParts;
    }
}

FileFantastic.prototype.createDirectoriesContainer = function () {
    const container = document.createElement('div');
    container.classList.add('ff-directories-container');
    container.id = 'ff-directories-container-' + this.id;
    return container;
}

FileFantastic.prototype.getChangeDirectoryPayload = function (directory) {
    let payload = this.payloadType === 'json' ? {} : new FormData();
    payload = this.addToPayload(payload, 'directory', directory);
    return payload;
}

FileFantastic.prototype.changeDirectory = function (destinationDirectory) {
    const cdPayload = this.getChangeDirectoryPayload(destinationDirectory);
    this.loadingCallback(true);
    this.doXhr(this.changeDirectoryUrl, cdPayload, this.payloadType === 'json').then(response => {
        this.loadingCallback(false);
        this.directory = destinationDirectory;
        if (response?.existingUrls) {
            this.existingUrls = response.existingUrls;
            this.files = [];
            this.loadExistingFiles(this.existingUrls);
        }
        if (response?.directories) {
            this.directoriesContainer.innerHTML = '';
            this.directories = [];
            this.loadExistingDirectories(response.directories);
            this.directoriesContainer.append(this.createDirectoryNavigator());
        }
        this.page = 1;
        this.update();
    })
}

FileFantastic.prototype.createDirectoryDelimiter = function () {
    const icon = this.getIcon('rightAngles', true);
    icon.classList.add('ff-directory-delimiter');
    return icon;
}

FileFantastic.prototype.createChangeDirectoryButton = function (cb) {
    const cdButton = document.createElement('div');
    cdButton.classList.add('ff-control-button', 'ff-change-directory-button');
    cdButton.append(this.getIcon('changeDirectory'));
    cdButton.addEventListener('click', ev => { cb(); })
    return cdButton;
}

FileFantastic.prototype.createRemoveDirectoryButton = function (cb) {
    const rmButton = document.createElement('div');
    rmButton.classList.add('ff-control-button', 'ff-remove-directory-button');
    rmButton.append(this.getIcon('remove'));
    rmButton.addEventListener('click', ev => { cb(); })
    return rmButton;
}

FileFantastic.prototype.createDirectoryNavigator = function () {
    const container = document.createElement('div');
    container.classList.add('ff-directory-navigator-container');

    const parentsContainer = document.createElement('div');
    parentsContainer.classList.add('ff-directory-parents-container');

    const childrenContainer = document.createElement('div');
    childrenContainer.classList.add('ff-directory-children-container');

    const parents = this.getParentDirectories();
    let parentPath = '/';
    for (let i = 0; i < parents.length; i++) {
        const parent = parents[i];

        if (parent !== '/') {
            if (parentPath !== '/') {
                parentPath += '/'
            }
            parentPath += parent
        }
        
        const parentButton = document.createElement('div');
        parentButton.classList.add('ff-parent-directory');
        parentButton.id = 'ff-parent-directory-' + parent;
        parentButton.type = 'button';
        parentButton.append(parent);
        parentsContainer.append(parentButton);
        parentsContainer.append(this.createDirectoryDelimiter());
        
        const pp =  parentPath;
        parentButton.addEventListener('click', () => {this.changeDirectory(pp)});
    }

    const currentDirElem = document.createElement('div');
    currentDirElem.classList.add('ff-current-directory')
    if (this.directory === '/') {
        currentDirElem.append('/');
    } else {
        currentDirElem.append(this.directory.split('/').pop());
    }
    parentsContainer.appendChild(currentDirElem);

    if (this.directories.length > 0 && this.showNavigatorChildren) {
        parentsContainer.append(this.createDirectoryDelimiter());
        const childSelect = document.createElement('select');
        childSelect.classList.add('ff-directory-select');
        for (let i = 0; i < this.directories.length; i++) {
            const child = this.directories[i].name;
            const childOption = document.createElement('option');
            const childPath = this.directory === '/' ? '/' + child : this.directory + '/' + child;
            childOption.value = childPath;
            childOption.append(child);
            childSelect.append(childOption);
        }

        const cdButton = this.createChangeDirectoryButton(() => {
            this.changeDirectory(childSelect.value);
        });
        childrenContainer.append(childSelect, cdButton);
        if (this.directoriesRemovable) {
            const removeButton = this.createRemoveDirectoryButton(() => {
                this.removeDirectory(childSelect.value);
            })
            childrenContainer.append(removeButton);
        }
    }
    parentsContainer.append(childrenContainer)
    container.append(parentsContainer);
    return container;
}

FileFantastic.prototype.initDirectories = function(params) {
    this.directories = true;

    this.currentDirectory = params.currentDirectory || '';
    this.directories = params.directories || [];
}

FileFantastic.prototype.creatDirectoryNavigator = function(fileId) {
    const container = document.createElement('div');
    container.id = 'ff-directory-navigator-container-' + fileId;
    container.classList.add('ff-directory-navigator-container');
    
    if (this.parentDirectory) {
        const parentButton = document.createElement('button');
        parentButton.type = 'button';
        parentButton.append(this.parentDirectory);
        parentButton.addEventListener('click', ev => {
            
        })
    }

    const currentDisplay = document.createElement('div');
    currentDisplay.append(this.currentDirectory);

    container.append(parentButton);
    return container;
}

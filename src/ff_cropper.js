
FileFantastic.prototype.initCropper = function(params) {
    this.croppable = true;
    this.saveOnCrop = params.saveOnCrop === undefined ? true : params.saveOnCrop;

    this.cropperOptions = params.cropperOptions || {
        aspectRatio: NaN,
        viewMode: 0,
        dragMode: false,
        zoomOnWheel: false,
        autoCropArea: .8,
        strict: false,
        guides: false,
        highlight: false,
        dragCrop: true,
        cropBoxMovable: true,
        cropBoxResizable: true,
        movable: true,
        checkOrientation: false,
    };
    this.cropperToolGroups = {
        main: ['close', 'save', 'copy'],
        zoom: ['zoomOut', 'zoomIn'],
        rotate: ['rotateRight', 'rotateLeft'],
        move: ['moveLeft', 'moveRight', 'moveUp', 'moveDown'],
        aspectRatios: params.cropperAspectRatios || ['4:3', '16:9', '0:0']
    };
}

FileFantastic.prototype.createOpenCropperButton = function(fileId) {
    const openCropperButton = document.createElement('div');
    openCropperButton.id = 'ff-open-cropper-button-' + fileId;
    openCropperButton.classList.add('ff-open-cropper-button');
    openCropperButton.appendChild(this.getIcon('crop'));
    openCropperButton.addEventListener('click', ev => {
        const img = document.getElementById('ff-img-' + fileId);
        if (img) {
            const imgClassList = Array.from(img.classList);
            if (imgClassList.includes('cropper-hidden')) {
                this.closeCropper(fileId);
                return;
            }
        }
        this.openCropper(fileId);
    })
    return openCropperButton;
}

FileFantastic.prototype.openCropper = function(fileId) {
    const imgContainer = document.getElementById('ff-file-preview-container-' + fileId);
    const img = document.getElementById('ff-img-' + fileId);
    const file = this.getFileById(fileId);
    imgContainer.appendChild(this.createCropperToolbar(fileId));
    file.cropper = new Cropper(img, this.cropperOptions);
}

FileFantastic.prototype.handleCropTool = function(fileId, action){
    const file = this.getFileById(fileId);
    const cropper = file.cropper;
    if (action === 'zoomOut') {
        cropper.zoom('-.1');
    } else if (action === 'zoomIn') {
        cropper.zoom('.1');
    } else if (action === 'rotateRight') {
        cropper.rotate('45');
    } else if (action === 'rotateLeft') {
        cropper.rotate('-45');
    } else if (action === 'moveLeft') {
        cropper.move(-10, 0);
    } else if (action === 'moveRight') {
        cropper.move(10, 0);
    } else if (action == 'moveUp') {
        cropper.move(0, -10);
    } else if (action === 'moveDown') {
        cropper.move(0, 10);
    } else if (action.indexOf(':') > 0) {
        const aspectRatio = action.split(':');
        cropper.setAspectRatio(parseFloat(aspectRatio[0] / aspectRatio[1]));
    } else if (action === 'close') {
        this.closeCropper(fileId);
    } else if (action === 'save') {
        this.saveCropper(fileId);
        this.closeCropper(fileId);
    } else if (action === 'undo') {
        this.undoCropper(fileId);
        this.closeCropper(fileId);
        this.openCropper(fileId);
    }
    else if (action === 'copy') {
        this.saveCropper(fileId, true);
        this.closeCropper(fileId);
    }
}

FileFantastic.prototype.saveCropper = function(fileId, copy=false) {
    const file = this.getFileById(fileId);
    const canvas = file.cropper.getCroppedCanvas({});
    file.cropped = true;
    const img = document.getElementById('ff-img-' + fileId);
    canvas.toBlob(blob => {
        let copiedFile;
        if (copy) {
            copiedFile = this.copyFile(fileId, true);
        }
        if (file.existing) {
            this.removedFiles.push(file);
        }
        
        if (file.file) {
            file.originalFile = file.file;
        }
        if (file.size) {
            file.originalSize = file.size;
        }
        file.fileModified = true;
        file.file = new File([blob], file.name, {type: file.type, lastModified:new Date().getTime()});
        file.size = file.file.size;
        file.objectUrl = this.blobToObjectUrl(file.file);

        img.src = file.objectUrl;
        
        if (this.payloadType === 'json' || this.dataUrl) {
            this.blobToDataUrl(file.file, fileId).then(values => {
                const dataUrl = values[0];
                file.dataUrl = dataUrl;
                if (this.saveOnCrop) {
                    this.save(fileId, fileId);
                }
                this.update();
            })
            return;
        } else if (this.saveOnCrop) {
            this.save(fileId, fileId);
            this.update();
        }
    }, file.type)
}

FileFantastic.prototype.undoCropper = function(fileId) {
    const file = this.getFileById(fileId);
    if (file.cropped) {
        if (file.originalFile) {
            file.file = file.originalFile;
            delete file.originalFile;
        } else {
            delete file.file;
        }
        if (file.originalSize) {
            file.size = file.originalSize;
            delete file.originalSize;
        } else {
            delete file.size;
        }
        file.cropped = false;
        delete file.dataUrl;
    }
    const img = document.getElementById('ff-img-' + fileId);
    if (file.existingUrl?.url) {
        img.src = file.existingUrl.url;
    } else {
        if (!file.objectUrl) {
            file.objectUrl = this.blobToObjectUrl(file.file);
        }
        img.src = file.objectUrl;
    }
}

FileFantastic.prototype.closeCropper = function(fileId) {
    const cropperToolbar = document.getElementById('ff-cropper-toolbar-' + fileId);
    const file = this.getFileById(fileId);
    if (cropperToolbar) {
        cropperToolbar.remove();
    }
    if (file.cropper) {
        file.cropper.destroy();
        file.cropper = null;
    }
}

FileFantastic.prototype.createCropperToolbarButton = function(fileId, action) {
    const button = document.createElement('div');
    button.classList.add('ff-crop-tool');

    const icon = this.getIcon(action);
    icon.classList.add('ff-toolbar-icon');

    button.classList.add('ff-toolbar-icon-' + action);
    button.appendChild(icon);
    button.addEventListener('click', ev => {
        this.handleCropTool(fileId, action);
    })
    return button;
}

FileFantastic.prototype.createCropperToolbar = function(fileId) {
    const file = this.getFileById(fileId);
    const container = document.createElement('div');
    container.classList.add('ff-cropper-toolbar', 'ff-cropper-toolbar-' + this.id);
    container.id = 'ff-cropper-toolbar-' + fileId;

    for (let [toolGroupName, toolGroup] of Object.entries(this.cropperToolGroups).filter(g => g[1].length > 0)) {
        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('ff-tool-group');

        for (let action of toolGroup) {
            buttonGroup.appendChild(this.createCropperToolbarButton(fileId, action));
        }
        if (toolGroupName === 'main' && file.cropped && !this.saveOnCrop) {
            buttonGroup.appendChild(this.createCropperToolbarButton(fileId, 'undo'));
        }
        container.appendChild(buttonGroup);
    }
    return container;
}

function FileFantastic(params) {
    this.extensionsToFileTypes = {
        xl: 'application/excel',
        js: 'application/javascript',
        hqx: 'application/mac-binhex40',
        cpt: 'application/mac-compactpro',
        bin: 'application/macbinary',
        doc: 'application/msword',
        word: 'application/msword',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        xltx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
        potx: 'application/vnd.openxmlformats-officedocument.presentationml.template',
        ppsx: 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
        pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        sldx: 'application/vnd.openxmlformats-officedocument.presentationml.slide',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        dotx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
        xlam: 'application/vnd.ms-excel.addin.macroEnabled.12',
        xlsb: 'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
        class: 'application/octet-stream',
        dll: 'application/octet-stream',
        dms: 'application/octet-stream',
        exe: 'application/octet-stream',
        lha: 'application/octet-stream',
        lzh: 'application/octet-stream',
        psd: 'application/octet-stream',
        sea: 'application/octet-stream',
        so: 'application/octet-stream',
        oda: 'application/oda',
        pdf: 'application/pdf',
        ai: 'application/postscript',
        eps: 'application/postscript',
        ps: 'application/postscript',
        smi: 'application/smil',
        smil: 'application/smil',
        mif: 'application/vnd.mif',
        xls: 'application/vnd.ms-excel',
        ppt: 'application/vnd.ms-powerpoint',
        wbxml: 'application/vnd.wap.wbxml',
        wmlc: 'application/vnd.wap.wmlc',
        dcr: 'application/x-director',
        dir: 'application/x-director',
        dxr: 'application/x-director',
        dvi: 'application/x-dvi',
        gtar: 'application/x-gtar',
        php3: 'application/x-httpd-php',
        php4: 'application/x-httpd-php',
        php: 'application/x-httpd-php',
        phtml: 'application/x-httpd-php',
        phps: 'application/x-httpd-php-source',
        swf: 'application/x-shockwave-flash',
        sit: 'application/x-stuffit',
        tar: 'application/x-tar',
        tgz: 'application/x-tar',
        xht: 'application/xhtml+xml',
        xhtml: 'application/xhtml+xml',
        zip: 'application/zip',
        mid: 'audio/midi',
        midi: 'audio/midi',
        mp2: 'audio/mpeg',
        mp3: 'audio/mpeg',
        mp4: 'video/mp4',
        mpga: 'audio/mpeg',
        aif: 'audio/x-aiff',
        aifc: 'audio/x-aiff',
        aiff: 'audio/x-aiff',
        ram: 'audio/x-pn-realaudio',
        rm: 'audio/x-pn-realaudio',
        rpm: 'audio/x-pn-realaudio-plugin',
        ra: 'audio/x-realaudio',
        wav: 'audio/x-wav',
        bmp: 'image/bmp',
        gif: 'image/gif',
        jpeg: 'image/jpeg',
        jpe: 'image/jpeg',
        jpg: 'image/jpeg',
        png: 'image/png',
        tiff: 'image/tiff',
        tif: 'image/tiff',
        webp: 'image/webp',
        eml: 'message/rfc822',
        css: 'text/css',
        html: 'text/html',
        htm: 'text/html',
        shtml: 'text/html',
        log: 'text/plain',
        text: 'text/plain',
        txt: 'text/plain',
        rtx: 'text/richtext',
        rtf: 'text/rtf',
        vcf: 'text/vcard',
        vcard: 'text/vcard',
        xml: 'text/xml',
        xsl: 'text/xml',
        mpeg: 'video/mpeg',
        mpe: 'video/mpeg',
        mpg: 'video/mpeg',
        mov: 'video/quicktime',
        qt: 'video/quicktime',
        rv: 'video/vnd.rn-realvideo',
        avi: 'video/x-msvideo',
        movie: 'video/x-sgi-movie'
    };

    this.icons = {
        edit: {
            mdi: 'mdi-pencil-box',
            fa: 'fa-pen-to-square',
            text: 'Edit',
        },
        copy: {
            mdi: 'mdi-content-copy',
            fa: 'fa-copy',
            text: 'Copy',
        },
        download: {
            mdi: 'mdi-file-file-download',
            fa: 'fa-download',
            text: 'Download',
        },
        close: {
            mdi: 'mdi-navigation-close',
            fa: 'fa-xmark',
            text: 'Close',
        },
        remove: {
            mdi: 'mdi-navigation-close',
            fa: 'fa-remove',
            text: 'Remove',
        },
        save: {
            mdi: 'mdi-navigation-check',
            fa: 'fa-check',
            text: 'Done',
        },
        undo: {
            mdi: 'mdi-content-undo',
            fa: 'fa-trash-arrow-up',
            text: 'Undo',
        },
        zoomOut: {
            mdi: 'mdi-content-add',
            fa: 'fa-search-minus',
            text: 'Zoom Out',
        },
        zoomIn: {
            mdi: 'mdi-content-remove',
            fa: 'fa-search-plus',
            text: 'Zoom Out',
        },
        rotateRight: {
            mdi: 'mdi-image-rotate-right',
            fa: 'fa-rotate-right',
            text: 'Rotate Clockwise',
        },
        rotateLeft: {
            mdi: 'mdi-image-rotate-right',
            fa: 'fa-rotate-left',
            text: 'Rotate Counter-Clockwise',
        },
        moveLeft: {
            mdi: 'mdi-hardware-keyboard-arrow-left',
            fa: 'fa-arrow-left',
            text: 'Move Left',
        },
        moveRight: {
            mdi: 'mdi-hardware-keyboard-arrow-right',
            fa: 'fa-arrow-right',
            text: 'Move Right',
        },
        moveUp: {
            mdi: 'mdi-hardware-keyboard-arrow-up',
            fa: 'fa-arrow-up',
            text: 'Move Up',
        },
        moveDown: {
            mdi: 'mdi-hardware-keyboard-arrow-down',
            fa: 'fa-arrow-down',
            text: 'Move Down',
        },
        leftChevron: {
            mdi: 'mdi-hardware-keyboard-arrow-left',
            fa: 'fa-chevron-left',
            text: '<',
        },
        rightChevron: {
            mdi: 'mdi-hardware-keyboard-arrow-right',
            fa: 'fa-chevron-right',
            text: '>',
        }
    };


    this.iconType = ['mdi', 'fa', 'text'].includes(params.iconType) ? params.iconType : 'text';
    this.files = [];
    this.id = params.id === undefined ? this.generateUID() : params.id;
    this.multiple = params.multiple === undefined ? false : params.multiple;
    this.uploadType = ['json', 'formData'].includes(params.uploadType) ? params.uploadType : 'json';
    this.uploadCallbackUrl = params.uploadCallbackUrl === undefined ? '' : params.uploadCallbackUrl; 
    this.uploadIndividually = params.uploadIndividually === undefined ? ! this.multiple : params.uploadIndividually;
    this.uploadOnInput = params.uploadOnInput === undefined ? true : params.uploadOnInput;
    this.progressCallback = params.progressCallback || (()=>{});

    this.acceptedImagePreviewTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/bmp', 'image/webp'];
    this.previewImages = params.previewImages === undefined ? true : params.previewImages;
    this.imagesExpandable = params.imagesExpandable === undefined ? true : params.imagesExpandable;

    this.acceptedAudioPreviewTypes = ['audio/ogg', 'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/mp4', 'audio/webm', 'audio/flac'];
    this.previewAudio = params.previewAudio === undefined ? true : params.previewAudio;

    this.previewVideo = params.previewVideo === undefined ? true : params.previewVideo;
    this.acceptedVideoPreviewTypes = ['video/mp4', 'video/ogg', 'video/webm'];

    this.previewable = params.previewable === undefined ? (this.previewImages || this.previewAudio || this.previewVideo) : params.previewable;
    this.copyable = params.copyable === undefined ? true : params.copyable;
    this.downloadable = params.downloadable === undefined ? true : params.downloadable;
    this.editableFilename = params.editableFilename === undefined ? true : params.editableFilename;
    this.saveFilenameCallbackUrl = params.saveFilenameCallbackUrl === undefined ? '' : params.saveFilenameCallbackUrl;
    this.showFilename = params.showFilename === undefined ? true : params.showFilename;
    this.maxFilenameLength = params.maxFilenameLength === undefined ? 240 : params.maxFilenameLength;
    this.removeable = params.removeable === undefined ? true : params.removeable === undefined;
    this.removeCallbackUrl = params.removeCallbackUrl || '';
    this.removedFiles = [];
    this.removeIndividually = params.removeIndividually === undefined ? true : params.removeIndividually;
    this.removeOnClick = params.removeOnClick === undefined ? false : params.removeOnClick;

    this.resize = params.resize || false;
    this.resizeMaxWidth = params.resizeMaxWidth || 1632;
    this.resizeMaxHeight = params.resizeMaxHeight || 1224;

    this.dropify = params.dropify === undefined ? false : params.dropify;
    this.alertCallback = params.alertCallback || (a => {alert(a.message)});
    this.loadingCallback = params.loadingCallback || (()=>{});
    this.alerts = []
    
    this.acceptedFileTypes = null;
    if (params.acceptedFileTypes) {
        this.acceptedFileTypes = params.acceptedFileTypes.constructor === String ? params.acceptedFileTypes.split(',').map(e => e.trim().toLowerCase()) : params.acceptedFileTypes;
    }
    this.acceptedExtensions = null;
    if (params.acceptedExtensions) {
        this.acceptedExtensions = params.acceptedExtensions.constructor === String ? params.acceptedExtensions.split(',').map(e => e.replace('.', '').trim().toLowerCase()) : params.acceptedExtensions;
    }

    if (params.input) {
        this.input = params.input.constructor === String ? document.getElementById(params.input) : params.input;
    } else {
        this.input = this.createInput();
    }

    this.inputButton = null;
    if (this.dropify && params.input) {
        $(this.input).dropify();
    } else if (params.inputButton) {
        this.inputButton = params.inputButton.constructor === String ? document.getElementById(params.inputButton) : params.inputButton;
        this.inputButton.addEventListener('click', ev => {this.input.click()});
    } else {
        this.inputButtonText = params.inputButtonText === undefined ? 'Browse' : params.inputButtonText;
        this.inputButton = this.createInputButton();
    }

    if (this.multiple) {
        this.input.multiple = true;
    }
    this.maxFileSize = params.maxFileSize || (10 * 1024 * 1024); // 10MB
    this.maxFiles = !this.multiple ? 1 : (params.maxFiles || 100);

    if (params.displayContainer) {
        this.displayContainer = params.displayContainer.constructor === String ? document.getElementById(params.displayContainer) : params.displayContainer;
    } else {
        this.displayContainer = this.createDisplayContainer();
    }

    this.existingUrls = [];
    if (params.existingUrls) {
        if (params.existingUrls.constructor === Array) {
            this.existingUrls = params.existingUrls.map(url => { return url.constructor === String ? {url:url} : url })
        } else {
            this.existingUrls = params.existingUrls;
        }
    }
    this.loadExisting(this.existingUrls);
    this.setInputOnChange();

    // Plugins
    if (this.initCropper !== undefined && params.cropper) {
        this.initCropper(params.cropper);
    }
    if (this.initPaging !== undefined && params.paging) {
        this.initPaging(params.paging);
    }
    if (this.initDirectories !== undefined && params.directories) {
        this.initDirectories(params.directories);
    }
    if (this.initDebug !== undefined && params.debug) {
        this.initDebug(params.debug);
    }
    
    this.update();
}

FileFantastic.prototype.getDataUrlSize = function(dataUrl) {
    const contentWithoutMime = dataUrl.split(',')[1];
    return window.atob(contentWithoutMime).length;
}

FileFantastic.prototype.fileSizeToHumanReadable = function(bytes, si=false, dp=2) {
    const thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }

    const units = si ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10**dp;
  
    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
    return bytes.toFixed(dp) + ' ' + units[u];
}

FileFantastic.prototype.getFileById = function(fileId) {
    const fileIndex = this.files.map(f => f.fileId).indexOf(fileId);
    return this.files[fileIndex];
}

FileFantastic.prototype.getFileByName = function(name) {
    const fileIndex = this.files.map(f => f.name).indexOf(name);
    return this.files[fileIndex];
}

FileFantastic.prototype.createInputButton = function() {
    const button = document.createElement('button');
    button.type = 'button';
    button.addEventListener('click', ev => {this.input.click()});
    button.classList.add('ff-input-button');
    button.id = 'ff-input-button-' + this.id;
    button.append(this.inputButtonText);
    return button;
}

FileFantastic.prototype.createInputContainer = function() {
    const container = document.createElement('div');
    container.classList.add('ff-input-container');
    container.id = 'ff-input-container-' + this.id;
    return container;
};

FileFantastic.prototype.sortFilesCallback = function(a,b) {
    if (!a.name || !b.name) return 0;
    const aa = a.name.toLowerCase();
    const bb = b.name.toLowerCase();
    if (aa < bb) {
        return -1;
    }
    if (aa > bb) {
        return 1;
    }
    return 0;
}

FileFantastic.prototype.generateUID = function() {
    let firstPart = (Math.random() * 46656) | 0;
    let secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}

FileFantastic.prototype.update = function() {
    let displayContainers = document.querySelectorAll('.ff-file-container-' + this.id);
    for (let displayContainer of displayContainers) {
        const fileId = displayContainer.dataset.fileId;
        if (!this.getFileById(fileId)) {
            displayContainer.remove();
        } else if (this.paging) {
            this.toggleDisplayed(displayContainer, false);
        }
    }

    this.files.sort(this.sortFilesCallback);
    const files = this.paging ? this.getCurrentPageFiles() : this.files;

    for (let file of files) {
        let fileDisplay = this.displayCallback(file.fileId);
        this.displayContainer.appendChild(fileDisplay);
        this.paging && this.toggleDisplayed(fileDisplay, true);
    }
    if (this.paging) {
        this.pageDisplayCallback();
    }
    this.debug && this.updateDebugContainer();
    this.displayAlerts();
}

FileFantastic.prototype.getIcon = function(key) {
    const icon = document.createElement('div');
    if (!this.icons[key] && key.indexOf(':') === -1) {
        console.log('Icon does not exist for ', key, ' : ', this.iconType);
        icon.appendChild(document.createTextNode(key.charAt(0).toUpperCase() + key.slice(1)));
        return icon;
    }
    if (this.iconType === 'text') {
        icon.appendChild(document.createTextNode(this.icons[key].text));
    } else if (key.indexOf(':') !== -1 || key === NaN) {
        if (key === '0:0' || key === NaN) {
            key = 'Free';
        }
        icon.appendChild(document.createTextNode(key));
    } else {
        if (this.iconType === 'fa') {
            icon.classList.add('fa');
        }
        icon.classList.add('ff-icon', this.icons[key][this.iconType]);
    }
    return icon;
}

FileFantastic.prototype.toggleDisplayed = function(id, displayed=null) {
    const el = id.constructor === String ? document.getElementById(id) : id;
    if (el) {
        if (displayed === null) {
            el.style.display = el.style.display === 'none' ? '' : 'none';
        } else {
            el.style.display = displayed ? '' : 'none';
        }
    }
}

FileFantastic.prototype.createVideoPreview = function(fileId) {
    const file = this.getFileById(fileId);
    const video = document.createElement('video');
    video.id = 'ff-video-' + fileId;
    video.classList.add('ff-video');
    video.controls = true;
    const source = document.createElement('source');
    source.src = this.getPreviewUrl(fileId);;
    source.type = file.type;
    source.onload = ev => {source.classList.remove('ff-loading');}
    source.onerror = err => {source.classList.remove('ff-loading');}
    video.appendChild(source);
    return video;
}

FileFantastic.prototype.createAudioPreview = function(fileId) {
    const audio = document.createElement('audio');
    audio.id = 'ff-audio-' + fileId;
    audio.classList.add('ff-audio', 'ff-loading');
    audio.controls = true;
    audio.onloadeddata = ev => {audio.classList.remove('ff-loading');}
    audio.onerror = err => {audio.classList.remove('ff-loading');}
    audio.src = this.getPreviewUrl(fileId);
    return audio;
}

FileFantastic.prototype.createImgPreview = function(fileId) {
    const img = new Image();
    img.id = 'ff-img-' + fileId;
    img.classList.add('ff-img', 'ff-loading');
    img.onload = ev => {img.classList.remove('ff-loading');}
    img.onerror = err => {img.classList.remove('ff-loading');}
    if (this.imagesExpandable) {
        img.addEventListener('click', ev => {
            let imgExpanded = Array.from(img.classList).includes('ff-img-expanded');
            document.querySelectorAll('.ff-img-expanded').forEach(el => { el.classList.remove('ff-img-expanded') })
            !imgExpanded && img.classList.add('ff-img-expanded');
            window.onclick = ev => {
                ev.target !== img && img.classList.remove('ff-img-expanded');
            }
        })
    }
    img.src = this.getPreviewUrl(fileId);
    return img;
}

FileFantastic.prototype.getPreviewUrl = function(fileId) {
    const file = this.getFileById(fileId);
    let previewUrl = file.dataUrl || file.objectUrl || file.existingUrl?.url || '';
    if (!previewUrl && file.file) {
        file.objectUrl = this.blobToObjectUrl(file.file);
        previewUrl = file.objectUrl;
    }
    return previewUrl;
}

FileFantastic.prototype.createFilenamePreview = function(fileId) {
    const file = this.getFileById(fileId);
    const container = document.createElement('div');
    container.classList.add('ff-filename-preview-container');
    container.id = 'ff-filename-preview-container-' + fileId;

    const div = document.createElement('div');
    div.classList.add('ff-filename-preview');
    
    div.id = 'ff-filename-preview-' + fileId;
    div.append(file.name);
    container.append(div);
    if (this.editableFilename) {
        const editFilenameButton = document.createElement('div');
        editFilenameButton.classList.add('ff-edit-filename-button');
        editFilenameButton.id = 'ff-edit-filename-button-' + fileId;
        editFilenameButton.append(this.getIcon('edit'));
        container.append(editFilenameButton);
        editFilenameButton.addEventListener('click', ev => {
            const filenameInput = document.createElement('input');
            filenameInput.type = 'text';
            filenameInput.placeholder = 'New filename...'
            filenameInput.classList.add('ff-filename-input');
            filenameInput.id = 'ff-filename-input-' + fileId;

            const saveButton = document.createElement('div');
            saveButton.classList.add('ff-filename-save-button');
            saveButton.id = 'ff-filename-save-button-' + fileId;
            saveButton.append(this.getIcon('save'));

            const cancelButton = document.createElement('div');
            cancelButton.classList.add('ff-filename-cancel-button');
            cancelButton.id = 'ff-filename-cancel-button-' + fileId;
            cancelButton.append(this.getIcon('remove'));

            saveButton.addEventListener('click', ev => {
                this.saveFilename(fileId, filenameInput.value);
                while (div.firstChild) {
                    div.firstChild.remove();
                }
                div.appendChild(document.createTextNode(file.name));
                this.toggleDisplayed(div, true);
                this.toggleDisplayed(editFilenameButton, true);
                filenameInput.remove();
                saveButton.remove();
                cancelButton.remove();
            });
            cancelButton.addEventListener('click', ev => {
                this.toggleDisplayed(div, true);
                this.toggleDisplayed(editFilenameButton, true);
                filenameInput.remove();
                saveButton.remove();
                cancelButton.remove();
            });

            this.toggleDisplayed(div, false);
            this.toggleDisplayed(editFilenameButton, false);
            container.append(filenameInput, saveButton, cancelButton);
        })
    }
    return container;
}

FileFantastic.prototype.saveFilename = function(fileId, newFilename) {
    const file = this.getFileById(fileId);
    const extension = file.name.split('.').pop();
    if (extension && newFilename.indexOf('.' + extension) !== newFilename.length - extension.length) {
        newFilename = newFilename.trim() + '.' + extension;
    }
    newFilename = this.cleanFilename(newFilename);
    if (newFilename === file.name) {
        return;
    }
    if (file.existing) {
        if (this.saveFilenameCallbackUrl) {
            const payload = this.uploadType === 'json' ? {} : new FormData();
            this.addToPayload(payload, 'existingUrl', file.existingUrl);
            this.addToPayload(payload, 'originalName', file.originalName || file.name);
            this.addToPayload(payload, 'name', newFilename);
            this.addToPayload(payload, 'fileId', file.fileId);
            this.doXhr(this.saveFilenameCallbackUrl, payload, response => {this.saveFilenameResponseCallback(fileId, newFilename, response)}, this.uploadType === 'json')
        } else {
            file.filenameModified = true;
            file.originalName = file.originalName ? file.originalName : file.name;
            file.name = newFilename;
        }
    } else {
        file.name = newFilename;
    }
}

FileFantastic.prototype.saveFilenameResponseCallback = function(fileId, newFilename, response) {
    const file = this.getFileById(fileId);
    if (response) {
        this.alerts.push({message: 'Successfully renamed ' + file.name + ' to ' + newFilename, type: 'success'});
        this.displayAlerts();
        file.name = newFilename;
        const filenamePreview = document.getElementById('ff-filename-preview-' + fileId);
        if (filenamePreview) {
            while (filenamePreview.firstChild) {
                filenamePreview.firstChild.remove();
            }
            filenamePreview.append(file.name);
        }
    }
}

FileFantastic.prototype.copyFile = function(fileId) {
    if (this.files.length + 1 > this.maxFiles) {
        this.alerts.push({message: 'File could not be copied because only a maximum of ' + this.maxFiles + ' files may be uploaded', type: 'warning'});
        this.displayAlerts();
        return;
    }
    const srcFileObject = this.getFileById(fileId);
    let srcFile = [];
    if (srcFileObject.file) {
        srcFile = new Promise(resolve => {resolve([srcFileObject.file, ''])});
    } else {
        srcFile = this.urlToBlob(srcFileObject.dataUrl || srcFileObject.objectUrl || srcFileObject.existingUrl?.url)
    }
    srcFile.then(values => {
        const [blob] = values;
        const newFile = new File([blob], srcFileObject.name, {type: srcFileObject.type, lastModified:new Date().getTime()});
        const newFileObject = this.addFile(newFile);
        newFileObject.copied = true;
        newFileObject.copiedFromFileId = srcFileObject.fileId;
        let copyUploaded = false;
        if (this.uploadType === 'json') {
            if (srcFile.dataUrl) {
                newFileObject.dataUrl = srcFile.dataUrl;
            } else {
                copyUploaded = true;
                this.blobToDataUrl(newFile, newFileObject.fileId).then(value => {
                    const [dataUrl, fileId] = value;
                    newFileObject.dataUrl = dataUrl;
                    if (this.uploadOnInput) {
                        this.uploadCallback(newFileObject.fileId);
                    }
                })
            }
        }

        if (this.uploadOnInput && !copyUploaded) {
            this.uploadCallback(newFileObject.fileId);
        }
        this.files.sort(this.sortFilesCallback)
        if (this.paging) {
            this.page = this.getPageByFileId(newFileObject.fileId);
        }
        this.update();
    })
}

FileFantastic.prototype.createCopyButton = function(fileId) {
    const div = document.createElement('div');
    div.classList.add('ff-copy-file-button');
    div.id = 'ff-copy-file-button-' + fileId;
    div.appendChild(this.getIcon('copy'));
    div.addEventListener('click', ev => {
        this.copyFile(fileId);
    })
    return div;
}
    
FileFantastic.prototype.createDownloadFileButton = function(fileId) {
    const div = document.createElement('div');
    div.classList.add('ff-download-file-button');
    div.id = 'ff-download-file-button-' + fileId;
    div.appendChild(this.getIcon('download'));
    div.addEventListener('click', ev => {this.downloadFile(fileId)})
    return div;
}

FileFantastic.prototype.updateFileDisplay = function(fileId) {
    const file = this.getFileById(fileId);
    const filenameDisplay = document.getElementById('ff-filename-preview-' + fileId);
    filenameDisplay.innerText = file.name;
}

FileFantastic.prototype.createFileDisplay = function(fileId) {
    const file = this.getFileById(fileId);
    const container = this.createFileDisplayContainer(fileId);
    if (file.previewable) {
        if (this.previewImages && this.acceptedImagePreviewTypes.includes(file.type)) {
            container.classList.add('ff-img-preview-container');
            container.appendChild(this.createImgPreview(fileId));
        } else if (this.previewAudio && this.acceptedAudioPreviewTypes.includes(file.type)) {
            container.classList.add('ff-audio-preview-container');
            container.appendChild(this.createAudioPreview(fileId));
        } else if (this.previewVideo && this.acceptedVideoPreviewTypes.includes(file.type)) {
            container.classList.add('ff-video-preview-container');
            container.appendChild(this.createVideoPreview(fileId));
        }
        if (this.showFilename || this.editableFilename) {
            container.appendChild(this.createFilenamePreview(fileId));
        }
    } else {
        container.appendChild(this.createFilenamePreview(fileId));
        return container;
    }
    return container;
}

FileFantastic.prototype.createFileDisplayContainer = function(fileId) {
    const container = document.createElement('div');
    container.classList.add('ff-file-preview-container');
    container.id = 'ff-file-preview-container-' + fileId;
    container.dataset.fileId = fileId;
    return container;
}

FileFantastic.prototype.createDisplayContainer = function() {
    const container = document.createElement('div');
    container.classList.add('ff-display-container');
    container.id = 'ff-display-container-' + this.id;
    return container;
}

FileFantastic.prototype.displayCallback = function(fileId) {
    const file = this.getFileById(fileId);
    const existingContainer = document.getElementById('ff-file-container-' + file.fileId);
    const container = existingContainer || this.createFileContainer(fileId);

    if (file.previewable && !file.existingUrl?.url && !file.objectUrl && file.file) {
        file.objectUrl = this.blobToObjectUrl(file.file);
    }

    if (!existingContainer) {
        file.container = container;
        container.appendChild(this.createFileDisplay(fileId))
        const buttons = [];
        if (this.downloadable) {
            buttons.push(this.createDownloadFileButton(fileId));
        }
        if (this.removeable || !file.existing) {
            buttons.push(this.createRemoveButton(fileId));
        }
        if (this.acceptedImagePreviewTypes.includes(file.type) && this.croppable) {
            buttons.push(this.createOpenCropperButton(fileId));
        }
        if (this.copyable) {
            buttons.push(this.createCopyButton(fileId));
        }
        if (buttons.length > 0) {
            const controlContainer = this.createFileControlContainer();
            controlContainer.append(...buttons);
            container.appendChild(controlContainer);
        }
    } else {
        this.updateFileDisplay(fileId);
    }

    if (this.debug) {
        container.appendChild(this.createFileDebugContainer(fileId))
    }
    return container;
}

FileFantastic.prototype.createFileControlContainer = function(fileId) {
    const container = document.createElement('div');
    container.classList.add('ff-file-control-container');
    container.id = 'ff-file-control-container-' + this.id;
    return container;
}

FileFantastic.prototype.createFileContainer = function(fileId) {
    const file = this.getFileById(fileId);
    const container = document.createElement('div');
    container.classList.add('ff-file-container', 'ff-file-container-' + this.id);
    this.previewImages && this.acceptedImagePreviewTypes.includes(file.type) && container.classList.add('ff-img-container');
    this.previewAudio && this.acceptedAudioPreviewTypes.includes(file.type) && container.classList.add('ff-audio-container');
    this.previewVideo && this.acceptedVideoPreviewTypes.includes(file.type) && container.classList.add('ff-video-container');
    container.id = 'ff-file-container-' + fileId;
    container.dataset.fileId = fileId;
    return container;
}

FileFantastic.prototype.createRemoveButton = function(fileId) {
    const removeButton = document.createElement('div');
    removeButton.classList.add('ff-remove-file-button');
    removeButton.id = 'ff-remove-file-button-' + fileId;
    removeButton.addEventListener('click', ev => {this.removeCallback(fileId);})
    removeButton.appendChild(this.getIcon('remove'));
    return removeButton;
}

FileFantastic.prototype.downloadFile = function(fileId) {
    const file = this.getFileById(fileId);
    const href = this.getPreviewUrl(fileId);
    const filename = file.name;
    const link = document.createElement("a");
    link.download = filename;
    link.href = href;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}


FileFantastic.prototype.uploadCallback = function(fileIds=null) {
    let filesToUpload = this.getFilesToUpload(fileIds);
    if (filesToUpload.length === 0) {
        this.alerts.push({message: 'No files to upload', type: 'warning'});
        this.displayAlerts();
        return;
    }

    this.loadingCallback(true);

    if (this.uploadIndividually) {
        const totalSize = filesToUpload.reduce((size, file) => size + file.size, 0);
        const totalIndex = filesToUpload.length;
        let runningSize = 0;
        let runningIndex = 0;
        this.progressCallback(runningIndex, totalIndex, runningSize, totalSize);

        for (let i = 0; i < filesToUpload.length; i++) {
            const file = filesToUpload[i];
            const payload = this.getUploadPayload(file.fileId);
            this.progressCallback(runningIndex, totalIndex, runningSize, totalSize);
            this.doXhr(this.uploadCallbackUrl, payload, response => {
                this.uploadResponseCallback(response, file.fileId);
                runningSize += file.size;
                runningIndex++;
                this.progressCallback(runningIndex, totalIndex, runningSize, totalSize);
                if (runningIndex >= totalIndex) {
                    this.loadingCallback(false);
                }
            }, this.uploadType === 'json')
        }
        
    } else {
        const payload = this.getUploadPayload(fileIds);
        this.doXhr(this.uploadCallbackUrl, payload, response => {
            this.uploadResponseCallback(response, filesToUpload.map(f => f.fileId));
            this.loadingCallback(false);
        }, this.uploadType === 'json')
    }    
}

FileFantastic.prototype.uploadResponseCallback = function(response, fileIds) {
    const single = fileIds?.constructor === String;
    fileIds = fileIds?.constructor === String ? [fileIds] : fileIds;
    response = response.constructor !== Array ? [response] : response;

    const uploadedFileIds = [];
    for (let fileResponse of response) {
        const fileId = fileResponse.fileId || (single ? fileIds[0] : null);
        if (!fileId) {
            console.error('Upload response missing file ID to map existing URL', 'Response:', response, 'File Ids:', fileIds);
            continue;
        }
        const file = this.getFileById(fileId);
        if (fileResponse.existingUrl || fileResponse.url || fileResponse.constructor === String) {
            console.log("OKAY??? this is my file Response: ", fileResponse);
            const existingUrlResponse = fileResponse.existingUrl || fileResponse.url || fileResponse;
            const existingUrl = existingUrlResponse.constructor === String ? {url: existingUrlResponse} : existingUrlResponse;
            file.name = null;
            this.parseExistingUrlIntoFileObject(existingUrl, file);
            uploadedFileIds.push(fileId);
        }
    }
    console.log(this.files.map(f => f.name))
    const failedFileIds = fileIds.filter(value => !uploadedFileIds.includes(value));
    if (failedFileIds.length > 0) {
        if (single) {
            this.alerts.push({message: 'Failed to upload file ' + this.getFileById(failedFileIds[0]).name + '.', type: 'danger'})
        } else {
            this.alerts.push({message: 'Failed to upload ' + failedFileIds.length + ' file' + (failedFileIds.length === 1 ? '' : 's') + '.', type: 'danger'})
        }
    }
    if (uploadedFileIds.length > 0) {
        if (single) {
            this.alerts.push({message: 'Successfully uploaded file ' + this.getFileById(uploadedFileIds[0]).name + '!', type: 'success'})
        } else {
            this.alerts.push({message: 'Successfully uploaded ' + uploadedFileIds.length + ' file' + (uploadedFileIds.length === 1 ? '' : 's') + '!', type: 'success'})
        }
    }
    this.update();
}

FileFantastic.prototype.saveResponseCallback = function(response, uploadedFileIds=[], removedFileIds=[]) {
    if (removedFileIds.length > 0) {
        this.removeResponseCallback(response, removedFileIds);
    }
    if (uploadedFileIds.length > 0) {
        this.uploadResponseCallback(response, uploadedFileIds);
    }
}

FileFantastic.prototype.saveCallback = function(uploadFileIds=null, removeFileIds=null) {
    let filesToUpload = this.getFilesToUpload(null);
    let filesToRemove = this.removedFiles;
    if (uploadFileIds) {
        filesToUpload = filesToUpload.filter(v => uploadFileIds.constructor === Array ? uploadFileIds.includes(v.fileId) : uploadFileIds === v.fileId);
    }
    if (removeFileIds) {
        filesToRemove = filesToRemove.filter(v => removeFileIds.constructor === Array ? removeFileIds.includes(v.fileId) : removeFileIds === v.fileId);
    }

    if (filesToUpload.length === 0 && filesToRemove.length === 0) {
        this.alerts.push({message: 'No files to save', type: 'warning'});
        this.displayAlerts();
        return;
    }
    
    this.loadingCallback(true);
    if (!this.uploadIndividually && !this.removeIndividually) {
        this.doXhr(this.uploadCallbackUrl, this.getDualPayload(filesToUpload.map(f => f.fileId), filesToRemove.map(f => f.fileId)), response => {
            this.saveResponseCallback(response, filesToUpload.map(f => f.fileId), filesToRemove.map(f => f.fileId));
            this.loadingCallback(false);
        }, this.uploadType === 'json')
    } else {
        this.uploadCallback(filesToUpload.map(f => f.fileId));
        const requestRemove = (requestFileIds, last) => {
            let payload = this.getRemovePayload(requestFileIds);
            if (!payload) {
                return;
            }

            if (!this.removeCallbackUrl) {
                payload = this.addToPayload(this.uploadType === 'json' ? {} : new FormData(), 'removedFiles', payload);
            }
            this.doXhr(this.removeCallbackUrl || this.uploadCallbackUrl, payload, response => {
                this.removeResponseCallback(response, requestFileIds)
                if (last) {
                    this.loadingCallback(false);
                }
            }, this.uploadType === 'json')
        }

        if (this.removeIndividually) {
            filesToRemove.forEach((f, i) => requestRemove(f.fileId, i === filesToRemove.length - 1));
        } else {
            requestRemove(filesToRemove.map(f => f.fileId), true);
        }
    }
}

FileFantastic.prototype.getDualPayload = function(uploadFileIds=null, removeFileIds=null) {
    const dualPayload = this.uploadType === 'json' ? {} : new FormData();
    
    if (this.uploadType === 'json') {
        const uploadPayload = this.getUploadPayload(uploadFileIds);
        this.addToPayload(dualPayload, 'files', uploadPayload);
    } else {
        const uploadPayloadData = this.getUploadPayload(uploadFileIds, true, false);
        const uploadPayloadFiles = this.getUploadPayload(uploadFileIds, false, true);
        if (uploadPayloadFiles) {
            Array.from(uploadPayloadFiles.entries()).forEach(f => dualPayload.append(f[0], f[1], f[1].name));
        }
        this.addToPayload(dualPayload, 'files', uploadPayloadData);
    }
    const removePayload = this.getRemovePayload(removeFileIds);
    this.addToPayload(dualPayload, 'removedFiles', removePayload);
    return dualPayload;
}

FileFantastic.prototype.addToPayload = function(payload, key, value, index=null, filename=null, formDataWrapper='') {
    if (payload instanceof FormData) {
        if (typeof value === 'object') {
            if (filename) {
                key = key + (index !== null ? ('[' + index + ']') : '');
                payload.append(key, value, filename);
            } else {
                if (value instanceof FormData) {
                    for (let [subKey, subValue] of value.entries()) {
                        const subKeyBase = subKey.substring(0, subKey.indexOf('['));
                        const subKeyRest = subKey.substring(subKey.indexOf('['), subKey.length);
                        if (subKeyBase) {
                            subKey = key + '[' + subKeyBase + ']' + subKeyRest;
                        } else if (key) {
                            subKey = key + '[' + subKey + ']';
                        }
                        console.log("Add to payload recursive formdata")
                        this.addToPayload(payload, subKey, subValue, index, filename, '');
                    }
                } else {
                    for (let subKey in value) {
                        console.log("Add to payload recursive objwct")
                        const subValue = value[subKey];
                        this.addToPayload(payload, key, subValue, index, null, formDataWrapper + '[' + subKey + ']');
                    }
                }
            }
        } else {
            if (index !== null) {
                key = index + '[' + key + ']'
            }
            payload.append(key + formDataWrapper, value);
        }
        
    } else {
        if (index !== null) {
            if (!payload[index]) {
                payload[index] = {}
            }
            payload[index][key] = value;
        } else {
            payload[key] = value;
        }
    }
    return payload;
}



FileFantastic.prototype.getFilesToUpload = function(fileIds=null) {
    let filesToUpload = this.files;
    if (fileIds) {
        filesToUpload = fileIds.constructor === Array ? this.files.filter(v => fileIds.includes(v.fileId)) : [this.getFileById(fileIds)];
    }
    return filesToUpload.filter(file => {
        return !file.existing || file.fileModified || file.filenameModified;
    })
}

FileFantastic.prototype.getUploadPayload = function(fileIds=null, addData=true, addFiles=true) {
    const filesToUpload = this.getFilesToUpload(fileIds);
    const individual = fileIds?.constructor === String;
    
    let payload = this.uploadType === 'json' ? (individual ? {} : Array(filesToUpload.length)) : new FormData();

    let payloadIndex = individual ? null : 0;
    for (let i = 0; i < filesToUpload.length; i++) {
        let file = filesToUpload[i];
        if (addData) {
            this.addToPayload(payload, 'fileId', file.fileId, payloadIndex);
            if (!file.existing || file.fileModified|| file.filenameMod) {
                this.addToPayload(payload, 'name', file.name, payloadIndex);
            }
            
            if (!file.existing || file.fileModified) {
                this.addToPayload(payload, 'size', file.size, payloadIndex);
                this.addToPayload(payload, 'type', file.type, payloadIndex);
                
            }
            if (file.existing) {
                this.addToPayload(payload, 'existingUrl', file.existingUrl, payloadIndex);
                if (file.fileModified) {
                    this.addToPayload(payload, 'fileModified', '1', payloadIndex);
                }
            }
            if (file.filenameModified) {
                this.addToPayload(payload, 'filenameModified', '1', payloadIndex);
                this.addToPayload(payload, 'originalName', file.originalName, payloadIndex);
            }
        }
        if (addFiles) {
            if (!file.existing || file.fileModified) {
                if (this.uploadType === 'json') {
                    this.addToPayload(payload, 'dataUrl', file.dataUrl, payloadIndex);
                } else {
                    console.log("Payload index: ", payloadIndex)
                    this.addToPayload(payload, this.id, file.file, payloadIndex, file.name);
                }
            }
        }
        payloadIndex = individual ? null : (payloadIndex + 1);
    }

    return payload;
}

FileFantastic.prototype.getRemovePayload = function(fileIds=null) {
    const files = fileIds === null ? this.removedFiles : this.files.concat(this.removedFiles);
    const individual = fileIds?.constructor === String;
    fileIds = individual ? [fileIds] : fileIds;
    const removedFiles = files.filter(rf => fileIds === null || fileIds.includes(rf.fileId));
    if (removedFiles.length === 0) {
        return null;
    }
    const payload = this.uploadType === 'json' ? (individual ? {} : Array(removedFiles.length)) : new FormData();
    for (let i = 0; i < removedFiles.length; i++) {
        const removedFile = removedFiles[i];
        Object.entries(removedFile.existingUrl).forEach(e => {
            this.addToPayload(payload, e[0], e[1], individual ? null : i);
        })
    }
    return payload;
}

FileFantastic.prototype.removeCallback = function(fileIds=null) {
    let filesToRemove = this.files;
    if (fileIds) {
        filesToRemove = filesToRemove.filter(v => fileIds.constructor === Array ? fileIds.includes(v.fileId) : fileIds === v.fileId);
    }
    
    if (filesToRemove.length === 0) {
        this.alerts.push({message: 'No files to remove', type: 'warning'});
        this.displayAlerts();
        return;
    }
    const confirmedFiles = [];

    for (let i = 0; i < filesToRemove.length; i++) {
        const file = filesToRemove[i];
        if (file.existing && (!this.removeConfirmCallback || this.removeConfirmCallback(file.fileId))) {
            confirmedFiles.push(file);
        } else {
            this.removeFile(file.fileId);
        }
    }
    filesToRemove = confirmedFiles;
    if (filesToRemove.length === 0) {
        return;
    }

    if (this.removeOnClick) {
        this.loadingCallback(true);
        const requestRemove = (requestFileIds, last) => {
            let payload = this.getRemovePayload(requestFileIds);
            if (!this.removeCallbackUrl) {
                payload = this.addToPayload(this.uploadType === 'json' ? {} : new FormData(), 'removedFiles', payload)
            }
            this.doXhr(this.removeCallbackUrl || this.uploadCallbackUrl, payload, response => {
                this.removeResponseCallback(response, requestFileIds)
                if (last) {
                    this.loadingCallback(false);
                }
                filesToRemove.forEach(f => {
                    if (requestFileIds.constructor === String) {
                        if (requestFileIds === f.fileId) {
                            this.removeFile(f.fileId);
                        }
                    } else if (requestFileIds.includes(f.fileId)) {
                        this.removeFile(f.fileId)
                    }
                });
            }, this.uploadType === 'json')
        }

        if (this.removeIndividually) {
            filesToRemove.forEach((f, i) => requestRemove(f.fileId, i === filesToRemove.length - 1));
        } else {
            requestRemove(filesToRemove.map(f => f.fileId), true);
        }
    } else {
        this.removedFiles = this.removedFiles.concat(filesToRemove);
        filesToRemove.forEach(f => this.removeFile(f.fileId));
    }
}

FileFantastic.prototype.removeResponseCallback = function(response, fileIds) {
    fileIds = fileIds.constructor === Array ? fileIds : [fileIds];
    const filesToRemove = this.files.filter(f => fileIds.includes(f.fileId));
    this.removedFiles = this.removedFiles.filter(rf => !fileIds.includes(rf.fileId));
    this.alerts.push({message: 'Successfully removed file' + (this.removeIndividually || filesToRemove.length === 1 ? ' ' : 's ') + filesToRemove.map(f => f.existingUrl.url).join(', '), type: 'success'});
    this.displayAlerts();
}

FileFantastic.prototype.confirmCallback = function(fileId) {
    const file = this.getFileById(fileId);
    return confirm('Are you sure you want to remove file ' + file.name + '?');
}

FileFantastic.prototype.removeFile = function(fileId) {
    const fileIds = this.files.map(f => f.fileId);
    const removedFileIndex = fileIds.indexOf(fileId);
    this.files.splice(removedFileIndex, 1);
    delete this.files[fileId];
    if (this.paging) {
        const totalPages = Math.ceil(this.files.length / this.perPage);
        this.page = this.page > totalPages ? totalPages : this.page;
    }
    this.update();
}

FileFantastic.prototype.displayAlerts = function() {
    if (this.alertCallback) {
        for (let a of this.alerts) {
            this.alertCallback(a);
        }
    }
    this.alerts = [];
}

FileFantastic.prototype.cleanFilename = function(filename, uniqueCounter=1) {
    console.log("Cleaning filename: ", filename)
    const extension = filename.substr(filename.lastIndexOf('.')).toLowerCase().replaceAll(/[^A-Za-z0-9\-]/g, '');
    console.log("extension: ", extension)
    let name = filename.substr(0,filename.lastIndexOf('.'));
    name = name.replaceAll(/\s/g, '-').replaceAll(/[^A-Za-z0-9\-]/g, '').replaceAll(/-+/g,"-").replaceAll(/-+$/g, '');
    console.log("name1: ", name, name.length)
    if (name.length > this.maxFilenameLength) {
        name = name.substr(0, this.maxFilenameLength);
    }
    console.log('name2', name)
    if (!name || uniqueCounter > 1) {
        name += uniqueCounter.toString();
    }
    console.log("unique counter to string: ", uniqueCounter.toString(), uniqueCounter.toString().length)
    const newName = name + (extension ? '.' + extension : '');
    for (let file of this.files) {
        if (file.name === newName) {
            return this.cleanFilename(filename, uniqueCounter+1);
        }
    }
    return newName;
};

FileFantastic.prototype.createInput = function () {
    const input = document.createElement('input');
    input.type = 'file';
    input.id = this.inputId;
    input.name = 'ff-input';
    input.classList.add('ff-input', 'dropify');

    if (this.multiple) {
        input.multiple = true;
    }
    if (this.acceptedFileTypes || this.acceptedExtensions) {
        input.accept = (this.acceptedFileTypes || []).concat(this.acceptedExtensions || []).map(e => '.' + e).join(',');
    }
    return input;
}

FileFantastic.prototype.setInputOnChange = function(ev) {
    this.input.addEventListener('change', () => {
        if (!this.multiple) {
            this.files = {};
        }
    
        const numFiles = this.input.files.length;
        let numTooLarge = 0;
        let numTooMany = 0;
        let numWrongType = 0;
        let numWrongExt = 0;
        
        const filesAdded = [];
        const dataUrlPromises = [];
        for (let i = 0; i < numFiles; i++) {
            if (this.files.length >= this.maxFiles) {
                numTooMany += numFiles - i;
                break;
            }
            const file = this.input.files[i];
            const ext = file.name.split('.').pop().toLowerCase();
    
            if (this.acceptedExtensions && ext && !this.acceptedExtensions.includes(ext)) {
                numWrongExt++;
                continue;
            }
            if (this.acceptedFileTypes && !this.acceptedFileTypes.includes(file.type)) {
                numWrongType++;
                continue;
            }
            if (this.resize) {
                this.resizeImage(file, file => {
                    const fileObject = this.addFile(file);
                    filesAdded.push(fileObject);
                }).then(resizedFile => {
                    if (this.uploadType === 'json') {
                        const dataUrlPromise = this.blobToDataUrl(file, fileObject.fileId).then(value => {
                            const [dataUrl, fileId] = value;
                            fileObject.dataUrl = dataUrl;
                        })
                        dataUrlPromises.push(dataUrlPromise);
                        this.update();
                    }
                });
                continue;
            }
            if (file.size > this.maxFileSize) {
                numTooLarge++;
                continue;
            }
            const fileObject = this.addFile(file);
            filesAdded.push(fileObject);
            if (this.uploadType === 'json') {
                const dataUrlPromise = this.blobToDataUrl(file, fileObject.fileId).then(value => {
                    const [dataUrl, fileId] = value;
                    fileObject.dataUrl = dataUrl;
                })
                dataUrlPromises.push(dataUrlPromise);
            }
        }
        
        if (numWrongExt > 0) {
            this.alerts.push({message: numWrongExt + ' file(s) could not be uploaded because their extensions are not allowed. Allowed file extensions include: ' + this.acceptedExtensions.join(', '), type: 'warning'});
        }
        if (numWrongType > 0) {
            this.alerts.push({message: numWrongType + ' file(s) could not be uploaded because their types are not allowed. Allowed file types include: ' + this.acceptedFileTypes.join(', '), type: 'warning'});
        }
        if (numTooMany > 0) {
            this.alerts.push({message: numTooMany + ' file(s) could not be uploaded because only a maximum of ' + this.maxFiles + ' files may be uploaded', type: 'warning'});
        }
        if (numTooLarge > 0) {
            const maxSizeMB = (this.maxFileSize / 1024 / 1024).toFixed(2) + 'MB';
            this.alerts.push({message: numTooLarge + ' file(s) could not be uploaded because they exceed the maximum file size. Please ensure all files are smaller than ' + maxSizeMB + ' and try again', type: 'warning'});
        }
        this.files.sort(this.sortFilesCallback)
        if (this.paging && filesAdded.length > 0) {
            this.page = this.getPageByFileId(filesAdded[filesAdded.length - 1].fileId); 
        }
        this.input.value = '';
    
        if (this.uploadOnInput && filesAdded.length > 0) {
            if (this.uploadType === 'json') {
                Promise.all(dataUrlPromises).then(values => {
                    this.uploadCallback(filesAdded.map(f => f.fileId));
                })
            } else {
                this.uploadCallback(filesAdded.map(f => f.fileId));
            }
        } else {
            this.update();
        }
    })
}


FileFantastic.prototype.addFile = function(file) {
    const extension = file.name.split('.').pop();
    if (!file.type && this.extensionsToFileTypes[extension]) {
        file.type = this.extensionsToFileTypes[extension];
    }
    const fileObject = {
        file: file,
        size: file.size,
        name: this.cleanFilename(file.name),
        type: file.type,
        fileId: this.generateUID(),
        previewable: (this.previewImages && this.acceptedImagePreviewTypes.includes(file.type)) || 
            (this.previewAudio && this.acceptedAudioPreviewTypes.includes(file.type)) || 
            (this.previewVideo && this.acceptedVideoPreviewTypes.includes(file.type))
    }
    this.files.push(fileObject);
    return fileObject;
}

FileFantastic.prototype.loadExisting = function(existingUrls) {
    for (let existingUrl of existingUrls) {
        const fileObject = this.parseExistingUrlIntoFileObject(existingUrl)
        fileObject && this.files.push(fileObject);
    }
}

FileFantastic.prototype.parseExistingUrlIntoFileObject = function(existingUrl, fileObject=null) {
    if (!(existingUrl.url || (!this.downloadable && !this.previewable && existingUrl.name))) {
        console.error('No URL or name provided for existing file: ', existingUrl);
        return null;
    }
    fileObject = fileObject || {
        fileId: this.generateUID(),
    };
    fileObject.existingUrl = existingUrl;
    fileObject.existing = true;
    if (existingUrl.name) {
        fileObject.name = this.cleanFilename(existingUrl.name);
    } else if (!fileObject.name) {
        fileObject.name = this.cleanFilename(existingUrl.url.split('/').pop());
    }

    const ext = fileObject.name.split('.').pop().toLowerCase();
    fileObject.type = existingUrl.type || fileObject.type || fileObject.file?.type || this.extensionsToFileTypes[ext] || '';
    fileObject.size = existingUrl.size || fileObject.size || fileObject.file?.size || 0;
    fileObject.previewable = (this.previewImages && this.acceptedImagePreviewTypes.includes(fileObject.type)) || 
        (this.previewAudio && this.acceptedAudioPreviewTypes.includes(fileObject.type)) || 
        (this.previewVideo && this.acceptedVideoPreviewTypes.includes(fileObject.type))

    return fileObject;
}

FileFantastic.prototype.dataUrlToBlobSync = function(dataUrl) {
  const byteString = atob(dataUrl.split(',')[1]);
  const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0]
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], {type: mimeString});
  return blob;
}

FileFantastic.prototype.urlToBlobSync = function(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.overrideMimeType('text/plain; charset=x-user-defined');
    xhr.send();
    return new Blob([Uint8Array.from(xhr.response, c => c.charCodeAt(0))]);
}

FileFantastic.prototype.urlToBlob = function(url, extra='') {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = ev => {
            resolve([xhr.response, extra]);
        };
        xhr.onerror = err => {
            console.log("Error converting object URL to blob:  ", err);
            reject([err, url]);
        }
        xhr.send();
    })
}

FileFantastic.prototype.doXhr = function(url, payload, cb, json=false) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    if (json) {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        payload = JSON.stringify(payload);
    }
    xhr.onload = ev => {
        let rawResponse = xhr.responseText;
        let jsonResponse;
        try {
            jsonResponse = JSON.parse(rawResponse);
        } catch (err) {
            console.error("Error parsing XHR JSON response", rawResponse, err);
        }
        cb(jsonResponse ? jsonResponse : rawResponse);
    }
    xhr.onerror = err => {
        console.log("XML http request error", err);
        cb(null);
    }
    xhr.send(payload);
}

FileFantastic.prototype.blobToDataUrlSync = function(blob, fileType=null) {
    if (!fileType && blob instanceof File) {
        fileType = blob.type;
    }
    const objectUrl = this.blobToObjectUrl(blob);
    return this.objectUrlToDataUrlSync(objectUrl, fileType);
}

FileFantastic.prototype.blobToDataUrl = function(blob, fileId) {
    return new Promise((resolve, reject) => {
        const fr = new FileReader();  
        fr.onload = () => {
            resolve([fr.result, fileId]);
        };
        fr.onerror = reject;
        fr.readAsDataURL(blob);
    });
}
FileFantastic.prototype.blobToObjectUrl = function(blob) {
    return (window.URL ? URL : webkitURL).createObjectURL(blob);
}

FileFantastic.prototype.objectUrlToDataUrlSync = function(objectUrl, fileType) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', objectUrl, false);
    xhr.overrideMimeType("text/plain; charset=x-user-defined");
    xhr.send();
    URL.revokeObjectURL(objectUrl);
    let returnText = "";
    for (let i = 0; i < xhr.responseText.length; i++) {
        returnText += String.fromCharCode(xhr.responseText.charCodeAt(i) & 0xff);
    }
    return 'data:' + fileType + ';base64,' + btoa(returnText);
}

FileFantastic.prototype.resizeImage = function (fileId) {
    return new Promise((resolve, reject) => {

        const file = this.getFileById(fileId);
        const fileReader = new FileReader();
        fileReader.onload = ev => {
            const image = new Image();
            image.onload = ev => {
                const canvas = document.createElement('canvas')
                let width = image.width;
                let height = image.height;
                if (width <= this.resizeMaxWidth && height <= this.resizeMaxHeight) {
                    resolve(file);
                    return;
                }
                const widthRatio = width / this.resizeMaxWidth;
                const heightRatio = height / this.resizeMaxHeight;

                if (widthRatio > heightRatio) {
                    height *= this.resizeMaxWidth / width;
                    width = this.resizeMaxWidth;
                } else {
                    width *= this.resizeMaxHeight / height;
                    height = this.resizeMaxHeight;
                }

                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                canvas.toBlob((b) => {
                    const resizedFile = new File([b], file.name, {type: file.type, lastModified:new Date().getTime()}, 'utf-8');
                    resolve(resizedFile);
                }, file.type, 0.9);
            };
            image.onerror = function() {
                reject('Error loading image');
            };
            image.src = fileReader.result;
        };
        
        fileReader.onerror = function() {
            reject('Error reading file');
        };
        fileReader.readAsDataURL(file.file);
    });
};

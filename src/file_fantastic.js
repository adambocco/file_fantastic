
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
            mdi: 'mdi-image-edit',
            mi: 'mode_edit',
            fa: 'fa-pen-to-square',
            text: 'Edit',
        },
        crop: {
            mdi: 'mdi-image-crop',
            mi: 'crop',
            fa: 'fa-crop',
            text: 'Crop'
        },
        copy: {
            mdi: 'mdi-content-content-copy',
            mi: 'file_copy',
            fa: 'fa-copy',
            text: 'Copy',
        },
        download: {
            mdi: 'mdi-file-file-download',
            mi: 'file_download',
            fa: 'fa-download',
            text: 'Download',
        },
        close: {
            mdi: 'mdi-navigation-close',
            mi: 'close',
            fa: 'fa-xmark',
            text: 'Close',
        },
        remove: {
            mdi: 'mdi-action-delete',
            mi: 'delete',
            fa: 'fa-trash-can',
            text: 'Remove',
        },
        save: {
            mdi: 'mdi-navigation-check',
            mi: 'done',
            fa: 'fa-check',
            text: 'Done',
        },
        undo: {
            mdi: 'mdi-content-undo',
            mi: 'undo',
            fa: 'fa-trash-arrow-up',
            text: 'Undo',
        },
        zoomOut: {
            mdi: 'mdi-content-add',
            mi: 'zoom_out',
            fa: 'fa-search-minus',
            text: 'Zoom Out',
        },
        zoomIn: {
            mdi: 'mdi-content-remove',
            mi: 'zoom_in',
            fa: 'fa-search-plus',
            text: 'Zoom Out',
        },
        rotateRight: {
            mdi: 'mdi-image-rotate-right',
            mi: 'rotate_right',
            fa: 'fa-rotate-right',
            text: 'Rotate Clockwise',
        },
        rotateLeft: {
            mdi: 'mdi-image-rotate-right',
            mi: 'rotate_left',
            fa: 'fa-rotate-left',
            text: 'Rotate Counter-Clockwise',
        },
        moveLeft: {
            mdi: 'mdi-hardware-keyboard-arrow-left',
            mi: 'west',
            fa: 'fa-arrow-left',
            text: 'Move Left',
        },
        moveRight: {
            mdi: 'mdi-hardware-keyboard-arrow-right',
            mi: 'east',
            fa: 'fa-arrow-right',
            text: 'Move Right',
        },
        moveUp: {
            mdi: 'mdi-hardware-keyboard-arrow-up',
            mi: 'north',
            fa: 'fa-arrow-up',
            text: 'Move Up',
        },
        moveDown: {
            mdi: 'mdi-hardware-keyboard-arrow-down',
            mi: 'south',
            fa: 'fa-arrow-down',
            text: 'Move Down',
        },
        leftChevron: {
            mdi: 'mdi-hardware-keyboard-arrow-left',
            mi: 'chevron_left',
            fa: 'fa-chevron-left',
            text: '<',
        },
        leftAngles: {
            mdi: '',
            mi: '',
            fa: 'fa-angles-left',
            text: '&laquo;',
        },
        rightChevron: {
            mdi: 'mdi-hardware-keyboard-arrow-right',
            mi: 'chevron_right',
            fa: 'fa-chevron-right',
            text: '>',
        },
        rightAngles: {
            mdi: '',
            mi: '',
            fa: 'fa-angles-right',
            text: '&raquo;',
        },
        changeDirectory: {
            mdi: '',
            mi: '',
            fa: 'fa-folder-open',
            text: 'Open'
        },
        createDirectory: {
            mdi: '',
            mi: '',
            fa: 'fa-folder-plus',
            text: 'New Folder'
        }
    };

    this.iconType = ['mdi', 'mi', 'fa', 'text'].includes(params.iconType) ? params.iconType : 'text';
    this.includeIconText = params.includeIconText === undefined ? false : params.includeIconText;
    this.files = [];
    this.id = params.id === undefined ? 'ff_files' : params.id;
    this.multiple = params.multiple === undefined ? false : params.multiple;
    this.payloadType = ['json', 'formData'].includes(params.payloadType) ? params.payloadType : 'json';
    this.uploadUrl = params.uploadUrl === undefined ? '/' : params.uploadUrl;
    this.uploadIndividually = params.uploadIndividually === undefined ? !this.multiple : params.uploadIndividually;
    this.saveUrl = params.saveUrl === undefined ? '/' : params.saveUrl;
    this.saveOnInput = params.saveOnInput === undefined ? true : params.saveOnInput;

    this.previewable = params.previewable === undefined ? (params.previewImages || params.previewAudio || params.previewVideo) : params.previewable;
    
    this.acceptedImagePreviewTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/bmp', 'image/webp'];
    this.previewImages = params.previewImages === undefined ? this.previewable : params.previewImages;

    this.acceptedAudioPreviewTypes = ['audio/ogg', 'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/mp4', 'audio/webm', 'audio/flac'];
    this.previewAudio = params.previewAudio === undefined ? this.previewable : params.previewAudio;

    this.acceptedVideoPreviewTypes = ['video/mp4', 'video/ogg', 'video/webm'];
    this.previewVideo = params.previewVideo === undefined ? this.previewable : params.previewVideo;

    this.copyable = params.copyable === undefined ? this.multiple : params.copyable;
    this.downloadable = params.downloadable === undefined ? true : params.downloadable;
    this.showFilename = params.showFilename === undefined ? true : params.showFilename;
    this.removable = params.removable === undefined ? true : params.removable === undefined;
    this.removeUrl = params.removeUrl === undefined ? '/' : params.removeUrl;
    this.removedFiles = [];
    this.removeIndividually = params.removeIndividually === undefined ? true : params.removeIndividually;
    this.removeOnClick = params.removeOnClick === undefined ? false : params.removeOnClick;

    this.resizeImages = params.resizeImages || false;
    this.resizeMaxWidth = params.resizeMaxWidth || 1632;
    this.resizeMaxHeight = params.resizeMaxHeight || 1224;

    this.dropify = params.dropify === undefined ? true : params.dropify;

    this.eventCallback = params.eventCallback || null;
    this.loadingCallback = params.loadingCallback || null;
    this.progressCallback = params.progressCallback || null;
    this.sortCallback = params.sortCallback || null;

    this.acceptedFileTypes = null;
    if (params.acceptedFileTypes) {
        this.acceptedFileTypes = params.acceptedFileTypes.constructor === String ? params.acceptedFileTypes.split(',').map(e => e.trim().toLowerCase()) : params.acceptedFileTypes;
    }
    this.acceptedExtensions = null;
    if (params.acceptedExtensions) {
        this.acceptedExtensions = params.acceptedExtensions.constructor === String ? params.acceptedExtensions.split(',').map(e => e.replace('.', '').trim().toLowerCase()) : params.acceptedExtensions;
    }

    this.input = this.createInput();

    this.inputButton = null;
    this.inputText = '';
    if (this.dropify) {
        this.inputText = params.inputText === undefined ? 'Drag and drop files here or click to select files' : params.inputText;
        this.inputButton = this.createDropify();
    } else if (params.inputButton) {
        this.inputButton = params.inputButton.constructor === String ? document.getElementById(params.inputButton) : params.inputButton;
    } else {
        this.inputText = params.inputText === undefined ? 'Browse' : params.inputText;
        this.inputButton = this.createInputButton();
    }
    this.inputButton.addEventListener('click', ev => { this.input.click() });

    if (params.inputContainer) {
        params.inputContainer = params.inputContainer.constructor === String ? document.getElementById(params.inputContainer) : params.inputContainer;
        params.inputContainer.append(this.inputButton);
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
            this.existingUrls = params.existingUrls.map(url => { return url.constructor === String ? { url: url } : url })
        } else {
            this.existingUrls = params.existingUrls;
        }
    }
    this.loadExistingFiles(this.existingUrls);
    this.input.addEventListener('change', () => {
        this.fileInputCallback();
    })

    // Plugins
    if (this.initCropper !== undefined && params.cropper) {
        this.initCropper(params.cropper);
    }
    if (this.initPaging !== undefined && params.paging && this.multiple) {
        this.initPaging(params.paging);
    }
    if (this.initDirectories !== undefined && params.directories && this.multiple) {
        this.initDirectories(params.directories);
    }
    if (this.initDebug !== undefined && params.debug) {
        this.initDebug(params.debug);
    }

    this.update();
}

FileFantastic.prototype.getDataUrlSize = function (dataUrl) {
    const contentWithoutMime = dataUrl.split(',')[1];
    return window.atob(contentWithoutMime).length;
}

FileFantastic.prototype.fileSizeToHumanReadable = function (bytes, si = false, dp = 2) {
    const thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    const units = si ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
    return bytes.toFixed(dp) + ' ' + units[u];
}

FileFantastic.prototype.getFileById = function (id) {
    const i = this.files.map(f => f.id).indexOf(id);
    return this.files[i];
}

FileFantastic.prototype.createInputButton = function () {
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('ff-input-button');
    button.id = 'ff-input-button-' + this.id;
    button.append(this.inputText);
    return button;
}

FileFantastic.prototype.generateUID = function () {
    let firstPart = (Math.random() * 46656) | 0;
    let secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}

FileFantastic.prototype.update = function () {
    let entities = this.getEntities();
    if (this.paging) {
        const totalPages = Math.ceil(entities.length / this.perPage);
        if (this.page < 1) {
            this.page = 1;
        }
        if (this.page > totalPages) {
            this.page = totalPages;
        }
    }

    let displaySelector = '.ff-file-container-' + this.id;
    if (this.displayDirectories) {
        displaySelector += ', .ff-directory-container-' + this.id;
    }
    let displayContainers = document.querySelectorAll(displaySelector);
    for (let displayContainer of displayContainers) {
        const id = displayContainer.dataset.id;
        if (!this.getFileById(id) && !this.getDirectoryById(id)) {
            displayContainer.remove();
        } else if (this.paging) {
            this.toggleDisplayed(displayContainer, false);
        }
    }

    entities = this.paging ? this.getCurrentPage() : entities;

    for (let entity of entities) {
        let display = this.displayCallback(entity.id);
        this.displayContainer.append(display);
        if (this.paging) {
            this.toggleDisplayed(display, true);
        }
    }
    if (this.paging) {
        this.updatePagingContainer();
    }
    if (this.debug) {
        this.updateDebugContainer();
    }
    if (this.directories) {
        this.updateDirectoriesContainer();
    }
}

FileFantastic.prototype.getEntities = function (key, dark=false) {
    let entities = this.files;
    if (this.displayDirectories) {
        entities = entities.concat(this.directories);
    }
    if (this.sortCallback) {
        entities.sort(this.sortCallback);
    }
    return entities;
}

FileFantastic.prototype.getIcon = function (key, dark=false) {
    const icon = document.createElement('div');
    icon.classList.add('ff-icon');
    
    if (dark) {
        icon.classList.add('ff-icon-dark');
    }
    if (!this.icons[key] && key.indexOf(':') === -1) {
        console.error('Icon does not exist: "' + key + '" for icon type "' + this.iconType + '"');
        icon.append(key.charAt(0).toUpperCase() + key.slice(1));
        return icon;
    }
    if (this.iconType === 'text') {
        icon.append(this.icons[key].text);
    } else if (key.indexOf(':') !== -1 || key === NaN) {
        if (key === '0:0' || key === NaN) {
            key = 'Free';
        }
        icon.append(key);
    } else {
        icon.classList.add(this.icons[key][this.iconType]);
        if (this.iconType === 'fa') {
            icon.classList.add('fa');
        } else if (this.iconType === 'mi') {
            icon.classList.add('material-icons');
            icon.innerHTML = this.icons[key][this.iconType];
        }

        if (this.includeIconText && !['leftChevron', 'rightChevron', 'leftAngles', 'rightAngles'].includes(key)) {
            const iconWrapper = document.createElement('div');
            iconWrapper.classList.add('ff-icon-wrapper');
            const iconText = document.createElement('div');
            iconText.classList.add('ff-icon-text');
            iconText.innerHTML = this.icons[key].text;
            iconWrapper.append(icon, iconText);
            return iconWrapper;
        }
    }
    return icon;
}

FileFantastic.prototype.toggleDisplayed = function (id, displayed=null) {
    const el = id.constructor === String ? document.getElementById(id) : id;
    if (el) {
        if (displayed === null) {
            el.style.display = el.style.display === 'none' ? '' : 'none';
        } else {
            el.style.display = displayed ? '' : 'none';
        }
    }
}

FileFantastic.prototype.createVideoPreview = function (id) {
    const file = this.getFileById(id);
    const video = document.createElement('video');
    video.id = 'ff-video-' + id;
    video.classList.add('ff-video');
    video.controls = true;
    const source = document.createElement('source');
    source.src = this.getPreviewUrl(id);;
    source.type = file.type;
    source.onload = ev => { source.classList.remove('ff-loading'); }
    source.onerror = err => { source.classList.remove('ff-loading'); }
    video.append(source);
    file.previewElement = video;
    return video;
}

FileFantastic.prototype.createAudioPreview = function (id) {
    const file = this.getFileById(id);
    const audio = document.createElement('audio');
    audio.id = 'ff-audio-' + id;
    audio.classList.add('ff-audio', 'ff-loading');
    audio.controls = true;
    audio.onloadeddata = ev => { audio.classList.remove('ff-loading'); }
    audio.onerror = err => { audio.classList.remove('ff-loading'); }
    audio.src = this.getPreviewUrl(id);
    file.previewElement = audio;
    return audio;
}

FileFantastic.prototype.createImgPreview = function (id) {
    const file = this.getFileById(id);
    const img = new Image();
    img.id = 'ff-img-' + id;
    img.classList.add('ff-img', 'ff-loading');
    img.onload = ev => { img.classList.remove('ff-loading'); }
    img.onerror = err => { img.classList.remove('ff-loading'); }
    file.previewElement = img;
    img.addEventListener('click', ev => {
        this.handleEvent('imageClicked', { file: file });
    })
    img.src = this.getPreviewUrl(id);
    return img;
}

FileFantastic.prototype.getPreviewUrl = function (id) {
    const file = this.getFileById(id);
    let previewUrl = file.dataUrl || file.objectUrl || file.existingUrl?.url || '';
    if (!previewUrl && file.file) {
        file.objectUrl = this.blobToObjectUrl(file.file);
        previewUrl = file.objectUrl;
    }
    return previewUrl;
}

FileFantastic.prototype.createFilenamePreview = function (id) {
    const file = this.getFileById(id);
    const container = document.createElement('div');
    container.classList.add('ff-filename-preview-container');
    container.id = 'ff-filename-preview-container-' + id;

    const div = document.createElement('div');
    div.classList.add('ff-filename-preview');

    div.id = 'ff-filename-preview-' + id;
    div.append(file.name);
    container.append(div);
    return container;
}

FileFantastic.prototype.copyFile = function (id, upload = false) {
    const srcFileObject = this.getFileById(id);
    upload = upload || this.saveOnInput;
    if (this.files.length + 1 > this.maxFiles) {
        this.handleEvent(
            'fileCopyFailed',
            { file: srcFileObject },
            `The file ${srcFileObject.name} could not be copied because only a maximum of ${this.maxFiles} files may be uploaded`,
            'warning'
        );
        return;
    }

    let srcFile = [];
    if (srcFileObject.file) {
        srcFile = new Promise(resolve => { resolve([srcFileObject.file, '']) });
    } else {
        srcFile = this.urlToBlob(srcFileObject.dataUrl || srcFileObject.objectUrl || srcFileObject.existingUrl?.url)
    }
    srcFile.then(values => {
        const [blob] = values;
        const newFile = new File([blob], srcFileObject.name, { type: srcFileObject.type, lastModified: new Date().getTime() });
        const newFileObject = this.addFile(newFile);
        newFileObject.copied = true;
        newFileObject.copiedFromFileId = srcFileObject.id;
        let copyUploaded = false;
        if (this.payloadType === 'json') {
            if (srcFile.dataUrl) {
                newFileObject.dataUrl = srcFile.dataUrl;
            } else {
                copyUploaded = true;
                this.blobToDataUrl(newFile, newFileObject.id).then(value => {
                    const [dataUrl, id] = value;
                    newFileObject.dataUrl = dataUrl;
                    if (upload) {
                        this.upload(newFileObject.id);
                    }
                })
            }
        }

        if (upload && !copyUploaded) {
            this.upload(newFileObject.id);
        }
        this.update();
    })
}

FileFantastic.prototype.createCopyButton = function (id) {
    const div = document.createElement('div');
    div.classList.add('ff-control-button', 'ff-copy-file-button');
    div.id = 'ff-copy-file-button-' + id;
    div.append(this.getIcon('copy'));
    div.addEventListener('click', ev => {
        this.copyFile(id);
    })
    return div;
}

FileFantastic.prototype.createDownloadFileButton = function (id) {
    const div = document.createElement('div');
    div.classList.add('ff-control-button', 'ff-download-file-button');
    div.id = 'ff-download-file-button-' + id;
    div.append(this.getIcon('download'));
    div.addEventListener('click', ev => { this.downloadFile(id) })
    return div;
}

FileFantastic.prototype.createFileDisplay = function (id) {
    const file = this.getFileById(id);
    const container = this.createFileDisplayContainer(id);
    if (file.previewable) {
        if (this.previewImages && this.acceptedImagePreviewTypes.includes(file.type)) {
            container.classList.add('ff-img-preview-container');
            container.append(this.createImgPreview(id));
        } else if (this.previewAudio && this.acceptedAudioPreviewTypes.includes(file.type)) {
            container.classList.add('ff-audio-preview-container');
            container.append(this.createAudioPreview(id));
        } else if (this.previewVideo && this.acceptedVideoPreviewTypes.includes(file.type)) {
            container.classList.add('ff-video-preview-container');
            container.append(this.createVideoPreview(id));
        }
        if (this.showFilename) {
            container.append(this.createFilenamePreview(id));
        }
    } else {
        container.append(this.createFilenamePreview(id));
    }
    return container;
}

FileFantastic.prototype.createFileDisplayContainer = function (id) {
    const container = document.createElement('div');
    container.classList.add('ff-file-preview-container');
    container.id = 'ff-file-preview-container-' + id;
    container.dataset.id = id;
    return container;
}

FileFantastic.prototype.createDisplayContainer = function () {
    const container = document.createElement('div');
    container.classList.add('ff-display-container');
    container.id = 'ff-display-container-' + this.id;
    return container;
}

FileFantastic.prototype.displayCallback = function (id) {
    let entity = this.getFileById(id) || this.getDirectoryById(id);
    
    if (entity.previewable && !entity.existingUrl?.url && !entity.objectUrl && entity.file) {
        entity.objectUrl = this.blobToObjectUrl(entity.file);
    }

    if (!entity.container) {
        if (entity.isFile) {
            entity.container = this.createFileContainer(id);
            entity.container.append(this.createFileDisplay(id))
            const buttons = [];
            if (this.downloadable) {
                buttons.push(this.createDownloadFileButton(id));
            }
            if (this.acceptedImagePreviewTypes.includes(entity.type) && this.croppable && entity.previewable) {
                buttons.push(this.createOpenCropperButton(id));
            }
            if (this.copyable) {
                buttons.push(this.createCopyButton(id));
            }
            if (this.removable || !entity.existing) {
                buttons.push(this.createRemoveButton(id));
            }
            if (buttons.length > 0) {
                const controlContainer = this.createFileControlContainer();
                controlContainer.append(...buttons);
                entity.container.append(controlContainer);
            }
        } else if (entity.isDirectory) {
            entity.container = this.createDirectoryDisplay(id);
        }
    }
    if (this.debug) {
        entity.container.append(this.createFileDebugContainer(id))
    }
    return entity.container;
}

FileFantastic.prototype.createFileControlContainer = function (id) {
    const container = document.createElement('div');
    container.classList.add('ff-file-control-container');
    container.id = 'ff-file-control-container-' + this.id;
    return container;
}

FileFantastic.prototype.createFileContainer = function (id) {
    const file = this.getFileById(id);
    const container = document.createElement('div');
    container.classList.add('ff-file-container', 'ff-file-container-' + this.id);
    this.previewImages && this.acceptedImagePreviewTypes.includes(file.type) && container.classList.add('ff-img-container');
    this.previewAudio && this.acceptedAudioPreviewTypes.includes(file.type) && container.classList.add('ff-audio-container');
    this.previewVideo && this.acceptedVideoPreviewTypes.includes(file.type) && container.classList.add('ff-video-container');
    container.id = 'ff-file-container-' + id;
    container.dataset.id = id;
    return container;
}

FileFantastic.prototype.downloadFile = function (id) {
    const file = this.getFileById(id);
    const href = this.getPreviewUrl(id);
    const filename = file.name;
    const link = document.createElement("a");
    link.download = filename;
    link.href = href;
    document.body.append(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

FileFantastic.prototype.upload = function (ids = null, triggerEvent = true, forceAll = false, handleResponse = true) {
    let uploadFiles = this.getFilesToUpload(ids, forceAll);
    if (uploadFiles.length === 0) {
        if (triggerEvent) {
            this.handleEvent(
                'noFilesToUpload',
                null,
                'No files to upload',
                'warning'
            );
        }
        return [];
    }
    const uploadFileIds = uploadFiles.map(f => f.id);
    this.loadingCallback(true);

    if (this.uploadIndividually) {
        const totalSize = uploadFiles.reduce((size, file) => size + file.size, 0);
        const totalIndex = uploadFiles.length;
        let runningSize = 0;
        let runningIndex = 0;
        this.progressCallback(runningIndex, totalIndex, runningSize, totalSize);
        const uploadPromises = [];
        for (let i = 0; i < uploadFiles.length; i++) {
            const file = uploadFiles[i];
            const payload = this.getUploadPayload(file.id, true, true, forceAll);
            uploadPromises.push(this.doXhr(this.uploadUrl, payload, this.payloadType === 'json').then(uploadResponse => {
                runningSize += file.size;
                runningIndex++;
                this.progressCallback(runningIndex, totalIndex, runningSize, totalSize);
                if (runningIndex >= totalIndex) {
                    this.loadingCallback(false);
                }
                return [uploadResponse, file.id];
            }))
        }
        if (handleResponse) {
            Promise.all(uploadPromises).then(uploadResponse => {
                uploadResponse = uploadResponse.map(u => u[0]);
                this.handleSaveResponse({ uploadResponse: uploadResponse, removeResponse: [] }, uploadFileIds, []);
            })
        }
        return uploadPromises;
    } else {
        const payload = this.getUploadPayload(ids, true, true, forceAll);
        const uploadPromises = [this.doXhr(this.uploadUrl, payload, this.payloadType === 'json').then(uploadResponse => {
            this.loadingCallback(false);
            return [uploadResponse, uploadFiles.map(f => f.id)];
        })];
        if (handleResponse) {
            Promise.all(uploadPromises).then(uploadResponse => {
                uploadResponse = uploadResponse.map(u => u[0]);
                if (uploadResponse?.constructor === Array) {
                    uploadResponse = uploadResponse[0];
                }
                this.handleSaveResponse({ uploadResponse: uploadResponse, removeResponse: [] }, uploadFileIds, []);
            })
        }
        return uploadPromises;
    }
}

FileFantastic.prototype.handleUploadResponse = function (response, uploadFileIds) {
    uploadFileIds = uploadFileIds?.constructor === String ? [uploadFileIds] : uploadFileIds;
    response = response.constructor !== Array ? [response] : response;

    const uploadedFiles = [];
    for (let fileResponse of response) {
        const id = fileResponse?.id || (uploadFileIds.length === 1 ? uploadFileIds[0] : null);
        if (!fileResponse || !id) {
            console.error('Upload response missing file ID or existing URL', 'Response:', response, 'File Ids:', uploadFileIds);
            continue;
        }

        const file = this.getFileById(id);
        if (fileResponse.url || fileResponse.constructor === String) {
            const existingUrl = fileResponse.constructor === String ? { url: fileResponse } : fileResponse;
            file.name = null;
            file.fileModified = false;
            this.parseExistingUrlIntoFileObject(existingUrl, file);
            uploadedFiles.push(file);
        }
    }
    const uploadedFileIds = uploadedFiles.map(f => f.id);
    const failedFileIds = uploadFileIds.filter(fId => !uploadedFileIds.includes(fId));
    const failedFiles = this.files.filter(f => failedFileIds.includes(f.id));
    return [uploadedFiles, failedFiles];
}

FileFantastic.prototype.handleSaveResponse = function (response, uploadFileIds = [], removeFileIds = []) {
    const singleUpload = uploadFileIds.constructor !== Array;
    const singleRemoval = removeFileIds.constructor !== Array;
    uploadFileIds = singleUpload ? [uploadFileIds] : uploadFileIds;
    removeFileIds = singleRemoval ? [removeFileIds] : removeFileIds;

    const replaceFileIds = uploadFileIds.filter(uId => removeFileIds.includes(uId));
    let removedFiles = [];
    let failedRemovedFiles = [];
    let uploadedFiles = [];
    let failedUploadedFiles = [];
    if (removeFileIds.length > 0) {
        const removeResponse = response?.removeResponse ? response.removeResponse : response;
        const r = this.handleRemoveResponse(removeResponse, removeFileIds, replaceFileIds);
        removedFiles = r[0];
        failedRemovedFiles = r[1];
    }
    if (uploadFileIds.length > 0) {
        const uploadResponse = response?.uploadResponse ? response.uploadResponse : response;
        const r = this.handleUploadResponse(uploadResponse, uploadFileIds);
        uploadedFiles = r[0];
        failedUploadedFiles = r[1];
    }
    const uploadedFileIds = uploadedFiles.map(f => f.id);
    const removedFileIds = removedFiles.map(r => r.id);

    const replacedFileIds = replaceFileIds.filter(rId => uploadedFileIds.includes(rId) && removedFileIds.includes(rId));
    const replacedFiles = uploadedFiles.filter(u => replacedFileIds.includes(u.id));
    uploadedFiles = uploadedFiles.filter(u => !replacedFileIds.includes(u.id));
    removedFiles = removedFiles.filter(r => !replacedFileIds.includes(r.id));


    if (failedRemovedFiles.length > 0) {
        const failedRemovedFilesHtml = this.commaSeparatedList(failedRemovedFiles.map(f => this.directories ? (this.directory + f.name) : f.name));
        this.handleEvent(
            'fileRemoveFailed',
            { response: response, files: failedRemovedFiles },
            `Failed to remove ${failedRemovedFiles.length} file${failedRemovedFiles.length === 1 ? '' : 's'}:<br>${failedRemovedFilesHtml}`,
            'danger'
        );
    }
    if (removedFiles.length > 0) {
        const removedFilesHtml = this.commaSeparatedList(removedFiles.map(f => this.directories ? (this.directory + f.name) : f.name));
        this.handleEvent(
            'filesRemoved',
            { response: response, files: removedFiles },
            `Successfully removed ${removedFiles.length} file${removedFiles.length === 1 ? '' : 's'}:<br>${removedFilesHtml}`,
            'success'
        );
    }
    if (failedUploadedFiles.length > 0) {
        const failedUploadedFilesHtml = this.commaSeparatedList(failedUploadedFiles.map(f => this.directories ? (this.directory + f.name) : f.name));
        this.handleEvent(
            'fileUploadFailed',
            { response: response, files: failedUploadedFiles },
            `Failed to upload ${failedUploadedFiles.length} file${failedUploadedFiles.length === 1 ? '' : 's'}:<br>${failedUploadedFilesHtml}.`,
            'danger'
        );
    }
    if (uploadedFiles.length > 0) {
        const uploadedFilesHtml = this.commaSeparatedList(uploadedFiles.map(f => this.directories ? (this.directory + f.name) : f.name));
        this.handleEvent(
            'filesUploaded',
            { response: response, files: uploadedFiles },
            `Successfully uploaded ${uploadedFiles.length} file${uploadedFiles.length === 1 ? '' : 's'}:<br>${uploadedFilesHtml}`,
            'success'
        );
    }
    if (replacedFiles.length > 0) {
        const replacedFilesHtml = this.commaSeparatedList(replacedFiles.map(f => this.directories ? (this.directory + f.name) : f.name));
        this.handleEvent(
            'filesReplaced',
            { response: response, replacedFiles: replacedFiles },
            `Successfully replaced ${replacedFiles.length} file${replacedFiles.length === 1 ? '' : 's'}:<br>${replacedFilesHtml}`,
            'success'
        );
    }
    this.loadingCallback(false);
    this.update();
}

FileFantastic.prototype.save = function (uploadFileIds=null, removeFileIds=null, triggerEvent=true) {
    let filesToUpload = this.getFilesToUpload(uploadFileIds);
    if (!removeFileIds) {
        removeFileIds = this.removedFiles.map(r => r.id);
    }
    let filesToRemove = this.getFilesToRemove(removeFileIds);

    uploadFileIds = filesToUpload.map(f => f.id);
    removeFileIds = filesToRemove.map(f => f.id);
    if (triggerEvent && filesToUpload.length === 0 && filesToRemove.length === 0) {
        this.handleEvent(
            'noFilesToSave',
            {},
            'No files to save',
            'warning'
        );
        return;
    }

    this.loadingCallback(true);
    if (!this.uploadIndividually && !this.removeIndividually) {
        return this.doXhr(this.saveUrl, this.getSavePayload(uploadFileIds, removeFileIds), this.payloadType === 'json').then(response => {
            this.handleSaveResponse(response, uploadFileIds, removeFileIds);
            this.loadingCallback(false);
        })
    } else {
        let removePromises = [];
        if (filesToRemove.length > 0) {
            removePromises = this.remove(removeFileIds, false, false, false, false);
        }
        Promise.all(removePromises).then(removeResponse => {
            removeResponse = removeResponse.map(r => r[0] && r[0].constructor === Array ? r[0] : [r[0]]).flat(1);

            let uploadPromises = [];
            if (filesToUpload.length > 0) {
                uploadPromises = this.upload(uploadFileIds, false, false, false);
            }
            Promise.all(uploadPromises).then(uploadResponse => {
                uploadResponse = uploadResponse.map(u => u[0]);
                if (!this.uploadIndividually && uploadResponse?.constructor === Array) {
                    uploadResponse = uploadResponse[0];
                }
                this.handleSaveResponse({ uploadResponse: uploadResponse, removeResponse: removeResponse }, uploadFileIds, removeFileIds);
            })
        })
    }
}

FileFantastic.prototype.getSavePayload = function (uploadFileIds = null, removeFileIds = null, forceAll = false) {
    const savePayload = this.payloadType === 'json' ? {} : new FormData();

    if (this.payloadType === 'json') {
        const uploadPayload = this.getUploadPayload(uploadFileIds, true, true, forceAll);
        this.addToPayload(savePayload, 'files', uploadPayload);
    } else {
        const uploadPayloadData = this.getUploadPayload(uploadFileIds, true, false, forceAll);
        const uploadPayloadFiles = this.getUploadPayload(uploadFileIds, false, true, forceAll);
        if (uploadPayloadFiles) {
            Array.from(uploadPayloadFiles.entries()).forEach(f => savePayload.append(f[0], f[1], f[1].name));
        }
        this.addToPayload(savePayload, 'files', uploadPayloadData);
    }
    const removePayload = this.getRemovePayload(removeFileIds, forceAll);
    this.addToPayload(savePayload, 'removedFiles', removePayload);
    return savePayload;
}

FileFantastic.prototype.addToPayload = function (payload, key, value, index = null, filename = null, formDataWrapper = '') {
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
                        this.addToPayload(payload, subKey, subValue, index, filename, '');
                    }
                } else {
                    for (let subKey in value) {
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

FileFantastic.prototype.getFilesToUpload = function (ids = null, forceAll = false) {
    let filesToUpload = this.files;
    if (ids) {
        filesToUpload = ids.constructor === Array ? this.files.filter(v => ids.includes(v.id)) : [this.getFileById(ids)];
    }
    if (forceAll) {
        return filesToUpload;
    } else {
        return filesToUpload.filter(file => {
            return !file.existing || file.fileModified;
        })
    }
}

FileFantastic.prototype.getUploadPayload = function (ids = null, addData = true, addFiles = true, forceAll = false) {
    const filesToUpload = this.getFilesToUpload(ids, forceAll);
    const individual = ids?.constructor === String;

    let payload = this.payloadType === 'json' ? (individual ? {} : Array(filesToUpload.length)) : new FormData();

    let payloadIndex = individual ? null : 0;
    for (let i = 0; i < filesToUpload.length; i++) {
        let file = filesToUpload[i];
        if (addData) {
            if (file.directory) {
                this.addToPayload(payload, 'directory', file.directory, payloadIndex)
            }
            this.addToPayload(payload, 'id', file.id, payloadIndex);
            this.addToPayload(payload, 'name', file.name, payloadIndex);

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
        }
        if (addFiles) {
            if (!file.existing || file.fileModified) {
                if (this.payloadType === 'json') {
                    this.addToPayload(payload, 'dataUrl', file.dataUrl, payloadIndex);
                } else {
                    this.addToPayload(payload, this.id, file.file, payloadIndex, file.name);
                }
            }
        }
        payloadIndex = individual ? null : (payloadIndex + 1);
    }

    return payload;
}

FileFantastic.prototype.createRemoveButton = function (id) {
    const removeButton = document.createElement('div');
    removeButton.classList.add('ff-control-button', 'ff-remove-file-button');
    removeButton.id = 'ff-remove-file-button-' + id;
    removeButton.addEventListener('click', ev => {
        const removePromises = this.remove(id, !this.removeOnClick, true, true);

        Promise.all(removePromises).then(response => {
            const removeResponse = response.map(r => r[0]);
            const removeFileIds = response.map(r => r[1]);
            this.handleSaveResponse(removeResponse, [], removeFileIds);
        })

    })
    removeButton.append(this.getIcon('remove'));
    return removeButton;
}

FileFantastic.prototype.getRemovePayload = function (ids = null, forceAll = false) {
    let files = this.removedFiles;
    if (forceAll) {
        files = files.concat(this.files);
    }

    const individual = ids?.constructor === String;
    ids = individual ? [ids] : ids;
    const removedFiles = files.filter(rf => ids === null || ids.includes(rf.id));
    if (removedFiles.filter(f => f.existingUrl).length === 0) {
        return null;
    }
    const payload = this.payloadType === 'json' ? (individual ? {} : Array(removedFiles.length)) : new FormData();
    for (let i = 0; i < removedFiles.length; i++) {
        const removedFile = removedFiles[i];
        Object.entries(removedFile.existingUrl).forEach(e => {
            this.addToPayload(payload, e[0], e[1], individual ? null : i);
        })
        this.addToPayload(payload, 'id', removedFile.id, individual ? null : i);
    }
    return payload;
}

FileFantastic.prototype.removeFile = function (id) {
    const allFileIds = this.files.map(f => f.id);
    const removedFileIndex = allFileIds.indexOf(id);
    this.files.splice(removedFileIndex, 1);
}

FileFantastic.prototype.remove = function (ids = null, softRemove = false, triggerEvent = true, forceAll = false, handleResponse = true) {
    let removeFiles = this.getFilesToRemove(ids, forceAll);

    if (removeFiles.length === 0) {
        if (triggerEvent) {
            this.handleEvent(
                'noFilesToRemove',
                null,
                'No files to remove',
                'warning'
            );
        }
        return [];
    }
    const existingFilesToRemove = [];

    for (let i = 0; i < removeFiles.length; i++) {
        const file = removeFiles[i];
        if (file.existing) {
            existingFilesToRemove.push(file);
        } else {
            this.removeFile(file.id);
        }
    }
    removeFiles = existingFilesToRemove;
    this.update();
    if (removeFiles.length === 0) {
        return [];
    };

    if (softRemove) {
        removeFiles.forEach(f => {
            this.removedFiles.push(f);
            this.removeFile(f.id);
        });
        this.update();
        return [];
    } else {
        const removeFileIds = removeFiles.map(f => f.id);
        const removePromises = [];
        this.loadingCallback(true);
        if (this.removeIndividually) {
            for (let i = 0; i < removeFileIds.length; i++) {
                const fId = removeFileIds[i];
                removePromises.push(this.sendRemoveRequest(fId, i === removeFileIds.length - 1));
            }
        } else {
            removePromises.push(this.sendRemoveRequest(removeFileIds, true));
        }
        if (handleResponse) {
            Promise.all(removePromises).then(removeResponse => {
                removeResponse = removeResponse.map(r => r[0] && r[0].constructor === Array ? r[0] : [r[0]]).flat(1);
                this.handleSaveResponse({ uploadResponse: [], removeResponse: removeResponse }, [], removeFileIds);
            })
        }
        return removePromises;
    }
}

FileFantastic.prototype.sendRemoveRequest = function (removeFileIds, last) {
    let payload = this.getRemovePayload(removeFileIds, true);
    return this.doXhr(this.removeUrl, payload, this.payloadType === 'json').then(response => {
        if (last) {
            this.loadingCallback(false);
        }
        return [response, removeFileIds];
    })
}

FileFantastic.prototype.getFilesToRemove = function (removeFileIds, forceAll = false) {
    const allFiles = this.files.concat(this.removedFiles);
    const removedFileIds = this.removedFiles.map(r => r.id);
    let filesToRemove = [];
    for (let file of allFiles) {
        if (!forceAll && !removedFileIds.includes(file.id)) {
            continue;
        }
        let alreadyIncluded = false;
        for (let fileToRemove of filesToRemove) {
            if (fileToRemove.id === file.id) {
                alreadyIncluded = true;
                break;
            }
        }
        if (!alreadyIncluded) {
            if (!removeFileIds) {
                filesToRemove.push(file);
            } else if (removeFileIds.constructor === Array && removeFileIds.includes(file.id)) {
                filesToRemove.push(file);
            } else if (removeFileIds === file.id) {
                filesToRemove.push(file);
            }
        }
    }
    return filesToRemove;
}

FileFantastic.prototype.handleRemoveResponse = function (response, removeFileIds, replaceFileIds=[]) {
    response = response?.constructor === Array ? response : [response];
    response = response.flat(1);
    removeFileIds = removeFileIds.constructor === Array ? removeFileIds : [removeFileIds];
    removeFileIds = removeFileIds.flat(1);
    const removedFileIds = removeFileIds.filter(r => response.includes(r));
    const removeFiles = this.getFilesToRemove(removeFileIds, true);
    const removedFiles = removeFiles.filter(r => removedFileIds.includes(r.id));
    const failedRemovedFiles = removeFiles.filter(r => !removedFileIds.includes(r.id));
    const fileFilter = removedFileIds.filter(fId => !replaceFileIds.includes(fId));
    this.files = this.files.filter(f => !fileFilter.includes(f.id));
    this.removedFiles = this.removedFiles.filter(rf => !removeFileIds.includes(rf.id));
    return [removedFiles, failedRemovedFiles];
}

FileFantastic.prototype.handleEvent = function (name, payload, message = null, type = null) {
    const eventPayload = { name: name, message: message, type: type, payload: payload };
    if (this.eventCallback) {
        this.eventCallback(eventPayload);
    }

    const customEvent = new CustomEvent(name, { detail: eventPayload });
    this.input.dispatchEvent(customEvent);
}

FileFantastic.prototype.createDropify = function () {
    const dropAreaElement = document.createElement('div');
    dropAreaElement.classList.add('ff-dropify');
    dropAreaElement.append(this.inputText);

    dropAreaElement.addEventListener('dragenter', ev => {
        ev.preventDefault();
        dropAreaElement.classList.add('ff-dropify-active');
    });
    dropAreaElement.addEventListener('dragover', ev => {
        ev.preventDefault();
        dropAreaElement.classList.add('ff-dropify-active');
    });
    dropAreaElement.addEventListener('dragleave', ev => {
        dropAreaElement.classList.remove('ff-dropify-active');
    });
    dropAreaElement.addEventListener('drop', ev => {
        ev.preventDefault();
        dropAreaElement.classList.remove('ff-dropify-active');
        this.input.files = ev.dataTransfer.files;
        this.input.dispatchEvent(new Event('change'));
    });
    return dropAreaElement;
}

FileFantastic.prototype.cleanFilename = function (filename, uniqueCounter = 0) {
    const extension = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
    let name = filename.substr(0, filename.lastIndexOf('.'));
    name = name.replaceAll(/\s/g, '-').replaceAll(/[^A-Za-z0-9\-\_\.\(\)]/g, '');
    let newName = name + '.' + extension;

    for (let file of this.files) {
        if (file.name === newName) {

            const uniqueRe = /^.*\-(\d+)$/;
            const existingNum = name.match(uniqueRe);
            if (!name || uniqueCounter > 0 || existingNum) {
                let num = uniqueCounter || 1;
                if (existingNum && existingNum[1]) {
                    num = parseInt(existingNum[1]) + 1;
                    name = name.replace(/\-\d+$/, '');
                }
                name += `-${num}`;
            }
            newName = name + '.' + extension;
            return this.cleanFilename(newName, uniqueCounter + 1);
        }
    }
    return newName;
};

FileFantastic.prototype.createInput = function () {
    const input = document.createElement('input');
    input.type = 'file';
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

FileFantastic.prototype.commaSeparatedList = function (arr) {
    return arr.length === 0 ? ''
        : arr.length === 1 ? '<b>' + arr[0] + '</b>'
            : arr.length === 2 ? `<b>${arr[0]}</b> and <b>${arr[1]}</b>`
                : `<b>${arr.slice(0, -1).join('</b>, <b>')}</b>, and <b>${arr.slice(-1)}</b>`;
}

FileFantastic.prototype.fileInputCallback = function () {
    const numFiles = this.input.files.length;
    let replaceFileId = 0;

    let filesTooLarge = [];
    let filesTooMany = [];
    let filesWrongType = [];
    let filesWrongExt = [];

    const filesAdded = [];
    const dataUrlPromises = [];
    for (let i = 0; i < numFiles; i++) {
        const file = this.input.files.item(i);
        if (this.files.length >= this.maxFiles) {
            if (this.multiple || !this.removable) {
                filesTooMany.push(file);
                continue;
            }
            replaceFileId = this.files[0].id;
        }

        const ext = file.name.indexOf('.') < 0 ? '' : file.name.split('.').pop().toLowerCase();
        if (this.acceptedExtensions && ext && !this.acceptedExtensions.includes(ext)) {
            filesWrongExt.push(file);
            continue;
        }
        if (this.acceptedFileTypes && !this.acceptedFileTypes.includes(file.type)) {
            filesWrongType.push(file);
            continue;
        }
        if (this.resizeImages) {
            const dataUrlPromise = this.resizeImage(file, file => {
                const fileObject = this.addFile(file);
                fileObject.file = file;
                filesAdded.push(fileObject);
            }).then(resizedFile => {
                if (this.payloadType === 'json') {
                    const dataUrlPromise = this.blobToDataUrl(resizedFile, fileObject.id).then(value => {
                        const [dataUrl, id] = value;
                        fileObject.dataUrl = dataUrl;
                    })
                    return dataUrlPromise;
                }
            });
            dataUrlPromises.push(dataUrlPromise);
            continue;
        }
        if (file.size > this.maxFileSize) {
            filesTooLarge.push(file);
            continue;
        }
        const fileObject = this.addFile(file);
        filesAdded.push(fileObject);
        if (this.payloadType === 'json') {
            const dataUrlPromise = this.blobToDataUrl(file, fileObject.id).then(value => {
                const [dataUrl, id] = value;
                fileObject.dataUrl = dataUrl;
            })
            dataUrlPromises.push(dataUrlPromise);
        }
    }

    const filesFailedToInput = filesWrongType.concat(filesWrongExt).concat(filesTooLarge).concat(filesTooMany);

    if (filesFailedToInput.length > 0) {

        let message = [];
        if (filesWrongExt.length > 0) {
            message.push(`The file${filesWrongExt.length > 1 ? 's' : ''} ${this.commaSeparatedList(filesWrongExt.map(f => f.name))} could not be uploaded because only the extensions ${this.commaSeparatedList(this.acceptedExtensions.join)} are allowed.`);
        }
        if (filesWrongType.length > 0) {
            message.push(`The file${filesWrongType.length > 1 ? 's' : ''} ${this.commaSeparatedList(filesWrongType.map(f => f.name))} could not be uploaded because only the types ${this.commaSeparatedList(this.acceptedFileTypes.join)} are allowed.`);
        }
        if (filesTooMany.length > 0) {
            message.push(`The file${filesTooMany.length > 1 ? 's' : ''} ${this.commaSeparatedList(filesTooMany.map(f => f.name))} could not be uploaded because only a maximum of ${this.maxFiles} files may be uploaded.`);
        }
        if (filesTooLarge.length > 0) {
            message.push(`The file${filesTooLarge.length > 1 ? 's' : ''} ${this.commaSeparatedList(filesTooLarge.map(f => f.name))} could not be uploaded because they exceed the maximum file size of ${this.fileSizeToHumanReadable(this.maxFileSize)}.`);
        }
        this.handleEvent(
            'fileInputFailed',
            {
                files: filesFailedToInput,
                filesWrongType: filesWrongType,
                filesWrongExt: filesWrongExt,
                filesTooLarge: filesTooLarge,
                filesTooMany: filesTooMany
            },
            message.join('<br>'),
            'warning'
        );
    }

    if (this.sortCallback) {
        this.files.sort(this.sortCallback)
    }
    if (this.paging && filesAdded.length > 0) {
        this.page = this.getPageByEntityId(filesAdded[filesAdded.length - 1].id);
    }
    this.input.value = '';

    if (replaceFileId) {
        this.remove(replaceFileId, true, false, true, false);
    }

    if (this.saveOnInput && filesAdded.length > 0) {
        if (replaceFileId) {
            if (this.payloadType === 'json') {
                Promise.all(dataUrlPromises).then(values => {
                    this.save(filesAdded.map(f => f.id)[0], replaceFileId);
                })
            } else {
                this.save(filesAdded.map(f => f.id)[0], replaceFileId);
            }
        } else {
            if (this.payloadType === 'json') {
                Promise.all(dataUrlPromises).then(values => {
                    this.save(filesAdded.map(f => f.id));
                })
            } else {
                this.save(filesAdded.map(f => f.id));
            }
        }
    } else {
        this.update();
    }
}

FileFantastic.prototype.addFile = function (file) {
    const extension = file.name.indexOf('.') < 0 ? '' : file.name.split('.').pop();
    const fileType = file.type || this.extensionsToFileTypes[extension] || 'application/octet-stream';

    const fileObject = {
        isFile: true,
        file: file,
        size: file.size,
        name: this.cleanFilename(file.name),
        type: fileType,
        id: this.generateUID(),
        previewable: (this.previewImages && this.acceptedImagePreviewTypes.includes(file.type)) ||
            (this.previewAudio && this.acceptedAudioPreviewTypes.includes(file.type)) ||
            (this.previewVideo && this.acceptedVideoPreviewTypes.includes(file.type))
    }

    if (this.directories) {
        fileObject.directory = this.directory;
    }

    this.files.push(fileObject);
    this.input.dispatchEvent(new CustomEvent('added', { detail: fileObject.id }));
    return fileObject;
}

FileFantastic.prototype.loadExistingFiles = function (existingUrls) {
    for (let existingUrl of existingUrls) {
        const fileObject = this.parseExistingUrlIntoFileObject(existingUrl)
        fileObject && this.files.push(fileObject);
    }
}

FileFantastic.prototype.parseExistingUrlIntoFileObject = function (existingUrl, fileObject=null) {
    if (!(existingUrl.url || (!this.downloadable && !this.previewable && existingUrl.name))) {
        console.error('No URL or name provided for existing file: ', existingUrl);
        return null;
    }
    fileObject = fileObject || {
        isFile: true,
        id: this.generateUID(),
    };
    fileObject.existingUrl = JSON.parse(JSON.stringify(existingUrl));
    delete fileObject.existingUrl.id;
    fileObject.existing = true;
    if (existingUrl.name) {
        fileObject.name = this.cleanFilename(existingUrl.name);
    } else if (!fileObject.name) {
        fileObject.name = this.cleanFilename(existingUrl.url.split('/').pop());
    }

    const ext = fileObject.name.split('.').pop().toLowerCase();
    fileObject.type = existingUrl.type || fileObject.type || fileObject.file?.type || this.extensionsToFileTypes[ext] || 'application/octet-stream';
    fileObject.size = existingUrl.size || fileObject.size || fileObject.file?.size || 0;
    fileObject.previewable = (this.previewImages && this.acceptedImagePreviewTypes.includes(fileObject.type)) ||
        (this.previewAudio && this.acceptedAudioPreviewTypes.includes(fileObject.type)) ||
        (this.previewVideo && this.acceptedVideoPreviewTypes.includes(fileObject.type))

    if (existingUrl.directory) {
        fileObject.directory = existingUrl.directory;
    }

    return fileObject;
}

FileFantastic.prototype.dataUrlToBlobSync = function (dataUrl) {
    const byteString = atob(dataUrl.split(',')[1]);
    const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return blob;
}

FileFantastic.prototype.urlToBlobSync = function (url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.overrideMimeType('text/plain; charset=x-user-defined');
    xhr.send();
    return new Blob([Uint8Array.from(xhr.response, c => c.charCodeAt(0))]);
}

FileFantastic.prototype.urlToBlob = function (url, extra = '') {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = ev => {
            resolve([xhr.response, extra]);
        };
        xhr.onerror = err => {
            console.error("Error converting object URL to blob:  ", err);
            reject([err, url]);
        }
        xhr.send();
    })
}

FileFantastic.prototype.doXhr = function (url, payload, json=false) {
    return new Promise(function (resolve, reject) {
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
                resolve(rawResponse);
                reject(err);
            }
            resolve(jsonResponse ? jsonResponse : rawResponse);
        }
        xhr.onerror = err => {
            reject(err);
        }
        xhr.send(payload);
    })
}

FileFantastic.prototype.blobToDataUrlSync = function (blob, fileType = null) {
    if (!fileType && blob instanceof File) {
        fileType = blob.type;
    }
    const objectUrl = this.blobToObjectUrl(blob);
    return this.objectUrlToDataUrlSync(objectUrl, fileType);
}

FileFantastic.prototype.blobToDataUrl = function (blob, id) {
    return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => {
            resolve([fr.result, id]);
        };
        fr.onerror = reject;
        fr.readAsDataURL(blob);
    });
}
FileFantastic.prototype.blobToObjectUrl = function (blob) {
    return (window.URL ? URL : webkitURL).createObjectURL(blob);
}

FileFantastic.prototype.objectUrlToDataUrlSync = function (objectUrl, fileType) {
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

FileFantastic.prototype.resizeImage = function (id) {
    return new Promise((resolve, reject) => {

        const file = this.getFileById(id);
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
                    const resizedFile = new File([b], file.name, { type: file.type, lastModified: new Date().getTime() }, 'utf-8');
                    resolve(resizedFile);
                }, file.type, 0.9);
            };
            image.onerror = function () {
                reject('Error loading image');
            };
            image.src = fileReader.result;
        };

        fileReader.onerror = function () {
            reject('Error reading file');
        };
        fileReader.readAsDataURL(file.file);
    });
};

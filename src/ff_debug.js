FileFantastic.prototype.initDebug = function(params) {
    this.debug = true;
    if (params.container) {
        this.debugContainer = params.container.constructor === String ? document.getElementById(params.container) : params.container;
    } else {
        this.debugContainer = this.createDebugContainer();
    }
}

FileFantastic.prototype.createDebugContainer = function() {
    const container = document.createElement('div');
    container.classList.add('ff-debug-container');
    container.id = 'ff-debug-container-' + this.id;
    return container;
}

FileFantastic.prototype.updateDebugContainer = function() {
    const container = this.debugContainer;
    if (!container) {
        return;
    }
    
    while (container.firstChild) {
        container.firstChild.remove();
    }
   
    const updateButton = document.createElement('button');
    updateButton.type = 'button';
    updateButton.append(document.createTextNode('Update'))
    updateButton.addEventListener('click', () => { ff.update(); })
    container.append(updateButton);
    const createCheckbox = key => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = !!this[key];
        checkbox.id = 'ff-debug-checkbox-' + key;
        checkbox.addEventListener('change', ev => {
            this[key] = ev.target.checked;
            this.update();
        })

        const container = document.createElement('span');
        container.append(checkbox);
        return container;
    }
    const createInput = key => {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = this[key];
        input.id = 'ff-debug-input-' + key;
        const button = document.createElement('button');
        button.type = 'button';
        button.classList = 'ff-debug-button';
        button.addEventListener('click', () => {
            this[key] = input.value;
            this.update();
        })
        button.append(document.createTextNode('Apply'));

        const container = document.createElement('span');
        container.append(input, button);
        return container;
    }

    const createRadio = (key, options) => {
        const container = document.createElement('span');
        for (let option of options) {
            const input = document.createElement('input');
            input.type = 'radio';
            input.value = option;
            input.id = 'ff-debug-input-' + key;
            input.checked = this[key] === option;
            input.addEventListener('change', ev => {
                if (input.checked) {
                    this[key] = input.value;
                    this.update();
                }
            })
            const label = document.createElement('label');
            label.htmlFor = input.id;
            label.append(option);
            container.append(label, input);
        }
        return container;
    }

    container.append(this.createDebugUl({
        id: this.id,
        payloadType: createRadio('payloadType', ['json', 'formData']),
        existingUrls: this.existingUrls,
        multiple: createCheckbox('multiple'),
        uploadIndividually: createCheckbox('uploadIndividually'),
        saveOnInput: createCheckbox('saveOnInput'),
        previewable: createCheckbox('previewable'),
        previewVideo: createCheckbox('previewVideo'),
        previewAudio: createCheckbox('previewAudio'),
        previewImages: createCheckbox('previewImages'),
        imagesExpandable: createCheckbox('imagesExpandable'),
        copyable: createCheckbox('copyable'),
        downloadable: createCheckbox('downloadable'),
        showFilename: createCheckbox('showFilename'),
        removable: createCheckbox('removable'),
        removeIndividually: createCheckbox('removeIndividually'),
        removeOnClick: createCheckbox('removeOnClick'),
        resizeImages: createCheckbox('resize'),
        dropify: createCheckbox('dropify'),
        iconType: createInput('iconType'),
        uploadUrl: createInput('uploadUrl'),
        removeUrl: createInput('removeUrl'),
        maxFiles: createInput('maxFiles'),
        maxFileSize: createInput('maxFileSize'),
    }));
    if (this.croppable) {
        container.append(this.createDebugUl({
            saveOnCrop: createCheckbox('saveOnCrop'),
            cropperOptions: this.cropperOptions,
            cropperToolGroups: this.cropperToolGroups
        }));
    }

    const payloadButton = document.createElement('button');
    payloadButton.type = 'button';
    payloadButton.append(document.createTextNode(this.payloadType === 'json' ? 'JSON Upload Payload' : 'Form Data Upload Payload'));

    const debugUploadContainer = document.createElement('div');
    payloadButton.addEventListener('click', () => {
        if (debugUploadContainer.firstChild) {
            while (debugUploadContainer.firstChild) {
                debugUploadContainer.firstChild.remove();
            }
        } else {
            const filesToUpload = this.getFilesToUpload();
            if (filesToUpload.length === 0) {
                debugUploadContainer.append('No Upload Payload Data');
            } else {
                if (this.uploadIndividually) {
                    for (let file of filesToUpload) {
                        let payload = this.getUploadPayload(file.fileId);
                        if (this.payloadType === 'formData') {
                            payload = this.formDataToJson(payload);
                        }
                        const payloadContainer = document.createElement('div');
                        const payloadLabel = document.createElement('h4');
                        payloadLabel.append('Individual Upload Payload for ' + file.name);
                        debugUploadContainer.append(payloadContainer, this.createDebugUl(payload));
                    }
                } else {
                    let payload = this.getUploadPayload();
                    if (this.payloadType === 'formData') {
                        payload = this.formDataToJson(payload);
                    }
                    const payloadLabel = document.createElement('h4');
                    payloadLabel.append('Bulk Upload Payload');
                    debugUploadContainer.append(payloadLabel, this.createDebugUl(payload));
                }
            }
        }
    })
    container.append(this.createDebugLi(payloadButton, debugUploadContainer));


    const removePayloadButton = document.createElement('button');
    removePayloadButton.type = 'button';
    removePayloadButton.append(document.createTextNode(this.payloadType === 'json' ? 'JSON Remove Payload' : 'Form Data Remove Payload'));

    const debugRemoveContainer = document.createElement('div');
    removePayloadButton.addEventListener('click', () => {
        if (debugRemoveContainer.firstChild) {
            while (debugRemoveContainer.firstChild) {
                debugRemoveContainer.firstChild.remove();
            }
        } else {
            const filesToRemove = this.removedFiles;
            if (filesToRemove.length === 0) {
                debugRemoveContainer.append('No Remove Payload Data');
            } else {
                if (this.removeIndividually) {
                    for (let file of filesToRemove) {
                        let payload = this.getRemovePayload(file.fileId);
                        if (this.payloadType === 'formData') {
                            payload = this.formDataToJson(payload);
                        }
                        const payloadContainer = document.createElement('div');
                        const payloadLabel = document.createElement('h4');
                        payloadLabel.append('Individual Remove Payload for ' + file.name);
                        debugRemoveContainer.append(payloadContainer, this.createDebugUl(payload));
                    }
                } else {
                    let payload = this.getRemovePayload();
                    if (this.payloadType === 'formData') {
                        payload = this.formDataToJson(payload);
                    }
                    const payloadLabel = document.createElement('h4');
                    payloadLabel.append('Bulk Remove Payload');
                    debugRemoveContainer.append(payloadLabel, this.createDebugUl(payload));
                }
            }
        }
    })
    container.append(this.createDebugLi(removePayloadButton, debugRemoveContainer));

    const savePayloadButton = document.createElement('button');
    savePayloadButton.type = 'button';
    savePayloadButton.append(document.createTextNode(this.payloadType === 'json' ? 'JSON Save Payload' : 'Form Data Save Payload'));

    const debugSaveContainer = document.createElement('div');
    savePayloadButton.addEventListener('click', () => {
        if (debugSaveContainer.firstChild) {
            while (debugSaveContainer.firstChild) {
                debugSaveContainer.firstChild.remove();
            }
        } else {
            const filesToUpload = this.getFilesToUpload();
            if (filesToUpload.length === 0 && this.removedFiles.length === 0) {
                debugSaveContainer.append('No Save Payload Data');
            } else {
                let payload = this.getSavePayload();
                if (this.payloadType === 'formData') {
                    payload = this.formDataToJson(payload);
                }
                const payloadLabel = document.createElement('h4');
                payloadLabel.append('Save Payload');
                debugSaveContainer.append(payloadLabel, this.createDebugUl(payload));
            }
        }
    })
    container.append(this.createDebugLi(savePayloadButton, debugSaveContainer));
}

FileFantastic.prototype.createDebugLi = function(key, value) {
    const li = document.createElement('li');
    li.classList.add('ff-debug-li');
    const keyEl = document.createElement('b');
    if (key.constructor === String) {
        keyEl.append(document.createTextNode(key + ': '));
    } else {
        keyEl.append(key);
    }
    li.append(keyEl, value);
    return li;
}

FileFantastic.prototype.createDebugUl = function(data) {
    const ul = document.createElement('ul');
    if (!data) { return ul; }
    for (let key in data) {
        let value = data[key];
        if (value === undefined || typeof value === 'function') {
            continue;
        }
        if (typeof value === 'object' && !(value instanceof HTMLElement)) {
            const button = document.createElement('button');
            button.type = 'button';
            button.appendChild(document.createTextNode(key));
            value = this.createDebugUl(value);
            this.toggleDisplayed(value, false);
            button.addEventListener('click' , ev => {
                this.toggleDisplayed(value);
            })
            key = button;
        } else if (!(value instanceof HTMLElement)) {
            value = (value + '').substring(0, 128);
            if (key.toLowerCase().indexOf('url') !== -1) {
                const link = document.createElement("a");
                link.href = data[key];
                link.target = '_blank';
                link.append(value);
                value = link;
            } else if (key.toLowerCase().indexOf('size') !== -1) {
                value = this.fileSizeToHumanReadable(value);
            } else if (key === 'lastModified') {
                value = new Date(parseInt(value));
            } else if (key.constructor === Function) {
                continue;
            }
        }
        ul.appendChild(this.createDebugLi(key, value));
    }
    return ul;
}

FileFantastic.prototype.createFileDebugContainer = function(fileId) {
    const existingContainer = document.getElementById('ff-debug-container-' + fileId);
    const container = existingContainer || document.createElement('div');
    if (!existingContainer) {
        container.classList.add('ff-debug-container');
        container.id = 'ff-debug-container-' + fileId;
    } else {
        while (existingContainer.firstChild) {
            existingContainer.firstChild.remove();
        }
    }

    const ul = document.createElement('ul');
    const file = this.getFileById(fileId);
    
    const debugUl = this.createDebugUl({
        fileId: file.fileId,
        name: file.name,
        file: file.file,
        size: file.size,
        originalSize: file.originalSize,
        type: file.type,
        originalName: file.originalName,
        fileModified: file.fileModified,
        previewable: file.previewable,
        existing: file.existing,
        existingUrl: file.existingUrl
    });
    container.appendChild(debugUl);
    
    const debugUploadContainer = document.createElement('div');
    debugUploadContainer.id = 'ff-debug-payload-' + fileId;
    const loadUploadPayloadButton = document.createElement('button');
    loadUploadPayloadButton.type = 'button';
    loadUploadPayloadButton.appendChild(document.createTextNode(this.payloadType === 'json' ? 'JSON Upload Payload' : 'Form Data Upload Payload'));
    loadUploadPayloadButton.addEventListener('click', ev => {
        if (debugUploadContainer.firstChild) {
            while (debugUploadContainer.firstChild) {
                debugUploadContainer.firstChild.remove();
            }
        } else {
            let payload = this.getUploadPayload(fileId, true, true, true);
            if (!payload || (payload.constructor === Array && payload.length === 0)) {
                const emptyText = payload?.constructor === Array ? 'Empty Array' : 'No Payload Data'
                debugUploadContainer.appendChild(document.createTextNode(emptyText));
                return;
            }
            if (this.payloadType === 'formData') {
                payload = this.formDataToJson(payload);
            }
            debugUploadContainer.appendChild(this.createDebugUl(payload));
        }
    })
    debugUl.appendChild(this.createDebugLi(loadUploadPayloadButton, debugUploadContainer));

    const debugRemoveContainer = document.createElement('div');
    debugRemoveContainer.id = 'ff-debug-payload-' + fileId;
    const loadRemovePayloadButton = document.createElement('button');
    loadRemovePayloadButton.type = 'button';
    loadRemovePayloadButton.appendChild(document.createTextNode(this.payloadType === 'json' ? 'JSON Remove Payload' : 'Form Data Remove Payload'));
    loadRemovePayloadButton.addEventListener('click', ev => {
        if (debugRemoveContainer.firstChild) {
            while (debugRemoveContainer.firstChild) {
                debugRemoveContainer.firstChild.remove();
            }
        } else {
            let removePayload = this.getRemovePayload(fileId, true);
            if (!removePayload || (removePayload.constructor === Array && removePayload.length === 0)) {
                debugRemoveContainer.appendChild(document.createTextNode('No Payload Data'));
                return;
            }
            if (this.payloadType === 'formData') {
                removePayload = this.formDataToJson(removePayload);
            }
            debugRemoveContainer.appendChild(this.createDebugUl(removePayload));

        }
    })
    debugUl.appendChild(this.createDebugLi(loadRemovePayloadButton, debugRemoveContainer));
    

    container.appendChild(ul);
    return container;
}

FileFantastic.prototype.formDataToJson = function(formData) {
    const json = {}
    if (!formData) {
        return json;
    }
    Array.from(formData.entries()).forEach(entry => {
        const [key, value] = entry;
        json[key] = value;
    });
    return json;
}

FileFantastic.prototype.initPaging = function(params) {
    this.paging = true;
    this.perPage = params.perPage || 10;
    this.hidePagingWhenSinglePage = params.hidePagingWhenSinglePage === undefined ? false : params.hidePagingWhenSinglePage;
    this.page = 1;
    this.pagingContainer = params.pagingContainer || this.createPagingContainer();
    if (params.pagingContainer) {
        this.pagingContainer = this.pagingContainer.constructor === String ? document.getElementById(this.pagingContainer) : this.pagingCoontainer;
    } else {
        this.displayContainer.insertAdjacentElement('afterend', this.pagingContainer);
    }
    this.showPageInput = params.showPageInput === undefined ? true : !!params.showPageInput;
}

FileFantastic.prototype.createPagingContainer = function() {
    const container = document.createElement('div');
    container.classList.add('ff-paging-container');
    container.id = 'ff-paging-container-' + this.id;
    return container;
};

FileFantastic.prototype.pageLeftCallback = function() {
    this.page > 0 && this.page--;
    this.update();
}

FileFantastic.prototype.createPageLeftButton = function() {
    const leftButton = document.createElement('button');
    leftButton.type = 'button';
    leftButton.classList.add('ff-paging-button', 'ff-paging-left');
    leftButton.id = 'ff-paging-left-' + this.id;
    leftButton.addEventListener('click', ev => {this.pageLeftCallback()});
    leftButton.append(this.getIcon('leftChevron'));
    return leftButton;
}

FileFantastic.prototype.pageRightCallback = function() {
    const maxPage = Math.ceil(this.files.length / this.perPage);
    maxPage > this.page && this.page++;
    this.update();
}

FileFantastic.prototype.createPageRightButton = function() {
    const rightButton = document.createElement('button');
    rightButton.type = 'button';
    rightButton.classList.add('ff-paging-button', 'ff-paging-right');
    rightButton.id = 'ff-paging-right-' + this.id;
    rightButton.addEventListener('click', ev => {this.pageRightCallback()})
    rightButton.append(this.getIcon('rightChevron'));
    return rightButton;
}

FileFantastic.prototype.createPageInput = function() {
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('ff-page-input');
    input.id = 'ff-page-input-' + this.id;
    input.style.width = Math.max(10, 6*Math.ceil(this.files.length / this.perPage)) + 'px';
    input.value = this.page;

    input.addEventListener('keyup', ev => {
        if (ev.key === 'Enter') {
            this.goToPage(input.value);
            this.pagingInput.focus();
        }
    });

    input.addEventListener('focusout', ev => {
        this.goToPage(input.value);
    })
    return input;
}

FileFantastic.prototype.goToPage = function(page) {
    const totalPages = Math.ceil(this.files.length / this.perPage);
    const pageInt = Math.floor(page);
    if (pageInt > 0 && pageInt <= totalPages) {
        this.page = pageInt;
        this.pagingInput.value = pageInt;
        this.update();
    } else {
        this.pagingInput.value = this.page;
    }
}

FileFantastic.prototype.getCurrentPageFiles = function() {
    if (!this.paging) { return this.files; }
    const currentPageFiles = [];
    for (let fileIndex in this.files) {
        const filePage = Math.floor(fileIndex / this.perPage) + 1;
        if (this.page === filePage) {
            currentPageFiles.push(this.files[fileIndex]);
        }
    }
    return currentPageFiles;
}

FileFantastic.prototype.pageDisplayCallback = function() {
    const totalPages = Math.ceil(this.files.length / this.perPage);

    let currentPageDisplay = document.getElementById('ff-current-page-' + this.id);
    if (!currentPageDisplay) {
        currentPageDisplay = this.createCurrentPageDisplay();
        this.pagingContainer.append(currentPageDisplay);
    }
    if (this.hidePagingWhenSinglePage) {
        this.toggleDisplayed(currentPageDisplay, totalPages > 1)
    }

    const existingLeftButton = document.getElementById('ff-paging-left-' + this.id);
    const existingRightButton = document.getElementById('ff-paging-right-' + this.id)

    if (this.page > 1) {
        if (!existingLeftButton) {
            this.pagingContainer.insertBefore(this.createPageLeftButton(), this.pagingContainer.firstChild);
        }
    } else if (existingLeftButton) {
        existingLeftButton.remove();
    }

    for (let child of Array.from(currentPageDisplay.children)) {
        if (child !== this.pagingInput) {
            currentPageDisplay.removeChild(child);
        }
    }

    const pageNumberDisplay = document.createElement('span');
    if (this.showPageInput ) {
        if (this.pagingInput) {
            this.pagingInput.value = this.page;
        } else {
            this.pagingInput = this.createPageInput();
            currentPageDisplay.append(this.pagingInput);
        }
    } 
    
    if (!this.showPageInput) {
        pageNumberDisplay.append(totalPages > 0 ? this.page : 0 + '/' + totalPages);
    } else {
        pageNumberDisplay.append('/' + totalPages);
    }
    currentPageDisplay.append(pageNumberDisplay);
    const pageRangeDisplay = document.createElement('div');
    let pageHigh = Math.min(this.perPage*this.page, this.files.length);
    let pageLow = pageHigh > 0 ? ((this.perPage*(this.page-1))+1) : 0;
    pageRangeDisplay.append(pageLow + '-' + pageHigh + ' of ' + (this.files.length));
    currentPageDisplay.append(pageRangeDisplay)

    if (this.page < totalPages) {
        if (!existingRightButton) {
            this.pagingContainer.append(this.createPageRightButton());
        } 
    } else if (existingRightButton) {
        existingRightButton.remove();
    }
}

FileFantastic.prototype.createCurrentPageDisplay = function() {
    const div = document.createElement('div');
    div.classList.add('ff-current-page');
    div.id = 'ff-current-page-' + this.id;
    return div;
}

FileFantastic.prototype.getPageByFileId = function(fileId) {
    const fileIds = this.files.map(f => f.fileId);
    const fileIndex = fileIds.indexOf(fileId);
    return Math.floor(fileIndex / this.perPage) + 1;
}
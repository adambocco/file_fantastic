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
    this.pageButtonsLeft = 3;
    this.pageButtonsRight = 3;
    this.pagesToAlwaysShow = [1, -1];
}

FileFantastic.prototype.getPageButtons = function() {
    const totalPages = Math.ceil(this.files.length / this.perPage);

    let prevEllipsis = false;
    let prevButtons = [];
    let nextButtons = [];
    const pagesToOnlyShowNext = this.pagesToAlwaysShow.map(p => {
        if (p < 0) {
            return p + totalPages + 1;
        }
        return p;
    })

    for (let i = 1; i <= totalPages; i++) {

        if (i < this.page) {
            if (this.pagesToAlwaysShow.includes(i)) {
                prevButtons.push(this.createPageButton(i));
                prevEllipsis = false;
                continue;
            } else if (i >= (this.page - this.pageButtonsLeft)) {
                prevButtons.push(this.createPageButton(i));
                prevEllipsis = false;
                continue;
            } else {
                if (!prevEllipsis) {
                    prevEllipsis = true;
                    prevButtons.push(this.createPageButton('...'));
                }
            }
        } else if (i > this.page) {
            if (pagesToOnlyShowNext.includes(i)) {
                nextButtons.push(this.createPageButton(i));
                prevEllipsis = false;
                continue;
            } else if (i <= (this.page + this.pageButtonsRight)) {
                nextButtons.push(this.createPageButton(i));
                prevEllipsis = false;
                continue;
            } else {
                if (!prevEllipsis) {
                    prevEllipsis = true;
                    nextButtons.push(this.createPageButton('...'));
                }
            }
        }
    }
    return [prevButtons, nextButtons];
}

FileFantastic.prototype.createPageButton = function(text) {
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('ff-paging-button');
    if (text !== '...') {
        button.addEventListener('click', ev => {this.goToPage(text)});
    }
    button.append(text);
    return button;
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
    if (this.page < 1) {
        this.page = 1;
    }
    if (this.page > totalPages) {
        this.page = totalPages;
    }
    const pageButtons = this.getPageButtons();

    while (this.pagingContainer.firstChild) {
        this.pagingContainer.removeChild(this.pagingContainer.firstChild);
    }

    if (this.hidePagingWhenSinglePage && totalPages === 1) {
        return;
    }
    if (this.page > 1) {
        this.pagingContainer.insertBefore(this.createPageLeftButton(), this.pagingContainer.firstChild);
    }
    
    this.pagingContainer.append(...pageButtons[0]);

    const currentPageDisplay = this.createCurrentPageDisplay();
    this.pagingContainer.append(currentPageDisplay);

    const pageNumberDisplay = document.createElement('span');
    currentPageDisplay.append('Page ');
    if (this.showPageInput) {
        this.pagingInput = this.createPageInput();
        this.pagingInput.value = this.page;
        currentPageDisplay.append(this.pagingInput);
        pageNumberDisplay.append('/' + (totalPages || 1));
    } else {
        pageNumberDisplay.append(totalPages > 0 ? this.page : 0 + '/' + (totalPages || 1));
    }
    currentPageDisplay.append(pageNumberDisplay);
    const pageRangeDisplay = document.createElement('div');
    let pageHigh = Math.min(this.perPage*this.page, this.files.length);
    let pageLow = pageHigh > 0 ? ((this.perPage*(this.page-1))+1) : 0;
    pageRangeDisplay.append('Viewing ' + pageLow + '-' + pageHigh + ' of ' + (this.files.length));
    currentPageDisplay.append(pageRangeDisplay)
    
    this.pagingContainer.append(...pageButtons[1]);
    
    if (this.page < totalPages) {
        this.pagingContainer.append(this.createPageRightButton());
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
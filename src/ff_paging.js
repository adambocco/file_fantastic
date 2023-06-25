FileFantastic.prototype.initPaging = function(params) {
    this.paging = true;
    this.perPage = params.perPage || 10;
    this.hidePagingWhenSinglePage = params.hidePagingWhenSinglePage === undefined ? false : params.hidePagingWhenSinglePage;
    this.page = 1;
    this.pagingContainer = params.container === undefined ? document.createElement('div') : params.container;
    if (params.container) {
        this.pagingContainer = this.pagingContainer.constructor === String ? document.getElementById(this.pagingContainer) : this.pagingCoontainer;
    }
    this.showPageInput = params.showPageInput === undefined ? true : !!params.showPageInput;
    this.pageButtonsLeft = 3;
    this.pageButtonsRight = 3;
    this.pagesToAlwaysShow = [1, -1];
}

FileFantastic.prototype.getPageButtons = function() {
    const entities = this.getEntities()
    const totalPages = Math.ceil(entities.length / this.perPage);

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
    if (this.page > 0) {
        this.page--;
        this.update();
    }
}

FileFantastic.prototype.createPageLeftButton = function() {
    const leftButton = document.createElement('button');
    leftButton.type = 'button';
    leftButton.classList.add('ff-paging-button', 'ff-paging-left');
    leftButton.id = 'ff-paging-left-' + this.id;
    leftButton.addEventListener('click', ev => {this.pageLeftCallback()});
    leftButton.append(this.getIcon('leftChevron', true));
    return leftButton;
}

FileFantastic.prototype.pageRightCallback = function() {
    const entities = this.getEntities();
    const maxPage = Math.ceil(entities.length / this.perPage);
    if (maxPage > this.page) {
        this.page++;
    }
    this.update();
}

FileFantastic.prototype.createPageRightButton = function() {
    const rightButton = document.createElement('button');
    rightButton.type = 'button';
    rightButton.classList.add('ff-paging-button', 'ff-paging-right');
    rightButton.id = 'ff-paging-right-' + this.id;
    rightButton.addEventListener('click', ev => {this.pageRightCallback()})
    rightButton.append(this.getIcon('rightChevron', true));
    return rightButton;
}

FileFantastic.prototype.createPageInput = function() {
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('ff-page-input');
    input.id = 'ff-page-input-' + this.id;
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
    const entities = this.getEntities();
    const totalPages = Math.ceil(entities.length / this.perPage);
    const pageInt = Math.floor(page);
    if (pageInt > 0 && pageInt <= totalPages) {
        this.page = pageInt;
        this.pagingInput.value = pageInt;
        this.update();
    } else {
        this.pagingInput.value = this.page;
    }
}

FileFantastic.prototype.getCurrentPage = function() {
    const entities = this.getEntities();
    const currentPageEntities = [];
    for (let index in entities) {
        const entityPage = Math.floor(index / this.perPage) + 1;
        if (this.page === entityPage) {
            currentPageEntities.push(entities[index]);
        }
    }
    return currentPageEntities;
}

FileFantastic.prototype.updatePagingContainer = function() {
    const [entities, unfilteredEntitiesLength] = this.getEntities(true);
    const totalPages = Math.ceil(entities.length / this.perPage);
    const pageButtons = this.getPageButtons();

    container = this.createPagingContainer();

    if (this.hidePagingWhenSinglePage && totalPages === 1) {
        return;
    }
    if (this.page > 1) {
        container.append(this.createPageLeftButton());
    }
    
    container.append(...pageButtons[0]);

    const currentPageDisplay = this.createCurrentPageDisplay();
    container.append(currentPageDisplay);

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
    let pageHigh = Math.min(this.perPage*this.page, entities.length);
    let pageLow = pageHigh > 0 ? ((this.perPage*(this.page-1))+1) : 0;
    pageRangeDisplay.append('Viewing ' + pageLow + '-' + pageHigh + ' of ' + (entities.length));
    if (this.search) {
        if (unfilteredEntitiesLength !== entities.length) {
            pageRangeDisplay.append(document.createElement('br'), 'Filtered from ' + unfilteredEntitiesLength);
        }
    }
    currentPageDisplay.append(pageRangeDisplay)
    
    container.append(...pageButtons[1]);
    
    if (this.page < totalPages) {
        container.append(this.createPageRightButton());
    }
    while (this.pagingContainer.firstChild) {
        this.pagingContainer.removeChild(this.pagingContainer.firstChild);
    }
    this.pagingContainer.append(container)
}

FileFantastic.prototype.createCurrentPageDisplay = function() {
    const div = document.createElement('div');
    div.classList.add('ff-current-page');
    div.id = 'ff-current-page-' + this.id;
    return div;
}

FileFantastic.prototype.getPageByEntityId = function(id) {
    const ids = this.getEntities().map(f => f.id);
    const index = ids.indexOf(id);
    return Math.floor(index / this.perPage) + 1;
}
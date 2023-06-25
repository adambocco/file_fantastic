FileFantastic.prototype.initSearch = function (params) {
    this.search = true;
    if (params.container) {
        this.clientSearchContainer = params.container.constructor === String ? document.getElementById(params.container) : params.container;
    }

    this.searchCallback = params.searchCallback === undefined ? this.defaultSearchCallback : params.searchCallback;
    this.searchString = '';
    this.searchOnInput = params.searchOnInput === undefined ? true : params.searchOnInput;
    this.filterOnInput = params.filterOnInput === undefined ? true : params.filterOnInput;

    this.searchUrl = params.searchUrl === undefined ? '' : params.searchUrl;
    this.maxSearchResults = params.maxSearchResults === undefined ? Infinity : params.maxSearchResults;
}

FileFantastic.prototype.updateSearchContainer = function () {
    if (!this.searchContainer) {
        this.searchContainer = this.createSearchContainer();
        if (this.clientSearchContainer) {
            this.clientSearchContainer.append(this.searchContainer);
        }
    }
}

FileFantastic.prototype.createSearchContainer = function () {
    const container = document.createElement('div');
    container.classList.add('ff-search-container', 'ff-search-container-' + this.id);
    container.id = 'ff-search-container-' + this.id;
    this.searchInput = document.createElement('input');
    this.searchInput.classList.add('ff-search-input');
    this.searchInput.placeholder = 'Search...';
    const searchControlContainer = document.createElement('div');
    searchControlContainer.classList.add('ff-search-control-container');
    const searchBarContainer = document.createElement('div');
    searchBarContainer.classList.add('ff-search-bar-container');
    const xSpan = document.createElement('span');
    xSpan.classList.add('ff-search-clear-button');
    xSpan.append(this.getIcon('close', true));
    xSpan.addEventListener('click', ev => {
        this.searchInput.value = '';
        this.removeSearchResults?.(null);
        this.searchString = '';
        this.filterString = '';
        this.update();
    })
    searchBarContainer.append(this.searchInput, xSpan);
    this.toggleDisplayed(xSpan, this.searchInput.value !== '');
    searchControlContainer.append(searchBarContainer);

    this.searchInput.addEventListener('input', ev => {
        this.toggleDisplayed(xSpan, this.searchInput.value !== '');
        if (this.filterOnInput) {
            this.doFilter(this.searchInput.value);
        }
        if (this.searchOnInput) {
            this.doSearch(this.searchInput.value);
        }
    })
    if (!this.filterOnInput || !this.searchOnInput) {
        const button = document.createElement('div');
        button.append(this.getIcon('search'));
        button.classList.add('ff-control-button', 'ff-search-button');
        button.id = 'ff-search-button-' + this.id;
    
        button.addEventListener('click', ev => {
            this.doFilter(this.searchInput.value);
            this.doSearch(this.searchInput.value);
        })
        searchControlContainer.append(button);
    }
    container.append(searchControlContainer);
    this.searchInput.addEventListener('keyup', ev => {
        if (ev.key === 'Enter') {
            this.doFilter(this.searchInput.value);
            this.searchInput.focus();
        }
    });
    this.searchInput.addEventListener('click', ev => {
        if (this.lastSearchResults && !document.getElementById('ff-search-results-container-' + this.id)) {
            this.createSearchResults(this.lastSearchResults);
        }
    })
    this.searchInput.addEventListener('keydown', ev => {
        if (['ArrowUp', 'ArrowDown'].includes(ev.key)) {
            ev.preventDefault();
        }
    })
    return container;
}

FileFantastic.prototype.defaultSearchCallback = function (entity, searchString) {
    if (entity.name.toLowerCase().indexOf(searchString) !== -1) {
        return true;
    }
    return false;
}

FileFantastic.prototype.doSearch = function (searchString) {
    if (this.searchString === searchString) {
        return;
    }
    this.searchString = searchString;
    if (this.searchUrl && this.directories) {
        this.doXhr(this.searchUrl, this.getSearchPayload(searchString), this.payloadType === 'json').then(response => {
            this.createSearchResults(response);
        });
    }
    this.update();
}

FileFantastic.prototype.createSearchResultsContainer = function (filterString) {
    container = document.createElement('div');
    container.classList.add('ff-search-results-container');
    container.id = 'ff-search-results-container-' + this.id;
    return container;
}

FileFantastic.prototype.doFilter = function (filterString) {
    if (this.filterString === filterString) {
        return;
    }
    this.filterString = filterString;
    this.update();
}

FileFantastic.prototype.createSearchResults = function (searchResults) {
    this.removeSearchResults?.(null);
    if (this.searchResultsContainer) {
        this.searchResultsContainer.innerHTML = '';
    } else {
        this.searchResultsContainer = this.createSearchResultsContainer();
        this.searchContainer.append(this.searchResultsContainer);
    }
    
    const createResultEl = (path, isDirectory) => {
        const resultEl = document.createElement('div');
        resultEl.classList.add('ff-search-result');
        
        const splitPath = path.split('/').filter(x => !!x);
        for (let i = 0; i < splitPath.length; i++) {
            if (i === splitPath.length - 1) {
                const nameEl = document.createElement('b');
                nameEl.append(splitPath[i]);
                resultEl.append(nameEl);
            } else {
                const nameEl = document.createElement('span');
                nameEl.append(splitPath[i]);
                resultEl.append(nameEl);
                resultEl.append(this.createDirectoryDelimiter());
            }
        }

        resultEl.addEventListener('click', ev => {
            this.goToSearchResult(path, isDirectory);
        })
        return resultEl;
    }
    
    const handleSearchResultsNavigation = ev => {
        const selected = document.querySelector('#ff-search-results-container-' + this.id + ' > .ff-selected-search-result');
        if (selected && ev.key === 'Enter') {
            this.goToSearchResult(selected.dataset.path, selected.dataset.type === 'directory');
        } else if (['ArrowDown', 'ArrowUp'].includes(ev.key)) {
            if (!selected) {
                document.querySelector('#ff-search-results-container-' + this.id)?.firstElementChild?.classList?.add?.('ff-selected-search-result');
            } else {
                let nextSelected;
                if (ev.key === 'ArrowDown') {
                    nextSelected = selected.nextElementSibling;
                    if (nextSelected) {
                        nextSelected.classList.add('ff-selected-search-result');
                        selected.classList.remove('ff-selected-search-result');
                    }
                } else if (ev.key === 'ArrowUp') {
                    nextSelected = selected.previousElementSibling;
                    if (nextSelected) {
                        nextSelected.classList.add('ff-selected-search-result');
                        selected.classList.remove('ff-selected-search-result');
                    }
                }
                nextSelected?.scrollIntoView?.({block: 'center', inline: 'start'});
            }
        }
    }
    
    if (searchResults.length > 0) {
        const numResults = Math.min(searchResults.length, this.maxSearchResults);
        for (let i = 0; i < numResults; i++) {
            const entity = searchResults[i];
            const resultEl = createResultEl(entity.path, entity.type === 'directory');
            resultEl.dataset.path = entity.path;
            resultEl.dataset.type = entity.type;
            this.searchResultsContainer.append(resultEl);
        }
    } else {
        const noResultsEl = document.createElement('div');
        noResultsEl.classList.add('ff-search-results-empty');
        noResultsEl.append('No results found');
        this.searchResultsContainer.append(noResultsEl);
    }
    this.lastSearchResults = searchResults;
    const removeSearchResults = ev => {
        if (ev?.target !== this.searchInput && ev?.target !== this.searchResultsContainer) {
            this.searchResultsContainer?.remove();
            this.searchResultsContainer = null;
            window.removeEventListener('click', removeSearchResults);
            window.removeEventListener('keydown', handleSearchResultsNavigation);
        }
    }
    this.removeSearchResults = removeSearchResults;
    window.addEventListener('click', removeSearchResults);
    window.addEventListener('keydown', handleSearchResultsNavigation);
}

FileFantastic.prototype.goToSearchResult = function (path, isDirectory) {
    this.removeSearchResults(null);
    if (isDirectory) {
        this.changeDirectory(path);
    } else {
        const splitPath = path.split('/');
        const filename = splitPath.pop();
        const directory = splitPath.join('/') || '/';

        const goToEntity = () => {
            const entity = this.getEntityByPath(directory + (directory === '/' ? '' : '/') + filename);
            entity.container.classList.add('ff-highlight');
            if (this.paging) {
                const entityPage = this.getPageByEntityId(entity.id);
                if (entityPage !== this.page) {
                    this.goToPage(entityPage);
                }
            }
            entity.container.scrollIntoView({behavior: 'smooth'});
            setTimeout(() => {entity.container.classList.remove('ff-highlight')}, 5000);
        }
        
        if (this.directory === directory) {
            goToEntity()
        } else {
            this.changeDirectory(directory).then(goToEntity);
        }
    }
}

FileFantastic.prototype.getSearchPayload = function (searchString) {
    let payload = this.payloadType === 'json' ? {} : new FormData();
    payload = this.addToPayload(payload, 'search', searchString);
    payload = this.addToPayload(payload, 'directory', this.directory);
    return payload;
}

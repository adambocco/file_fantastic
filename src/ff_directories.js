
FileFantastic.prototype.initDirectories = function(params) {

    this.container = this.createDirectoryNavigator();
    this.directories = true;

    this.parent = params.parent === undefined ? '' : params.parent;
    this.directory = params.directory === undefined ? '' : params.directory;
    this.children = params.directories || [];
}

FileFantastic.prototype.navigate = function(dir) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/navigate', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onload = () => {
        if (xhr.status === 200) {
        const config = JSON.parse(xhr.responseText);
        this.currentDir = config.currentDir;
        this.children = config.children;
        this.parent = config.parent;
        // Update the widget to reflect the new configuration
        updateWidget();
        }
    };
    xhr.send(JSON.stringify({ currentDir: this.currentDir, dir }));
}

FileFantastic.prototype.createDirectoryNavigator = function() {
    const widget = document.createElement('div');
  
    // Create an element to show the current directory
    const currentDirElem = document.createElement('div');
    currentDirElem.textContent = `Current directory: ${this.directory}`;
    widget.appendChild(currentDirElem);
  
    // Create a button to go to the parent directory
    if (this.parent) {
      const parentButton = document.createElement('button');
      parentButton.textContent = 'Go to parent directory';
      parentButton.addEventListener('click', () => this.goToParent());
      widget.appendChild(parentButton);
    }
  
    // Create a dropdown list of child directories
    if (this.directories.length > 0) {
      const childSelect = document.createElement('select');
      this.directories.forEach(childDir => {
        const childOption = document.createElement('option');
        childOption.value = childDir;
        childOption.textContent = childDir;
        childSelect.appendChild(childOption);
      });
      childSelect.addEventListener('change', () => this.goToChild(childSelect.value));
      widget.appendChild(childSelect);
    }
    return widget;
  }
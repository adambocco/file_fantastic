# File Fantastic

File Fantastic is a simple client-side JavaScript web file management library.

## Features
- File Management
  - Upload, remove, rename, and modify multiple files
- JSON (Base 64 data URL) or Form Data request data
- Media previewability (images, audio, video)
- Icon types: 
  - Font Awesome Icons, Material Icons, or Text Icons

## Getting Started
- 

## Options
*Option (Data Type) (Default Value) - Description*
* ***id*** (string) (uuid) - Helpful for identifying multiple instances of File Fantastic
* ***multiple*** (boolean) (true) - Allow uploading multiple files
* ***existingUrls*** (array | object | string) ([]) - Add existing files when initializing. Existing URL must be string of file URL or object containing `url` key. Can be single or array of existing URLs.
* ***uploadIndividually*** (boolean) (false) - If true, only one file will be uploaded at once. Otherwise, they will be grouped into an array.
* ***uploadOnInput*** (boolean) (true) - Make upload request automatically when file input change event triggered.
* ***previewable*** (boolean) (true) - Allow previews of files when applicable.
* ***previewImages*** (boolean) (true) - Preview image files with  `<img>`.
* ***previewAudio*** (boolean) (true) - Preview audio files with `<audio>`. 
* ***previewVideo*** (boolean) (true) - Preview video files with `<video>`.
* ***imagesExpandable*** (boolean) (true) - Images expand and contract on click.
* ***copyable*** (boolean) (true) - Copy button appears in file toolbar to copy file. (Will upload on copy if `uploadOnInput = true`)
* ***downloadable*** (boolean) - Download button appears in file toolbar to download file.
* ***showFilename*** (boolean) (true) - Show file name.
* ***editableFilename*** (boolean) (true) - Edit filename button appears next to file name.
* ***removeable*** (boolean) (true) - If provided, files are removeable.
* ***removeIndividually*** (boolean) (false) - If true, only one remove file request will be made at once. Otherwise, they will be grouped into an array.
* ***removeOnClick*** (boolean) (true) - If true, remove file request will be made when remove button is clicked.
* ***resize*** (boolean) (false) - Images will be resized within `maxWidth` and `maxHeight`, maintaining aspect ratio.
* ***maxWidth*** (number) (1920) - Image resize maximum width.
* ***maxHeight*** (number) (1080) - Image resize maximum height.
* ***dropify*** (boolean) (false) - Use Dropify file input. (Requires Dropify)
* ***iconType*** (string: 'fa' | 'mdi' | 'text') ('text') - Font Awesome, Material Icons, or text.
* ***uploadCallbackUrl*** (string) ('') - URL used for `uploadCallback` OR `saveCallback` request.
* ***removeCallbackUrl*** (string) ('') - URL used for `removeCallback` OR `saveCallback` request.
* ***saveFilenameCallbackUrl*** (string) ('') - URL used for `saveFilename` request.

* ***maxFiles*** (number) (10) - Maximum number of allowable files to be uploaded.
* ***maxFileSize*** (number) (10485760) - Maximum file size allowed in bytes.

* ***input*** (string | HTML Element) - File input or ID of input.
* ***displayContainer*** (string | HTMLElement) - Container element or ID of container that holds file previews.

* ***acceptedFileType*** (array[string] | null) (null) - Array of acceptable file mime types or null for all.
* ***acceptedExtensions*** (array[string] | null) (null) - Array of acceptable file extensions or null for all.

## Methods
*Method (params)*
* ***uploadCallback*** (fileIds | null(default)) - Make upload request to `uploadCallbackUrl` with new and modified files.
  * Payload Structure:
  ### Json:
  Single:
  ```
    {
        name (string): file name,
        size (number): file size in bytes,
        type (string): file Mime type,
        dataUrl: base-64 encoded file data prefixed with data scheme,
    }
  ```
  Multiple:
  ```
    [
        {
            fileId (string): file ID to map non-individual response to correct file,
            name (string): file name,
            size (number): file size in bytes,
            type (string): file Mime type,
            dataUrl: base-64 encoded file data prefixed with data scheme,
        }
    ]
  ```

  ### Form Data:
  **Single**:
  ```
    fileId (string) = file ID to map non-individual response to correct file,
    name (string) = file name,
    size (number) = file size in bytes,
    type (string) = file Mime type,
    this.id (file) = file (this will be parsed out to $_FILES in php),
  ```

  **Multiple**:
    `<this.id>` 
  ```
    <file index>[fileId] (string) = file ID to map non-individual response to correct file,
    <file index>[name] (string) = file name,
    <file index>[size] (number) = file size in bytes,
    <file index>[type] (string) = file Mime type,
    <this.id>[file index] (file) = file (this will be parsed out to $_FILES in php),
  ```
* ***removeCallback*** - (fileIds | null(default)) - Make remove request to `removeCallbackUrl` with removed files.
  * Payload Structure: `file.existingUrl` destructured.
  ```
    {
        this.id {
            url: existing URL 
        }
    }
  ```
* ***saveCallback*** - 
* ***loadingCallback*** - 
* ***progressCallback*** - 
* ***alertCallback*** - 

## Plugins & Extensions
- Pagination
- Directories
- Debug
- Cropper.js

# Examples:

## PHP:

### Dev Notes:
- File uploads may fail due to maximum file/post data configuration set in your `php.ini` file:
  - Check `phpinfo()` for the path to your `php.ini` file: `Loaded Configuration File`
  - We're concerned with `max_file_uploads`, `post_max_size` (for data URLs), and `upload_max_filesize`.
  - `upload_max_filesize` is the maximum size of any single file.
  - `max_file_uploads` is the maximum number of files that can be uploaded.
  - `post_max_size` is the maximum size of the entire request, including files.
  ```
    sed -i 's/upload_max_filesize = .*/upload_max_filesize = '<NEW MAX FILE SIZE>'/' /etc/php/7.4/cli/php.ini
  ```
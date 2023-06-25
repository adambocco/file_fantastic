<?php
if (!empty($_GET['php_info'])) {
    phpinfo();
}
$clientRoot = '/';
$clientPath = $clientRoot . 'examples/uploads';
$filePath = $_SERVER['DOCUMENT_ROOT'] . $clientRoot . 'examples/uploads';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?php echo $clientRoot; ?>src/file_fantastic.css">
    <link rel="stylesheet" href="<?php echo $clientRoot; ?>examples/css/material_design_icons.css">
    <link rel="stylesheet" href="<?php echo $clientRoot; ?>examples/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css" integrity="sha512-cyzxRvewl+FOKTtpBzYjW6x6IAYUCZy3sGP40hn+DQkqeluGRCax7qztK2ImL64SA+C7kVWdLI6wvdlStawhyw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <title>File Fantastic</title>
</head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js" integrity="sha512-6lplKUSl86rUVprDIjiW8DuOniNX8UDoRATqZSds/7t6zCQZfaCe3e5zcGaQwxa8Kpn5RTM9Fvl3X2lLV4grPQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="<?php echo $clientRoot; ?>src/file_fantastic.js"></script>
    <script src="<?php echo $clientRoot; ?>src/ff_paging.js"></script>
    <script src="<?php echo $clientRoot; ?>src/ff_cropper.js"></script>
    <script src="<?php echo $clientRoot; ?>src/ff_directories.js"></script>
    <script src="<?php echo $clientRoot; ?>src/ff_search.js"></script>
    <script src="<?php echo $clientRoot; ?>src/ff_debug.js"></script>
    <body>
        <div id="loading-overlay">
            <div class="spinner"></div>
        </div>
        <div class="container">
            <h1>File Fantastic</h1>
            <div id="navigation">
                <div id="directories"></div>
                <div id="file_search"></div>
                <div id="file_paging"></div>
            </div>
            <div id="file_uploader">
                <div id="file_display"></div>
                <div id="file_input"></div>
                <div id="debug_container"></div>
            </div>
            <div id="file_controls">
                <div onclick="uploadAllFiles()" id="upload_all_files">Upload All</div>
                <div onclick="removeAllFiles()" id="remove_all_files">Remove All</div>
                <div onclick="saveFiles()" id="save_files">Save</div>
            </div>
        </div>
        <div id="toaster"></div>
        <script>
            var ff, progressToast;
            document.addEventListener('DOMContentLoaded', () => {
                toggleLoadingScreen(false);

                <?php
                    $allFilesAndFolders = array_diff(scandir($filePath), array('..', '.'));
                    $existingUrls = array();
                    $childDirectories = array();
                    foreach ($allFilesAndFolders as $f) {
                        if (is_dir($filePath . '/' . $f)){
                            $childDirectories[] = $f;
                        } else {
                            $url = $clientPath . '/' . urlencode($f);
                            $existingUrls[] = array('url' => $url, 'directory' => '/');
                        }
                    }
                ?>
                const existingUrls = JSON.parse("<?php echo addslashes(json_encode($existingUrls)); ?>");
                const childDirectories = JSON.parse("<?php echo addslashes(json_encode($childDirectories)); ?>")

                ff = new FileFantastic({
                    previewable: true,
                    payloadType: 'formData',
                    iconType: 'fa',
                    includeIconText: false,
                    multiple: true,
                    existingUrls: existingUrls,
                    maxFileSize: 1024*1024*1000,
                    uploadType: 'formData',
                    saveOnInput: true,
                    uploadIndividually: true,
                    removeIndividually: true,
                    removeOnClick: true,
                    displayContainer: 'file_display',
                    inputContainer: 'file_input',
                    sortCallback: sortAlphabetical,
                    loadingCallback: toggleLoadingScreen,
                    progressCallback: handleLoadingBars,
                    eventCallback: a => {
                        switch (a.name) {
                            case 'imageClicked':
                                expandImage(a.payload.file.previewElement);
                            default:
                                toast(a.message, a.type, 4000);
                        }
                    },
                    uploadUrl: '<?php echo $clientRoot; ?>examples/php/server.php?upload=1',
                    removeUrl: '<?php echo $clientRoot; ?>examples/php/server.php?remove=1',
                    saveUrl: '<?php echo $clientRoot; ?>examples/php/server.php?save=1',
                    cropper: {
                        uploadOnCrop: true
                    },
                    paging: {
                        perPage: 8,
                        container: 'file_paging',
                        hideDisplayWhenSinglePage: false,
                    },
                    search: {
                        container: 'file_search',
                        searchUrl: '<?php echo $clientRoot; ?>examples/php/server.php?search=1',
                    },
                    // debug: {
                    //     container: 'debug_container',
                    // },
                    directories: {
                        container: 'directories',
                        directory: '/',
                        parents: [],
                        directories: childDirectories,
                        changeDirectoryUrl: '<?php echo $clientRoot; ?>examples/php/server.php?cd=1',
                        createDirectoryUrl: '<?php echo $clientRoot; ?>examples/php/server.php?mkdir=1',
                        removeDirectoryUrl: '<?php echo $clientRoot; ?>examples/php/server.php?rmdir=1',
                    },
                    <?php echo (empty($_GET['debug']) ? '' : 'debug: {},'); ?>
                });

                const fileUploader = document.getElementById('file_uploader');
                const fileControls = document.getElementById('file_controls');
                if (ff.debugContainer) {
                    fileUploader.append(ff.debugContainer);
                }
            })

            function uploadAllFiles() { ff.upload(); }
            function removeAllFiles() { ff.remove(null, false, true, true); }
            function saveFiles() { ff.save(); }

            function handleLoadingBars(files, totalFiles, size, totalSize) {
                const totalBars = 50;
                let percentDone = Math.round((totalSize > 0 ? (size / totalSize) : (files / totalFiles)) * 100);
                if (percentDone > 100) {
                    percentDone = 100;
                } else if (percentDone < 0) {
                    percentDone = 0;
                }
                let numDoneBars = Math.round((totalSize > 0 ? (size / totalSize) : (files / totalFiles)) * totalBars);
                const doneBars = Array(isNaN(numDoneBars) || numDoneBars < 0 ? 0 : numDoneBars).fill('|').join('');
                const numEmptyBars = totalBars - numDoneBars;
                const emptyBars = Array(isNaN(numEmptyBars) || numEmptyBars < 0 ? 0 : numEmptyBars).fill('_').join('');
                progressToast = progressToast || toast( '<tt>[' + Array(totalBars).fill('_').join('') + '] 0%</tt>', 'info', null);
                progressToast.innerHTML = '<tt>[' + doneBars + emptyBars + '] ' + percentDone + '%</tt>';
                if (files === totalFiles) {
                    setTimeout(() => {
                        progressToast.remove();
                        progressToast = null;
                    }, 1500)
                }
            }

            function sortAlphabetical(a, b) {
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

            function expandImage(srcImg) {
                const previewModal = document.createElement('div');
                previewModal.id = 'img-modal';
                const img = document.createElement('img');
                img.src = srcImg.src;
                console.log("SRCL: ", srcImg)
                img.classList.add('img-expanded');
                previewModal.addEventListener('click', ev => {
                    if (ev.target !== img) {
                        previewModal.remove();
                    }
                });
                previewModal.append(img);
                document.querySelector('body').append(previewModal);
            }

            function toggleLoadingScreen(state=null) {
                const loadingOverlay = document.getElementById('loading-overlay');
                if (state !== null) {
                    loadingOverlay.style.display = state ? '' : 'none';
                } else {
                    loadingOverlay.style.display = loadingOverlay.style.display === 'none' ? '' : 'none';
                }
            }

            function toast(message, type='info', delay=0) {
                if (toast.queue === undefined) { toast.queue = []; }
                const maxToasts = 10;
                const toaster = document.getElementById('toaster');
                const toastEl = document.createElement('div');
                toastEl.innerHTML = message;
                toastEl.id = toast.queue.length + 1;
                toastEl.classList.add('toast');
                toastEl.classList.add(type);
                toastEl.classList.add('show');
                if (delay) {
                    const style = 'fadein 0.5s, fadeout 0.5s ' + (delay / 1000).toFixed(1) + 's';
                    toastEl.style.animation = style;
                    toastEl.style.webkitAnimation = style;
                }

                const createToast = s => {
                    toaster.insertBefore(s, toaster.firstChild);
                    if (delay) {
                        setTimeout(() => {
                            s.remove();
                            if (toast.queue.length > 0) {
                                toast.queue.pop()();
                            }
                        }, delay + 500);
                    }
                }
                const existingToasts = document.querySelectorAll('.toast');
                if (existingToasts.length >= maxToasts) {
                    toast.queue.unshift(() => {
                        createToast(toastEl);
                    });
                } else {
                    createToast(toastEl);
                }
                return toastEl;
            }
        </script>
    </body>
</html>

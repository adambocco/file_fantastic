<?php
if (!empty($_GET['php_info'])) {
    phpinfo();
}
$root = '/';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/src/file_fantastic.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css" integrity="sha512-cyzxRvewl+FOKTtpBzYjW6x6IAYUCZy3sGP40hn+DQkqeluGRCax7qztK2ImL64SA+C7kVWdLI6wvdlStawhyw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <title>Document</title>
</head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js" integrity="sha512-6lplKUSl86rUVprDIjiW8DuOniNX8UDoRATqZSds/7t6zCQZfaCe3e5zcGaQwxa8Kpn5RTM9Fvl3X2lLV4grPQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="<?php echo $root; ?>src/file_fantastic.js"></script>
    <script src="<?php echo $root; ?>src/ff_paging.js"></script>
    <script src="<?php echo $root; ?>src/ff_cropper.js"></script>
    <script src="<?php echo $root; ?>src/ff_debug.js"></script>
    <body>
        <style>
            .ff-input-button {
                margin: 1em;
            }
            #save_files {
                padding: 0.2em 0.4em;
                background-color: rgb(49, 107, 75);
                color: #eee;
                display: inline-block;
                cursor: pointer;
                margin: 1em;
            }
            #save_files_json {
                padding: 0.2em 0.4em;
                background-color: rgb(86, 124, 51);
                color: #eee;
                display: inline-block;
                cursor: pointer;
                margin: 1em;
            }
            #remove_all_files {
                padding: 0.2em 0.4em;
                background-color: rgb(129, 42, 42);
                color: #eee;
                display: inline-block;
                cursor: pointer;
                margin: 1em;
            }
            #upload_all_files {
                padding: 0.2em 0.4em;
                background-color: rgb(42, 42, 129);
                color: #eee;
                display: inline-block;
                cursor: pointer;
                margin: 1em;
            }
            #loading-overlay {
                position: fixed;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0,0,0,0.5);
                z-index: 2;
            }
            .spinner {
                position: absolute;
                left: 45%;
                top: 50%;
                height:60px;
                width:60px;
                margin:0px auto;
                -webkit-animation: rotation .6s infinite linear;
                -moz-animation: rotation .6s infinite linear;
                -o-animation: rotation .6s infinite linear;
                animation: rotation .6s infinite linear;
                border-left:6px solid rgba(0,174,239,.15);
                border-right:6px solid rgba(0,174,239,.15);
                border-bottom:6px solid rgba(0,174,239,.15);
                border-top:6px solid rgba(0,174,239,.8);
                border-radius:100%;
            }
            #toaster {
                position: fixed;
                bottom: 1em;
                right: 1em;
                z-index: 3;
            }
            .toast {
                visibility: hidden;
                min-width: 200px;
                text-align: center;
                padding: 0.2em 0.4em;
                z-index: 10;
                margin: 0.4em;
            }
            .toast.show {
                visibility: visible;
            }
            .danger {
                background-color: #cc5544;
            }
            .success {
                background-color: #55cc44
            }
            .warning {
                background-color: #ddcc55;
            }
            .info {
                background-color: #2b8ee6;
            }
            @-webkit-keyframes fadein {
                from {
                    bottom: 0;
                    opacity: 0;
                }
                to {
                    bottom: 30px;
                    opacity: 1;
                }
            }
            @keyframes fadein {
                from {
                    bottom: 0;
                    opacity: 0;
                }
                to {
                    bottom: 30px;
                    opacity: 1;
                }
            }
            @-webkit-keyframes fadeout {
                from {
                    bottom: 30px;
                    opacity: 1;
                }
                to {
                    bottom: 0;
                    opacity: 0;
                }
            }
            @keyframes fadeout {
                from {
                    bottom: 30px;
                    opacity: 1;
                }
                to {
                    bottom: 0;
                    opacity: 0;
                }
            }
            @-webkit-keyframes rotation {
                from {-webkit-transform: rotate(0deg);}
                to {-webkit-transform: rotate(359deg);}
            }
            @-moz-keyframes rotation {
                from {-moz-transform: rotate(0deg);}
                to {-moz-transform: rotate(359deg);}
            }
            @-o-keyframes rotation {
                from {-o-transform: rotate(0deg);}
                to {-o-transform: rotate(359deg);}
            }
            @keyframes rotation {
                from {transform: rotate(0deg);}
                to {transform: rotate(359deg);}
            }
        </style>
        <div id="loading-overlay">
            <div class="spinner"></div>
        </div>
        <div class="container">
            <div id="file_uploader">

            </div>
            <div id="file_controls">
                <div onclick="uploadAllFiles()" id="upload_all_files">Upload All</div>
                <div onclick="removeAllFiles()" id="remove_all_files">Remove All</div>
                <div onclick="saveFiles()" id="save_files">Save</div>
            </div>
        </div>
        <div id="toaster"></div>
        <script>
            var ff;
            document.addEventListener('DOMContentLoaded', () => {
                toggleLoadingScreen(false);
                const files = [];
                const existingUrls = JSON.parse("<?php
                    $clientPath = '/examples/uploads';
                    $filePath = $_SERVER['DOCUMENT_ROOT'] . '/examples/uploads';
                    $names = array_diff(scandir($filePath), array('..', '.'));
                    $existingUrls = array();
                    foreach ($names as $name) {
                        $url = '/examples/uploads/' . urlencode($name);
                        $existingUrls[] = array(
                            'url' => $url,
                            'name' => $name,
                            'size' => filesize($filePath . '/' . $name)
                        );
                    }
                    echo addslashes(json_encode($existingUrls));
                ?>");
                let loaderToast = null;

                const uploadIndividually = false;
                const removeIndividually = false;
                ff = new FileFantastic({
                    id: 'ff_files',
                    payloadType: 'formData',
                    cropper: {
                        uploadOnCrop: true
                    },
                    paging: {
                        perPage: 5,
                        hideDisplayWhenSinglePage: false,
                    },
                    debug: {},
                    iconType: 'fa',
                    multiple: true,
                    existingUrls: existingUrls,
                    maxFileSize: 1024*1024*1000,
                    uploadType: 'formData',
                    uploadOnInput: false,
                    uploadIndividually: uploadIndividually,
                    removeIndividually: removeIndividually,
                    removeOnClick: true,
                    uploadUrl: '<?php echo $root; ?>examples/php/server.php?upload=1',
                    removeUrl: '<?php echo $root; ?>examples/php/server.php?remove=1',
                    saveFilenameUrl: '<?php echo $root; ?>examples/php/server.php?save_filename=1'
                });
                ff.loadingCallback = toggleLoadingScreen;
                ff.eventCallback = a => { toast(a.message, a.type, 4000); }
                ff.progressCallback = (files, totalFiles, size, totalSize) => {
                    console.log(files, '/', totalFiles, '   ', size, '/', totalSize);
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
                    loaderToast = loaderToast || toast( '<tt>[' + Array(totalBars).fill('_').join('') + '] 0%</tt>', 'info', null);
                    loaderToast.innerHTML = '<tt>[' + doneBars + emptyBars + '] ' + percentDone + '%</tt>';
                    if (files === totalFiles) {
                        setTimeout(() => {
                            loaderToast.remove();
                            loaderToast = null;
                        }, 1500)
                    }
                }
                const fileUploader = document.getElementById('file_uploader');
                const fileControls = document.getElementById('file_controls');
                fileUploader.append(
                    ff.pagingContainer, 
                    ff.inputButton, 
                    ff.displayContainer, 
                );
                if (ff.debugContainer) {
                    fileUploader.append(ff.debugContainer);
                }
                ff.update();
            })

            function saveFiles() {
                ff.save();
            }

            function removeAllFiles() {
                ff.remove();
            }

            function uploadAllFiles() {
                ff.upload();
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
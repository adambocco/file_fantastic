<?php
$clientRoot = '/';
$clientDirectory = $clientRoot . 'examples/uploads';
$fileDirectory =  $_SERVER['DOCUMENT_ROOT'] . $clientRoot . 'examples/uploads';

$ffId = 'ff_files';
$json = json_decode(file_get_contents('php://input'), true);
$payloadType = empty($json) ? 'formData' : 'json';
$post = $payloadType === 'json' ? $json : $_POST;

$files = rearrangeFiles($_FILES);
$files = empty($files[$ffId]) ? $files : $files[$ffId];

if (!empty($_GET['save'])) {
    $response = array();
    if (isset($post['removedFiles'])) {
        $response['removeResponse'] = handleRemove($post['removedFiles']);
    }
    if (isset($post['files'])) {
        $response['uploadResponse'] = handleUpload($post['files'], $files);
    }
    die(json_encode($response));
}

$single = empty($post[0]);
if (!empty($_GET['remove'])) {
    $removeResponse = handleRemove($single ? array($post) : $post);
    die(json_encode($single && !empty($removeResponse[0]) ? $removeResponse[0] : $removeResponse));
}
if (!empty($_GET['upload'])) {
    $uploadResponse = handleUpload($single ? array($post) : $post , $files);
    die(json_encode($single && !empty($uploadResponse[0]) ? $uploadResponse[0] : $uploadResponse));
}

if (!empty($_GET['cd'])) {
    if (!empty($_POST['directory'])) {
        $destinationDir = '/' . trim($_POST['directory'], '/ ');
        $absoluteFileDir = $fileDirectory . $destinationDir;
        $absoluteClientDir = $clientDirectory . $destinationDir;
        if (is_dir($absoluteFileDir)) {
            $allFilesAndFolders = array_diff(scandir($absoluteFileDir), array('..', '.'));
            $existingUrls = array();
            $childDirectories = array();
            foreach ($allFilesAndFolders as $f) {
                if (is_dir($absoluteFileDir . '/' . $f)){
                    $childDirectories[] = ($destinationDir === '/' ? '' : $destinationDir) . '/' . $f;
                } else {
                    $url = $absoluteClientDir . '/' . urlencode($f);
                    $existingUrls[] = array('url' => $url, 'directory' => $destinationDir);
                }
            }
            die(json_encode(array('existingUrls' => $existingUrls, 'directories' => $childDirectories)));
        }
    }
}

if (!empty($_GET['mkdir'])) {
    if (!empty($_POST['directory'])) {
        $directory = '/' . trim($_POST['directory'], '/ ');
        $absoluteFileDir = $fileDirectory . $directory;
        $absoluteClientDir = $clientDirectory . $directory;
        if (!is_dir($absoluteFileDir)) {
            mkdir($absoluteFileDir);
            die(json_encode(array('directory' => $directory)));
        }
    }
}

if (!empty($_GET['rmdir'])) {
    if (!empty($_POST['directory'])) {
        $directory = '/' . trim($_POST['directory'], '/ ');
        $absoluteFileDir = $fileDirectory . $directory;
        $absoluteClientDir = $clientDirectory . $directory;
        if (is_dir($absoluteFileDir)) {
            if (rmdir($absoluteFileDir)) {
                die(json_encode(array('directory' => $directory)));
            }
        }
        die($absoluteFileDir);
    }
}

function handleUpload($filesData, $files) {
    global $clientDirectory, $fileDirectory, $payloadType;
    foreach ($filesData as $file) {
        $name = $file['name'];
        $id = $file['id'];
        $clientPath = $clientDirectory . '/' . urlencode($name);
        $filePath = $fileDirectory . '/' . $name;
        if (!empty($file['directory'])) {
            if (!is_dir($fileDirectory . $file['directory'])) {
                continue;
            }
            $filePath = $fileDirectory . $file['directory'] . '/' . $name;
        }

        if ($payloadType === 'json' && !empty($file['dataUrl'])) {
            $dataUrl = str_replace(' ', '+', substr($file['dataUrl'], strpos($file['dataUrl'], ',') + 1));
            $file = base64_decode($dataUrl);
            if (file_put_contents($filePath, $file)) {
                $response[] = array('url' => $clientPath, 'id' => $id);
            }
        } elseif ($payloadType === 'formData' && !empty($files[$name])) {
            if (move_uploaded_file($files[$name]['tmp_name'], $filePath)) {
                $response[] = array('url' => $clientPath, 'id' => $id);
            }
        }
    }
    return $response;
}

function handleRemove($existingUrls) {
    global $fileDirectory;
    $response = array();
    foreach ($existingUrls as $existingUrl) {
        $id = $existingUrl['id'];
        $name = explode('/', $existingUrl['url']);
        $name = end($name);
        $filePath = $fileDirectory . '/' . $name;
        if (!empty($existingUrl['directory'])) {
            if (!is_dir($fileDirectory . $existingUrl['directory'])) {
                continue;
            }
            $filePath = $fileDirectory . $existingUrl['directory'] . '/' . $name;
        }

        if (!file_exists($filePath) || unlink($filePath)) {
            $response[] = $id;
        }
    }
    return $response;
}

function rearrangeFiles($files) {
    $rearrangedFiles = array();
    foreach ($files as $fId => $ffFiles) {
        foreach ($ffFiles as $fKey => $fValues) {
            if (is_array($fValues)) {
                foreach ($fValues as $fIndex => $fValue) {
                    $rearrangedFiles[$fId][$fIndex][$fKey] = $fValue;
                }
            } else {
                $rearrangedFiles[$fId][0][$fKey] = $fValues;
            }
        }
    }
    $filesByName = array();
    foreach ($rearrangedFiles as $fId => $fValues) {
        foreach ($fValues as $fIndex => $fValue) {
            $filesByName[$fId][$fValue['name']] = $fValue;
        }
    }
    return $filesByName;
}

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
        $response['removeResponse'] = handleRemoveFiles($post['removedFiles']);
    }
    if (isset($post['files'])) {
        $response['uploadResponse'] = handleUploadFiles($post['files'], $files);
    }
    die(json_encode($response));
}

$single = empty($post[0]);
if (!empty($_GET['remove'])) {
    $removeResponse = handleRemoveFiles($single ? array($post) : $post);
    die(json_encode($single && !empty($removeResponse[0]) ? $removeResponse[0] : $removeResponse));
}
if (!empty($_GET['upload'])) {
    $uploadResponse = handleUploadFiles($single ? array($post) : $post , $files);
    die(json_encode($single && !empty($uploadResponse[0]) ? $uploadResponse[0] : $uploadResponse));
}

if (!empty($_GET['cd']) && !empty($post['directory'])) {
    $destinationDir = $post['directory'] === '/' ? '' : $post['directory'];
    $absoluteFileDir = $fileDirectory . $destinationDir;
    $absoluteClientDir = $clientDirectory . $destinationDir;
    if (is_dir($absoluteFileDir)) {
        $allFilesAndFolders = array_diff(scandir($absoluteFileDir), array('..', '.'));
        $existingUrls = array();
        $childDirectories = array();
        foreach ($allFilesAndFolders as $f) {
            if (is_dir($absoluteFileDir . '/' . $f)){
                $childDirectories[] = $destinationDir . '/' . $f;
            } else {
                $url = $absoluteClientDir . '/' . urlencode($f);
                $existingUrls[] = array('url' => $url);
            }
        }
        die(json_encode(array('existingUrls' => $existingUrls, 'directories' => $childDirectories)));
    }
}

if (!empty($_GET['mkdir']) && !empty($post['directory'])) {
    $directory = '/' . trim($post['directory'], '/ ');
    $absoluteFileDir = $fileDirectory . $directory;
    $absoluteClientDir = $clientDirectory . $directory;
    if (!is_dir($absoluteFileDir)) {
        mkdir($absoluteFileDir);
        die(json_encode(array('directory' => $directory)));
    }
}

if (!empty($_GET['rmdir']) && !empty($post['directory'])) {
    $directory = '/' . trim($post['directory'], '/ ');
    $absoluteFileDir = $fileDirectory . $directory;
    $absoluteClientDir = $clientDirectory . $directory;
    if (is_dir($absoluteFileDir)) {
        if (rmdir($absoluteFileDir)) {
            die(json_encode(array('directory' => $directory)));
        }
    }
}

if (!empty($_GET['search']) && !empty($post['search'])) {
    die(json_encode(getAllFilesAndFolders('/', true, array(), empty($post['search']) ? null : $post['search'])));
}

function getAllFilesAndFolders($directory, $recursive=false, $allFilesAndFolders=array(), $search=null) {
    global $clientDirectory, $fileDirectory;

    $scandir = $directory === '/' ? $fileDirectory : ($fileDirectory . '/' . $directory);
    foreach (array_diff(scandir($scandir), array('..', '.')) as $fileOrFolder) {
        if (is_dir($scandir . '/' . $fileOrFolder)) {
            $nestedDirectory = $directory . ($directory === '/' ? '' : '/') . $fileOrFolder;
            if (is_null($search) || stripos($fileOrFolder, $search) !== false) {
                $allFilesAndFolders[] = array(
                    'type' => 'directory',
                    'path' => $nestedDirectory
                );
            }
            if ($recursive) {
                $allFilesAndFolders = getAllFilesAndFolders($nestedDirectory, true, $allFilesAndFolders, $search);
            }
        } elseif (is_null($search) || stripos($fileOrFolder, $search) !== false) {
            $path = ($directory === '/' ? '' : $directory) . '/' . $fileOrFolder;
            $allFilesAndFolders[] = array(
                'type' => 'file',
                'url' => $clientDirectory . $path,
                'path' => $path
            );
        }
    }
    return $allFilesAndFolders;
}

function handleUploadFiles($filesData, $files) {
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
            $filePath = $fileDirectory . ($file['directory'] === '/' ? '' : $file['directory']) . '/' . $name;
            $clientPath = $clientDirectory . ($file['directory'] === '/' ? '' : $file['directory']) . '/' . urlencode($name);
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

function handleRemoveFiles($existingUrls) {
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

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
    die("<pre>POST: " . print_r($post, true) . "\nFILES" . print_r($files, true) . "\n\$_FILES: " . print_r($_FILES, true));
    die(json_encode($single && !empty($uploadResponse[0]) ? $uploadResponse[0] : $uploadResponse));
}

function handleUpload($filesData, $files) {
    global $clientDirectory, $fileDirectory, $payloadType;
    $response = array();

    foreach ($filesData as $file) {
        $name = $file['name'];
        $fileId = $file['fileId'];
        $clientPath = $clientDirectory . '/' . urlencode($name);
        $filePath = $fileDirectory . '/' . $name;

        if ($payloadType === 'json' && !empty($file['dataUrl'])) {
            $dataUrl = str_replace(' ', '+', substr($file['dataUrl'], strpos($file['dataUrl'], ',') + 1));
            $file = base64_decode($dataUrl);
            if (file_put_contents($filePath, $file)) {
                $response[] = array('url' => $clientPath, 'fileId' => $fileId);
            }
        } elseif ($payloadType === 'formData' && !empty($files[$name])) {
            if (move_uploaded_file($files[$name]['tmp_name'], $filePath)) {
                $response[] = array('url' => $clientPath, 'fileId' => $fileId);
            }
        }
    }
    return $response;
}

function handleRemove($existingUrls) {
    global $fileDirectory;
    $response = array();
    foreach ($existingUrls as $existingUrl) {
        $fileId = $existingUrl['fileId'];
        $name = explode('/', $existingUrl['url']);
        $existingFilePath = $fileDirectory . '/' . end($name);
        if (!file_exists($existingFilePath) || unlink($existingFilePath)) {
            $response[] = $fileId;
        }
    }
    return $response;
}

function removeFile($name) {
    global $fileDirectory;
    $existingFilePath = $fileDirectory . '/' . $name;
    if (file_exists($existingFilePath)) {
        unlink($existingFilePath);
    }
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

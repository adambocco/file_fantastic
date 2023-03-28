<?php

$clientDirectory = '/examples/uploads';
$fileDirectory =  $_SERVER['DOCUMENT_ROOT'] . '/examples/uploads';

$ffId = 'files';
$json = json_decode(file_get_contents('php://input'), true);
$uploadType = empty($json) ? 'formData' : 'json';
$post = $uploadType === 'json' ? $json : $_POST;

$files = rearrangeFiles($_FILES);
$files = empty($files[$ffId]) ? $files : $files[$ffId];

if (!empty($_GET['upload'])) {
    $response = array();
    $removedFiles = empty($post['removedFiles']) ? array() : $post['removedFiles'];
    $removedFiles = !empty($removedFiles) && empty($removedFiles[0]) ? array($removedFiles) : $removedFiles;
    unset($post['removedFiles']);
    $postFiles = empty($post['files']) ? $post : $post['files'];
    $single = empty($postFiles[0]);
    $postFiles = $single ? array($postFiles) : $postFiles;

    die("<pre>POST: " . print_r($_POST, true) . "\nJSON:" . print_r($json, true) . "\nFILES" . print_r($_FILES, true) . "\nfiles: " . print_r($files, true) . "\nRemoved Files: " . print_r($removedFiles, true) . "\nPOSTFILES: " . print_r($postFiles, true));

    foreach ($postFiles as $file) {
        $name = $file['name'];
        $fileId = $file['fileId'];
        $clientPath = $clientDirectory . '/' . urlencode($name);
        $filePath = $fileDirectory . '/' . $name;

        $fileResponse = null;

        if (file_exists($filePath) && !empty($file['fileModified']) && !empty($file['existingUrl'])) {
            removeFile($file['existingUrl']['name']);
        }
        if (!empty($file['filenameModified'])) {
            $originalFilePath = $fileDirectory . '/' . $file['existingUrl']['name'];
            rename($originalFilePath, $filePath);
            $fileResponse = array('url' => $clientPath, 'fileId' => $fileId);
        }

        if ($uploadType === 'json' && !empty($$file['dataUrl'])) {
            $dataUrl = str_replace(' ', '+', substr($file['dataUrl'], strpos($file['dataUrl'], ',') + 1));
            $file = base64_decode($dataUrl);
            file_put_contents($filePath, $file);
            $fileResponse = array('url' => $clientPath, 'fileId' => $fileId);
        } elseif ($uploadType === 'formData') {
            if (!empty($files[$name])) {
                if (move_uploaded_file($files[$name]['tmp_name'], $filePath)) {
                   $fileResponse = array('url' => $clientPath, 'fileId' => $fileId);
                }
            }
        }
        if ($fileResponse !== null) {
            $response[] = $fileResponse;
        }
    }

    foreach ($removedFiles as $file) {
        $name = explode('/', $file['url']);
        $name = array_pop($name);
        removeFile($name);
    }
    die(json_encode(!empty($response) && $single ? $response[0] : $response));
}
if (!empty($_GET['remove'])) {
    $files = empty($post[0]) ? array($post) : $post;
    foreach ($files as $file) {
        removeFile($file['name']);
    }
    die(json_encode(array('status' => 'success')));
}
if (!empty($_GET['save_filename'])) {
    $originalFilePath = $fileDirectory . '/' . $post['originalName'];
    $newFilePath = $fileDirectory . '/' . $post['name'];
    $clientPath = $clientDirectory . '/' . $post['name'];
    rename($originalFilePath, $newFilePath);
    die(json_encode(array('url' => $clientPath, 'fileId' => $post['fileId'])));
}
die(0);

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
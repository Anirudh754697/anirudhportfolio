<?php
header('Content-Type: application/json; charset=utf-8');
echo json_encode([
    'status' => 'ok',
    'php'    => PHP_VERSION,
    'site'   => 'Anirudh Guthula — portfolio',
]);

<?php
if (PHP_SAPI == 'cli-server')
{
    // To help the built-in PHP dev server, check if the request was actually for
    // something which should probably be served as a static file
    $url = parse_url($_SERVER['REQUEST_URI']);
    $file = __DIR__ . $url['path'];
    if (is_file($file))
    {
        return false;
    }
}
require __DIR__ . '/../vendor/autoload.php';
require '../includes/DbOperations.php';
session_start();
// Instantiate the app
$settings = require __DIR__ . '/../src/settings.php';
$app = new \Slim\App($settings);
// Set up dependencies
$dependencies = require __DIR__ . '/../src/dependencies.php';
$dependencies($app);
// Register middleware
$middleware = require __DIR__ . '/../src/middleware.php';
$middleware($app);
// Register routes
$routes = require __DIR__ . '/../src/routes.php';
$routes($app);
// Run app
$app->run();

function login( $request, $response){
    $request_body = $request->getParsedBody();
    $db = new DbOperations;

    $username = $request_body['username'];
    $password = $request_body['password'];

    $result = $db->login($username, $password);

    echo json_encode($result);
}

function slimSession($request)
{
    $request_body = $request->getParsedBody();
    $use = $request_body['use'];
    $db = new DbOperations;
    if ($use === 'login') {
        $username = $request_body['username'];
        $password = $request_body['password'];
        $result = $db->sessionLogin($username, $password);
    } else if ($use === 'logout') {
        $result = $db->sessionLogout();
    } else {
        // $data = $request_body['data'];
        // $result = $db->sessionUpload($data);
    }
    echo ($result);
}

function fetchCards($request){
    $db = new DbOperations;
    $result = $db->fetchCards();
    echo json_encode($result);
}



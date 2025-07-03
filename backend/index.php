<?php
// Disable error display to prevent HTML output in JSON responses
ini_set('display_errors', 0);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/api/TaskController.php';

try {
    $controller = new TaskController();
    $method = $_SERVER['REQUEST_METHOD'];

    // Get the request URI and clean it up
    $requestUri = $_SERVER['REQUEST_URI'];
    $path = parse_url($requestUri, PHP_URL_PATH);
    $path = rtrim($path, '/'); // Remove trailing slash

    // Get JSON input for POST/PUT requests
    $input = json_decode(file_get_contents('php://input'), true) ?? [];

    // Log requests in development mode only
    if (isset($_ENV['APP_ENV']) && $_ENV['APP_ENV'] !== 'production') {
        error_log("API Request - Method: $method, Path: $path");
    }

    // Handle routing
    if ($path === '' || $path === '/index.php' || $path === '/tasks') {
        // Handle base endpoints
        switch ($method) {
            case 'GET':
                $response = $controller->getAllTasks();
                break;

            case 'POST':
                $response = $controller->createTask($input);
                break;

            default:
                $response = ['success' => false, 'error' => 'Method not allowed'];
                break;
        }
    } elseif (preg_match('/\/tasks\/(\d+)$/', $path, $matches)) {
        // Handle /tasks/{id} endpoints
        $taskId = $matches[1];

        switch ($method) {
            case 'PUT':
                $response = $controller->updateTask($taskId, $input);
                break;

            case 'DELETE':
                $response = $controller->deleteTask($taskId);
                break;

            default:
                $response = ['success' => false, 'error' => 'Method not allowed for task operations'];
                break;
        }
    } else {
        $response = [
            'success' => false,
            'error' => 'Endpoint not found: ' . $path,
            'available_endpoints' => [
                'GET /tasks - Get all tasks',
                'POST /tasks - Create new task',
                'PUT /tasks/{id} - Update task',
                'DELETE /tasks/{id} - Delete task'
            ]
        ];
    }

} catch (Exception $e) {
    $response = [
        'success' => false,
        'error' => 'Server error: ' . $e->getMessage()
    ];
}

// Set appropriate HTTP status code
if (!$response['success']) {
    http_response_code(isset($response['error']) && strpos($response['error'], 'not found') !== false ? 404 : 400);
}

echo json_encode($response, JSON_PRETTY_PRINT);
?>
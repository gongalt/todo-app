<?php
require_once __DIR__ . '/../config/database.php';

class TaskController {
    private $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    // Get all tasks
    public function getAllTasks() {
        try {
            $stmt = $this->db->prepare("
                SELECT id, title, description, priority, completed,
                       created_at, completed_at
                FROM tasks
                ORDER BY
                    CASE priority
                        WHEN 'HIGH' THEN 1
                        WHEN 'MEDIUM' THEN 2
                        WHEN 'LOW' THEN 3
                    END,
                    title
            ");
            $stmt->execute();
            $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Convert boolean and format dates
            foreach ($tasks as &$task) {
                $task['completed'] = (bool) $task['completed'];
                $task['id'] = (string) $task['id'];
            }

            return [
                'success' => true,
                'data' => $tasks
            ];
        } catch (PDOException $e) {
            return [
                'success' => false,
                'error' => 'Failed to fetch tasks: ' . $e->getMessage()
            ];
        }
    }

    // Create new task
    public function createTask($data) {
        try {
            // Validate required fields
            if (empty($data['title']) || empty($data['priority'])) {
                return [
                    'success' => false,
                    'error' => 'Title and priority are required'
                ];
            }

            // Validate priority
            $valid_priorities = ['HIGH', 'MEDIUM', 'LOW'];
            if (!in_array($data['priority'], $valid_priorities)) {
                return [
                    'success' => false,
                    'error' => 'Invalid priority. Must be HIGH, MEDIUM, or LOW'
                ];
            }

            $stmt = $this->db->prepare("
                INSERT INTO tasks (title, description, priority)
                VALUES (:title, :description, :priority)
            ");

            $stmt->bindParam(':title', $data['title']);
            $stmt->bindParam(':description', $data['description']);
            $stmt->bindParam(':priority', $data['priority']);

            $stmt->execute();

            $taskId = $this->db->lastInsertId();

            // Return the created task
            return $this->getTaskById($taskId);

        } catch (PDOException $e) {
            return [
                'success' => false,
                'error' => 'Failed to create task: ' . $e->getMessage()
            ];
        }
    }

    // Update task (toggle completion)
    public function updateTask($id, $data) {
        try {
            $task = $this->getTaskById($id);
            if (!$task['success']) {
                return $task;
            }

            $completed = isset($data['completed']) ? (bool) $data['completed'] : null;
            $completed_at = $completed ? date('Y-m-d H:i:s') : null;

            $stmt = $this->db->prepare("
                UPDATE tasks
                SET completed = :completed, completed_at = :completed_at
                WHERE id = :id
            ");

            $stmt->bindParam(':completed', $completed, PDO::PARAM_BOOL);
            $stmt->bindParam(':completed_at', $completed_at);
            $stmt->bindParam(':id', $id);

            $stmt->execute();

            return $this->getTaskById($id);

        } catch (PDOException $e) {
            return [
                'success' => false,
                'error' => 'Failed to update task: ' . $e->getMessage()
            ];
        }
    }

    // Delete task
    public function deleteTask($id) {
        try {
            $stmt = $this->db->prepare("DELETE FROM tasks WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $result = $stmt->execute();

            if ($stmt->rowCount() === 0) {
                return [
                    'success' => false,
                    'error' => 'Task not found'
                ];
            }

            return [
                'success' => true,
                'message' => 'Task deleted successfully'
            ];

        } catch (PDOException $e) {
            return [
                'success' => false,
                'error' => 'Failed to delete task: ' . $e->getMessage()
            ];
        }
    }

    // Get single task by ID
    private function getTaskById($id) {
        try {
            $stmt = $this->db->prepare("
                SELECT id, title, description, priority, completed,
                       created_at, completed_at
                FROM tasks
                WHERE id = :id
            ");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $task = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$task) {
                return [
                    'success' => false,
                    'error' => 'Task not found'
                ];
            }

            // Convert types
            $task['completed'] = (bool) $task['completed'];
            $task['id'] = (string) $task['id'];

            return [
                'success' => true,
                'data' => $task
            ];
        } catch (PDOException $e) {
            return [
                'success' => false,
                'error' => 'Failed to fetch task: ' . $e->getMessage()
            ];
        }
    }
}
?>
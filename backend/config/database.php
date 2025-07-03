<?php
class Database {
    private $db_file;
    private $pdo;

    public function __construct() {
        $this->db_file = __DIR__ . '/../database/tasks.db';
        $this->initializeDatabase();
    }

    private function initializeDatabase() {
        try {
            // Create database file if it doesn't exist
            $this->pdo = new PDO("sqlite:" . $this->db_file);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Only create the table structure, not sample data
            $createTable = "
                CREATE TABLE IF NOT EXISTS tasks (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    description TEXT,
                    priority TEXT NOT NULL CHECK (priority IN ('HIGH', 'MEDIUM', 'LOW')),
                    completed BOOLEAN DEFAULT FALSE,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    completed_at DATETIME NULL
                );
            ";

            $this->pdo->exec($createTable);

            // Only insert sample data if table is empty
            $count = $this->pdo->query("SELECT COUNT(*) FROM tasks")->fetchColumn();
            if ($count == 0) {
                $sampleData = "
                    INSERT INTO tasks (title, description, priority, completed, created_at, completed_at) VALUES
                    ('Setup project structure', 'Create folders and initial files', 'HIGH', 1, '2024-01-01 10:00:00', '2024-01-01 11:00:00'),
                    ('Build task components', 'Create React components for the UI', 'MEDIUM', 0, '2024-01-02 09:00:00', NULL),
                    ('Implement PHP API', 'Build REST API with SQLite', 'HIGH', 0, '2024-01-03 14:00:00', NULL);
                ";
                $this->pdo->exec($sampleData);
            }

        } catch (PDOException $e) {
            throw new Exception("Database connection failed: " . $e->getMessage());
        }
    }

    public function getConnection() {
        return $this->pdo;
    }
}
?>
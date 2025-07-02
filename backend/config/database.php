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

            // Create tables if they don't exist
            $schema = file_get_contents(__DIR__ . '/../database/schema.sql');
            $this->pdo->exec($schema);

        } catch (PDOException $e) {
            throw new Exception("Database connection failed: " . $e->getMessage());
        }
    }

    public function getConnection() {
        return $this->pdo;
    }
}
?>
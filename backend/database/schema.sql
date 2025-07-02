-- SQLite schema for tasks
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT NOT NULL CHECK (priority IN ('HIGH', 'MEDIUM', 'LOW')),
    completed BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME NULL
);

-- Insert some sample data
INSERT INTO tasks (title, description, priority, completed, created_at, completed_at) VALUES
('Setup project structure', 'Create folders and initial files', 'HIGH', 1, '2024-01-01 10:00:00', '2024-01-01 11:00:00'),
('Build task components', 'Create React components for the UI', 'MEDIUM', 0, '2024-01-02 09:00:00', NULL),
('Implement PHP API', 'Build REST API with SQLite', 'HIGH', 0, '2024-01-03 14:00:00', NULL);
# Todo List Manager

A modern, full-stack todo application built with Next.js, TypeScript, PHP, and SQLite.

## 🚀 Features

- ✅ Create, read, update, and delete tasks
- 🎯 Priority-based task management (High, Medium, Low)
- 📊 Real-time task statistics
- 🔄 Optimistic UI updates
- 📱 Responsive design
- ⚡ Fast SQLite database
- 🔒 Input validation and error handling

## 🏗️ Architecture

```
Frontend (Next.js + TypeScript)
├── React Components (UI)
├── Custom Hooks (State Management)
└── API Integration (REST)
        ↓
Backend (PHP + SQLite)
├── REST API Endpoints
├── Database Layer (PDO)
└── Data Validation
```

## 📁 Project Structure

```
todo-app/
├── src/                    # Frontend source code
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   │   ├── task/         # Task-specific components
│   │   └── ui/           # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and constants
│   └── types/            # TypeScript type definitions
└── backend/               # PHP backend
    ├── api/              # API controllers
    ├── config/           # Database configuration
    └── database/         # SQLite database and schema
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- PHP 8.0+
- SQLite3

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Start PHP development server
php -S localhost:8000

# Database will be automatically initialized
```

### Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create new task |
| PUT | `/tasks/{id}` | Update task (toggle completion) |
| DELETE | `/tasks/{id}` | Delete task |

## 🗃️ Database Schema

```sql
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT CHECK (priority IN ('HIGH', 'MEDIUM', 'LOW')),
    completed BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME NULL
);
```

## 🧪 Development

### Key Components
- **useTasks Hook**: Central state management for task operations
- **TaskForm**: Form for creating new tasks
- **TaskList**: Displays and filters tasks
- **TaskItem**: Individual task component with actions

### Code Quality Features
- TypeScript for type safety
- React memo for performance optimization
- Proper error handling and loading states
- Responsive design with Tailwind CSS
- Clean separation of concerns

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
```

### Backend (Any PHP hosting)
- Upload backend files
- Ensure SQLite write permissions
- Configure web server to handle API routes

## 🧩 Built With

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: PHP 8, SQLite, PDO
- **UI Components**: Radix UI, Lucide React
- **Styling**: Tailwind CSS with custom components

## 📈 Future Enhancements

- [ ] User authentication
- [ ] Task categories/tags
- [ ] Due dates and reminders
- [ ] Task sharing and collaboration
- [ ] Mobile app (React Native)
- [ ] Real-time updates with WebSockets

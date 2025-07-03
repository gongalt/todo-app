# Development Guide

## Environment Configuration

### Frontend Environment Variables

Create a `.env.local` file in the root directory:

```bash
# API endpoint for backend communication
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend Configuration

Create a `.env` file in the `backend/` directory:

```bash
# Application environment (development, production)
APP_ENV=development

# Database configuration
DB_PATH=./database/tasks.db

# CORS allowed origins (comma-separated)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

## Code Quality Standards

### TypeScript
- Use strict type checking
- Define interfaces for all data structures
- Avoid `any` types

### React Components
- Use `React.memo` for performance optimization
- Implement proper prop types with JSDoc
- Extract complex logic into custom hooks
- Use `useCallback` and `useMemo` appropriately

### PHP Backend
- Follow PSR-12 coding standards
- Use PDO for database operations
- Implement proper error handling
- Document all public methods

### Database
- Use prepared statements for all queries
- Implement proper data validation
- Add database constraints for data integrity

## Testing Strategy

### Frontend Testing
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

### Backend Testing
```bash
# Install PHPUnit
composer require --dev phpunit/phpunit

# Run tests
./vendor/bin/phpunit
```

## Performance Considerations

### Frontend
- Implement lazy loading for large lists
- Use React.memo for expensive components
- Minimize re-renders with proper dependency arrays
- Consider implementing virtual scrolling for large datasets

### Backend
- Add database indexes for frequently queried columns
- Implement request caching for GET endpoints
- Use database connection pooling in production
- Consider implementing rate limiting

## Security Best Practices

### Frontend
- Validate all user inputs
- Sanitize data before display
- Use HTTPS in production
- Implement proper error boundaries

### Backend
- Use prepared statements to prevent SQL injection
- Validate and sanitize all inputs
- Implement proper CORS policies
- Add request rate limiting
- Use HTTPS and proper headers in production 
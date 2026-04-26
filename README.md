# Mental Health Mate

Mental Health Mate is a full-stack web application built with React and Flask that aims to provide a supportive, easy-to-use experience for users exploring mental wellness resources and tracking their mental health journey.

## Features

- User-friendly React frontend.
- Flask REST API backend.
- Database integration with SQLAlchemy.
- Environment-based configuration.
- Support for local development and deployment.
- Modular structure for future expansion.

## Tech Stack

- Frontend: React.js
- Backend: Flask
- Database: PostgreSQL / SQLite / MySQL
- ORM: SQLAlchemy
- Dependency Management: Pipenv / npm
- Deployment: Render / Heroku

## Project Structure

- `src/front`: React frontend.
- `src/api`: Flask backend API.
- `.env`: Environment variables.
- `migrations/`: Database migration files.

## Installation

### Prerequisites

Make sure you have the following installed:

- Python 3.10+
- Node.js 14+
- Pipenv
- A database engine such as PostgreSQL, SQLite, or MySQL

### Backend Setup

1. Install backend dependencies:
   ```bash
   pipenv install
   ```

2. Create a `.env` file from the example file:
   ```bash
   cp .env.example .env
   ```

3. Configure your `DATABASE_URL` in `.env`.

4. Run database migrations:
   ```bash
   pipenv run migrate
   pipenv run upgrade
   ```

5. Start the backend:
   ```bash
   pipenv run start
   ```

### Frontend Setup

1. Install frontend dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run start
   ```

## Database

This project uses SQLAlchemy for database abstraction. Depending on your setup, you can use one of the following database URLs:

- SQLite: `sqlite:////test.db`
- MySQL: `mysql://username:password@localhost:port/example`
- PostgreSQL: `postgres://username:password@localhost:5432/example`

## Seeding Test Users

To create sample users in the database, run:

```bash
flask insert-test-users 5
```

## Deployment

This application is ready to deploy on Render or Heroku. Make sure your environment variables are configured correctly before deployment.

## Disclaimer

Mental Health Mate is intended for educational and informational purposes only. It is not a substitute for professional mental health care, diagnosis, or emergency support. If you or someone you know is in crisis, contact local emergency services or a licensed mental health professional immediately.

## Contributing

Contributions are welcome. If you'd like to improve the project, please open an issue or submit a pull request.

## License

Add your license here.

## Acknowledgments

This project was originally based on a 4Geeks Academy React + Flask starter template. Additional customization and improvements were made for the Mental Health Mate project.

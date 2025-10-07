# Moneymate Frontend Setup Guide

This guide provides instructions on how to set up and run the Moneymate frontend application locally.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (which includes npm)

## 1. Installation

First, clone the repository and navigate into the project directory. Then, install the required dependencies using npm:

```bash
npm install
```

This command will download all the necessary packages defined in `package.json` and create a `node_modules` directory.

## 2. Environment Variables

This project does not appear to require a `.env` file for its basic client-side functionality to run. All required configurations are currently handled within the application's source code.

## 3. Running the Application

You can run the application in two modes: development and production.

### Development Mode

To run the application in development mode with hot-reloading, use the following command:

```bash
npm run dev
```

The application should be accessible at `http://localhost:3000`.

**Note:** There is a persistent issue preventing the development server from starting correctly. This is likely due to a server-side rendering (SSR) conflict that needs to be debugged.

### Production Mode

To run the application in production mode, you first need to create a production build:

```bash
npm run build
```

This command will create an optimized build of the application in the `.next` directory.

Once the build is complete, you can start the production server:

```bash
npm run start
```

The application should be accessible at `http://localhost:3000`.

## 4. Linting

To check the code for any linting errors and to enforce code style, run the following command:

```bash
npm run lint
```

This will run ESLint on the project files and report any issues in the console.
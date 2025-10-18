# MoneyMate

MoneyMate is a personal finance application designed to help you track your income and expenses, manage your accounts, and gain insights into your financial habits.

## Tech Stack

- **React Native:** A framework for building native mobile apps using JavaScript and React.
- **TypeScript:** A statically typed superset of JavaScript that adds type safety to your code.
- **Firebase Authentication:** A service for managing user authentication.
- **FastAPI:** A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
- **Axios:** A promise-based HTTP client for the browser and Node.js.
- **MMKV:** An efficient, small, easy-to-use mobile key-value storage framework developed by WeChat.
- **Zustand:** A small, fast, and scalable state-management solution for React.
- **Jest:** A delightful JavaScript Testing Framework with a focus on simplicity.
- **React Native Testing Library:** A library for testing React Native components.

## Repository Structure

```
/src
 ├── api/                 # Axios client + API service modules
 ├── components/          # Reusable UI components
 ├── hooks/               # Custom hooks (useAuth, useFetch, etc.)
 ├── navigation/          # Stack, Tab, and Drawer navigators
 ├── screens/             # Screen-level components
 ├── store/               # Zustand or Recoil global state management
 ├── theme/               # Colors, typography, dark/light mode logic
 ├── utils/               # Formatters, validators, helpers
 ├── assets/              # Static images, icons, fonts
 ├── tests/               # Unit and E2E test files
 └── App.tsx              # Entry point
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Kev9586/Moneymate_frontend.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd Moneymate_frontend/MoneyMate
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up environment variables:**
   - Create a `.env` file in the root of the `MoneyMate` directory.
   - Add the following variables:
     ```
       BASE_API_URL=https://api.moneymate.com
     FIREBASE_API_KEY=<from backend>
     FIREBASE_AUTH_DOMAIN=<from backend>
     ```
5. **Link Firebase:**
   - Follow the instructions in the Firebase documentation to set up a new project and add the necessary configuration files to the `android` and `ios` directories.

## Running the App

- **iOS:**
  ```bash
  npm run ios
  ```
- **Android:**
  ```bash
  npm run android
  ```

## Running Tests

- **Unit:**
  ```bash
  npm test
  ```
- **E2E:**
  ```bash
  npm run test:e2e
  ```

## Developer Workflow

1. Create a new branch for your feature: `feature/*`
2. Make your changes and commit them with a descriptive message.
3. Push your branch to the remote repository.
4. Create a pull request to merge your changes into the `develop` branch.

## Figma Reference

The Figma designs for this project can be found in the `figma_moneymate` directory in the root of the `Moneymate_backend` repository.

## Backend Reference

The backend for this project is a FastAPI application. The source code can be found at [https://github.com/Kev9586/Moneymate_backend.git](https://github.com/Kev9586/Moneymate_backend.git). The API documentation is generated automatically by FastAPI and can be accessed at the `/docs` endpoint of the running backend.

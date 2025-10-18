# MoneyMate - React Native Frontend

This is the official frontend for the MoneyMate MVP, a personal finance application built with React Native.

## Project Overview

This project is a high-quality, production-ready mobile application that provides a seamless and animated user experience for managing personal finances. It connects to a live backend API for all data operations.

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Kev9586/Moneymate_frontend.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd Moneymate_frontend/MoneyMate
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Install iOS pods:**
    ```bash
    npx pod-install ios
    ```
5.  **Run the application:**
    - For iOS: `npx react-native run-ios`
    - For Android: `npx react-native run-android`

## Environment Variables

Create a `.env` file in the root of the `MoneyMate` directory and add the following variables. These are required for the application to connect to the backend services.

```env
# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

# API
BASE_API_URL=

# Optional: For testing notifications
NOTIFICATION_KEY=
```

## Directory Structure

```
/src
  /components       # Reusable UI components
  /screens          # Screen-level components
  /navigation       # Stack & Tab navigation
  /services         # API & helpers
  /store            # Zustand global state
  /utils            # Helpers, constants
```

## Important Notes

-   **Backend Repository:** The backend for this application can be found at [https://github.com/Kev9586/Moneymate_backend.git](https://github.com/Kev9586/Moneymate_backend.git). This repository is essential for understanding API endpoints, request/response structures, and authentication flows.
-   **Live API Required:** This application is designed to work with a live backend API. Ensure that the environment variables are configured correctly.
-   **No Backend Files:** This repository does not contain any backend files.
-   **Figma Designs:** All design assets and references are located in the `figma_moneymate` directory at the root of the repository. This folder should never be deleted.
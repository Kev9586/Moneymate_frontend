# MoneyMate - Personal Finance Assistant

MoneyMate is a comprehensive React Native application designed to help users manage their personal finances with ease and security.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)
- JDK 17

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kev9586/Moneymate_frontend.git
   cd Moneymate_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro Bundler**
   ```bash
   npm start
   ```

5. **Run the app**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   ```

## 📱 Features

### Core Features
- **Account Management**: Link and manage multiple bank accounts
- **Transaction Tracking**: Categorize and monitor income/expenses
- **Budget Planning**: Set and track budgets with alerts
- **Goal Setting**: Create and monitor savings goals
- **Reports & Analytics**: Visual insights with charts and graphs
- **Secure Authentication**: Email/password with biometric options

### Advanced Features
- **Offline Sync**: Work offline with automatic sync when online
- **Real-time Notifications**: Budget alerts and transaction notifications
- **Data Export**: Export reports as CSV/PDF
- **Multi-currency Support**: Handle different currencies
- **Dark Mode**: Toggle between light and dark themes

## 🏗 Architecture

### Technology Stack
- **Framework**: React Native 0.74.x
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation v6
- **UI Components**: React Native Paper (Material Design 3)
- **Animations**: React Native Reanimated
- **Charts**: React Native SVG Charts
- **Storage**: React Native Encrypted Storage
- **API Client**: Axios with interceptors
- **Testing**: Jest + React Native Testing Library + Detox

### Project Structure
```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
├── navigation/         # Navigation configuration
├── store/             # Redux store and slices
├── services/          # API services
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── constants/         # App constants and themes
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm start                # Start Metro bundler
npm run android         # Run on Android
npm run ios            # Run on iOS

# Code Quality
npm run lint           # Run ESLint
npm run lint:fix       # Fix linting issues
npm test              # Run Jest tests
npm run test:watch    # Run tests in watch mode
npm run test:e2e      # Run Detox E2E tests

# Build
npm run build:android  # Build Android APK
npm run build:ios     # Build iOS app
```

### Code Quality

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Husky** for git hooks
- **Conventional Commits** for commit messages

### Environment Variables

Create a `.env` file in the root directory:

```env
API_BASE_URL=https://bank-expense-tracker.onrender.com/api/v1
API_TIMEOUT=10000
ENABLE_FLIPPER=false
```

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
# iOS
npm run test:e2e:ios

# Android
npm run test:e2e:android
```

### Test Coverage
```bash
npm run test:coverage
```

## 📚 API Integration

The app integrates with the MoneyMate backend API:
- **Base URL**: https://bank-expense-tracker.onrender.com/api/v1
- **Documentation**: Available at `/docs` endpoint
- **Authentication**: JWT token-based
- **Rate Limiting**: Configured per endpoint

### Key Endpoints
- `POST /auth/login` - User authentication
- `GET /accounts` - Fetch user accounts
- `GET /transactions` - Fetch transactions
- `POST /budgets` - Create budgets
- `GET /reports` - Generate reports

## 🔒 Security

### Data Protection
- **Encryption**: All sensitive data encrypted at rest
- **Secure Storage**: JWT tokens stored in encrypted storage
- **API Security**: All requests use HTTPS
- **Biometric Auth**: Optional fingerprint/face ID

### Privacy
- **No Data Collection**: Personal financial data stays private
- **GDPR Compliant**: User data deletion on request
- **Local Processing**: Sensitive calculations done locally

## 🎨 UI/UX Guidelines

### Design System
- **Color Palette**: Material Design 3 colors
- **Typography**: System fonts with consistent scaling
- **Spacing**: 8px grid system
- **Animations**: Smooth 60fps animations
- **Accessibility**: WCAG 2.1 AA compliant

### Responsive Design
- **Adaptive Layouts**: Works on phones and tablets
- **Orientation Support**: Portrait and landscape
- **Safe Areas**: Proper handling of notches/home indicators

## 🚀 Deployment

### Android
```bash
# Generate signed APK
npm run build:android:release

# Generate AAB for Play Store
npm run build:android:bundle
```

### iOS
```bash
# Build for App Store
npm run build:ios:release
```

### CI/CD
GitHub Actions workflow includes:
- Automated testing
- Code quality checks
- Build generation
- Deployment to app stores

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards
- Follow ESLint configuration
- Write TypeScript with strict mode
- Add unit tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Documentation**: Check the `/docs` folder
- **Issues**: Create GitHub issues for bugs
- **Discussions**: Use GitHub Discussions for questions

## 🗺 Roadmap

### v1.1.0
- [ ] Biometric authentication
- [ ] Receipt scanning with OCR
- [ ] Bill reminders and notifications
- [ ] Investment tracking

### v1.2.0
- [ ] Multi-user family accounts
- [ ] Shared budgets and goals
- [ ] Advanced analytics and insights
- [ ] Integration with banking APIs

### v2.0.0
- [ ] AI-powered financial advisor
- [ ] Cryptocurrency support
- [ ] Advanced investment portfolio tracking
- [ ] Desktop companion app

---

Built with ❤️ by the MoneyMate team

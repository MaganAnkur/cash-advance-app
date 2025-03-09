# Cash Advance App

A React Native application that enables users to request cash advances with offline support and real-time synchronization.

<video width="100%" controls>
  <source src="./demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Features

- 💰 Request cash advances with instant feedback
- 🔄 Offline support with automatic synchronization
- 📱 Modern, native UI with smooth animations
- 🎯 Type-safe development with TypeScript
- 🚀 High-performance state management and storage

## Documentation

- [Design Document](./DESIGN_DOCUMENT.md) - Detailed technical architecture and decisions

## Tech Stack

- React Native
- TypeScript
- TanStack Query (React Query)
- Zustand
- React Navigation
- Reanimated
- MMKV Storage

## Getting Started

### Prerequisites

- Node.js >= 18
- Ruby >= 2.7.5 (for iOS)
- JDK 11 (for Android)
- Android Studio (for Android)
- Xcode (for iOS)
- CocoaPods (for iOS)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/MaganAnkur/cash-advance-app.git
cd cash-advance-app
```

2. Install dependencies:

```bash
# Install JavaScript dependencies
npm install

# Install iOS dependencies
npx pod-install
```

### Running the App

#### iOS

```bash
# Start Metro bundler
npm start

# In a new terminal, run the iOS app
npm run ios
```

#### Android

```bash
# Start Metro bundler
npm start

# In a new terminal, run the Android app
npm run android
```

## Project Structure

```
src/
├── api/          # API services and hooks
├── components/   # Reusable components
├── navigation/   # Navigation configuration
├── providers/    # Context providers
├── screens/      # Screen components
├── store/        # State management
└── types/        # TypeScript definitions
```

## Troubleshooting

### Common Issues

1. **Metro bundler issues**

   ```bash
   # Clear Metro cache
   npm start -- --reset-cache
   ```

2. **iOS build fails**

   ```bash
   cd ios
   bundle exec pod deintegrate
   bundle exec pod install
   ```

3. **Android build fails**
   ```bash
   cd android
   ./gradlew clean
   ```

## Acknowledgments

- [React Native Community](https://reactnative.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)

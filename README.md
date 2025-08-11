# Retention Demo App 📱

A **React Native** (Expo) application demonstrating different real-world app scenarios using **GraphQL**.  
Each screen is built as an isolated example, making it easy to learn or reuse for your own projects.

---

## 🚀 Features

This app includes multiple example screens:

- **Mood Check-ins** – Daily/weekly check-in tracking
- **Progress Tracking** – Displays weekly completion progress
- **Messages** – List of user messages from GraphQL API
- **Countries List** – Fetches and displays countries with emoji flags
- **Posts** – Example of listing post data from GraphQL
- **More Examples** – Each screen shows a unique GraphQL query/mutation use case

---

## 🛠️ Tech Stack

- **React Native** (via Expo)
- **TypeScript**
- **GraphQL** (`@apollo/client`)
- **Expo Router / React Navigation**
- **AsyncStorage** (local storage examples)
- **Mock GraphQL Server** (for demo purposes)

---

## 📂 Project Structure

```
retention-demo/
├─ App.tsx # Main app entry
├─ babel.config.js
├─ jest.config.js # Jest testing config
├─ package.json
├─ tsconfig.json
├─ README.md
├─ server/
│ ├─ mockServer.ts # Mock GraphQL server
│ └─ types.d.ts # Types for server
├─ src/
│ ├─ graphql/
│ │ └─ client.ts # Apollo client setup
│ ├─ navigation/
│ │ └─ RootStack.tsx # Navigation stack
│ └─ screens/
│ ├─ CheckInScreen.tsx
│ ├─ ProgressScreen.tsx
│ └─ MessagesScreen.tsx
└─ tests/
└─ CheckInScreen.test.tsx

```

---

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/vyshnaviTess/retention-demos.git
   cd retention-demos
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the mock server** (for GraphQL data)
   ```bash
   npm run mock-server
   ```

4. **Start the Expo app**
   ```bash
   npx expo start
   ```

---

## 🧪 Example Scenarios

- **Check-in Flow:** Demonstrates local state + GraphQL mutation to log mood.
- **Progress Tracker:** Uses GraphQL query to fetch weekly completion stats.
- **Countries List:** Simple GraphQL query example with FlatList rendering.
- **Posts:** Querying and displaying post data with pagination.

---

## 🔒 Privacy & Data

This demo app uses mock data and is fully GDPR/CCPA compliant for development purposes — no real personal data is collected.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Made with ❤️ using React Native + GraphQL**

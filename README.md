# 🏏 Stumps - Cricket Scorer

**Fast cricket scoring for turf and street matches**

A modern, mobile-first Progressive Web App (PWA) for scoring cricket matches with an interactive toss feature and real-time scoring capabilities.

---

## ✨ Features

### 🪙 Interactive Toss
- **3D animated coin flip** with realistic physics
- Strategic logic with 55% user advantage
- Choose Heads or Tails before the flip
- Winner decides to bat or bowl first

### 📊 Live Scoring
- Quick-tap run buttons (0, 1, 2, 3, 4, 6)
- Wicket tracking
- Extras: Wide, No Ball, Bye (with additional runs)
- Real-time score updates
- Over-by-over history

### 🎯 Match Management
- Customizable overs (1-50)
- Customizable wickets (1-11)
- Two innings support
- Target chase display
- Match result calculation
- Undo last ball

### 📱 PWA Support
- Install as mobile app
- Works offline
- Screen wake lock during scoring
- Responsive design for all devices

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SAIDEEKSHITHV/Stumps-Cricket-Scorer.git
   cd Stumps-Cricket-Scorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

---

## 🎮 How to Use

1. **Create Match**
   - Enter Team A and Team B names
   - Set number of overs (default: 6)
   - Set number of wickets (default: 6)
   - Click "Proceed to Toss 🪙"

2. **Toss**
   - Choose Heads or Tails
   - Watch the animated coin flip
   - Winner decides to bat or bowl first

3. **Score the Match**
   - Tap run buttons to add runs
   - Use action buttons for wickets and extras
   - View current over and over history
   - Undo mistakes with the undo button

4. **Match Complete**
   - View final scores
   - See match winner
   - Start a new match or super over

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS with animations
- **PWA**: vite-plugin-pwa
- **State Management**: React Hooks (useReducer)
- **Storage**: LocalStorage for match persistence

---

## 📁 Project Structure

```
Stumps-Cricket-Scorer/
├── public/
│   ├── icons/           # PWA icons
│   └── manifest.json    # PWA manifest
├── src/
│   ├── components/      # React components
│   │   ├── CreateMatch.jsx
│   │   ├── TossScreen.jsx
│   │   ├── ScoringScreen.jsx
│   │   ├── MatchResult.jsx
│   │   └── ...
│   ├── hooks/           # Custom hooks
│   │   └── useMatchState.js
│   ├── utils/           # Utility functions
│   │   ├── matchLogic.js
│   │   ├── storage.js
│   │   └── wakeLock.js
│   ├── App.jsx          # Main app component
│   ├── App.css          # Global styles
│   └── main.jsx         # Entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🎨 Features Breakdown

### Toss Screen
- 4-phase interactive flow
- CSS 3D animations (2880° rotation)
- Strategic weighted random (55% user advantage)
- Trophy celebration effects

### Scoring Screen
- Large, touch-friendly buttons
- Color-coded actions (blue for 4s, purple for 6s, red for wickets)
- Real-time over display
- Collapsible over history
- Chase target tracking

### Match Logic
- Automatic innings switching
- Target calculation
- Win/loss/tie determination
- Super over support for ties

---

## 📱 PWA Installation

### On Mobile
1. Open the app in your mobile browser
2. Tap the "Add to Home Screen" option
3. The app will install like a native app

### On Desktop
1. Open the app in Chrome/Edge
2. Click the install icon in the address bar
3. Click "Install"

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**SAI DEEKSHITH V**

- GitHub: [@SAIDEEKSHITHV](https://github.com/SAIDEEKSHITHV)

---

## 🙏 Acknowledgments

- Built with React and Vite
- Inspired by the need for fast, simple cricket scoring
- Designed for turf and street cricket enthusiasts

---

**Enjoy scoring with Stumps! 🏏**

# 🎮 Blink Tac Toe - Darban.ai Frontend Challenge

A fun twist on classic Tic Tac Toe built for the **Frontend Developer Challenge** by [Darban.ai](https://darban.ai). This 2-player game uses emoji categories instead of Xs and Os, includes a vanishing rule, and delivers a playful UI powered by React and GSAP animations.

🌐 **Live Demo**: [https://blink-tic-toe-darban.netlify.app](https://blink-tic-toe-darban.netlify.app)

---

## 🛠️ Tech Stack

- **React.js**
- **Tailwind CSS**
- **GSAP (GreenSock)** – for intro animations
- **Framer Motion** – for smooth UI transitions
- **Vite** – for fast builds and dev server

---

## 🎲 Game Features

### Core Gameplay
- 3x3 grid, turn-based 2-player game
- Each player chooses an emoji category (e.g. Animals, Food, Sports)
- Players are randomly assigned an emoji from their category each turn
- A maximum of 3 emojis per player on the board at any time
- If a player places a 4th emoji, the oldest one vanishes (FIFO logic)
- Winning condition: 3 of the same player's emojis in a line (row/column/diagonal)

### ✅ Completed Features
- **Emoji Category Selector** at game start
- **Vanishing Emoji Logic** with position lockout
- **GSAP Animated Intro** for a cool, dynamic start
- **Winning Line Highlight** to visually celebrate victory
- **Responsive UI** for desktop and mobile
- **Game Rules Modal** to guide first-time players
- **"Play Again" button** for quick restarts

---







# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

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
- **Framer Motion Transitions** on emoji placements and removals
- **Winning Line Highlight** to visually celebrate victory
- **Responsive UI** for desktop and mobile
- **Game Rules Modal** to guide first-time players
- **"Play Again" button** for quick restarts

---

## 📁 Project Structure

```
src/
├── assets/           # Images and emoji assets
├── components/       # GameBoard, Cell, Header, Modal, etc.
├── utils/            # Game logic and emoji handlers
├── App.jsx           # Main application component
├── main.jsx          # ReactDOM entry point
└── index.css         # Tailwind and global styles
```

---

## 🧠 Vanishing Feature Explained

To maintain a maximum of 3 emojis per player on the board:
- Emojis are tracked using a queue structure per player
- When a 4th emoji is placed, the oldest (first-in) emoji is automatically removed
- A restriction prevents placing a new emoji on the just-cleared spot

---

## 🤔 If I Had More Time...

With additional time, I would:
- Add a **multiround score tracker**
- Integrate **sound effects** for feedback
- Let users **upload custom emojis or create their own categories**
- Add **online multiplayer** capabilities
- Improve **accessibility** (keyboard support and screen reader compatibility)

---

## 📌 Submission Requirements

- ✅ GitHub Repo: [Blink-Tac-Toe-DARBAN-Ai](https://github.com/Yashkumarverma623/Blink-Tac-Toe-DARBAN-Ai)
- ✅ Live Link: [https://blink-tic-toe-darban.netlify.app](https://blink-tic-toe-darban.netlify.app)
- ✅ Detailed README
- ✅ Commit history reflecting iterative development

---

## 🙏 Special Thanks

Thanks to **Darban.ai** for designing such a creative challenge! This project was a great opportunity to demonstrate frontend development, game logic, and playful design.

---

### 💬 Feedback is welcome! If you liked it, feel free to ⭐ this repo.
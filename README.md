# Chronify - Countdown Timer App

A modern, glassmorphism-styled countdown timer application that allows users to create, manage, and track multiple timers with a beautiful cosmic-themed interface.

## 🚀 Demo

**Live Demo:** https://jubed437.github.io/Countdown_Timer/


## 🌟 Features

### Timer Management
- **Create Multiple Timers** - Add unlimited countdown timers with custom names and descriptions
- **Edit & Delete** - Modify existing timers or remove them with hover-to-reveal action buttons
- **Real-time Status** - Dynamic status indicators showing active (green) or expired (red) timers
- **Persistent Storage** - All timers saved to localStorage for session persistence

### User Interface
- **Glassmorphism Design** - Modern frosted glass effect with backdrop blur
- **Cosmic Themes** - Multiple space-themed backgrounds to choose from
- **Smooth Animations** - Pop-in/pop-out transitions when switching between timers
- **Responsive Layout** - Clean sidebar with scrollable timer list and main display area

### Timer Display
- **Live Countdown** - Real-time countdown showing days, hours, minutes, and seconds
- **Visual Feedback** - Each time unit displayed in styled glassmorphism containers
- **Expiration Alerts** - Clear visual indication when timers expire
- **End Time Display** - Shows the target date and time for each timer

### Interactive Elements
- **Hover Effects** - Edit/delete buttons appear on timer hover
- **Theme Switching** - Dropdown to change background themes
- **Modal Forms** - Clean popup forms for adding/editing timers
- **Welcome Screen** - Friendly message when no timers exist



## 🛠️ Technologies Used

- **HTML5** - Semantic structure and form elements
- **CSS3** - Glassmorphism effects, animations, and responsive design
- **JavaScript** - Timer logic, DOM manipulation, and localStorage
- **Font Awesome** - Icons for edit/delete buttons
- **Google Fonts** - Oxanium font family

## 📁 Project Structure

```
Countdown_Timer/
├── index.html          # Main HTML structure
├── style.css           # Glassmorphism styling and animations
├── script.js           # Timer functionality and interactions
├── images/             # Background theme images
│   ├── cosmic-spiral-galaxy.jpg
│   ├── dark-fantasy-scene.jpg
│   └── galaxy-night-view.jpg
└── README.md           # Project documentation
```

## 🎯 Key Functions

- `addTimer()` - Creates new timers or updates existing ones
- `selectTimer()` - Displays selected timer with animations
- `updateCountdown()` - Real-time countdown calculations
- `deleteTimer()` - Removes timers with cleanup
- `changeTheme()` - Switches background themes
- `showTimersList()` - Renders timer list in sidebar

## 🎨 Design Features

- **Glassmorphism Effects** - Semi-transparent backgrounds with blur
- **Smooth Transitions** - 0.3-0.4s animations for all interactions
- **Hidden Scrollbars** - Clean scrolling without visible scrollbars
- **Dynamic Colors** - Status-based color coding for timer states
- **Responsive Typography** - Scalable fonts and spacing

## 📱 Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

*Note: Glassmorphism effects work best in modern browsers with backdrop-filter support.*
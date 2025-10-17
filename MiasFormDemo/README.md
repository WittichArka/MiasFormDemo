# MiasFormDemo

## Overview
MiasFormDemo is a single-page HTML application that features a splash screen with an SVG triangle, a Bootstrap-styled fixed top menu, and smooth scrolling navigation to different sections of the page. The application is designed to provide a simple and user-friendly interface.

## Features
- **Splash Screen**: Displays a simple SVG triangle for two seconds before fading out.
- **Fixed Top Menu**: Includes a hamburger button that reveals a side menu with the following items:
  - Home
  - À propos
  - Adresse/Contact
- **Smooth Scrolling**: Clicking on a menu item scrolls to the corresponding section of the page.
- **Responsive Design**: The application is styled using Bootstrap for a responsive layout.

## File Structure
```
MiasFormDemo
├── wwwroot
│   └── index.html          # Main structure of the single-page application
├── assets
│   ├── css
│   │   └── styles.css      # CSS styles for the application
│   └── js
│       └── app.js         # JavaScript functionality for the application
├── .gitignore              # Specifies files and directories to ignore by Git
└── README.md               # Documentation for the project
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd MiasFormDemo
   ```
3. Open the `index.html` file in a web browser to view the application.

## Usage
- Upon loading, the splash screen will display for two seconds.
- The fixed top menu will be visible after the splash screen fades out.
- Click on the hamburger button to reveal the side menu.
- Select a menu item to scroll to the corresponding section of the page.

## License
This project is licensed under the MIT License.
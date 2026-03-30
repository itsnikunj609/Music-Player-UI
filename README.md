🎵 Web Music Player

A fully responsive Spotify-inspired web music player built using HTML, CSS, and JavaScript.
This project allows users to browse albums, view songs dynamically, and play audio directly within the browser, replicating the core experience of modern music streaming platforms.


📌 Project Overview

The Web Music Player is a front-end focused application designed to demonstrate:

dynamic DOM manipulation
asynchronous JavaScript (fetching song lists)
audio playback control
responsive UI design

The interface is inspired by modern music streaming apps such as Spotify, giving users a familiar and intuitive experience.


✨ Key Features
🎧 Music Playback
Play, pause, and resume songs
Automatic loading of selected tracks
Seamless switching between songs
📁 Album-Based Navigation
Albums are displayed visually with cover art
Clicking an album loads its songs dynamically
Songs are grouped in folders like a real music library
🔊 Audio Controls
Volume slider for adjusting sound levels
Mute and unmute toggle functionality
Real-time update of playback state
📜 Dynamic Song Rendering
Songs are fetched and displayed only when needed
Improves performance and mimics real-world streaming apps
📱 Responsive Design
Works across:
Desktop 💻
Tablets 📱
Smaller screens


🛠️ Tech Stack
Technology	Purpose
HTML5	Page structure and layout
CSS3	Styling, animations, responsiveness
JavaScript (Vanilla)	Player logic and dynamic UI
Audio API	Music playback control

📂 Project Structure
Web-Music-Player/
│
├── spotify.html
├── style.css
├── script.js
│
├── img/
│   ├── logo.svg
│   ├── play.svg
│   └── album-covers/
│
└── songs/
    ├── album1/
    │   ├── song1.mp3
    │   └── song2.mp3
    └── album2/
        ├── song3.mp3
        └── song4.mp3

        

        ⚙️ How the Application Works
1. Album Selection

When a user clicks an album:

The app detects which album was clicked
It loads songs from that specific folder using JavaScript
2. Song List Rendering

The script dynamically:

fetches the available .mp3 files
creates clickable song items
injects them into the UI
3. Music Playback

When a song is clicked:

the <audio> element updates its source
playback begins immediately
controls become active
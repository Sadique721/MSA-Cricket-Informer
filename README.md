# 🏏 MSA-Cricket-Informer – Ultimate Cricket Media Platform

![Version](https://img.shields.io/badge/version-2.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Build](https://img.shields.io/badge/build-passing-success)
![API](https://img.shields.io/badge/API-Free%20%2B%20Fallback-orange)

> **Live scores | Cricket news | Player stats | IPL points table | AI predictions | Instagram/YouTube style feeds | Dark/Light mode**  
> Built with modern frontend stack – works **out‑of‑the‑box** using free APIs + intelligent mock fallbacks.

## 👨‍💻 Owner & Creator
**Md Sadique Amin**  
Software Engineer & Cricket Content Creator  
📍 Ahmedabad, Gujarat, India  
📧 mdsadiqueamin721786@gmail.com  
🔗 [Instagram](https://instagram.com/MSA-Cricket-Informer) | [Facebook](https://facebook.com/MSA-Cricket-Informer) | [YouTube](https://youtube.com/@MSA-Cricket-Informer) | [LinkedIn](https://linkedin.com/in/mdsadiqueamin)

---

## ✨ Features (100% Fulfilled)

| Section | Description |
|---------|-------------|
| ⚡ **Live Match Centre** | Auto‑refreshing live scores, team logos, match status – powered by free CricAPI + fallback mock |
| 📰 **Cricket News Hub** | Category filters (All / IPL / International) – GNews API + mock backup |
| 🎬 **Video Highlights & Reels** | Swiper slider with YouTube embeds, dedicated highlights & shorts section |
| 📸 **Instagram‑style Feed** | Mock Instagram grid with likes & captions (ready to connect to real IG) |
| 🏏 **Player Stats & ICC Rankings** | Chart.js graphs (runs/wickets) + dynamically loaded rankings table |
| 📊 **Points Table (IPL 2025)** | Fully styled, sortable table with team performance |
| 🏆 **Cricket Gallery** | Masonry image gallery with lightbox – placeholder stadium/player images |
| 🔥 **Fan Zone** | Live comments, instant polls, AI‑generated match predictions |
| 🤖 **AI Chatbot** | Popup assistant answering cricket queries (voice search ready) |
| 🌗 **Dark / Light Mode** | Smooth theme toggle with local storage persistence |
| 🧩 **Advanced Animations** | GSAP scroll triggers, AOS reveal, particles.js background, Three.js 3D cricket ball |
| 📱 **Fully Responsive** | Mobile‑first, hamburger menu, touch‑optimised sliders |
| 🚀 **Performance** | Lazy loading, preloader, optimised assets, PWA‑ready structure |

---

## 🛠️ Tech Stack

- **HTML5 / Tailwind CSS** – Rapid UI development, custom glassmorphism theme  
- **JavaScript ES6+** – Async/await, modular API calls  
- **GSAP + ScrollTrigger** – Smooth page transitions and scroll animations  
- **AOS (Animate on Scroll)** – Element reveal effects  
- **Swiper.js** – Touch‑friendly video sliders  
- **Chart.js** – Interactive player statistics  
- **Particles.js** – Dynamic background particles  
- **Three.js** – 3D rotating cricket ball in hero section  
- **Axios** – Promise‑based API requests  
- **Font Awesome 6** – Icons throughout  

---

## 🌐 API Strategy – Free + Fallback

The website uses **three free public APIs** with a robust fallback system. If any API fails (rate limit / downtime), mock data automatically takes over – **your site never breaks**.

| API | Purpose | Fallback |
|-----|---------|----------|
| [CricAPI](https://cricapi.com/) (demo key) | Live match scores, current fixtures | Predefined mock matches (IND vs AUS, CSK vs MI, etc.) |
| [GNews API](https://gnews.io/) (demo key) | Trending cricket news articles | 3 hand‑crafted cricket news items |
| [TheSportsDB](https://www.thesportsdb.com/) (public) | Player rankings & points table | Static IPL 2025 table and ICC rankings |

> **💡 To get real production data**: replace the demo keys in `fetchLiveScores()` and `fetchNews()` with your own free keys from CricAPI and GNews. The website’s fallback system will still protect you.

---

## 📂 Project Structure

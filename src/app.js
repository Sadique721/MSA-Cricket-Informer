// MSA Sport Informer Main Controller
import { initThreeScene } from './three-scene.js';
import { 
  renderMatches, 
  renderNews, 
  renderPointsTable, 
  renderRankings, 
  renderScorecard, 
  setupCharts, 
  renderPoll, 
  initFanChat, 
  initChatbot, 
  initVoiceSearch,
  renderCommentary,
  initContactForm,
  initPredictionRefresher,
  startBreakingNewsPopups
} from './ui.js';


// 1. Initialise Preloader countdown timer
function initPreloader() {
  const fill = document.getElementById('preFill');
  const preText = document.getElementById('preText');
  const steps = ['LOADING TEXTURES...', 'INITIALIZING 3D ENGINE...', 'SYNCING DATA SERVICES...', 'READY!'];
  let pct = 0;
  let si = 0;
  
  const pInt = setInterval(() => {
    pct += Math.random() * 10 + 4;
    if (pct >= 100) {
      pct = 100;
      clearInterval(pInt);
    }
    
    if (fill) fill.style.width = pct + '%';
    
    if (si < steps.length - 1 && pct > (si + 1) * 25) {
      si++;
      if (preText) preText.textContent = steps[si];
    }
    
    if (pct === 100) {
      setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
          preloader.style.opacity = '0';
          setTimeout(() => preloader.style.display = 'none', 500);
        }
        // Trigger animations once loaded
        triggerHeroAnimations();
      }, 400);
    }
  }, 60);
}

// 2. Custom cursor tracker
function initCursorTracker() {
  if (window.matchMedia('(pointer: fine)').matches) {
    const cur = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    if (!cur || !ring) return;
    
    let mx = 0, my = 0, rx = 0, ry = 0;
    
    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + 'px';
      cur.style.top = my + 'px';
    });
    
    function animRing() {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    }
    animRing();
    
    document.querySelectorAll('a, button, .glass, .gallery-item, .sport-selector').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cur.style.width = '24px';
        cur.style.height = '24px';
        ring.style.width = '55px';
        ring.style.height = '55px';
        ring.style.borderColor = 'var(--neon2)';
      });
      el.addEventListener('mouseleave', () => {
        cur.style.width = '12px';
        cur.style.height = '12px';
        ring.style.width = '40px';
        ring.style.height = '40px';
        ring.style.borderColor = 'var(--neon)';
      });
    });
  }
}

// 3. GSAP Hero Reveals
function triggerHeroAnimations() {
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Reveal main title
    document.querySelectorAll('.hero-title .word').forEach((word, i) => {
      gsap.to(word, { y: '0%', duration: 1.0, delay: 0.2 + i * 0.12, ease: 'power4.out' });
    });
    
    // Count stats stats cards
    document.querySelectorAll('[data-count]').forEach(el => {
      const end = parseInt(el.getAttribute('data-count'));
      let start = 0;
      const inc = end / 50;
      const fmt = n => n >= 1000000 ? (n/1000000).toFixed(1)+'M+' : n >= 1000 ? (n/1000).toFixed(0)+'K+' : n;
      
      const timer = setInterval(() => {
        start = Math.min(start + inc, end);
        el.textContent = fmt(Math.floor(start));
        if (start >= end) clearInterval(timer);
      }, 35);
    });
    
    // Reveal sections sequentially
    gsap.utils.toArray('.glass').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 90%' },
        y: 25,
        opacity: 0,
        duration: 0.6,
        delay: (i % 3) * 0.06,
        ease: 'power3.out'
      });
    });
  }
}

// 4. Dark/Light theme persistencies
function initThemePersistence() {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.onclick = () => {
      document.body.classList.toggle('light');
      localStorage.setItem('msa-sports-theme', document.body.classList.contains('light') ? 'light' : 'dark');
      // Rebuild charts to adjust color maps
      const activeBtn = document.querySelector('.sport-selector.active');
      const sport = activeBtn ? activeBtn.dataset.sport : 'football';
      setupCharts(sport);
    };
    if (localStorage.getItem('msa-sports-theme') === 'light') {
      document.body.classList.add('light');
    }
  }
}

// 5. Particles.js configuration
function initParticlesJS() {
  if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 50 },
        color: { value: '#00FFB3' },
        shape: { type: 'circle' },
        opacity: { value: 0.25, random: true },
        size: { value: 2, random: true },
        line_linked: { enable: true, distance: 130, color: '#00FFB3', opacity: 0.06, width: 1 },
        move: { enable: true, speed: 0.6 }
      },
      interactivity: {
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
        modes: { grab: { distance: 150, line_linked: { opacity: 0.25 } } }
      }
    });
  }
}

// 6. Swiper highlights slider
function initSwiperHighlights() {
  const swiperWrapper = document.getElementById('videoSwiperWrapper');
  if (swiperWrapper) {
    const vids = [
      { id: 'hhRb7cPJN6E', title: '⚽ El Clasico Thriller - Match Highlights' },
      { id: 'nCwgxmwZn58', title: '🏏 Kohli 100th Century Breakdown' },
      { id: '3bJrcCswA0U', title: '🏀 NBA Finals Game 7 Highlights' },
      { id: 'Jf1t6GzEh_c', title: '🎾 Wimbledon Final Rematch Highlights' }
    ];
    
    swiperWrapper.innerHTML = vids.map(v => `
      <div class="swiper-slide glass p-4 rounded-[20px]">
        <iframe style="width:100%; aspect-ratio:16/9; border-radius:12px; border:none;" src="https://www.youtube.com/embed/${v.id}" allowfullscreen></iframe>
        <p class="mt-4 text-sm font-semibold text-center">${v.title}</p>
      </div>
    `).join('');
    
    new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }
}

// 7. Masonry sports media gallery
function initGallery() {
  const ids = [19, 15, 62, 43, 77, 111];
  const galleryDiv = document.getElementById('galleryGrid');
  if (!galleryDiv) return;
  
  galleryDiv.innerHTML = ids.map((id, i) => `
    <div class="gallery-item" onclick="document.getElementById('imgModal').classList.add('show'); document.getElementById('modalImg').src='https://picsum.photos/id/${id}/800/600'">
      <img src="https://picsum.photos/id/${id}/500/${i % 2 === 0 ? 380 : 260}" alt="Sports Reel Moment ${i + 1}" loading="lazy">
      <div class="gallery-overlay">
        <span class="text-xs font-semibold text-white flex items-center gap-1.5">
          <i class="fas fa-camera"></i> Sport Action Moment #${i + 1}
        </span>
      </div>
    </div>
  `).join('');
}

// 8. Bind Sport Selector Clicks & Core Loop
window.addEventListener('load', () => {
  // Init preloader first
  initPreloader();
  
  // Navbar toggle hooks
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
    const scrollTop = document.getElementById('scrollTop');
    if (scrollTop) scrollTop.classList.toggle('show', window.scrollY > 400);
  });
  
  const scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) {
    scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.onclick = () => {
      const menu = document.getElementById('mobileMenu');
      if (menu) menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    };
  }
  
  // Attach select sport actions to buttons
  document.querySelectorAll('.sport-selector').forEach(btn => {
    btn.addEventListener('click', function() {
      window.changeActiveSport(this.dataset.sport);
    });
  });

  // Init dependencies
  initCursorTracker();
  initThemePersistence();
  initParticlesJS();
  initThreeScene();
  initSwiperHighlights();
  initGallery();
  
  // Set default state render
  window.changeActiveSport('football');
  initChatbot();
  initVoiceSearch();
  initContactForm();
  initPredictionRefresher();
  startLiveClock();
  startBreakingNewsPopups();
  
  // Scroll reveal framework
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true, offset: 80 });
  }
  
  // Auto scoreboards and live commentary stream tickers
  setInterval(() => {
    const active = document.querySelector('.sport-selector.active')?.dataset.sport || 'football';
    renderCommentary(active);
  }, 6000);
  
  setInterval(() => {
    const active = document.querySelector('.sport-selector.active')?.dataset.sport || 'football';
    renderMatches(active);
  }, 30000);
});

function startLiveClock() {
  const el = document.getElementById('liveClock');
  if (!el) return;
  const update = () => {
    el.textContent = new Date().toLocaleTimeString('en-US', { hour12: true });
  };
  update();
  setInterval(update, 1000);
}

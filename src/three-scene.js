// MSA Sport Informer 3D Sports Ball Viewer using Three.js

let scene, camera, renderer, ball, ballMaterial, currentSport = 'football';
let particles = [], particleGroup;
let isAutoRotating = true;
let targetScale = 1.0;
let controls;

// Procedural texture generators
function generateSoccerTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  // Base white leather
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 512, 512);
  
  // Draw premium soccer patterns (pentagons and connecting seams)
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 4;
  
  const centers = [
    [100, 100], [250, 80], [400, 120],
    [80, 260], [256, 256], [430, 270],
    [120, 400], [280, 420], [410, 390]
  ];
  
  centers.forEach(([cx, cy]) => {
    // Pentagons
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
      const x = cx + Math.cos(angle) * 32;
      const y = cy + Math.sin(angle) * 32;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Draw seam lines radiating out
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * 32, cy + Math.sin(angle) * 32);
      ctx.lineTo(cx + Math.cos(angle) * 80, cy + Math.sin(angle) * 80);
      ctx.stroke();
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function generateBasketballTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  // Basketball orange with subtle noise/leather bumps
  ctx.fillStyle = '#f97316';
  ctx.fillRect(0, 0, 512, 512);
  
  // Bump map texture look
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  for (let i = 0; i < 2000; i++) {
    const rx = Math.random() * 512;
    const ry = Math.random() * 512;
    ctx.fillRect(rx, ry, 2, 2);
  }
  
  // Draw basketball black seams
  ctx.strokeStyle = '#1e1e1e';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  
  // Vertical seam
  ctx.beginPath();
  ctx.moveTo(256, 0);
  ctx.lineTo(256, 512);
  ctx.stroke();
  
  // Horizontal seam
  ctx.beginPath();
  ctx.moveTo(0, 256);
  ctx.lineTo(512, 256);
  ctx.stroke();
  
  // Curved ribs
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(-20, 256, 220, -Math.PI/2.4, Math.PI/2.4);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(532, 256, 220, Math.PI - Math.PI/2.4, Math.PI + Math.PI/2.4);
  ctx.stroke();
  
  return new THREE.CanvasTexture(canvas);
}

function generateTennisTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  // Tennis lime-yellow with felt texture noise
  ctx.fillStyle = '#84cc16';
  ctx.fillRect(0, 0, 512, 512);
  
  // Felt look
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  for (let i = 0; i < 4000; i++) {
    ctx.fillRect(Math.random()*512, Math.random()*512, 1, 3);
  }
  ctx.fillStyle = 'rgba(0,0,0,0.08)';
  for (let i = 0; i < 2000; i++) {
    ctx.fillRect(Math.random()*512, Math.random()*512, 1, 2);
  }
  
  // Classic wavy seams
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 16;
  
  ctx.beginPath();
  ctx.arc(0, 256, 180, -Math.PI/2, Math.PI/2);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(512, 256, 180, Math.PI/2, 3*Math.PI/2);
  ctx.stroke();
  
  return new THREE.CanvasTexture(canvas);
}

function generateCricketTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  // Cherry red leather
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(0, 0, 512, 512);
  
  // Leather texture variance
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  for (let i = 0; i < 1500; i++) {
    ctx.fillRect(Math.random()*512, Math.random()*512, 3, 3);
  }
  
  // Main white seam line
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(0, 256);
  ctx.lineTo(512, 256);
  ctx.stroke();
  
  // Gold/white stitchings on both sides of seam
  ctx.strokeStyle = '#f1f5f9';
  ctx.lineWidth = 4;
  ctx.setLineDash([6, 8]);
  
  ctx.beginPath();
  ctx.moveTo(0, 246);
  ctx.lineTo(512, 246);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(0, 266);
  ctx.lineTo(512, 266);
  ctx.stroke();
  
  return new THREE.CanvasTexture(canvas);
}

// Particle system helper
function triggerParticleBurst() {
  const pCount = 40;
  const colors = {
    football: 0x00FFB3,
    basketball: 0xFF6B00,
    tennis: 0x84CC16,
    cricket: 0xEF4444
  };
  
  const color = colors[currentSport] || 0x00FFB3;
  
  // Remove older particles
  while(particleGroup.children.length > 0){
    particleGroup.remove(particleGroup.children[0]);
  }
  particles = [];
  
  const pGeo = new THREE.SphereGeometry(0.06, 8, 8);
  const pMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.8 });
  
  for(let i=0; i<pCount; i++) {
    const mesh = new THREE.Mesh(pGeo, pMat);
    // Start at ball center
    mesh.position.copy(ball.position);
    
    // Random direction vector
    const velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.15,
      (Math.random() - 0.5) * 0.15,
      (Math.random() - 0.5) * 0.15
    );
    
    particleGroup.add(mesh);
    particles.push({ mesh, velocity, lifespan: 60 });
  }
}

export function switchSport(sport) {
  if (sport === currentSport) return;
  currentSport = sport;
  
  // Scale down animation
  targetScale = 0.05;
  
  setTimeout(() => {
    let texture, roughness = 0.4, metalness = 0.1;
    
    if (sport === 'football') {
      texture = generateSoccerTexture();
      roughness = 0.5;
    } else if (sport === 'basketball') {
      texture = generateBasketballTexture();
      roughness = 0.8;
    } else if (sport === 'tennis') {
      texture = generateTennisTexture();
      roughness = 0.9;
    } else if (sport === 'cricket') {
      texture = generateCricketTexture();
      roughness = 0.2;
      metalness = 0.6; // Shiny cricket ball
    }
    
    ballMaterial.map = texture;
    ballMaterial.roughness = roughness;
    ballMaterial.metalness = metalness;
    ballMaterial.needsUpdate = true;
    
    // Scale up and burst
    targetScale = 1.0;
    triggerParticleBurst();
  }, 250);
}

export function initThreeScene() {
  const canvasEl = document.getElementById('threeCanvas');
  if (!canvasEl) return;
  
  import('https://unpkg.com/three@0.128.0/build/three.module.js').then(THREE => {
    window.THREE = THREE; // Expose globally to modules
    
    scene = new THREE.Scene();
    
    // Camera config
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    
    renderer = new THREE.WebGLRenderer({ canvas: canvasEl, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Interactive ball mesh
    const geometry = new THREE.SphereGeometry(1.3, 64, 64);
    ballMaterial = new THREE.MeshStandardMaterial({
      map: generateSoccerTexture(),
      roughness: 0.5,
      metalness: 0.1
    });
    
    ball = new THREE.Mesh(geometry, ballMaterial);
    
    // Position ball to the right side on desktop, center on mobile
    if (window.innerWidth > 768) {
      ball.position.set(2.8, 0, 0);
    } else {
      ball.position.set(0, -1.2, 0);
    }
    
    scene.add(ball);
    
    // Particles setup
    particleGroup = new THREE.Group();
    scene.add(particleGroup);
    
    // Orbit Ring
    const ringGeo = new THREE.TorusGeometry(2.0, 0.015, 8, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00FFB3, transparent: true, opacity: 0.1 });
    const orbitRing = new THREE.Mesh(ringGeo, ringMat);
    orbitRing.rotation.x = Math.PI / 2.5;
    ball.add(orbitRing);
    
    // Lights Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);
    
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);
    
    // Neon accent lights matching theme colors
    const neonLight1 = new THREE.PointLight(0x00FFB3, 1.5, 12);
    neonLight1.position.set(-4, 3, 2);
    scene.add(neonLight1);
    
    const neonLight2 = new THREE.PointLight(0xFF6B00, 1.0, 12);
    neonLight2.position.set(3, -3, 2);
    scene.add(neonLight2);
    
    // Window Resize Hook
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // Responsive repositioning
      if (window.innerWidth > 768) {
        ball.position.set(2.8, 0, 0);
      } else {
        ball.position.set(0, -1.2, 0);
      }
    });

    // Custom Drag Controls (360 Rotation)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    const onMouseDown = (e) => {
      isDragging = true;
      isAutoRotating = false;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };
    
    const onMouseMove = (e) => {
      if (!isDragging) return;
      
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      const deltaMove = {
        x: clientX - previousMousePosition.x,
        y: clientY - previousMousePosition.y
      };
      
      // Rotate the ball directly
      ball.rotation.y += deltaMove.x * 0.005;
      ball.rotation.x += deltaMove.y * 0.005;
      
      previousMousePosition = { x: clientX, y: clientY };
    };
    
    const onMouseUp = () => {
      isDragging = false;
      // Resume auto rotation slowly after drag
      setTimeout(() => {
        if (!isDragging) isAutoRotating = true;
      }, 5000);
    };
    
    canvasEl.addEventListener('mousedown', onMouseDown);
    canvasEl.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    
    canvasEl.addEventListener('touchstart', onMouseDown, { passive: true });
    canvasEl.addEventListener('touchmove', onMouseMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // Animation Loop
    let t = 0;
    function animate() {
      requestAnimationFrame(animate);
      
      // Smooth scaling interpolation
      ball.scale.x += (targetScale - ball.scale.x) * 0.15;
      ball.scale.y += (targetScale - ball.scale.y) * 0.15;
      ball.scale.z += (targetScale - ball.scale.z) * 0.15;
      
      if (isAutoRotating) {
        ball.rotation.y += 0.005;
        ball.rotation.z += 0.002;
      }
      
      // Gentle floating animation
      t += 0.015;
      ball.position.y += Math.sin(t) * 0.0015;
      
      // Rotate orbits
      orbitRing.rotation.z += 0.002;
      
      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.mesh.position.add(p.velocity);
        p.lifespan--;
        p.mesh.material.opacity = p.lifespan / 60;
        
        if (p.lifespan <= 0) {
          particleGroup.remove(p.mesh);
          particles.splice(i, 1);
        }
      }
      
      renderer.render(scene, camera);
    }
    
    animate();
  }).catch(e => console.warn('Three.js failed to load. 3D features are disabled.', e));
}

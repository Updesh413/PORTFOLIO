import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initHero3D(canvas) {
  if (!canvas || prefersReducedMotion()) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    canvas.clientWidth / Math.max(canvas.clientHeight, 1),
    0.1,
    100
  );
  camera.position.z = 9;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  function syncSize() {
    const w = canvas.clientWidth || canvas.parentElement?.clientWidth || 1;
    const h = canvas.clientHeight || canvas.parentElement?.clientHeight || 1;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  syncSize();
  requestAnimationFrame(syncSize);
  renderer.setClearColor(0x000000, 0);

  const group = new THREE.Group();
  scene.add(group);

  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.22,
  });
  const torus = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.15, 0.32, 100, 16),
    wireMat
  );
  group.add(torus);

  const innerGeo = new THREE.IcosahedronGeometry(0.55, 0);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x818cf8,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  });
  const inner = new THREE.Mesh(innerGeo, innerMat);
  group.add(inner);

  const particleCount = 420;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 22;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0x94a3b8,
    size: 0.045,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  let raf = 0;
  const t0 = performance.now();

  function animate(now) {
    raf = requestAnimationFrame(animate);
    const t = (now - t0) * 0.001;
    group.rotation.x = Math.sin(t * 0.35) * 0.35;
    group.rotation.y = t * 0.45;
    torus.rotation.z = t * 0.2;
    inner.rotation.x = t * 0.6;
    inner.rotation.y = -t * 0.4;
    points.rotation.y = t * 0.08;
  }
  animate(t0);

  const ro = new ResizeObserver(() => syncSize());
  ro.observe(canvas.parentElement || canvas);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    pGeo.dispose();
    pMat.dispose();
    torus.geometry.dispose();
    wireMat.dispose();
    innerGeo.dispose();
    innerMat.dispose();
    renderer.dispose();
  };
}

function setupTilt(root = document) {
  if (prefersReducedMotion()) return;

  const strength = 14;
  const cards = root.querySelectorAll("[data-tilt].tilt-3d");

  cards.forEach((card) => {
    let frame = 0;

    function onMove(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = (x / rect.width - 0.5) * 2;
      const py = (y / rect.height - 0.5) * 2;
      const rx = -py * strength;
      const ry = px * strength;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      });
    }

    function onLeave() {
      cancelAnimationFrame(frame);
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    }

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    card.addEventListener("touchmove", onMove, { passive: true });
    card.addEventListener("touchend", onLeave);
  });
}

function applyRevealDelays() {
  document.querySelectorAll("[data-reveal][data-reveal-delay]").forEach((el) => {
    const ms = el.getAttribute("data-reveal-delay");
    if (ms) el.style.setProperty("--reveal-delay", `${ms}ms`);
  });
}

function setupScrollReveal() {
  if (prefersReducedMotion()) {
    document
      .querySelectorAll("[data-reveal], .reveal-stagger")
      .forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    if (el.closest(".hero")) return;
    io.observe(el);
  });
  document.querySelectorAll(".reveal-stagger").forEach((el) => io.observe(el));
}

function revealHero() {
  if (prefersReducedMotion()) {
    document
      .querySelectorAll(".hero [data-reveal]")
      .forEach((el) => el.classList.add("is-visible"));
    return;
  }
  requestAnimationFrame(() => {
    setTimeout(() => {
      document
        .querySelectorAll(".hero [data-reveal]")
        .forEach((el) => el.classList.add("is-visible"));
    }, 80);
  });
}

function setupNavbarScroll() {
  const nav = document.querySelector(".navbar");
  if (!nav) return;

  let ticking = false;
  function update() {
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();
}

document.addEventListener("DOMContentLoaded", () => {
  applyRevealDelays();
  revealHero();

  const canvas = document.getElementById("hero-canvas");
  initHero3D(canvas);

  setupTilt(document);
  setupScrollReveal();
  setupNavbarScroll();

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
      }
    });
  });
});

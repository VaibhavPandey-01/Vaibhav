"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const COUNT = 4200;

// Sample letterforms into positions: the sculpture itself is entirely particles.
function sampleLanguage(mode: number) {
  const surface = document.createElement("canvas");
  surface.width = 900; surface.height = 680;
  const ctx = surface.getContext("2d")!;
  if (mode === 0) {
    ctx.font = "900 310px Arial, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const gradient = ctx.createLinearGradient(170, 170, 740, 470);
    gradient.addColorStop(0, "#ffe1bb"); gradient.addColorStop(0.5, "#ff926c"); gradient.addColorStop(1, "#d9b6ff");
    ctx.fillStyle = gradient; ctx.fillText("C++", 450, 345);
  } else {
    const snake = (flip: boolean) => {
      ctx.save(); ctx.translate(450, 300); ctx.scale(105, -105);
      if (flip) ctx.rotate(Math.PI);
      ctx.translate(-0.04, 0.06);
      ctx.beginPath(); ctx.moveTo(-0.02, 1.35); ctx.quadraticCurveTo(-0.95, 1.35, -0.95, 0.98);
      ctx.lineTo(-0.95, 0.57); ctx.lineTo(0.18, 0.57); ctx.lineTo(0.18, 0.43);
      ctx.lineTo(-1.15, 0.43); ctx.quadraticCurveTo(-1.55, 0.43, -1.55, -0.25);
      ctx.quadraticCurveTo(-1.55, -0.88, -1.14, -0.88); ctx.lineTo(-0.77, -0.88);
      ctx.lineTo(-0.77, -0.37); ctx.quadraticCurveTo(-0.77, 0.02, -0.33, 0.02);
      ctx.lineTo(0.45, 0.02); ctx.quadraticCurveTo(0.9, 0.02, 0.9, 0.45);
      ctx.lineTo(0.9, 0.98); ctx.quadraticCurveTo(0.9, 1.35, -0.02, 1.35);
      ctx.closePath(); ctx.fillStyle = flip ? "#ffd979" : "#76c8ff"; ctx.fill();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath(); ctx.arc(-0.6, 1.03, 0.1, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    };
    snake(false); snake(true);
    ctx.font = "600 66px Arial, sans-serif"; ctx.textAlign = "center";
    ctx.fillStyle = "#d7dfff"; ctx.fillText("Python", 450, 530);
  }
  const pixels = ctx.getImageData(0, 0, 900, 680).data;
  const samples: number[][] = [];
  for (let y = 0; y < 680; y += 3) for (let x = 0; x < 900; x += 3) {
    const i = (y * 900 + x) * 4;
    if (pixels[i + 3] > 180) samples.push([(x - 450) / 140, (340 - y) / 140, pixels[i] / 255, pixels[i + 1] / 255, pixels[i + 2] / 255]);
  }
  // A reproducible shuffle prevents particles from travelling in scanline bands.
  let seed = 1927;
  const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let i = samples.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [samples[i], samples[j]] = [samples[j], samples[i]]; }
  const positions = new Float32Array(COUNT * 3), colors = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const point = samples[i % samples.length];
    positions.set([point[0] + (random() - 0.5) * 0.015, point[1] + (random() - 0.5) * 0.015, (random() - 0.5) * 0.22], i * 3);
    colors.set(point.slice(2), i * 3);
  }
  return { positions, colors };
}

export function SignalOrb({ mode = 0, replay = 0 }: { mode?: number; replay?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef(mode);
  const reform = useRef<() => void>(() => {});
  useEffect(() => { modeRef.current = mode; reform.current(); }, [mode, replay]);

  useEffect(() => {
    const canvas = canvasRef.current, host = hostRef.current;
    if (!canvas || !host) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" }); }
    catch { return; }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ratio = Math.min(window.devicePixelRatio, 1.75);
    renderer.setPixelRatio(ratio); renderer.setClearColor(0, 0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.z = 9;
    const targets = [sampleLanguage(0), sampleLanguage(1)];
    const positions = new Float32Array(COUNT * 3), colors = targets[modeRef.current].colors.slice();
    const chaos = new Float32Array(COUNT * 3), seeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const angle = i * 2.399963, radius = 1.8 + (i % 89) / 89 * 2.5;
      chaos.set([Math.cos(angle) * radius, Math.sin(angle) * radius * 0.7, Math.sin(i * 3.1) * 2], i * 3);
      seeds[i] = (i % 97) / 97;
    }
    positions.set(chaos);
    let from = positions.slice(), fromColors = colors.slice();
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));
    geometry.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));
    const material = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uRatio: { value: ratio }, uScatter: { value: 1 } },
      vertexShader: `attribute vec3 color; attribute float seed; varying vec3 vColor; varying float vSeed; uniform float uRatio; uniform float uScatter;
        void main(){ vColor=color; vSeed=seed; vec4 p=modelViewMatrix*vec4(position,1.); gl_Position=projectionMatrix*p;
        gl_PointSize=clamp((2.8+seed*1.8+uScatter*.8)*uRatio*(8.0/-p.z),1.,9.); }`,
      fragmentShader: `varying vec3 vColor; varying float vSeed; uniform float uTime;
        void main(){ float d=length(gl_PointCoord-.5); if(d>.5) discard;
        float core=1.-smoothstep(.08,.38,d); float halo=(1.-smoothstep(.1,.5,d))*.22;
        float shimmer=.8+.2*sin(uTime*1.4+vSeed*60.);
        gl_FragColor=vec4(vColor*(.85+core*.35),(core*.8+halo)*shimmer); }`,
    });
    const sculpture = new THREE.Points(geometry, material); sculpture.frustumCulled = false; scene.add(sculpture);
    const dustPositions = new Float32Array(160 * 3);
    for (let i = 0; i < 160; i++) {
      const angle = i * 2.399963, r = 2.6 + (i % 17) / 17 * 1.3;
      dustPositions.set([Math.cos(angle) * r, Math.sin(angle) * r * 0.7, -0.7 - (i % 7) * 0.3], i * 3);
    }
    const dustGeometry = new THREE.BufferGeometry(); dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({ color: 0x9b9dc9, size: 0.013, transparent: true, opacity: 0.45, depthWrite: false });
    const dust = new THREE.Points(dustGeometry, dustMaterial); scene.add(dust);
    host.dataset.ready = "true";
    let frame = 0, visible = true, disposed = false, contextLost = false, previous = 0, elapsed = 0, clock = 0;
    let tiltX = 0, tiltY = 0;
    const pointer = { x: 0, y: 0, active: false };
    const draw = (time: number) => {
      frame = 0;
      if (disposed || contextLost || !visible || document.hidden) return;
      const elapsedFrame = Math.max((time - previous) / 1000, 0);
      const dt = Math.min(elapsedFrame, 0.04); previous = time;
      elapsed += elapsedFrame; clock += dt;
      const progress = reduced.matches ? 1 : Math.min(elapsed / 2.6, 1);
      const target = targets[modeRef.current];
      for (let i = 0; i < COUNT; i++) {
        const k = i * 3;
        const local = Math.min(Math.max((progress - seeds[i] * 0.16) / 0.84, 0), 1);
        const eased = local * local * (3 - 2 * local);
        const burst = Math.sin(Math.PI * local) * (1 - local) * 2.8;
        const angle = seeds[i] * Math.PI * 12 + local * 3;
        for (let axis = 0; axis < 3; axis++) {
          const swirl = axis === 0 ? Math.cos(angle) : axis === 1 ? Math.sin(angle) * 0.7 : Math.sin(angle + local * 2);
          positions[k + axis] = from[k + axis] * (1 - eased) + target.positions[k + axis] * eased + swirl * burst;
          colors[k + axis] = fromColors[k + axis] * (1 - eased) + target.colors[k + axis] * eased;
        }
        if (!reduced.matches) {
          positions[k + 2] += Math.sin(clock * 0.8 + seeds[i] * 18) * 0.035 * eased;
          if (pointer.active) {
            const dx = positions[k] - pointer.x, dy = positions[k + 1] - pointer.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const force = Math.max(0, 1 - distance / 0.9) ** 2 * 0.3;
            positions[k] += dx * force; positions[k + 1] += dy * force; positions[k + 2] += force;
          }
        }
      }
      geometry.attributes.position.needsUpdate = true; geometry.attributes.color.needsUpdate = true;
      const ease = 1 - Math.exp(-4 * dt);
      tiltX += ((pointer.active ? -pointer.y * 0.025 : 0) - tiltX) * ease;
      tiltY += ((pointer.active ? pointer.x * 0.025 : 0) - tiltY) * ease;
      sculpture.rotation.set(reduced.matches ? 0 : tiltX, reduced.matches ? 0 : tiltY, 0);
      material.uniforms.uTime.value = reduced.matches ? 0 : clock;
      material.uniforms.uScatter.value = 1 - progress;
      dust.rotation.z = reduced.matches ? 0 : clock * 0.012;
      host.dataset.phase = progress < 0.35 ? "scatter" : progress < 1 ? "gather" : "formed";
      renderer.render(scene, camera);
      if (!reduced.matches) frame = requestAnimationFrame(draw);
    };
    const start = () => { cancelAnimationFrame(frame); previous = performance.now(); frame = requestAnimationFrame(draw); };
    reform.current = () => { from = positions.slice(); fromColors = colors.slice(); elapsed = 0; start(); };
    const resize = () => {
      const { width, height } = host.getBoundingClientRect(); if (!width || !height) return;
      renderer.setSize(width, height, false); camera.aspect = width / height;
      camera.position.z = camera.aspect < 1 ? 9 / camera.aspect : 9;
      camera.updateProjectionMatrix(); start();
    };
    const move = (event: PointerEvent) => {
      if (reduced.matches || event.pointerType !== "mouse") return;
      const rect = host.getBoundingClientRect();
      const vertical = Math.tan(THREE.MathUtils.degToRad(19)) * camera.position.z * 2;
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * vertical * camera.aspect;
      pointer.y = (0.5 - (event.clientY - rect.top) / rect.height) * vertical; pointer.active = true;
    };
    const reset = () => { pointer.active = false; };
    const observer = new ResizeObserver(resize); observer.observe(host);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); }); intersection.observe(host);
    const lost = (event: Event) => { event.preventDefault(); contextLost = true; cancelAnimationFrame(frame); host.dataset.ready = "false"; };
    const restored = () => { contextLost = false; host.dataset.ready = "true"; start(); };
    canvas.addEventListener("webglcontextlost", lost); canvas.addEventListener("webglcontextrestored", restored);
    host.addEventListener("pointermove", move); host.addEventListener("pointerleave", reset);
    reduced.addEventListener("change", start); document.addEventListener("visibilitychange", start); resize();
    return () => {
      disposed = true; cancelAnimationFrame(frame); reform.current = () => {};
      observer.disconnect(); intersection.disconnect();
      host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", reset);
      reduced.removeEventListener("change", start); document.removeEventListener("visibilitychange", start);
      canvas.removeEventListener("webglcontextlost", lost); canvas.removeEventListener("webglcontextrestored", restored);
      geometry.dispose(); material.dispose(); dustGeometry.dispose(); dustMaterial.dispose(); renderer.dispose(); delete host.dataset.ready;
    };
  }, []);
  return <div ref={hostRef} className="language-sculpture particle-sculpture" role="img" aria-label={`${mode === 0 ? "C++" : "Python"} formed from thousands of luminous particles`}>
    <canvas ref={canvasRef} className="signal-orb" aria-hidden="true" />
    <div className={`language-fallback ${mode === 1 ? "python-fallback" : ""}`} aria-hidden="true">{mode === 0 ? "C++" : "Python"}</div>
    <div className="formation-status" aria-hidden="true"><i /><span className="phase-scatter">RELEASING POSSIBILITY</span><span className="phase-gather">FINDING FORM</span><span className="phase-formed">A LITTLE CHAOS. A CLEAR IDEA.</span></div>
  </div>;
}

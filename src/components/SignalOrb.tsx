"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import fontData from "@/data/helvetiker_bold.typeface.json";

export function SignalOrb({ mode = 0 }: { mode?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef(mode);
  const redraw = useRef<() => void>(() => {});
  useEffect(() => { modeRef.current = mode; redraw.current(); }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" }); }
    catch { return; }
    host.dataset.ready = "true";
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
    camera.position.set(0, 0, 8.8);
    scene.add(new THREE.HemisphereLight(0xcbdcff, 0x32202b, 3));
    const key = new THREE.DirectionalLight(0xffddc9, 5);
    key.position.set(-3, 4, 6); scene.add(key);
    const rim = new THREE.DirectionalLight(0x8db4ff, 4);
    rim.position.set(4, 1, -2); scene.add(rim);
    const fill = new THREE.PointLight(0xff9977, 20);
    fill.position.set(-3, -2, 3); scene.add(fill);
    const font = new FontLoader().parse(fontData);
    const materials: THREE.Material[] = [];
    const material = (color: number, metalness = 0.45) => {
      const value = new THREE.MeshStandardMaterial({ color, metalness, roughness: 0.27 });
      materials.push(value); return value;
    };
    const white = material(0xf0f6ff, 0.35);
    const blue = material(0x2879bf);
    const gold = material(0xffca45);
    const text = (value: string, size: number, depth: number, surface: THREE.Material) => {
      const geometry = new TextGeometry(value, { font, size, depth, curveSegments: 8, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.014, bevelSegments: 3 });
      geometry.center();
      return new THREE.Mesh(geometry, surface);
    };
    const cpp = new THREE.Group();
    const hex = new THREE.Shape();
    for (let i = 0; i < 6; i++) {
      const angle = Math.PI / 3 * i + Math.PI / 6;
      const x = Math.cos(angle) * 1.62, y = Math.sin(angle) * 1.62;
      if (i === 0) hex.moveTo(x, y); else hex.lineTo(x, y);
    }
    hex.closePath();
    const shieldGeometry = new THREE.ExtrudeGeometry(hex, { depth: 0.23, bevelEnabled: true, bevelSize: 0.08, bevelThickness: 0.07, bevelSegments: 4, steps: 1 });
    shieldGeometry.center();
    cpp.add(new THREE.Mesh(shieldGeometry, blue));
    const cppText = text("C++", 0.93, 0.17, white);
    cppText.position.z = 0.28; cpp.add(cppText);
    const outline = new THREE.LineSegments(new THREE.EdgesGeometry(shieldGeometry, 35), new THREE.LineBasicMaterial({ color: 0x9ed5ff, transparent: true, opacity: 0.4 }));
    cpp.add(outline);

    const python = new THREE.Group();
    // Two rounded, interlocking snake silhouettes, extruded into solid forms.
    const snake = new THREE.Shape();
    snake.moveTo(-0.02, 1.35); snake.quadraticCurveTo(-0.95, 1.35, -0.95, 0.98);
    snake.lineTo(-0.95, 0.57); snake.lineTo(0.18, 0.57); snake.lineTo(0.18, 0.43);
    snake.lineTo(-1.15, 0.43); snake.quadraticCurveTo(-1.55, 0.43, -1.55, -0.25);
    snake.quadraticCurveTo(-1.55, -0.88, -1.14, -0.88); snake.lineTo(-0.77, -0.88);
    snake.lineTo(-0.77, -0.37); snake.quadraticCurveTo(-0.77, 0.02, -0.33, 0.02);
    snake.lineTo(0.45, 0.02); snake.quadraticCurveTo(0.9, 0.02, 0.9, 0.45);
    snake.lineTo(0.9, 0.98); snake.quadraticCurveTo(0.9, 1.35, -0.02, 1.35);
    const eye = new THREE.Path(); eye.absarc(-0.6, 1.03, 0.085, 0, Math.PI * 2, true); snake.holes.push(eye);
    const snakeGeometry = new THREE.ExtrudeGeometry(snake, { depth: 0.28, bevelEnabled: true, bevelSize: 0.045, bevelThickness: 0.055, bevelSegments: 4, curveSegments: 16, steps: 1 });
    const upper = new THREE.Mesh(snakeGeometry, blue);
    upper.position.set(-0.04, 0.2, 0); python.add(upper);
    const lower = new THREE.Mesh(snakeGeometry, gold);
    lower.rotation.z = Math.PI; lower.position.set(0.04, 0.08, -0.02); python.add(lower);
    const pythonText = text("Python", 0.35, 0.05, white);
    pythonText.position.set(0, -1.72, 0.2); python.add(pythonText);
    scene.add(cpp, python);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, visible = true, disposed = false, previous = 0;
    let blend = modeRef.current, tiltX = 0, tiltY = 0;
    const pointer = { x: 0, y: 0 };
    const draw = (time: number) => {
      frame = 0;
      if (disposed || !visible || document.hidden) return;
      const delta = Math.min((time - previous) / 1000, 0.05); previous = time;
      const ease = reduced.matches ? 1 : 1 - Math.exp(-7 * delta);
      blend += (modeRef.current - blend) * ease;
      tiltX += (pointer.y * 0.18 - tiltX) * ease;
      tiltY += (pointer.x * 0.35 - tiltY) * ease;
      [cpp, python].forEach((group, index) => {
        const weight = index === 0 ? 1 - blend : blend;
        group.visible = weight > 0.005;
        group.scale.setScalar(0.72 + weight * 0.28);
        group.position.x = (index - blend) * 6;
        group.position.y = reduced.matches ? 0 : Math.sin(time * 0.0008) * 0.08;
        group.rotation.set(reduced.matches ? 0.08 : tiltX + 0.08, reduced.matches ? -0.13 : tiltY + Math.sin(time * 0.00045) * 0.16, reduced.matches ? 0 : Math.sin(time * 0.0006) * 0.025);
      });
      renderer.render(scene, camera);
      if (!reduced.matches) frame = requestAnimationFrame(draw);
    };
    const start = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); };
    redraw.current = start;
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false); camera.aspect = width / height;
      camera.position.z = camera.aspect < 1 ? 8.8 / camera.aspect : 8.8;
      camera.updateProjectionMatrix(); start();
    };
    const move = (event: PointerEvent) => { if (reduced.matches) return; const rect = host.getBoundingClientRect(); pointer.x = (event.clientX - rect.left) / rect.width - 0.5; pointer.y = (event.clientY - rect.top) / rect.height - 0.5; };
    const reset = () => { pointer.x = 0; pointer.y = 0; };
    const observer = new ResizeObserver(resize); observer.observe(host);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); }); intersection.observe(host);
    const lost = (event: Event) => { event.preventDefault(); cancelAnimationFrame(frame); host.dataset.ready = "false"; };
    const restored = () => { host.dataset.ready = "true"; start(); };
    canvas.addEventListener("webglcontextlost", lost); canvas.addEventListener("webglcontextrestored", restored);
    host.addEventListener("pointermove", move); host.addEventListener("pointerleave", reset);
    reduced.addEventListener("change", start); document.addEventListener("visibilitychange", start);
    resize();
    return () => {
      disposed = true; cancelAnimationFrame(frame); redraw.current = () => {};
      observer.disconnect(); intersection.disconnect();
      host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", reset);
      reduced.removeEventListener("change", start); document.removeEventListener("visibilitychange", start);
      canvas.removeEventListener("webglcontextlost", lost); canvas.removeEventListener("webglcontextrestored", restored);
      const geometries = new Set<THREE.BufferGeometry>();
      scene.traverse(object => { if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) geometries.add(object.geometry); });
      geometries.forEach(geometry => geometry.dispose()); materials.forEach(value => value.dispose()); outline.material.dispose(); renderer.dispose();
      delete host.dataset.ready;
    };
  }, []);
  return <div ref={hostRef} className="language-sculpture" role="img" aria-label={mode === 0 ? "Interactive three-dimensional C++ emblem" : "Interactive three-dimensional Python emblem"}>
    <canvas ref={canvasRef} className="signal-orb" aria-hidden="true" />
    <div className={`language-fallback ${mode === 1 ? "python-fallback" : ""}`} aria-hidden="true">{mode === 0 ? "C++" : "Python"}</div>
  </div>;
}

"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export function HeroCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [images, setImages] = useState<HTMLImageElement[]>([]);

    // Define checkpoints for the text reveals
    const opacity1 = useTransform(scrollYProgress, [0.05, 0.1, 0.15, 0.2], [0, 1, 1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.35, 0.4], [0, 1, 1, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.45, 0.5, 0.55, 0.6], [0, 1, 1, 0]);

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= 120; i++) {
            const img = new Image();
            // Ensure we format the image number with the right amount of zeroes if needed.
            // Based on our ffmpeg command it's just 1.jpg to 120.jpg
            img.src = `/images/resume/${i}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === 120) {
                    setImages(loadedImages);
                }
            };
            loadedImages.push(img);
        }
    }, []);

    // Sync canvas with scroll
    useEffect(() => {
        if (images.length === 0 || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const renderFrame = (progress: number) => {
            // Map 0-1 to 0-119
            const frameIndex = Math.min(
                119,
                Math.max(0, Math.floor(progress * 120))
            );

            const img = images[frameIndex];
            if (!img) return;

            // Draw image to fill but contain aspect ratio
            const vRatio = canvas.height / img.height;
            const hRatio = canvas.width / img.width;
            const ratio = Math.max(hRatio, vRatio);

            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                img,
                0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
            );
        };

        // Initial render
        renderFrame(0);

        // Subscribe to scroll updates
        const unsubscribe = scrollYProgress.onChange((v) => {
            requestAnimationFrame(() => renderFrame(v));
        });

        return () => unsubscribe();
    }, [images, scrollYProgress]);

    // Handle resize
    useEffect(() => {
        const resizeCanvas = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        return () => window.removeEventListener("resize", resizeCanvas);
    }, []);

    return (
        <div ref={containerRef} className="relative h-[500vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* The Frame Animation Canvas */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 z-0 h-full w-full object-cover opacity-80 mix-blend-screen"
                />

                {/* Ambient Dark Scrim to make text readable */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

                {/* Text Overlays */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">

                    <motion.div style={{ opacity: opacity1 }} className="absolute">
                        <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-bold tracking-tighter text-glow mb-4">
                            VAIBHAV PANDEY
                        </h1>
                    </motion.div>

                    <motion.div style={{ opacity: opacity2 }} className="absolute">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-2">
                            <span className="accent-glow text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                                C++ Developer
                            </span>
                        </h2>
                    </motion.div>

                    <motion.div style={{ opacity: opacity3 }} className="absolute">
                        <h3 className="text-4xl md:text-6xl font-medium tracking-tight text-white/90">
                            Engineering Logic<br />Into Reality
                        </h3>
                    </motion.div>

                </div>

            </div>
        </div>
    );
}

import React, { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

interface LiquidChromeProps extends React.HTMLAttributes<HTMLDivElement> {
    baseColor?: [number, number, number];
    speed?: number;
    amplitude?: number;
    frequencyX?: number;
    frequencyY?: number;
    interactive?: boolean;
}

export const LiquidChrome: React.FC<LiquidChromeProps> = ({
                                                              baseColor = [0.1, 0.1, 0.1],
                                                              speed = 0.2,
                                                              amplitude = 0.35,
                                                              frequencyX = 2.5,
                                                              frequencyY = 1.8,
                                                              interactive = true,
                                                              ...props
                                                          }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        const renderer = new Renderer({ antialias: false });
        const gl = renderer.gl;
        gl.clearColor(1, 1, 1, 1);

        /* ================= SHADERS ================= */

        const vertex = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

        const fragment = `
      precision mediump float;

      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec3 uBaseColor;
      uniform float uAmplitude;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform vec2 uMouse;

      varying vec2 vUv;

      void main() {
        vec2 uv = (vUv * 2.0 - 1.0);
        uv.x *= uResolution.x / uResolution.y;

        // Reduced distortion iterations (5 instead of 9)
        for (float i = 1.0; i < 6.0; i++) {
          uv.x += (uAmplitude / i) * cos(i * uFrequencyX * uv.y + uTime);
          uv.y += (uAmplitude / i) * cos(i * uFrequencyY * uv.x + uTime);
        }

        // Subtle mouse ripple
        vec2 diff = vUv - uMouse;
        float dist = length(diff);
        float ripple = sin(8.0 * dist - uTime * 2.0) * 0.02;
        uv += normalize(diff + 0.0001) * ripple * exp(-dist * 12.0);

        float s = max(abs(sin(uTime - uv.x - uv.y)), 0.25);
        vec3 color = uBaseColor / s;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

        /* ================= SETUP ================= */

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
            vertex,
            fragment,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new Float32Array([1, 1]) },
                uBaseColor: { value: new Float32Array(baseColor) },
                uAmplitude: { value: amplitude },
                uFrequencyX: { value: frequencyX },
                uFrequencyY: { value: frequencyY },
                uMouse: { value: new Float32Array([0.5, 0.5]) }
            }
        });

        const mesh = new Mesh(gl, { geometry, program });

        /* ================= RESIZE ================= */

        const DPR = Math.min(window.devicePixelRatio, 1.5);

        function resize() {
            const w = container.clientWidth;
            const h = container.clientHeight;

            renderer.setSize(w * DPR, h * DPR);
            gl.canvas.style.width = '100%';
            gl.canvas.style.height = '100%';

            program.uniforms.uResolution.value[0] = w * DPR;
            program.uniforms.uResolution.value[1] = h * DPR;
        }

        resize();
        window.addEventListener('resize', resize);

        /* ================= VISIBILITY ================= */

        let isVisible = true;
        const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
        });
        observer.observe(container);

        /* ================= INTERACTION ================= */

        const targetMouse = new Float32Array([0.5, 0.5]);
        const smoothMouse = new Float32Array([0.5, 0.5]);

        function onMove(x: number, y: number) {
            targetMouse[0] = x;
            targetMouse[1] = y;
        }

        function handleMouse(e: MouseEvent) {
            const r = container.getBoundingClientRect();
            onMove((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
        }

        function handleTouch(e: TouchEvent) {
            if (!e.touches[0]) return;
            const r = container.getBoundingClientRect();
            onMove(
                (e.touches[0].clientX - r.left) / r.width,
                1 - (e.touches[0].clientY - r.top) / r.height
            );
        }

        if (interactive) {
            container.addEventListener('mousemove', handleMouse);
            container.addEventListener('touchmove', handleTouch);
        }

        /* ================= LOOP ================= */

        let raf = 0;

        function update(t: number) {
            raf = requestAnimationFrame(update);
            if (!isVisible) return;

            smoothMouse[0] += (targetMouse[0] - smoothMouse[0]) * 0.04;
            smoothMouse[1] += (targetMouse[1] - smoothMouse[1]) * 0.04;

            program.uniforms.uMouse.value.set(smoothMouse);
            program.uniforms.uTime.value = t * 0.001 * speed;

            renderer.render({ scene: mesh });
        }

        raf = requestAnimationFrame(update);
        container.appendChild(gl.canvas);

        /* ================= CLEANUP ================= */

        return () => {
            cancelAnimationFrame(raf);
            observer.disconnect();
            window.removeEventListener('resize', resize);

            if (interactive) {
                container.removeEventListener('mousemove', handleMouse);
                container.removeEventListener('touchmove', handleTouch);
            }

            gl.canvas.remove();
        };
    }, [baseColor, speed, amplitude, frequencyX, frequencyY, interactive]);

    return <div ref={containerRef} className="w-full h-full" {...props} />;
};

export default LiquidChrome;

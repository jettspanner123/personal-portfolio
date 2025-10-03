module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/app/effects/PrismaticBursts.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$core$2f$Renderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ogl/src/core/Renderer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$core$2f$Program$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ogl/src/core/Program.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$core$2f$Mesh$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ogl/src/core/Mesh.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$extras$2f$Triangle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ogl/src/extras/Triangle.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$core$2f$Texture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ogl/src/core/Texture.js [app-ssr] (ecmascript)");
;
;
;
const vertexShader = `#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;
const fragmentShader = `#version 300 es
precision highp float;
precision highp int;

out vec4 fragColor;

uniform vec2  uResolution;
uniform float uTime;

uniform float uIntensity;
uniform float uSpeed;
uniform int   uAnimType;
uniform vec2  uMouse;
uniform int   uColorCount;
uniform float uDistort;
uniform vec2  uOffset;
uniform sampler2D uGradient;
uniform float uNoiseAmount;
uniform int   uRayCount;

float hash21(vec2 p){
    p = floor(p);
    float f = 52.9829189 * fract(dot(p, vec2(0.065, 0.005)));
    return fract(f);
}

mat2 rot30(){ return mat2(0.8, -0.5, 0.5, 0.8); }

float layeredNoise(vec2 fragPx){
    vec2 p = mod(fragPx + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);
    vec2 q = rot30() * p;
    float n = 0.0;
    n += 0.40 * hash21(q);
    n += 0.25 * hash21(q * 2.0 + 17.0);
    n += 0.20 * hash21(q * 4.0 + 47.0);
    n += 0.10 * hash21(q * 8.0 + 113.0);
    n += 0.05 * hash21(q * 16.0 + 191.0);
    return n;
}

vec3 rayDir(vec2 frag, vec2 res, vec2 offset, float dist){
    float focal = res.y * max(dist, 1e-3);
    return normalize(vec3(2.0 * (frag - offset) - res, focal));
}

float edgeFade(vec2 frag, vec2 res, vec2 offset){
    vec2 toC = frag - 0.5 * res - offset;
    float r = length(toC) / (0.5 * min(res.x, res.y));
    float x = clamp(r, 0.0, 1.0);
    float q = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
    float s = q * 0.5;
    s = pow(s, 1.5);
    float tail = 1.0 - pow(1.0 - s, 2.0);
    s = mix(s, tail, 0.2);
    float dn = (layeredNoise(frag * 0.15) - 0.5) * 0.0015 * s;
    return clamp(s + dn, 0.0, 1.0);
}

mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); }
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); }
mat3 rotZ(float a){ float c = cos(a), s = sin(a); return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0); }

vec3 sampleGradient(float t){
    t = clamp(t, 0.0, 1.0);
    return texture(uGradient, vec2(t, 0.5)).rgb;
}

vec2 rot2(vec2 v, float a){
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c) * v;
}

float bendAngle(vec3 q, float t){
    float a = 0.8 * sin(q.x * 0.55 + t * 0.6)
            + 0.7 * sin(q.y * 0.50 - t * 0.5)
            + 0.6 * sin(q.z * 0.60 + t * 0.7);
    return a;
}

void main(){
    vec2 frag = gl_FragCoord.xy;
    float t = uTime * uSpeed;
    float jitterAmp = 0.1 * clamp(uNoiseAmount, 0.0, 1.0);
    vec3 dir = rayDir(frag, uResolution, uOffset, 1.0);
    float marchT = 0.0;
    vec3 col = vec3(0.0);
    float n = layeredNoise(frag);
    vec4 c = cos(t * 0.2 + vec4(0.0, 33.0, 11.0, 0.0));
    mat2 M2 = mat2(c.x, c.y, c.z, c.w);
    float amp = clamp(uDistort, 0.0, 50.0) * 0.15;

    mat3 rot3dMat = mat3(1.0);
    if(uAnimType == 1){
      vec3 ang = vec3(t * 0.31, t * 0.21, t * 0.17);
      rot3dMat = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x);
    }
    mat3 hoverMat = mat3(1.0);
    if(uAnimType == 2){
      vec2 m = uMouse * 2.0 - 1.0;
      vec3 ang = vec3(m.y * 0.6, m.x * 0.6, 0.0);
      hoverMat = rotY(ang.y) * rotX(ang.x);
    }

    for (int i = 0; i < 44; ++i) {
        vec3 P = marchT * dir;
        P.z -= 2.0;
        float rad = length(P);
        vec3 Pl = P * (10.0 / max(rad, 1e-6));

        if(uAnimType == 0){
            Pl.xz *= M2;
        } else if(uAnimType == 1){
      Pl = rot3dMat * Pl;
        } else {
      Pl = hoverMat * Pl;
        }

        float stepLen = min(rad - 0.3, n * jitterAmp) + 0.1;

        float grow = smoothstep(0.35, 3.0, marchT);
        float a1 = amp * grow * bendAngle(Pl * 0.6, t);
        float a2 = 0.5 * amp * grow * bendAngle(Pl.zyx * 0.5 + 3.1, t * 0.9);
        vec3 Pb = Pl;
        Pb.xz = rot2(Pb.xz, a1);
        Pb.xy = rot2(Pb.xy, a2);

        float rayPattern = smoothstep(
            0.5, 0.7,
            sin(Pb.x + cos(Pb.y) * cos(Pb.z)) *
            sin(Pb.z + sin(Pb.y) * cos(Pb.x + t))
        );

        if (uRayCount > 0) {
            float ang = atan(Pb.y, Pb.x);
            float comb = 0.5 + 0.5 * cos(float(uRayCount) * ang);
            comb = pow(comb, 3.0);
            rayPattern *= smoothstep(0.15, 0.95, comb);
        }

        vec3 spectralDefault = 1.0 + vec3(
            cos(marchT * 3.0 + 0.0),
            cos(marchT * 3.0 + 1.0),
            cos(marchT * 3.0 + 2.0)
        );

        float saw = fract(marchT * 0.25);
        float tRay = saw * saw * (3.0 - 2.0 * saw);
        vec3 userGradient = 2.0 * sampleGradient(tRay);
        vec3 spectral = (uColorCount > 0) ? userGradient : spectralDefault;
        vec3 base = (0.05 / (0.4 + stepLen))
                  * smoothstep(5.0, 0.0, rad)
                  * spectral;

        col += base * rayPattern;
        marchT += stepLen;
    }

    col *= edgeFade(frag, uResolution, uOffset);
    col *= uIntensity;

    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;
const hexToRgb01 = (hex)=>{
    let h = hex.trim();
    if (h.startsWith('#')) h = h.slice(1);
    if (h.length === 3) {
        const r = h[0], g = h[1], b = h[2];
        h = r + r + g + g + b + b;
    }
    const intVal = parseInt(h, 16);
    if (isNaN(intVal) || h.length !== 6 && h.length !== 8) return [
        1,
        1,
        1
    ];
    const r = (intVal >> 16 & 255) / 255;
    const g = (intVal >> 8 & 255) / 255;
    const b = (intVal & 255) / 255;
    return [
        r,
        g,
        b
    ];
};
const toPx = (v)=>{
    if (v == null) return 0;
    if (typeof v === 'number') return v;
    const s = String(v).trim();
    const num = parseFloat(s.replace('px', ''));
    return isNaN(num) ? 0 : num;
};
const PrismaticBurst = ({ intensity = 2, speed = 0.5, animationType = 'rotate3d', colors, distort = 0, paused = false, offset = {
    x: 0,
    y: 0
}, hoverDampness = 0, rayCount, mixBlendMode = 'lighten' })=>{
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const programRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rendererRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mouseTargetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([
        0.5,
        0.5
    ]);
    const mouseSmoothRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([
        0.5,
        0.5
    ]);
    const pausedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(paused);
    const gradTexRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hoverDampRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(hoverDampness);
    const isVisibleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(true);
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const triRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        pausedRef.current = paused;
    }, [
        paused
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        hoverDampRef.current = hoverDampness;
    }, [
        hoverDampness
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const container = containerRef.current;
        if (!container) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$core$2f$Renderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Renderer"]({
            dpr,
            alpha: false,
            antialias: false
        });
        rendererRef.current = renderer;
        const gl = renderer.gl;
        gl.canvas.style.position = 'absolute';
        gl.canvas.style.inset = '0';
        gl.canvas.style.width = '100%';
        gl.canvas.style.height = '100%';
        gl.canvas.style.mixBlendMode = mixBlendMode && mixBlendMode !== 'none' ? mixBlendMode : '';
        container.appendChild(gl.canvas);
        const white = new Uint8Array([
            255,
            255,
            255,
            255
        ]);
        const gradientTex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$core$2f$Texture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Texture"](gl, {
            image: white,
            width: 1,
            height: 1,
            generateMipmaps: false,
            flipY: false
        });
        gradientTex.minFilter = gl.LINEAR;
        gradientTex.magFilter = gl.LINEAR;
        gradientTex.wrapS = gl.CLAMP_TO_EDGE;
        gradientTex.wrapT = gl.CLAMP_TO_EDGE;
        gradTexRef.current = gradientTex;
        const program = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$core$2f$Program$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Program"](gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                uResolution: {
                    value: [
                        1,
                        1
                    ]
                },
                uTime: {
                    value: 0
                },
                uIntensity: {
                    value: 1
                },
                uSpeed: {
                    value: 1
                },
                uAnimType: {
                    value: 0
                },
                uMouse: {
                    value: [
                        0.5,
                        0.5
                    ]
                },
                uColorCount: {
                    value: 0
                },
                uDistort: {
                    value: 0
                },
                uOffset: {
                    value: [
                        0,
                        0
                    ]
                },
                uGradient: {
                    value: gradientTex
                },
                uNoiseAmount: {
                    value: 0.8
                },
                uRayCount: {
                    value: 0
                }
            }
        });
        programRef.current = program;
        const triangle = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$extras$2f$Triangle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Triangle"](gl);
        const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$core$2f$Mesh$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](gl, {
            geometry: triangle,
            program
        });
        triRef.current = triangle;
        meshRef.current = mesh;
        const resize = ()=>{
            const w = container.clientWidth || 1;
            const h = container.clientHeight || 1;
            renderer.setSize(w, h);
            program.uniforms.uResolution.value = [
                gl.drawingBufferWidth,
                gl.drawingBufferHeight
            ];
        };
        let ro = null;
        if ('ResizeObserver' in window) {
            ro = new ResizeObserver(resize);
            ro.observe(container);
        } else {
            window.addEventListener('resize', resize);
        }
        resize();
        const onPointer = (e)=>{
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / Math.max(rect.width, 1);
            const y = (e.clientY - rect.top) / Math.max(rect.height, 1);
            mouseTargetRef.current = [
                Math.min(Math.max(x, 0), 1),
                Math.min(Math.max(y, 0), 1)
            ];
        };
        container.addEventListener('pointermove', onPointer, {
            passive: true
        });
        let io = null;
        if ('IntersectionObserver' in window) {
            io = new IntersectionObserver((entries)=>{
                if (entries[0]) isVisibleRef.current = entries[0].isIntersecting;
            }, {
                root: null,
                threshold: 0.01
            });
            io.observe(container);
        }
        const onVis = ()=>{};
        document.addEventListener('visibilitychange', onVis);
        let raf = 0;
        let last = performance.now();
        let accumTime = 0;
        const update = (now)=>{
            const dt = Math.max(0, now - last) * 0.001;
            last = now;
            const visible = isVisibleRef.current && !document.hidden;
            if (!pausedRef.current) accumTime += dt;
            if (!visible) {
                raf = requestAnimationFrame(update);
                return;
            }
            const tau = 0.02 + Math.max(0, Math.min(1, hoverDampRef.current)) * 0.5;
            const alpha = 1 - Math.exp(-dt / tau);
            const tgt = mouseTargetRef.current;
            const sm = mouseSmoothRef.current;
            sm[0] += (tgt[0] - sm[0]) * alpha;
            sm[1] += (tgt[1] - sm[1]) * alpha;
            program.uniforms.uMouse.value = sm;
            program.uniforms.uTime.value = accumTime;
            renderer.render({
                scene: meshRef.current
            });
            raf = requestAnimationFrame(update);
        };
        raf = requestAnimationFrame(update);
        return ()=>{
            cancelAnimationFrame(raf);
            container.removeEventListener('pointermove', onPointer);
            ro?.disconnect();
            if (!ro) window.removeEventListener('resize', resize);
            io?.disconnect();
            document.removeEventListener('visibilitychange', onVis);
            try {
                container.removeChild(gl.canvas);
            } catch (e) {
                void e;
            }
            meshRef.current = null;
            triRef.current = null;
            programRef.current = null;
            try {
                const glCtx = rendererRef.current?.gl;
                if (glCtx && gradTexRef.current?.texture) glCtx.deleteTexture(gradTexRef.current.texture);
            } catch (e) {
                void e;
            }
            rendererRef.current = null;
            gradTexRef.current = null;
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const canvas = rendererRef.current?.gl?.canvas;
        if (canvas) {
            canvas.style.mixBlendMode = mixBlendMode && mixBlendMode !== 'none' ? mixBlendMode : '';
        }
    }, [
        mixBlendMode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const program = programRef.current;
        const renderer = rendererRef.current;
        const gradTex = gradTexRef.current;
        if (!program || !renderer || !gradTex) return;
        program.uniforms.uIntensity.value = intensity ?? 1;
        program.uniforms.uSpeed.value = speed ?? 1;
        const animTypeMap = {
            rotate: 0,
            rotate3d: 1,
            hover: 2
        };
        program.uniforms.uAnimType.value = animTypeMap[animationType ?? 'rotate'];
        program.uniforms.uDistort.value = typeof distort === 'number' ? distort : 0;
        const ox = toPx(offset?.x);
        const oy = toPx(offset?.y);
        program.uniforms.uOffset.value = [
            ox,
            oy
        ];
        program.uniforms.uRayCount.value = Math.max(0, Math.floor(rayCount ?? 0));
        let count = 0;
        if (Array.isArray(colors) && colors.length > 0) {
            const gl = renderer.gl;
            const capped = colors.slice(0, 64);
            count = capped.length;
            const data = new Uint8Array(count * 4);
            for(let i = 0; i < count; i++){
                const [r, g, b] = hexToRgb01(capped[i]);
                data[i * 4 + 0] = Math.round(r * 255);
                data[i * 4 + 1] = Math.round(g * 255);
                data[i * 4 + 2] = Math.round(b * 255);
                data[i * 4 + 3] = 255;
            }
            gradTex.image = data;
            gradTex.width = count;
            gradTex.height = 1;
            gradTex.minFilter = gl.LINEAR;
            gradTex.magFilter = gl.LINEAR;
            gradTex.wrapS = gl.CLAMP_TO_EDGE;
            gradTex.wrapT = gl.CLAMP_TO_EDGE;
            gradTex.flipY = false;
            gradTex.generateMipmaps = false;
            gradTex.format = gl.RGBA;
            gradTex.type = gl.UNSIGNED_BYTE;
            gradTex.needsUpdate = true;
        } else {
            count = 0;
        }
        program.uniforms.uColorCount.value = count;
    }, [
        intensity,
        speed,
        animationType,
        colors,
        distort,
        offset,
        rayCount
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-full relative overflow-hidden",
        ref: containerRef
    }, void 0, false, {
        fileName: "[project]/app/effects/PrismaticBursts.tsx",
        lineNumber: 457,
        columnNumber: 10
    }, this);
};
const __TURBOPACK__default__export__ = PrismaticBurst;
}}),
"[project]/app/ui_components/home_components/home_sections/LandingSection.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>LandingSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$effects$2f$PrismaticBursts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/effects/PrismaticBursts.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function LandingSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: '100vw',
                height: '100vh',
                position: 'relative'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$effects$2f$PrismaticBursts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                animationType: "hover",
                intensity: 2,
                speed: 0.5,
                distort: 1.0,
                paused: false,
                offset: {
                    x: 0,
                    y: 0
                },
                hoverDampness: 0.25,
                rayCount: 24,
                mixBlendMode: "lighten",
                colors: [
                    '#ff007a',
                    '#4d3dff',
                    '#ffffff'
                ]
            }, void 0, false, {
                fileName: "[project]/app/ui_components/home_components/home_sections/LandingSection.tsx",
                lineNumber: 9,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/ui_components/home_components/home_sections/LandingSection.tsx",
            lineNumber: 8,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/ui_components/home_components/home_sections/LandingSection.tsx",
        lineNumber: 7,
        columnNumber: 9
    }, this);
}
}}),
"[project]/app/ui_components/landing_loader/InitialLoader.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>InitialLoader)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
function InitialLoader() {
    const [isTransitioning, setTransitioning] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        setTimeout(()=>{
            setTransitioning(true);
        }, 2000);
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: `h-screen w-screen fixed top-0 left-0 flex`,
            children: [
                0.10,
                0,
                0.05,
                0.15,
                0.2
            ].map((item, index)=>{
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    animate: {
                        y: isTransitioning ? "-110vh" : "0vh"
                    },
                    transition: {
                        duration: 1,
                        delay: item,
                        ease: [
                            0.85,
                            0,
                            0.15,
                            1
                        ]
                    },
                    className: `h-screen flex-1 bg-white`,
                    children: index === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `text-black alumni-sans-sc-400 w-full h-full flex justify-center items-center`,
                        children: "uddeshya-singh".split("").map((item, index)=>{
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                className: `uppercase text-[2rem] inline-block`,
                                animate: {
                                    scaleY: 1
                                },
                                initial: {
                                    scaleY: 0
                                },
                                transition: {
                                    duration: 0.75,
                                    delay: index * 0.05,
                                    ease: [
                                        0.85,
                                        0,
                                        0.15,
                                        1
                                    ]
                                },
                                children: item
                            }, index, false, {
                                fileName: "[project]/app/ui_components/landing_loader/InitialLoader.tsx",
                                lineNumber: 35,
                                columnNumber: 49
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/ui_components/landing_loader/InitialLoader.tsx",
                        lineNumber: 31,
                        columnNumber: 37
                    }, this)
                }, index, false, {
                    fileName: "[project]/app/ui_components/landing_loader/InitialLoader.tsx",
                    lineNumber: 20,
                    columnNumber: 29
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/app/ui_components/landing_loader/InitialLoader.tsx",
            lineNumber: 16,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/ui_components/landing_loader/InitialLoader.tsx",
        lineNumber: 15,
        columnNumber: 9
    }, this);
}
}}),
"[project]/app/constants/animation_constants.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "springOptions": (()=>springOptions)
});
const springOptions = {
    stiffness: 150,
    mass: 0.5,
    damping: 20,
    ease: [
        0,
        0.55,
        0.45,
        1
    ]
};
}}),
"[project]/app/stores/mouse_store.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "MouseHoverStateOptions": (()=>MouseHoverStateOptions),
    "useMouseHoverState": (()=>useMouseHoverState)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
;
var MouseHoverStateOptions = /*#__PURE__*/ function(MouseHoverStateOptions) {
    MouseHoverStateOptions[MouseHoverStateOptions["None"] = 0] = "None";
    MouseHoverStateOptions[MouseHoverStateOptions["Link"] = 1] = "Link";
    MouseHoverStateOptions[MouseHoverStateOptions["Read"] = 2] = "Read";
    MouseHoverStateOptions[MouseHoverStateOptions["Email"] = 3] = "Email";
    MouseHoverStateOptions[MouseHoverStateOptions["Phone"] = 4] = "Phone";
    return MouseHoverStateOptions;
}({});
const useMouseHoverState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set)=>({
        mouseHoverState: 0,
        setMouseHoverState: (state)=>set({
                mouseHoverState: state
            }),
        mouseSize: 20,
        setMouseSize: (size)=>set({
                mouseSize: size
            }),
        toggleFor: (type)=>set((state)=>({
                    mouseHoverState: state.mouseHoverState == type ? 0 : type,
                    mouseSize: state.mouseSize === 20 ? 100 : 20
                })),
        showMouseHover: true,
        toggleShowMouseHover: ()=>set((state)=>({
                    showMouseHover: !state.showMouseHover
                }))
    }));
}}),
"[project]/app/stores/homepage_store.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useHomePageState": (()=>useHomePageState)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
;
const useHomePageState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set)=>({
        isPageChanging: false,
        setPageChanging: (state)=>set({
                isPageChanging: state
            })
    }));
}}),
"[project]/app/ui_components/home_components/home_sections/project_view_card.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ProjectViewCards)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/constants/animation_constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/stores/mouse_store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$homepage_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/stores/homepage_store.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
function ProjectViewCards({ heading, body, image, icon, iconBackground, link }) {
    const { toggleFor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMouseHoverState"])();
    const firstProjectRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const imageRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const { scrollYProgress: firstProjectScrollProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        target: firstProjectRef,
        offset: [
            "start end",
            "start 50%"
        ]
    });
    const { scrollYProgress: imageScrollProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        target: imageRef,
        offset: [
            "start end",
            "end start"
        ]
    });
    const projectImagesScaleAnimation = {
        firstProjectImage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(firstProjectScrollProgress, [
            0,
            1
        ], [
            900,
            0
        ]), __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"]),
        firstProjectSecondImage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(firstProjectScrollProgress, [
            0.5,
            1
        ], [
            0,
            1
        ]), __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"])
    };
    const imageTransform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(imageScrollProgress, [
        0,
        1
    ], [
        100,
        -150
    ]);
    const { setPageChanging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$homepage_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useHomePageState"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: firstProjectRef,
        className: `w-full !px-[7rem] h-[35rem] flex justify-between items-center !mt-[15rem]`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex-1 h-full flex flex-col`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: `font-bold text-[3rem] uppercase oswald`,
                        children: heading
                    }, void 0, false, {
                        fileName: "[project]/app/ui_components/home_components/home_sections/project_view_card.tsx",
                        lineNumber: 55,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `text-[1.5rem] geist w-[80%] text-justify !mt-[3rem]`,
                        children: body
                    }, void 0, false, {
                        fileName: "[project]/app/ui_components/home_components/home_sections/project_view_card.tsx",
                        lineNumber: 60,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/ui_components/home_components/home_sections/project_view_card.tsx",
                lineNumber: 54,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onMouseEnter: ()=>{
                    toggleFor(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MouseHoverStateOptions"].Link);
                },
                onMouseLeave: ()=>{
                    toggleFor(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MouseHoverStateOptions"].Link);
                },
                onClick: ()=>{
                    if (!link) return;
                    setPageChanging(true);
                    setTimeout(()=>{
                        window.location.assign(link);
                    }, 2200);
                },
                className: `flex-1 h-full relative`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    ref: imageRef,
                    style: {
                    },
                    className: `h-[85%] aspect-[16/9] relative `,
                    children: [
                        image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            style: {
                                y: imageTransform
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: image,
                                alt: ""
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/project_view_card.tsx",
                                lineNumber: 93,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/project_view_card.tsx",
                            lineNumber: 92,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            style: {
                                scale: projectImagesScaleAnimation.firstProjectSecondImage,
                                background: iconBackground
                            },
                            className: `h-[10rem] aspect-square flex justify-center items-center rounded-full absolute bottom-0 translate-y-1/3 -translate-x-1/3`,
                            children: icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    src: icon,
                                    alt: ""
                                }, void 0, false, {
                                    fileName: "[project]/app/ui_components/home_components/home_sections/project_view_card.tsx",
                                    lineNumber: 107,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/project_view_card.tsx",
                                lineNumber: 106,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/project_view_card.tsx",
                            lineNumber: 98,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/project_view_card.tsx",
                    lineNumber: 84,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/ui_components/home_components/home_sections/project_view_card.tsx",
                lineNumber: 67,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/ui_components/home_components/home_sections/project_view_card.tsx",
        lineNumber: 50,
        columnNumber: 9
    }, this);
}
}}),
"[project]/app/ui_components/home_components/home_sections/reverse_project_view_card.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ReverseProjectViewCards)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/constants/animation_constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/stores/mouse_store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$homepage_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/stores/homepage_store.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
function ReverseProjectViewCards({ heading, body, image, icon, iconBackground, link }) {
    const { toggleFor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMouseHoverState"])();
    const firstProjectRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const imageRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const { scrollYProgress: firstProjectScrollProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        target: firstProjectRef,
        offset: [
            "start end",
            "start 50%"
        ]
    });
    const { scrollYProgress: imageScrollProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        target: imageRef,
        offset: [
            "start end",
            "end start"
        ]
    });
    const projectImagesScaleAnimation = {
        firstProjectImage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(firstProjectScrollProgress, [
            0,
            1
        ], [
            -900,
            0
        ]), __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"]),
        firstProjectSecondImage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(firstProjectScrollProgress, [
            0,
            1
        ], [
            0,
            1
        ]), __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"])
    };
    const imageTransform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(imageScrollProgress, [
        0,
        1
    ], [
        100,
        -150
    ]);
    const { setPageChanging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$homepage_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useHomePageState"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: firstProjectRef,
        className: `w-full !px-[7rem] h-[35rem] flex justify-between items-center !mt-[15rem]`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onMouseEnter: ()=>{
                    toggleFor(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MouseHoverStateOptions"].Link);
                },
                onMouseLeave: ()=>{
                    toggleFor(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MouseHoverStateOptions"].Link);
                },
                onClick: ()=>{
                    if (!link) return;
                    setPageChanging(true);
                    setTimeout(()=>{
                        window.location.assign(link);
                    }, 2200);
                },
                className: `flex-1 h-full relative`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    ref: imageRef,
                    style: {
                    },
                    className: `h-[85%] aspect-[16/9] relative`,
                    children: [
                        image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            style: {
                                y: imageTransform
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: image,
                                alt: ""
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/reverse_project_view_card.tsx",
                                lineNumber: 86,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/reverse_project_view_card.tsx",
                            lineNumber: 85,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            style: {
                                scale: projectImagesScaleAnimation.firstProjectSecondImage,
                                background: iconBackground
                            },
                            className: `h-[10rem] flex justify-center items-center aspect-square rounded-full absolute bottom-0 right-0 translate-y-1/3 translate-x-1/3`,
                            children: icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    src: icon,
                                    alt: ""
                                }, void 0, false, {
                                    fileName: "[project]/app/ui_components/home_components/home_sections/reverse_project_view_card.tsx",
                                    lineNumber: 100,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/reverse_project_view_card.tsx",
                                lineNumber: 99,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/reverse_project_view_card.tsx",
                            lineNumber: 92,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/reverse_project_view_card.tsx",
                    lineNumber: 77,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/ui_components/home_components/home_sections/reverse_project_view_card.tsx",
                lineNumber: 60,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex-1 h-full flex flex-col items-end`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: `font-bold text-[3rem] uppercase oswald`,
                        children: heading
                    }, void 0, false, {
                        fileName: "[project]/app/ui_components/home_components/home_sections/reverse_project_view_card.tsx",
                        lineNumber: 114,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `text-[1.5rem] w-[80%] geist text-justify !mt-[3rem]`,
                        children: body
                    }, void 0, false, {
                        fileName: "[project]/app/ui_components/home_components/home_sections/reverse_project_view_card.tsx",
                        lineNumber: 118,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/ui_components/home_components/home_sections/reverse_project_view_card.tsx",
                lineNumber: 113,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/ui_components/home_components/home_sections/reverse_project_view_card.tsx",
        lineNumber: 53,
        columnNumber: 9
    }, this);
}
}}),
"[project]/app/constants/ui_constants.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ApplicationColor": (()=>ApplicationColor),
    "ApplicationLinearGradient": (()=>ApplicationLinearGradient)
});
class ApplicationColor {
    static current = new ApplicationColor();
    applicationBlack = `#000000`;
    appDarkBG = `#212121`;
    appBloodRedDark = `#7A0C0C`;
    appBloodRedLight = `#E01515`;
    appBlueDark = `#233060`;
    appBlueLight = `#4863C6`;
    appBrownDark = `#67301A`;
    appBrownLight = `#CD6034`;
    appCyanDark = `#165A5A`;
    appCyanLight = `#2FC0C0`;
    appGoldDark = `#67591A`;
    appGoldLight = `#CDB134`;
    appGreenDark = `#2D5A23`;
    appGreenLight = `#60C04B`;
    appGreyLight = `#ADADAD`;
    appLavaOne = `#DB4C27`;
    appLavaPurpleOne = `#985EC7`;
    appLavaPurpleTwo = `#5F2077`;
    appLavaTwo = `#EC6E4E`;
    appOrangeDark = `#94401F`;
    appOrangeLight = `#FA6C34`;
    appRedDark = `#7B2E22`;
    appRedLight = `#E1543E`;
    appThanosDark = `#3B2D59`;
    appThanosLight = `#7E60BF`;
    appWaterDark = `#20497F`;
    appWaterLight = `#3984E5`;
}
class ApplicationLinearGradient {
    static current = new ApplicationLinearGradient();
    appBackground = `linear-gradient(to bottom, ${ApplicationColor.current.appDarkBG} 0%, ${ApplicationColor.current.applicationBlack} 100%)`;
    appBackgroundInverted = `linear-gradient(to bottom, ${ApplicationColor.current.applicationBlack} 0%, ${ApplicationColor.current.appDarkBG} 100%)`;
    appRedGradient = `linear-gradient(to bottom, ${ApplicationColor.current.appRedLight} 0%, ${ApplicationColor.current.appRedDark} 100%)`;
    appRedPinkGradient = `linear-gradient(to bottom, #DA6C6C 0%, #AF3E3E 100%)`;
    appBlueGradientInverted = `linear-gradient(to bottom, ${ApplicationColor.current.appBlueDark} 0%, ${ApplicationColor.current.appBlueLight} 100%)`;
    appBlueGradient = `linear-gradient(to bottom, ${ApplicationColor.current.appBlueLight} 0%, ${ApplicationColor.current.appBlueDark} 100%)`;
    appTransparentGradient = `linear-gradient(to bottom, transparent 0%, transparent 0%)`;
    appGreenGradient = `linear-gradient(to bottom, ${ApplicationColor.current.appGreenLight} 0%, ${ApplicationColor.current.appGreenDark} 100%)`;
    appThanosGradient = `linear-gradient(to bottom, ${ApplicationColor.current.appThanosLight} 0%, ${ApplicationColor.current.appThanosDark} 100%)`;
    infosysHMSApp = `linear-gradient(135deg, #5F6CA0, #7886C7, #94A2DA)`;
}
}}),
"[project]/app/assets/FirstMockup.png (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/FirstMockup.21a5cfce.png");}}),
"[project]/app/assets/FirstMockup.png.mjs { IMAGE => \"[project]/app/assets/FirstMockup.png (static in ecmascript)\" } [app-ssr] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$FirstMockup$2e$png__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/app/assets/FirstMockup.png (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$FirstMockup$2e$png__$28$static__in__ecmascript$29$__["default"],
    width: 2000,
    height: 1500,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAoElEQVR42h2OvQqEMACDOwgKgoiD5+FftVLpDTo5OLi7CP5t4vs/xnfWISSBkESEYUie5yilsNryuq6c58m2bQjXdcmyjLZp0LUh+XxZloX7vjmOA+E4DkEQ0Fclvf6hqoqu67iui33fEVEU4XkecRxT5NkTkEgpmaaJeZ4Rtt5uWyRJQv00tFq/oWEYEEVRUJYlvu+TpinGGMZxfM9a/wdIwUXw0iygHgAAAABJRU5ErkJggg==",
    blurWidth: 8,
    blurHeight: 6
};
}}),
"[project]/app/assets/Dumbbell.png (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/Dumbbell.7e1abe23.png");}}),
"[project]/app/assets/Dumbbell.png.mjs { IMAGE => \"[project]/app/assets/Dumbbell.png (static in ecmascript)\" } [app-ssr] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$Dumbbell$2e$png__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/app/assets/Dumbbell.png (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$Dumbbell$2e$png__$28$static__in__ecmascript$29$__["default"],
    width: 50,
    height: 50,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAjklEQVR42oWPMQrEIBREv8Uii92CB0glHiGNeJXtvUBKIY2nSKsnCGnEI6TQ+4QJSYoQiDAw/D/8eRIdjzFGT5445x+lVOec+wshvhC81rrDjowxfYxxyjkvUsofBJ9Smqy1PXnvh1LKXGtdQwgj1FpbMcPuCmB4BhC+AjiDc/cK1KJ+hwTQHRLgO+TbNzeuhk7dGScFVwAAAABJRU5ErkJggg==",
    blurWidth: 8,
    blurHeight: 8
};
}}),
"[project]/app/assets/MedfosysMockup.png (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/MedfosysMockup.5a12f115.png");}}),
"[project]/app/assets/MedfosysMockup.png.mjs { IMAGE => \"[project]/app/assets/MedfosysMockup.png (static in ecmascript)\" } [app-ssr] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$MedfosysMockup$2e$png__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/app/assets/MedfosysMockup.png (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$MedfosysMockup$2e$png__$28$static__in__ecmascript$29$__["default"],
    width: 2001,
    height: 1501,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAwklEQVR42jXHPQsBcRwH8P974OoMt3imW1Ay6LjBjAl3HhMlXTFgsFwmEotypitdynTLmR2bN+Dt/L64MnyGD+M4jr4gCAJEUQTP8/j9j0XCEUrEk9D1FRznBlmWIUkSotEYQsEwmFpvUK/dxW57xPP+hmGcMB5ryOXySKeyYJZlkW3bME0L14uLh/uCqnQgF0sepilVWk/62Ex7OOpznPcHLGcLlCs1D1MSfmrEfTTKBEgrJGnZqtBqPqVmZ0hqe0Affd1iNT3gWJ0AAAAASUVORK5CYII=",
    blurWidth: 8,
    blurHeight: 6
};
}}),
"[project]/app/assets/SweatItWebsiteMockup.png (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/SweatItWebsiteMockup.879770fc.png");}}),
"[project]/app/assets/SweatItWebsiteMockup.png.mjs { IMAGE => \"[project]/app/assets/SweatItWebsiteMockup.png (static in ecmascript)\" } [app-ssr] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$SweatItWebsiteMockup$2e$png__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/app/assets/SweatItWebsiteMockup.png (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$SweatItWebsiteMockup$2e$png__$28$static__in__ecmascript$29$__["default"],
    width: 2001,
    height: 1501,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAlUlEQVR42iWOzQqEMAyE4z+iHrQiKCvo9lwvQkuhb9Nn6Otntu0ePkgySWaIiDiCqqowjiO6rkNZlkizTFEUHEHTNPgcBx71YN93tG37X4gFJ7HveyzzjO8tsYglf0rQtm18nie01nDOwRiD676y3TRNoGEYWAiB933hvUcIAdZarOuabSmFTDnquuZ4xUopllLmPmk/s8M7bjJ7Ka8AAAAASUVORK5CYII=",
    blurWidth: 8,
    blurHeight: 6
};
}}),
"[project]/app/assets/MedfosysIcon.png (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/MedfosysIcon.3cfc3266.png");}}),
"[project]/app/assets/MedfosysIcon.png.mjs { IMAGE => \"[project]/app/assets/MedfosysIcon.png (static in ecmascript)\" } [app-ssr] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$MedfosysIcon$2e$png__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/app/assets/MedfosysIcon.png (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$MedfosysIcon$2e$png__$28$static__in__ecmascript$29$__["default"],
    width: 51,
    height: 50,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAx0lEQVR42m2OPwuCQBjGb+zP6elh0S2ei36EtgYbb3P0S9VkQ4jDgaC0iQ5+kzbHhpAwECGVOoNApB+88PI+z8vzACCQZXlhmiZFCC1VVYWWZVFJkuaDBgghOAxDryiKa5ZlUZ7nl2H3ff+oaRoCruuypmme7wl1XT8cx9kDxtiuqqr71FCW5c227S0QuQsRcer7vv2JXde1QRAcIISzbw9KKUnTNBpMYl5JknBd19dgjGEYmziOz5xzTzyswD8wxpKiKHB8+wC8o3GHLwMJ3AAAAABJRU5ErkJggg==",
    blurWidth: 8,
    blurHeight: 8
};
}}),
"[project]/app/ui_components/home_components/home_sections/FeaturedWorksSection.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>FeaturedWorksSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/constants/animation_constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$home_components$2f$home_sections$2f$project_view_card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/ui_components/home_components/home_sections/project_view_card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$home_components$2f$home_sections$2f$reverse_project_view_card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/ui_components/home_components/home_sections/reverse_project_view_card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/stores/mouse_store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$ui_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/constants/ui_constants.ts [app-ssr] (ecmascript)");
// MARK: Image imports
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$FirstMockup$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$FirstMockup$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/FirstMockup.png.mjs { IMAGE => "[project]/app/assets/FirstMockup.png (static in ecmascript)" } [app-ssr] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$Dumbbell$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$Dumbbell$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/Dumbbell.png.mjs { IMAGE => "[project]/app/assets/Dumbbell.png (static in ecmascript)" } [app-ssr] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$MedfosysMockup$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$MedfosysMockup$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/MedfosysMockup.png.mjs { IMAGE => "[project]/app/assets/MedfosysMockup.png (static in ecmascript)" } [app-ssr] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$SweatItWebsiteMockup$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$SweatItWebsiteMockup$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/SweatItWebsiteMockup.png.mjs { IMAGE => "[project]/app/assets/SweatItWebsiteMockup.png (static in ecmascript)" } [app-ssr] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$MedfosysIcon$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$MedfosysIcon$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/MedfosysIcon.png.mjs { IMAGE => "[project]/app/assets/MedfosysIcon.png (static in ecmascript)" } [app-ssr] (structured image object, ecmascript)');
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
function FeaturedWorksSection() {
    const { toggleFor, mouseHoverState, mouseSize } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMouseHoverState"])();
    const sectionRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        target: sectionRef,
        offset: [
            "start end",
            "start start"
        ]
    });
    const { scrollYProgress: reverseScrollProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        target: sectionRef,
        offset: [
            "end end",
            "end 50%"
        ]
    });
    const headingUnderlineWidth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        0.5
    ], [
        "0%",
        "100%"
    ]);
    const sectionOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(reverseScrollProgress, [
        0,
        1
    ], [
        1,
        0.5
    ]);
    const sectionBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(reverseScrollProgress, [
        0,
        1
    ], [
        "blur(0)",
        "blur(2px)"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].section, {
            style: {
                opacity: sectionOpacity,
                filter: sectionBlur
            },
            ref: sectionRef,
            className: `min-h-screen relative w-screen bg-white overflow-y-visible !pb-[15rem]`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex absolute w-screen h-screen top-[-100vh]`,
                    children: // [4,3,0,1,2]
                    [
                        0,
                        1,
                        2,
                        3,
                        4
                    ].map((item, index)=>{
                        const rawScaleY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
                            Math.max(item / 10, 0),
                            1
                        ], [
                            0,
                            1
                        ]);
                        const scaleY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(rawScaleY, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"]);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            style: {
                                scaleY,
                                transformOrigin: "bottom"
                            },
                            className: `h-screen flex-1 bg-white pointer-events-none`
                        }, index, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/FeaturedWorksSection.tsx",
                            lineNumber: 55,
                            columnNumber: 33
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/FeaturedWorksSection.tsx",
                    lineNumber: 48,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `w-full flex justify-center items-center`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: `text-[3rem] !pt-[5rem] inline-block`,
                        children: [
                            "Featured Works",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                style: {
                                    width: headingUnderlineWidth,
                                    transformOrigin: "center"
                                },
                                className: `w-full h-[11px] bg-black rounded-full`
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/FeaturedWorksSection.tsx",
                                lineNumber: 77,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/ui_components/home_components/home_sections/FeaturedWorksSection.tsx",
                        lineNumber: 74,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/FeaturedWorksSection.tsx",
                    lineNumber: 73,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$home_components$2f$home_sections$2f$project_view_card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    heading: "Sweat It Fitness",
                    body: "Our fitness app helps you stay healthy with personalized workouts, diet plans, and progress tracking. It offers AI-powered recommendations, AR-based form correction, and syncs with wearables. Whether you’re a beginner or advanced, the app adapts to your needs and keeps you motivated every step of the way.",
                    iconBackground: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$ui_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApplicationLinearGradient"].current.appBackground,
                    image: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$FirstMockup$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$FirstMockup$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$Dumbbell$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$Dumbbell$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                    link: "/sweatit"
                }, void 0, false, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/FeaturedWorksSection.tsx",
                    lineNumber: 84,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$home_components$2f$home_sections$2f$reverse_project_view_card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    heading: "Infosys HMS",
                    body: "During my internship at Infosys, I developed a Hospital Management System using Swift. The app streamlined patient registration, appointment scheduling, and medical record management. It featured a clean UI, real-time data updates, and secure data handling, enhancing operational efficiency and improving the overall hospital workflow experience.",
                    iconBackground: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$ui_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApplicationLinearGradient"].current.infosysHMSApp,
                    image: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$MedfosysMockup$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$MedfosysMockup$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$MedfosysIcon$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$MedfosysIcon$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                    link: "/sweatit"
                }, void 0, false, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/FeaturedWorksSection.tsx",
                    lineNumber: 92,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$home_components$2f$home_sections$2f$project_view_card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    heading: "Sweat It Official Website",
                    body: "I created a website for an existing fitness application to enhance its online presence. The site showcases features like workout plans, diet tracking, and progress monitoring. It includes a clean UI, responsive design, and links to download the app, helping users learn more and easily access the application.",
                    iconBackground: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$ui_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApplicationColor"].current.appDarkBG,
                    image: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$SweatItWebsiteMockup$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$SweatItWebsiteMockup$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$Dumbbell$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$Dumbbell$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"]
                }, void 0, false, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/FeaturedWorksSection.tsx",
                    lineNumber: 100,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/ui_components/home_components/home_sections/FeaturedWorksSection.tsx",
            lineNumber: 41,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/ui_components/home_components/home_sections/FeaturedWorksSection.tsx",
        lineNumber: 40,
        columnNumber: 9
    }, this);
}
}}),
"[project]/app/ui_components/custom_mouse/CustomMouse.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CustomMouse)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/stores/mouse_store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/constants/animation_constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$gr$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/gr/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ci$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/ci/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/md/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
function CustomMouse() {
    const { mouseSize, mouseHoverState, showMouseHover } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMouseHoverState"])();
    const [mousePosition, setMousePosition] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState({
        x: 0,
        y: 0
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        window.addEventListener("mousemove", (event)=>{
            setMousePosition({
                x: event.clientX - mouseSize / 2,
                y: event.clientY - mouseSize / 2
            });
        });
        return ()=>window.removeEventListener("mousemove", ()=>{});
    }, [
        mouseSize
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        animate: {
            x: mousePosition.x,
            y: mousePosition.y,
            height: mouseSize,
            scale: showMouseHover ? 1 : 0
        },
        transition: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"]
        },
        className: `aspect-square rounded-full fixed z-[1000] mix-blend-difference bg-white pointer-events-none`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: mouseHoverState === __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MouseHoverStateOptions"].Link && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    animate: {
                        scale: 1,
                        rotate: -40
                    },
                    initial: {
                        scale: 0,
                        rotate: -90
                    },
                    exit: {
                        scale: 0,
                        rotate: -90
                    },
                    className: `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$gr$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GrLinkNext"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/app/ui_components/custom_mouse/CustomMouse.tsx",
                        lineNumber: 45,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/ui_components/custom_mouse/CustomMouse.tsx",
                    lineNumber: 39,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/ui_components/custom_mouse/CustomMouse.tsx",
                lineNumber: 37,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: mouseHoverState === __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MouseHoverStateOptions"].Read && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    animate: {
                        scale: 1,
                        rotate: 0
                    },
                    initial: {
                        scale: 0,
                        rotate: 90
                    },
                    exit: {
                        scale: 0,
                        rotate: 90
                    },
                    className: `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ci$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CiRead"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/app/ui_components/custom_mouse/CustomMouse.tsx",
                        lineNumber: 60,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/ui_components/custom_mouse/CustomMouse.tsx",
                    lineNumber: 54,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/ui_components/custom_mouse/CustomMouse.tsx",
                lineNumber: 52,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: mouseHoverState === __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MouseHoverStateOptions"].Email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    animate: {
                        scale: 1,
                        rotate: 0
                    },
                    initial: {
                        scale: 0,
                        rotate: 90
                    },
                    exit: {
                        scale: 0,
                        rotate: 90
                    },
                    className: `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MdEmail"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/app/ui_components/custom_mouse/CustomMouse.tsx",
                        lineNumber: 74,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/ui_components/custom_mouse/CustomMouse.tsx",
                    lineNumber: 68,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/ui_components/custom_mouse/CustomMouse.tsx",
                lineNumber: 66,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: mouseHoverState === __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MouseHoverStateOptions"].Phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    animate: {
                        scale: 1,
                        rotate: 0
                    },
                    initial: {
                        scale: 0,
                        rotate: 90
                    },
                    exit: {
                        scale: 0,
                        rotate: 90
                    },
                    className: `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaPhoneAlt"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/app/ui_components/custom_mouse/CustomMouse.tsx",
                        lineNumber: 87,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/ui_components/custom_mouse/CustomMouse.tsx",
                    lineNumber: 81,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/ui_components/custom_mouse/CustomMouse.tsx",
                lineNumber: 79,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/ui_components/custom_mouse/CustomMouse.tsx",
        lineNumber: 27,
        columnNumber: 9
    }, this);
}
}}),
"[project]/app/ui_components/home_components/home_sections/TechStackSection.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>WhatDoIDoSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/constants/animation_constants.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function WhatDoIDoSection() {
    const sectionRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        target: sectionRef,
        offset: [
            "start end",
            "start start"
        ]
    });
    const headingUnderlineWidth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        0.5
    ], [
        "0%",
        "100%"
    ]);
    const firstContent = "I’m a full-stack developer with a strong passion for UI/UX and front-end development. I love crafting intuitive, visually engaging interfaces while also handling robust backend systems. My focus lies in building seamless, user-centric digital experiences—from clean code to thoughtful design, I bring both functionality and aesthetics together.";
    const firstParagraphRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const { scrollYProgress: firstParagraphScrollProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        target: firstParagraphRef,
        offset: [
            "start end",
            "start 20%"
        ]
    });
    const { scrollYProgress: reverseScrollProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        target: sectionRef,
        offset: [
            "end end",
            "end 50%"
        ]
    });
    const sectionOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(reverseScrollProgress, [
        0,
        1
    ], [
        1,
        0.5
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"]);
    const sectionBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(reverseScrollProgress, [
        0,
        1
    ], [
        "blur(0)",
        "blur(2px)"
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        sectionOpacity.on("change", (newValue)=>{
            console.log(newValue);
        });
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].section, {
            style: {
                opacity: sectionOpacity,
                filter: sectionBlur
            },
            className: `min-h-[100vh] relative overflow-y-visible translate-y-[2px] !pb-[25rem]`,
            ref: sectionRef,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex absolute w-screen h-screen top-[-100vh] pointer-events-none`,
                    children: // [4,3,0,1,2]
                    [
                        0,
                        1,
                        2,
                        3,
                        4
                    ].map((item, index)=>{
                        const rawScaleY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
                            Math.max(item / 10, 0),
                            1
                        ], [
                            0,
                            1
                        ]);
                        const scaleY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(rawScaleY, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"]);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            style: {
                                scaleY,
                                transformOrigin: "bottom"
                            },
                            className: `h-screen flex-1 bg-black`
                        }, index, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/TechStackSection.tsx",
                            lineNumber: 57,
                            columnNumber: 33
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/TechStackSection.tsx",
                    lineNumber: 50,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `w-full flex justify-center text-white items-center`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: `text-[3rem] !pt-[5rem] inline-block`,
                        children: [
                            "My Expertise",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                style: {
                                    width: headingUnderlineWidth,
                                    transformOrigin: "center"
                                },
                                className: `w-full h-[11px] bg-white rounded-full`
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/TechStackSection.tsx",
                                lineNumber: 76,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/ui_components/home_components/home_sections/TechStackSection.tsx",
                        lineNumber: 73,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/TechStackSection.tsx",
                    lineNumber: 72,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `w-screen !pb-[15rem] !mt-[10rem]`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        ref: firstParagraphRef,
                        className: `text-white flex flex-wrap roboto font-semibold text-[3.125rem] uppercase  w-[80%] !mx-auto text-justify`,
                        children: firstContent.split(" ").map((word, index)=>{
                            let start = index / firstContent.split(" ").length;
                            let end = start + 1 / firstContent.split(" ").length;
                            const rawOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(firstParagraphScrollProgress, [
                                start,
                                end
                            ], [
                                0,
                                1
                            ]);
                            const opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(rawOpacity, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"]);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            opacity: 0.15
                                        },
                                        className: `text-white absolute !ml-[12px]`,
                                        children: word
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui_components/home_components/home_sections/TechStackSection.tsx",
                                        lineNumber: 97,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                        style: {
                                            opacity
                                        },
                                        className: `text-white !ml-[12px] !mt-[12px]`,
                                        children: word
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui_components/home_components/home_sections/TechStackSection.tsx",
                                        lineNumber: 101,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/TechStackSection.tsx",
                                lineNumber: 96,
                                columnNumber: 33
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/ui_components/home_components/home_sections/TechStackSection.tsx",
                        lineNumber: 87,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/TechStackSection.tsx",
                    lineNumber: 83,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/ui_components/home_components/home_sections/TechStackSection.tsx",
            lineNumber: 44,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/ui_components/home_components/home_sections/TechStackSection.tsx",
        lineNumber: 43,
        columnNumber: 9
    }, this);
}
}}),
"[project]/app/assets/Me.jpeg (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/Me.fa3a1be3.jpeg");}}),
"[project]/app/assets/Me.jpeg.mjs { IMAGE => \"[project]/app/assets/Me.jpeg (static in ecmascript)\" } [app-ssr] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$Me$2e$jpeg__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/app/assets/Me.jpeg (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$Me$2e$jpeg__$28$static__in__ecmascript$29$__["default"],
    width: 768,
    height: 1024,
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/wAARCAAIAAYDAREAAhEBAxEB/9sAQwAKBwcIBwYKCAgICwoKCw4YEA4NDQ4dFRYRGCMfJSQiHyIhJis3LyYpNCkhIjBBMTQ5Oz4+PiUuRElDPEg3PT47/9sAQwEKCwsODQ4cEBAcOygiKDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDU/t9pLlzBHLLGoAAjgwOep/E5oU3DcUocyXKf/9k=",
    blurWidth: 6,
    blurHeight: 8
};
}}),
"[project]/app/ui_components/home_components/home_sections/AboutSection.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AboutSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/constants/animation_constants.ts [app-ssr] (ecmascript)");
// MARK: Image imports
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$Me$2e$jpeg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$Me$2e$jpeg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/Me.jpeg.mjs { IMAGE => "[project]/app/assets/Me.jpeg (static in ecmascript)" } [app-ssr] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/stores/mouse_store.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function AboutSection() {
    const { toggleShowMouseHover } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMouseHoverState"])();
    const sectionRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        target: sectionRef,
        offset: [
            "start end",
            "start start"
        ]
    });
    const imageScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        1
    ], [
        0,
        1
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"]);
    const headingUnderlineWidth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        0.5
    ], [
        "0%",
        "100%"
    ]);
    const aboutMeContent = "For over 2 years I have been striving to create bold experiences that connect brands with their audience through design that resonates.";
    const aboutMeSubContent = "Specializing in digital design, motion design. I strive to give each project a unique personality and visual design.";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            onMouseEnter: ()=>{
                toggleShowMouseHover();
            },
            onMouseLeave: ()=>{
                toggleShowMouseHover();
            },
            className: `min-h-screen w-full bg-white relative`,
            ref: sectionRef,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex absolute w-screen h-screen top-[-100vh]`,
                    children: // [4,3,0,1,2]
                    [
                        0,
                        1,
                        2,
                        3,
                        4
                    ].map((item, index)=>{
                        const rawScaleY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
                            Math.max(item / 10, 0),
                            1
                        ], [
                            0,
                            1
                        ]);
                        const scaleY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(rawScaleY, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"]);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            style: {
                                scaleY,
                                transformOrigin: "bottom"
                            },
                            className: `h-screen flex-1 bg-white pointer-events-none`
                        }, index, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/AboutSection.tsx",
                            lineNumber: 47,
                            columnNumber: 33
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/AboutSection.tsx",
                    lineNumber: 40,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `w-full flex justify-center text-black items-center`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: `text-[3rem] !pt-[5rem] inline-block`,
                        children: [
                            "My Profile",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                style: {
                                    width: headingUnderlineWidth,
                                    transformOrigin: "center"
                                },
                                className: `w-full h-[11px] bg-black rounded-full`
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/AboutSection.tsx",
                                lineNumber: 66,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/ui_components/home_components/home_sections/AboutSection.tsx",
                        lineNumber: 63,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/AboutSection.tsx",
                    lineNumber: 62,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `w-full !px-[7rem] !mx-auto h-screen !mt-[10rem] flex`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex-1 h-full`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    style: {
                                        lineHeight: 1
                                    },
                                    className: `text-[3.5rem] geist font-light flex flex-wrap`,
                                    children: aboutMeContent.split(" ").map((item, index)=>{
                                        const start = index / aboutMeContent.split(" ").length;
                                        const end = start + 1 / aboutMeContent.split(" ").length;
                                        const scale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
                                            start,
                                            end
                                        ], [
                                            0,
                                            1
                                        ]), __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"]);
                                        const filter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
                                            start,
                                            end
                                        ], [
                                            "blur(5px)",
                                            "blur(0px)"
                                        ]);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                            className: `!ml-[12px]`,
                                            style: {
                                                scale,
                                                filter,
                                                transformOrigin: "left"
                                            },
                                            children: item
                                        }, index, false, {
                                            fileName: "[project]/app/ui_components/home_components/home_sections/AboutSection.tsx",
                                            lineNumber: 87,
                                            columnNumber: 37
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/ui_components/home_components/home_sections/AboutSection.tsx",
                                    lineNumber: 77,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    style: {
                                        lineHeight: 1
                                    },
                                    className: `text-[1.5rem] geist font-light flex flex-wrap !mt-[10rem] w-[50%]`,
                                    children: aboutMeSubContent.split(" ").map((item, index)=>{
                                        const start = index / aboutMeContent.split(" ").length;
                                        const end = start + 1 / aboutMeContent.split(" ").length;
                                        const filter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
                                            start,
                                            end
                                        ], [
                                            "blur(10px)",
                                            "blur(0px)"
                                        ]);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                            className: `!ml-[12px]`,
                                            style: {
                                                filter,
                                                transformOrigin: "left"
                                            },
                                            children: item
                                        }, index, false, {
                                            fileName: "[project]/app/ui_components/home_components/home_sections/AboutSection.tsx",
                                            lineNumber: 108,
                                            columnNumber: 37
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/ui_components/home_components/home_sections/AboutSection.tsx",
                                    lineNumber: 99,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                    whileHover: {
                                        background: "black",
                                        color: "white"
                                    },
                                    className: `geist font-light !mt-[2rem] !ml-[0.75rem] text-black text-[1rem] !p-[1rem] border-[0.5px] border-black rounded-full hover:cursor-pointer`,
                                    children: "Download CV"
                                }, void 0, false, {
                                    fileName: "[project]/app/ui_components/home_components/home_sections/AboutSection.tsx",
                                    lineNumber: 119,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/AboutSection.tsx",
                            lineNumber: 75,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex-1 h-full relative justify-end flex`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                style: {
                                    scale: imageScale,
                                    transformOrigin: "top right"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$Me$2e$jpeg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$Me$2e$jpeg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                                    alt: "",
                                    style: {
                                        width: "700px",
                                        height: "900px"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/ui_components/home_components/home_sections/AboutSection.tsx",
                                    lineNumber: 136,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/AboutSection.tsx",
                                lineNumber: 133,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/AboutSection.tsx",
                            lineNumber: 131,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/AboutSection.tsx",
                    lineNumber: 73,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/ui_components/home_components/home_sections/AboutSection.tsx",
            lineNumber: 30,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/ui_components/home_components/home_sections/AboutSection.tsx",
        lineNumber: 29,
        columnNumber: 9
    }, this);
}
}}),
"[project]/app/ui_components/home_components/home_sections/experience_section.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ExperienceSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/constants/animation_constants.ts [app-ssr] (ecmascript)");
// MARK: Image imports
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$Dumbbell$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$Dumbbell$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/Dumbbell.png.mjs { IMAGE => "[project]/app/assets/Dumbbell.png (static in ecmascript)" } [app-ssr] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/stores/mouse_store.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function ExperienceSection() {
    const { toggleFor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMouseHoverState"])();
    const sectionRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const accomplishmentHeadingRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const { scrollYProgress: headingScrollProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        target: sectionRef,
        offset: [
            "start end",
            "start 50%"
        ]
    });
    const { scrollYProgress: accomplishmentHeadingScrollProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        target: accomplishmentHeadingRef,
        offset: [
            "start end",
            "start 50%"
        ]
    });
    const headingUnderlineScaleX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(headingScrollProgress, [
        0,
        1
    ], [
        0,
        1
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"]);
    const experiences = [
        {
            name: "Front End Developer",
            company_name: "Cantiliver Labs",
            duration: "2023",
            logo: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$Dumbbell$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$Dumbbell$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"]
        },
        {
            name: "Technical Head",
            company_name: "Geeks For Geeks",
            duration: "2023-2025",
            logo: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$Dumbbell$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$Dumbbell$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"]
        },
        {
            name: "Software Intern",
            company_name: "Infosys, Mysuru",
            duration: "2025",
            logo: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$Dumbbell$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$Dumbbell$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"]
        }
    ];
    const accomplishments = [
        {
            name: "Regionals Winner",
            company_name: "Geeks For Geeks",
            hackation_name: "Solving For India Hackation",
            date: "March, 2023"
        },
        {
            name: "Larry Page UI Expert",
            company_name: "CodingNinjas",
            hackation_name: "UI/UX Comp",
            date: "May, 2023"
        },
        {
            name: "Runner Up",
            company_name: "Geeks For Geeks",
            hackation_name: "Solving For India Hackation",
            date: "September, 2024"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            ref: sectionRef,
            className: `min-h-screen h-screen bg-white w-screen flex `,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `h-full flex-1 !p-[7rem]`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: `text-[4rem] inline-block`,
                        children: [
                            "My Experience",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                style: {
                                    scaleX: headingUnderlineScaleX,
                                    transformOrigin: "left"
                                },
                                className: `h-[10px] w-full bg-black rounded-full`
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/experience_section.tsx",
                                lineNumber: 81,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/ui_components/home_components/home_sections/experience_section.tsx",
                        lineNumber: 79,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/experience_section.tsx",
                    lineNumber: 77,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex-1/3 h-full !p-[7rem]`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex justify-between w-full opacity-50`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: `text-[1.5rem] oswald flex-1 justify-start`,
                                    children: "Position"
                                }, void 0, false, {
                                    fileName: "[project]/app/ui_components/home_components/home_sections/experience_section.tsx",
                                    lineNumber: 92,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: `text-[1.5rem] oswald flex-1 justify-start`,
                                    children: "Company"
                                }, void 0, false, {
                                    fileName: "[project]/app/ui_components/home_components/home_sections/experience_section.tsx",
                                    lineNumber: 96,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: `text-[1.5rem] oswald flex-1 justify-start`,
                                    children: "Duration"
                                }, void 0, false, {
                                    fileName: "[project]/app/ui_components/home_components/home_sections/experience_section.tsx",
                                    lineNumber: 100,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/experience_section.tsx",
                            lineNumber: 91,
                            columnNumber: 21
                        }, this),
                        experiences.map((item, index)=>{
                            const start = index / experiences.length;
                            const end = start + 1 / experiences.length;
                            const x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(headingScrollProgress, [
                                start,
                                end
                            ], [
                                200,
                                0
                            ]), __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"]);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                style: {
                                    x,
                                    willChange: "transform"
                                },
                                className: `w-full border-t-[0.5px] border-black flex justify-between`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: `text-[1.75rem] geist text-light !py-[1.5rem] flex-1`,
                                        children: item.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui_components/home_components/home_sections/experience_section.tsx",
                                        lineNumber: 115,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: `text-[1.75rem] geist text-light !py-[1.5rem] text-left flex-1`,
                                        children: item.company_name
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui_components/home_components/home_sections/experience_section.tsx",
                                        lineNumber: 120,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: `text-[1.75rem] geist text-light !py-[1.5rem] flex-1`,
                                        children: item.duration
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui_components/home_components/home_sections/experience_section.tsx",
                                        lineNumber: 124,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/experience_section.tsx",
                                lineNumber: 111,
                                columnNumber: 29
                            }, this);
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            ref: accomplishmentHeadingRef,
                            className: `text-[1.5rem] oswald flex-1 justify-start !mt-[5rem] opacity-50`,
                            children: "Accomplishments"
                        }, void 0, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/experience_section.tsx",
                            lineNumber: 132,
                            columnNumber: 21
                        }, this),
                        accomplishments.map((item, index)=>{
                            const start = index / experiences.length;
                            const end = start + 1 / experiences.length;
                            const x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(accomplishmentHeadingScrollProgress, [
                                start,
                                end
                            ], [
                                200,
                                0
                            ]), __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"]);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                style: {
                                    x,
                                    willChange: "transform"
                                },
                                className: `w-full border-t-[0.5px] border-black flex justify-between`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: `text-[1.75rem] geist text-light !py-[1.5rem] text-left flex-1`,
                                        children: item.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui_components/home_components/home_sections/experience_section.tsx",
                                        lineNumber: 147,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: `text-[1.75rem] geist text-light !py-[1.5rem] text-left flex-1`,
                                        children: item.hackation_name
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui_components/home_components/home_sections/experience_section.tsx",
                                        lineNumber: 151,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: `text-[1.75rem] geist text-light !py-[1.5rem] text-left flex-1`,
                                        children: item.date
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui_components/home_components/home_sections/experience_section.tsx",
                                        lineNumber: 155,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/experience_section.tsx",
                                lineNumber: 143,
                                columnNumber: 29
                            }, this);
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/experience_section.tsx",
                    lineNumber: 89,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/ui_components/home_components/home_sections/experience_section.tsx",
            lineNumber: 73,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/ui_components/home_components/home_sections/experience_section.tsx",
        lineNumber: 72,
        columnNumber: 9
    }, this);
}
}}),
"[project]/app/stores/skillset_store.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
;
const useSkillSetStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set)=>({
        currentSelectedImage: -1,
        setCurrentSelectedImage: (index)=>set((state)=>({
                    currentSelectedImage: index
                }))
    }));
const __TURBOPACK__default__export__ = useSkillSetStore;
}}),
"[project]/app/assets/icons/next-js-seeklogo.svg (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/next-js-seeklogo.b7081af6.svg");}}),
"[project]/app/assets/icons/next-js-seeklogo.svg.mjs { IMAGE => \"[project]/app/assets/icons/next-js-seeklogo.svg (static in ecmascript)\" } [app-ssr] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$next$2d$js$2d$seeklogo$2e$svg__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/app/assets/icons/next-js-seeklogo.svg (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$next$2d$js$2d$seeklogo$2e$svg__$28$static__in__ecmascript$29$__["default"],
    width: 256,
    height: 256,
    blurDataURL: null,
    blurWidth: 0,
    blurHeight: 0
};
}}),
"[project]/app/assets/icons/react-seeklogo.svg (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/react-seeklogo.2667e3cf.svg");}}),
"[project]/app/assets/icons/react-seeklogo.svg.mjs { IMAGE => \"[project]/app/assets/icons/react-seeklogo.svg (static in ecmascript)\" } [app-ssr] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$react$2d$seeklogo$2e$svg__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/app/assets/icons/react-seeklogo.svg (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$react$2d$seeklogo$2e$svg__$28$static__in__ecmascript$29$__["default"],
    width: 256,
    height: 230,
    blurDataURL: null,
    blurWidth: 0,
    blurHeight: 0
};
}}),
"[project]/app/assets/icons/framer-motion-seeklogo.svg (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/framer-motion-seeklogo.f7824b3a.svg");}}),
"[project]/app/assets/icons/framer-motion-seeklogo.svg.mjs { IMAGE => \"[project]/app/assets/icons/framer-motion-seeklogo.svg (static in ecmascript)\" } [app-ssr] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$framer$2d$motion$2d$seeklogo$2e$svg__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/app/assets/icons/framer-motion-seeklogo.svg (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$framer$2d$motion$2d$seeklogo$2e$svg__$28$static__in__ecmascript$29$__["default"],
    width: 2500,
    height: 2500,
    blurDataURL: null,
    blurWidth: 0,
    blurHeight: 0
};
}}),
"[project]/app/assets/icons/node-js-seeklogo.svg (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/node-js-seeklogo.2f27c87c.svg");}}),
"[project]/app/assets/icons/node-js-seeklogo.svg.mjs { IMAGE => \"[project]/app/assets/icons/node-js-seeklogo.svg (static in ecmascript)\" } [app-ssr] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$node$2d$js$2d$seeklogo$2e$svg__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/app/assets/icons/node-js-seeklogo.svg (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$node$2d$js$2d$seeklogo$2e$svg__$28$static__in__ecmascript$29$__["default"],
    width: 256,
    height: 289,
    blurDataURL: null,
    blurWidth: 0,
    blurHeight: 0
};
}}),
"[project]/app/assets/icons/firebase-seeklogo.svg (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/firebase-seeklogo.45da8cc4.svg");}}),
"[project]/app/assets/icons/firebase-seeklogo.svg.mjs { IMAGE => \"[project]/app/assets/icons/firebase-seeklogo.svg (static in ecmascript)\" } [app-ssr] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$firebase$2d$seeklogo$2e$svg__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/app/assets/icons/firebase-seeklogo.svg (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$firebase$2d$seeklogo$2e$svg__$28$static__in__ecmascript$29$__["default"],
    width: 256,
    height: 351,
    blurDataURL: null,
    blurWidth: 0,
    blurHeight: 0
};
}}),
"[project]/app/assets/icons/supabase-seeklogo.svg (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/supabase-seeklogo.4fcd4abd.svg");}}),
"[project]/app/assets/icons/supabase-seeklogo.svg.mjs { IMAGE => \"[project]/app/assets/icons/supabase-seeklogo.svg (static in ecmascript)\" } [app-ssr] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$supabase$2d$seeklogo$2e$svg__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/app/assets/icons/supabase-seeklogo.svg (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$supabase$2d$seeklogo$2e$svg__$28$static__in__ecmascript$29$__["default"],
    width: 256,
    height: 263,
    blurDataURL: null,
    blurWidth: 0,
    blurHeight: 0
};
}}),
"[project]/app/assets/icons/postqresql-seeklogo.svg (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/postqresql-seeklogo.8b457e67.svg");}}),
"[project]/app/assets/icons/postqresql-seeklogo.svg.mjs { IMAGE => \"[project]/app/assets/icons/postqresql-seeklogo.svg (static in ecmascript)\" } [app-ssr] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$postqresql$2d$seeklogo$2e$svg__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/app/assets/icons/postqresql-seeklogo.svg (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$postqresql$2d$seeklogo$2e$svg__$28$static__in__ecmascript$29$__["default"],
    width: 256,
    height: 264,
    blurDataURL: null,
    blurWidth: 0,
    blurHeight: 0
};
}}),
"[project]/app/assets/icons/prisma-seeklogo.svg (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/prisma-seeklogo.29dca9d6.svg");}}),
"[project]/app/assets/icons/prisma-seeklogo.svg.mjs { IMAGE => \"[project]/app/assets/icons/prisma-seeklogo.svg (static in ecmascript)\" } [app-ssr] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$prisma$2d$seeklogo$2e$svg__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/app/assets/icons/prisma-seeklogo.svg (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$prisma$2d$seeklogo$2e$svg__$28$static__in__ecmascript$29$__["default"],
    width: 256,
    height: 310,
    blurDataURL: null,
    blurWidth: 0,
    blurHeight: 0
};
}}),
"[project]/app/assets/icons/mongodb-seeklogo.png (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/mongodb-seeklogo.09d934ec.png");}}),
"[project]/app/assets/icons/mongodb-seeklogo.png.mjs { IMAGE => \"[project]/app/assets/icons/mongodb-seeklogo.png (static in ecmascript)\" } [app-ssr] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$mongodb$2d$seeklogo$2e$png__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/app/assets/icons/mongodb-seeklogo.png (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$mongodb$2d$seeklogo$2e$png__$28$static__in__ecmascript$29$__["default"],
    width: 2000,
    height: 506,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAYAAABllJ3tAAAATUlEQVR42gFCAL3/AB1AOJQ8Y0cmP2ZIHEJqSRJBaUkTQWhJFTxkRyQ8ZEcjACpPP2M3XkU0NVxEOjdeRTUwVUFMNVxEOjVbRDw1W0M8MD4Q71yv5toAAAAASUVORK5CYII=",
    blurWidth: 8,
    blurHeight: 2
};
}}),
"[project]/app/assets/icons/zustand.svg (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/zustand.89bfc4e8.svg");}}),
"[project]/app/assets/icons/zustand.svg.mjs { IMAGE => \"[project]/app/assets/icons/zustand.svg (static in ecmascript)\" } [app-ssr] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$zustand$2e$svg__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/app/assets/icons/zustand.svg (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$zustand$2e$svg__$28$static__in__ecmascript$29$__["default"],
    width: 512,
    height: 512,
    blurDataURL: null,
    blurWidth: 0,
    blurHeight: 0
};
}}),
"[project]/app/ui_components/home_components/home_sections/skllset_section.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SkillSetSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/constants/animation_constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$ui_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/constants/ui_constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$skillset_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/stores/skillset_store.ts [app-ssr] (ecmascript)");
// MARK: Image imports here
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$next$2d$js$2d$seeklogo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$icons$2f$next$2d$js$2d$seeklogo$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/icons/next-js-seeklogo.svg.mjs { IMAGE => "[project]/app/assets/icons/next-js-seeklogo.svg (static in ecmascript)" } [app-ssr] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$react$2d$seeklogo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$icons$2f$react$2d$seeklogo$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/icons/react-seeklogo.svg.mjs { IMAGE => "[project]/app/assets/icons/react-seeklogo.svg (static in ecmascript)" } [app-ssr] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$framer$2d$motion$2d$seeklogo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$icons$2f$framer$2d$motion$2d$seeklogo$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/icons/framer-motion-seeklogo.svg.mjs { IMAGE => "[project]/app/assets/icons/framer-motion-seeklogo.svg (static in ecmascript)" } [app-ssr] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$node$2d$js$2d$seeklogo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$icons$2f$node$2d$js$2d$seeklogo$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/icons/node-js-seeklogo.svg.mjs { IMAGE => "[project]/app/assets/icons/node-js-seeklogo.svg (static in ecmascript)" } [app-ssr] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$firebase$2d$seeklogo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$icons$2f$firebase$2d$seeklogo$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/icons/firebase-seeklogo.svg.mjs { IMAGE => "[project]/app/assets/icons/firebase-seeklogo.svg (static in ecmascript)" } [app-ssr] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$supabase$2d$seeklogo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$icons$2f$supabase$2d$seeklogo$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/icons/supabase-seeklogo.svg.mjs { IMAGE => "[project]/app/assets/icons/supabase-seeklogo.svg (static in ecmascript)" } [app-ssr] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$postqresql$2d$seeklogo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$icons$2f$postqresql$2d$seeklogo$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/icons/postqresql-seeklogo.svg.mjs { IMAGE => "[project]/app/assets/icons/postqresql-seeklogo.svg (static in ecmascript)" } [app-ssr] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$prisma$2d$seeklogo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$icons$2f$prisma$2d$seeklogo$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/icons/prisma-seeklogo.svg.mjs { IMAGE => "[project]/app/assets/icons/prisma-seeklogo.svg (static in ecmascript)" } [app-ssr] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$mongodb$2d$seeklogo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$icons$2f$mongodb$2d$seeklogo$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/icons/mongodb-seeklogo.png.mjs { IMAGE => "[project]/app/assets/icons/mongodb-seeklogo.png (static in ecmascript)" } [app-ssr] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$zustand$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$icons$2f$zustand$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/icons/zustand.svg.mjs { IMAGE => "[project]/app/assets/icons/zustand.svg (static in ecmascript)" } [app-ssr] (structured image object, ecmascript)');
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function SkillSetSection() {
    const sectionRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        target: sectionRef,
        offset: [
            "start end",
            "start 50%"
        ]
    });
    const headingUnderlineScaleX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        1
    ], [
        0,
        1
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"]);
    const { scrollYProgress: reverseScrollProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        target: sectionRef,
        offset: [
            "end end",
            "end 50%"
        ]
    });
    const sectionOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(reverseScrollProgress, [
        0,
        1
    ], [
        1,
        0.5
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"]);
    const sectionBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(reverseScrollProgress, [
        0,
        1
    ], [
        "blur(0)",
        "blur(2px)"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].section, {
            style: {
                opacity: sectionOpacity,
                filter: sectionBlur
            },
            className: `flex min-h-screen w-screen bg-white relative !pb-[25vh]`,
            ref: sectionRef,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex-1 h-[50vh] sticky top-0 !p-[7rem]`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: `text-[4rem] inline-block`,
                        children: [
                            "My SkillSet",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                style: {
                                    scaleX: headingUnderlineScaleX,
                                    transformOrigin: "left"
                                },
                                className: `h-[10px] w-full bg-black rounded-full`
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                                lineNumber: 53,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                        lineNumber: 51,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                    lineNumber: 50,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex-1/3 h-full grid gap-0 !px-[7rem] grid-cols-2 items-start !pt-[7rem]`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkillCell, {
                            text: "Next Js",
                            imageContent: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$next$2d$js$2d$seeklogo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$icons$2f$next$2d$js$2d$seeklogo$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                                alt: "Next Js"
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                                lineNumber: 67,
                                columnNumber: 29
                            }, void 0),
                            index: 0
                        }, void 0, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                            lineNumber: 64,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkillCell, {
                            text: "React Js",
                            imageContent: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$react$2d$seeklogo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$icons$2f$react$2d$seeklogo$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                                alt: "React Js"
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                                lineNumber: 75,
                                columnNumber: 29
                            }, void 0),
                            index: 1
                        }, void 0, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                            lineNumber: 72,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkillCell, {
                            text: "Framer Motion",
                            imageContent: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$framer$2d$motion$2d$seeklogo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$icons$2f$framer$2d$motion$2d$seeklogo$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                                alt: "Next Js",
                                className: `scale-40`
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                                lineNumber: 83,
                                columnNumber: 29
                            }, void 0),
                            index: 2
                        }, void 0, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                            lineNumber: 80,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkillCell, {
                            text: "Node Js",
                            imageContent: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$node$2d$js$2d$seeklogo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$icons$2f$node$2d$js$2d$seeklogo$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                                alt: "Next Js"
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                                lineNumber: 91,
                                columnNumber: 29
                            }, void 0),
                            index: 3
                        }, void 0, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                            lineNumber: 88,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkillCell, {
                            text: "Firebase",
                            imageContent: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$firebase$2d$seeklogo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$icons$2f$firebase$2d$seeklogo$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                                alt: "Next Js",
                                className: `scale-70`
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                                lineNumber: 99,
                                columnNumber: 29
                            }, void 0),
                            index: 4
                        }, void 0, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                            lineNumber: 96,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkillCell, {
                            text: "Supabase",
                            imageContent: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$supabase$2d$seeklogo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$icons$2f$supabase$2d$seeklogo$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                                alt: "Next Js",
                                className: `scale-85`
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                                lineNumber: 107,
                                columnNumber: 29
                            }, void 0),
                            index: 5
                        }, void 0, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                            lineNumber: 104,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkillCell, {
                            text: "Postgresql",
                            imageContent: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$postqresql$2d$seeklogo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$icons$2f$postqresql$2d$seeklogo$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                                alt: "Next Js",
                                className: `scale-70`
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                                lineNumber: 115,
                                columnNumber: 29
                            }, void 0),
                            index: 6
                        }, void 0, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                            lineNumber: 112,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkillCell, {
                            text: "MongoDb",
                            imageContent: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$mongodb$2d$seeklogo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$icons$2f$mongodb$2d$seeklogo$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                                alt: "Next Js",
                                className: `scale-70`
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                                lineNumber: 123,
                                columnNumber: 29
                            }, void 0),
                            index: 7
                        }, void 0, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                            lineNumber: 120,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkillCell, {
                            text: "Prisma ORM",
                            imageContent: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$prisma$2d$seeklogo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$icons$2f$prisma$2d$seeklogo$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                                alt: "Next Js",
                                className: `scale-70`
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                                lineNumber: 131,
                                columnNumber: 29
                            }, void 0),
                            index: 8
                        }, void 0, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                            lineNumber: 128,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkillCell, {
                            text: "Zustand",
                            imageContent: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$icons$2f$zustand$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$icons$2f$zustand$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                                alt: "Next Js",
                                className: `scale-50`
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                                lineNumber: 139,
                                columnNumber: 29
                            }, void 0),
                            index: 9
                        }, void 0, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                            lineNumber: 136,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                    lineNumber: 60,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
            lineNumber: 45,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
        lineNumber: 44,
        columnNumber: 9
    }, this);
}
function SkillCell({ text, imageContent, index }) {
    const [isHovered, setHovered] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const { currentSelectedImage, setCurrentSelectedImage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$skillset_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])();
    const isActive = currentSelectedImage === -1 || currentSelectedImage === index;
    const border = index % 2 ? "border-[0.5px] border-l-0" : "border-[0.5px]";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        layout: true,
        onMouseEnter: ()=>{
            setHovered(true);
            setCurrentSelectedImage(index);
        },
        onMouseLeave: ()=>{
            setHovered(false);
            setCurrentSelectedImage(-1);
        },
        animate: {
            filter: isActive ? "blur(0px)" : "blur(5px)",
            x: isActive ? -20 : 0,
            opacity: isActive ? 1 : 0.5
        },
        className: 'aspect-square relative border-black border-[0.5px] flex flex-col items-center justify-center overflow-hidden bg-white',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                layout: true,
                className: `w-full h-[80%]`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    layout: true,
                    animate: {
                        filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
                        opacity: index === 0 || index === 8 || index === 9 ? isHovered ? 1 : 0.5 : 1
                    },
                    transition: {
                        duration: 0.75,
                        type: "spring"
                    },
                    className: `w-full h-full flex justify-center items-center`,
                    children: imageContent
                }, void 0, false, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                    lineNumber: 191,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                lineNumber: 188,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: isHovered && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    animate: {
                        y: 0
                    },
                    layout: true,
                    initial: {
                        y: 100
                    },
                    exit: {
                        y: 100
                    },
                    transition: {
                        ease: [
                            0.85,
                            0,
                            0.15,
                            1
                        ]
                    },
                    style: {
                        lineHeight: 1,
                        color: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$ui_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApplicationColor"].current.appDarkBG
                    },
                    className: `gap-[0.5rem] w-[70%] absolute bottom-0 left-0 uppercase flex flex-col text-[2rem] !p-[1rem] geist font-light`,
                    children: text
                }, void 0, false, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                    lineNumber: 208,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
                lineNumber: 206,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/ui_components/home_components/home_sections/skllset_section.tsx",
        lineNumber: 169,
        columnNumber: 9
    }, this);
}
}}),
"[project]/app/ui_components/magnetic_mouse/MagneticMouse.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MouseMagnetic)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
;
;
;
function MouseMagnetic({ children }) {
    const [mousePosition, setMousePosition] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState({
        x: 0,
        y: 0
    });
    const elementRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    function mouseMoveHandler(e) {
        if (!elementRef.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = elementRef.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setMousePosition({
            x,
            y
        });
    }
    function mouseLeaveHandler(e) {
        setMousePosition({
            x: 0,
            y: 0
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        onMouseMove: mouseMoveHandler,
        onMouseLeave: mouseLeaveHandler,
        ref: elementRef,
        animate: {
            x: mousePosition.x,
            y: mousePosition.y
        },
        transition: {
            mass: 3,
            stiffness: 20,
            duration: 0.4
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/ui_components/magnetic_mouse/MagneticMouse.tsx",
        lineNumber: 30,
        columnNumber: 9
    }, this);
}
}}),
"[project]/app/ui_components/home_components/home_sections/contact_section.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ContactSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/constants/animation_constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa6/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$magnetic_mouse$2f$MagneticMouse$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/ui_components/magnetic_mouse/MagneticMouse.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/stores/mouse_store.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function ContactSection() {
    const { toggleFor, toggleShowMouseHover } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMouseHoverState"])();
    const sectionRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const headingContainerRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        target: sectionRef,
        offset: [
            "start end",
            "start start"
        ]
    });
    const { scrollYProgress: headingScrollProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        target: sectionRef,
        offset: [
            "start 20%",
            "start start"
        ]
    });
    const emailYScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        1
    ], [
        1000,
        0
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"]);
    const phoneYScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0.25,
        1
    ], [
        1000,
        0
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"]);
    const linkedInScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(headingScrollProgress, [
        0,
        1
    ], [
        0,
        1
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"]);
    const twitterScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(headingScrollProgress, [
        0.25,
        1
    ], [
        0,
        1
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].section, {
            ref: sectionRef,
            className: `min-h-[100vh] h-screen relative overflow-y-visible bg-black flex `,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex absolute w-screen h-screen top-[-100vh] pointer-events-none`,
                    children: // [4,3,0,1,2]
                    [
                        0,
                        1,
                        2,
                        3,
                        4
                    ].map((item, index)=>{
                        const rawScaleY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
                            Math.max(item / 10, 0),
                            1
                        ], [
                            0,
                            1
                        ]);
                        const scaleY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(rawScaleY, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"]);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            style: {
                                scaleY,
                                transformOrigin: "bottom"
                            },
                            className: `h-screen flex-1 bg-black`
                        }, index, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                            lineNumber: 46,
                            columnNumber: 33
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                    lineNumber: 39,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex-1 h-full flex flex-col overflow-hidden`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex-1/3 w-full overflow-hidden flex justify-center items-center !pr-[9vh]`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: `text-[20rem] font-bold oswald text-white`,
                                children: "U"
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                                lineNumber: 66,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                            lineNumber: 64,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: headingContainerRef,
                            className: `flex-1 w-full flex justify-start items-end`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: `text-[12rem] uppercase font-bold !px-[2rem] text-white`,
                                children: "contact".split("").map((item, index)=>{
                                    const start = index / "contact".length;
                                    const end = start + 1 / "contact".length;
                                    let y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(headingScrollProgress, [
                                        start,
                                        end
                                    ], [
                                        200,
                                        0
                                    ]), __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$animation_constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springOptions"]);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                        style: {
                                            y
                                        },
                                        className: `inline-block`,
                                        children: item
                                    }, index, false, {
                                        fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                                        lineNumber: 82,
                                        columnNumber: 41
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                                lineNumber: 75,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                            lineNumber: 72,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                    lineNumber: 60,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex-1 h-full flex flex-col`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onMouseEnter: ()=>{
                                toggleShowMouseHover();
                            },
                            onMouseLeave: ()=>{
                                toggleShowMouseHover();
                            },
                            className: `!p-[3rem] flex items-center justify-end gap-[1rem]`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    style: {
                                        scale: linkedInScale
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$magnetic_mouse$2f$MagneticMouse$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            whileHover: {
                                                scale: 1.25,
                                                zIndex: 100,
                                                position: "relative"
                                            },
                                            className: `h-[6rem] blurBackground aspect-square border-white hover:cursor-pointer border-[1px] rounded-full grid place-items-center text-center`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$magnetic_mouse$2f$MagneticMouse$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `h-[6rem] aspect-square flex justify-center items-center`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaLinkedin"], {
                                                        size: 30,
                                                        className: `text-white`
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                                                        lineNumber: 118,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                                                lineNumber: 116,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                                            lineNumber: 113,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                                        lineNumber: 112,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                                    lineNumber: 109,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    style: {
                                        scale: twitterScale
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$magnetic_mouse$2f$MagneticMouse$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            whileHover: {
                                                scale: 1.25,
                                                zIndex: 100,
                                                position: "relative"
                                            },
                                            className: `h-[6rem] blurBackground aspect-square border-white hover:cursor-pointer border-[1px] rounded-full grid place-items-center text-center`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$magnetic_mouse$2f$MagneticMouse$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `h-[6rem] aspect-square flex justify-center items-center`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaTwitter"], {
                                                        size: 30,
                                                        className: `text-white`
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                                                        lineNumber: 136,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                                                    lineNumber: 135,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                                                lineNumber: 134,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                                            lineNumber: 131,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                                        lineNumber: 130,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                                    lineNumber: 127,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                            lineNumber: 99,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-full flex-1 !p-[3rem]`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].h1, {
                                    style: {
                                        x: emailYScale
                                    },
                                    onMouseEnter: ()=>{
                                        toggleFor(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MouseHoverStateOptions"].Email);
                                    },
                                    onMouseLeave: ()=>{
                                        toggleFor(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MouseHoverStateOptions"].None);
                                    },
                                    className: `text-[2rem] relative geist font-light text-white/30 hover:text-white text-right border-t-[0.5px] border-b-[0.5px] border-white/50 hover:border-white transition-colors duration-300 !p-[2rem]`,
                                    children: [
                                        "uddeshya872@gmail.com",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `absolute top-1/2 -translate-y-1/2 oswald uppercase text-[1.5rem]`,
                                            children: "Email"
                                        }, void 0, false, {
                                            fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                                            lineNumber: 158,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                                    lineNumber: 146,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].h1, {
                                    style: {
                                        x: phoneYScale
                                    },
                                    onMouseEnter: ()=>{
                                        toggleFor(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MouseHoverStateOptions"].Phone);
                                    },
                                    onMouseLeave: ()=>{
                                        toggleFor(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$mouse_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MouseHoverStateOptions"].None);
                                    },
                                    className: `text-[2rem] geist font-light relative text-white/30 hover:text-white text-right border-t-[0.5px] border-b-[0.5px] border-white/50 hover:border-white !p-[2rem] transition-colors duration-300`,
                                    children: [
                                        "+91 9875660105",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `absolute top-1/2 -translate-y-1/2 oswald uppercase text-[1.5rem] font-normal`,
                                            children: "Phone"
                                        }, void 0, false, {
                                            fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                                            lineNumber: 172,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                                    lineNumber: 161,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                            lineNumber: 145,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-full flex-1 bg-blue-300`
                        }, void 0, false, {
                            fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                            lineNumber: 176,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
                    lineNumber: 97,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
            lineNumber: 36,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/ui_components/home_components/home_sections/contact_section.tsx",
        lineNumber: 35,
        columnNumber: 9
    }, this);
}
}}),
"[project]/app/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$home_components$2f$home_sections$2f$LandingSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/ui_components/home_components/home_sections/LandingSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$landing_loader$2f$InitialLoader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/ui_components/landing_loader/InitialLoader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$home_components$2f$home_sections$2f$FeaturedWorksSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/ui_components/home_components/home_sections/FeaturedWorksSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$custom_mouse$2f$CustomMouse$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/ui_components/custom_mouse/CustomMouse.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$home_components$2f$home_sections$2f$TechStackSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/ui_components/home_components/home_sections/TechStackSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$home_components$2f$home_sections$2f$AboutSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/ui_components/home_components/home_sections/AboutSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$home_components$2f$home_sections$2f$experience_section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/ui_components/home_components/home_sections/experience_section.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$home_components$2f$home_sections$2f$skllset_section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/ui_components/home_components/home_sections/skllset_section.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$home_components$2f$home_sections$2f$contact_section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/ui_components/home_components/home_sections/contact_section.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$homepage_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/stores/homepage_store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
function Home() {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        (async ()=>{
            const locomotiveScroll = (await __turbopack_context__.r("[project]/node_modules/locomotive-scroll/dist/locomotive-scroll.modern.mjs [app-ssr] (ecmascript, async loader)")(__turbopack_context__.i)).default;
            const LocomotiveScroll = new locomotiveScroll();
        })();
    }, []);
    const { isPageChanging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$stores$2f$homepage_store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useHomePageState"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: `w-screen relative min-h-screen bg-black`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `h-screen w-screen fixed z-[11] flex pointer-events-none`,
                    children: [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5
                    ].map((item, index)=>{
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            animate: {
                                y: isPageChanging ? "0vh" : "-110vh",
                                backgroundColor: isPageChanging ? "#000000" : "#212121"
                            },
                            initial: false,
                            transition: {
                                y: {
                                    duration: 1.5,
                                    ease: [
                                        0.85,
                                        0,
                                        0.15,
                                        1
                                    ],
                                    delay: index * 0.05
                                },
                                backgroundColor: {
                                    delay: 1,
                                    duration: 1
                                }
                            },
                            className: `flex-1 h-full bg-[#212121] pointer-events-none`
                        }, index, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 40,
                            columnNumber: 33
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 35,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$custom_mouse$2f$CustomMouse$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 67,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$landing_loader$2f$InitialLoader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 70,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$home_components$2f$home_sections$2f$LandingSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 74,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$home_components$2f$home_sections$2f$FeaturedWorksSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 78,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$home_components$2f$home_sections$2f$TechStackSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 82,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$home_components$2f$home_sections$2f$AboutSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 86,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$home_components$2f$home_sections$2f$experience_section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 90,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$home_components$2f$home_sections$2f$skllset_section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 94,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui_components$2f$home_components$2f$home_sections$2f$contact_section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 97,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 33,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 32,
        columnNumber: 9
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__974135e0._.js.map
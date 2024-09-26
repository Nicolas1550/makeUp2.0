import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Particles = () => {
  const particlesRef = useRef<THREE.Points | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      sizes[i] = Math.random() * 0.2 + 0.05;
    }

    if (particlesRef.current) {
      const geometry = particlesRef.current.geometry;
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    }
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.time.value = time;
      materialRef.current.opacity = 0.6 + 0.4 * Math.sin(time * 0.8);
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        uniforms={{
          time: { value: 0 },
          pointTexture: {
            value: new THREE.TextureLoader().load("/sparkle_altt.png"),
          },
        }}
      />
    </points>
  );
};

const vertexShader = `
  uniform float time;
  attribute float size;
  varying vec3 vColor;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform sampler2D pointTexture;
  void main() {
    vec4 color = texture2D(pointTexture, gl_PointCoord);
    
    // Descartar píxeles transparentes
    if (color.a < 0.1) discard;
    
    gl_FragColor = color;
  }
`;


export default Particles;

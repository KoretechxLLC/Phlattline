"use client";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import GetStarField from "../components/GetStarField"; // Adjust path as necessary

interface HomeScreenProps {
  onModelLoaded: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onModelLoaded }) => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const hasModelLoaded = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const earthMeshRef = useRef<THREE.Group | null>(null); // Create a ref for the Earth mesh

  useEffect(() => {
    if (hasModelLoaded.current) return; // Prevent duplicate model loading

    const container = containerRef.current;

    // Clear previous contents if they exist
    if (container) {
      container.innerHTML = "";
    }

    // Set up scene, camera, and renderer
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    container?.appendChild(renderer.domElement);

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    // Brightness & lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 4); // Increase ambient brightness
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 4); // Stronger directional light
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Orbit Controls with zoom limits
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false; // Disable panning with Ctrl and right-click
    controls.minDistance = 3; // Limit zoom-in distance
    controls.maxDistance = 10; // Limit zoom-out distance

    // Load GLB Model
    const loader = new GLTFLoader();
    loader.load(
      "/assets/PhlattlineEarth.glb", // Ensure this path is correct
      (gltf) => {
        const earthMesh = gltf.scene;
        earthMesh.scale.set(1, 1, 1);
        scene.add(earthMesh);
        earthMeshRef.current = earthMesh; // Store reference to Earth mesh

        if (!hasModelLoaded.current) {
          setIsModelLoaded(true);
          onModelLoaded(); // Trigger splash screen to hide
          hasModelLoaded.current = true;
        }
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the GLB model:", error);
      }
    );

    // Add stars
    const [stars, milkyWay] = GetStarField({ numStars: 10000 });
    scene.add(stars);
    scene.add(milkyWay);

    // Animation loop
    let lastRenderTime = 0;
    const animate = () => {
      const currentTime = Date.now();

      if (currentTime - lastRenderTime > 16) {
        if (earthMeshRef.current) {
          // Rotate the Earth mesh
          earthMeshRef.current.rotation.y += 0.002; // Adjust rotation speed as necessary
        }
        stars.rotation.y -= 0.0002;
        renderer.render(scene, camera);
        lastRenderTime = currentTime;
      }

      requestAnimationFrame(animate);
    };
    animate();

    // Handle window resize
    const handleWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleWindowResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      renderer.dispose();
    };
  }, [onModelLoaded]);

  return (
    <div
      id="three-container"
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    ></div>
  );
};

export default HomeScreen;

'use client';

import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GetStarField from '../components/GetStarField'; // Adjust path as necessary

const HomeScreen = () => {
  useEffect(() => {
    const container: any = document.getElementById('three-container');

    // Clear previous contents if they exist
    if (container) {
      container.innerHTML = '';
    }

    // Setup scene, camera, and renderer
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    // Create Earth and add to scene
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
    scene.add(earthGroup);

    new OrbitControls(camera, renderer.domElement);

    const detail = 12;
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.IcosahedronGeometry(1, detail);
    const material = new THREE.MeshBasicMaterial({
      map: loader.load('/assets/earth.jpg'),
    });
    const earthMesh = new THREE.Mesh(geometry, material);
    earthGroup.add(earthMesh);

    // Add stars
    const [stars, milkyWay] = GetStarField({ numStars: 10000 });
    scene.add(stars);
    scene.add(milkyWay);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      earthMesh.rotation.y += 0.002;

      if (stars instanceof THREE.Points) {
        stars.rotation.y -= 0.0002;
      } else {
        console.warn('Expected stars to be an instance of THREE.Points.');
      }

      renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    function handleWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', handleWindowResize, false);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      renderer.dispose(); // Properly dispose of renderer
    };
  }, []);

  // Style container to prevent scrolling and hide overflow
  return (
    <div
      id="three-container"
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden', // Hide overflow for both X and Y axes
      }}
    ></div>
  );
};

export default HomeScreen;




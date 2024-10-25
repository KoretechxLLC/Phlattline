"use client";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import GetStarField from "../components/GetStarField"; // Adjust path as necessary
import { useRouter } from "next/navigation"; // Import useRouter for routing
import gsap from "gsap";
import { useCallback } from "react";

interface HomeScreenProps {
  onModelLoaded: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onModelLoaded }) => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const hasModelLoaded = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const earthMeshRef: any = useRef<THREE.Group | null>(null);
  const camera: any = useRef<THREE.PerspectiveCamera | null>(null);
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const router = useRouter(); // Initialize the router
  const isHovering = useRef(false); // Ref to track mouse hover state

  // New state to hold hovered profile info
  const [hoveredProfile, setHoveredProfile] = useState<{
    name: string;
    picture: string;
    position: { x: number; y: number };
  } | null>(null);

  useEffect(() => {
    if (hasModelLoaded.current) return; // Prevent duplicate model loading

    const container = containerRef.current;
    if (container) {
      container.innerHTML = "";
    }

    // Set up scene, camera, and renderer

    const w: any = typeof window !== "undefined" && window.innerWidth;
    const h: any = typeof window !== "undefined" && window.innerHeight;
    const scene = new THREE.Scene();
    camera.current = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.current.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    container?.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 4);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Orbit Controls
    const controls = new OrbitControls(camera.current, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enablePan = true;
    controls.minDistance = 3;
    controls.maxDistance = 10;

    // Load GLB Model
    const loader = new GLTFLoader();
    loader.load(
      "/assets/Earth.glb", // Ensure this path is correct
      (gltf) => {
        const earthMesh = gltf.scene;
        earthMesh.scale.set(1, 1, 1);
        scene.add(earthMesh);
        earthMeshRef.current = earthMesh;

        if (!hasModelLoaded.current) {
          setIsModelLoaded(true);
          onModelLoaded();
          hasModelLoaded.current = true;
        }

        const clickableMeshes = [
          {
            position: [0.3, 0.4, 0.6],
            name: "Corporate",
            size: 0.85,
            route: "/WilliamJames", // Make sure to add the route here
          },
          {
            position: [-1, 0.1, 0.05],
            name: "Construction",
            size: 0.7,
            route: "/Construction", // Add route here as well
          },
          {
            position: [0.3, 0.1, -0.7],
            name: "Agriculture",
            size: 0.75,
            route: "/SophiaRodriguez", // Add route here as well
          },
        ];

        clickableMeshes.forEach(({ position, name, size, route }) => {
          const geometry = new THREE.SphereGeometry(size, 32, 32); // Use size for geometry
          const material = new THREE.MeshStandardMaterial({
            color: "red",
            transparent: true,
            opacity: 0,
          });
          const sphere = new THREE.Mesh(geometry, material);
          sphere.position.set(position[0], position[1], position[2]);
          sphere.userData = { name, route }; // Add route to userData
          earthMesh.add(sphere); // Add the mesh to the Earth model
        });
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
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      // Earth ka rotation sirf tab chale jab mouse mesh pr hover nahi ho raha
      if (earthMeshRef.current && !isHovering.current) {
        earthMeshRef.current.rotation.y += 0.002;
      }

      renderer.render(scene, camera.current!);
    };
    animate();

    // Handle window resize
    const handleWindowResize = () => {
      if (typeof window !== "undefined") {
        if (camera.current) {
          camera.current.aspect = window.innerWidth / window.innerHeight;
          camera.current.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        }
      }

      window.addEventListener("resize", handleWindowResize);

      // Cleanup function
      return () => {
        window.removeEventListener("resize", handleWindowResize);
        renderer.dispose();
      };
    };
  }, [onModelLoaded]);

  // Function to handle mouse hover
  const onMouseMove = (event: MouseEvent) => {
    event.preventDefault();
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Check if earthMeshRef.current is defined before raycasting
    if (earthMeshRef.current) {
      raycaster.current.setFromCamera(mouse.current, camera.current!);
      const intersects = raycaster.current.intersectObjects(
        earthMeshRef.current.children,
        true
      );

      if (intersects.length > 0) {
        const hoveredObject: any = intersects[0].object;
        // Check if the intersected object is a clickable mesh
        if (hoveredObject.userData.name) {
          isHovering.current = true; // Set hover state

          // Set the profile info for the hovered object
          setHoveredProfile({
            name: hoveredObject.userData.name,
            picture: "", // Add picture URL if needed
            position: { x: event.clientX, y: event.clientY }, // Set the position for the floating div
          });

          // Set opacity for visual feedback on hover
          hoveredObject.material.opacity = 0;
        } else {
          isHovering.current = false;
          setHoveredProfile(null); // Hide the profile info when not hovering
        }
      } else {
        isHovering.current = false;
        setHoveredProfile(null); // Hide the profile info when no intersections
      }
    }
  };

  // Function to handle click event with animation
  const onClick = useCallback(
    (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      if (earthMeshRef.current) {
        raycaster.current.setFromCamera(mouse.current, camera.current!);
        const intersects = raycaster.current.intersectObjects(
          earthMeshRef.current.children,
          true
        );

        if (intersects.length > 0) {
          const clickedObject = intersects[0].object;
          // Check if the clicked object has a route
          if (clickedObject.userData.route) {
            // Animation: Rotate Earth to center the clicked mesh and zoom in
            const targetPosition = clickedObject.position.clone();

            // Use GSAP to animate the camera and Earth rotation
            gsap.to(earthMeshRef.current.rotation, {
              duration: 0.6,
              y: Math.atan2(targetPosition.x, targetPosition.z),
              ease: "power2.inOut",
              onComplete: () => {
                gsap.to(camera.current.position, {
                  duration: 0.5,
                  z: 4, // Zoom in by reducing the z position
                  ease: "power2.inOut",
                  onComplete: () => {
                    router.push(clickedObject.userData.route); // Route after the animation completes
                  },
                });
              },
            });
          }
        }
      }
    },
    [mouse, earthMeshRef, raycaster, camera, router]
  );

  useEffect(() => {
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [onClick]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Add event listeners for mouse move and click
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("click", onClick);

      // Cleanup event listeners on unmount
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("click", onClick);
      };
    }
  }, [onClick]);

  return (
    <div ref={containerRef}>
      {hoveredProfile && (
        <div
          style={{
            position: "absolute",
            top: hoveredProfile.position.y + 20, // Offset the div 20px below the mouse pointer
            left: hoveredProfile.position.x + 20,
            background: "rgba(0, 0, 0, 0.7)",
            color: "black",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "white",
          }}
        >
          <div>{hoveredProfile.name}</div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
"use client";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import GetStarField from "../components/GetStarField"; // Adjust path as necessary
import { useRouter } from "next/navigation"; // Import useRouter for routing
import gsap from "gsap";
import Image from "next/image";

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
    const w = window.innerWidth;
    const h = window.innerHeight;
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
      "/assets/PhlattlineEarth.glb", // Ensure this path is correct
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
            position: [0.03, 0.9, 0.9],
            route: "/WilliamJames",
            name: "William James",
            picture: "/assets/williamProfile.png",
          },
          {
            position: [0.55, 0.9, 0.7],
            route: "/JordanLee",
            name: "Jordan Lee",
            picture: "/assets/jordanProfile.png",
          },
          {
            position: [1, 0.48, 0.9],
            route: "/SophiaRodriguez",
            name: "Sophia Rodriguez",
            picture: "/assets/sophiaProfile.png",
          },
          {
            position: [-1.2, -0.1, 0.1],
            route: "/Nancy",
            name: "Nancy",
            picture: "/assets/nancyProfile.png",
          },
          {
            position: [-1.2, -0.3, -0.4],
            route: "/ElijahMartinez",
            name: "Elijah Martinez",
            picture: "/assets/ElijahProfile.png",
          },
          {
            position: [-0.0, 0.1, -1.1],
            route: "/Richard",
            name: "Richard",
            picture: "/assets/richardProfile.png",
          },
        ];

        clickableMeshes.forEach(({ position, route, name, picture }) => {
          const geometry = new THREE.SphereGeometry(0.25, 32, 32); // Geometry for the clickable mesh
          const material = new THREE.MeshStandardMaterial({
            color: "red",
            transparent: true,
            opacity: 0,
          });
          const sphere = new THREE.Mesh(geometry, material);
          sphere.position.set(position[0], position[1], position[2]);
          sphere.userData = { route, name, picture }; // Assign the route, name, and picture to userData
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
      if (earthMeshRef.current && !isHovering.current) {
        earthMeshRef.current.rotation.y += 0.002; // Only rotate if not hovering
      }
      renderer.render(scene, camera.current!);
    };
    animate();

    // Handle window resize
    const handleWindowResize = () => {
      if (camera.current) {
        camera.current.aspect = window.innerWidth / window.innerHeight;
        camera.current.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener("resize", handleWindowResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      renderer.dispose();
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
        const hoveredObject = intersects[0].object;
        // Check if the intersected object has a profile (is a clickable mesh)
        if (hoveredObject.userData.route) {
          isHovering.current = true; // Set hover state

          // Set the profile info for the hovered object
          setHoveredProfile({
            name: hoveredObject.userData.name,
            picture: hoveredObject.userData.picture,
            position: { x: event.clientX, y: event.clientY }, // Set the position for the floating div
          });
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
  const onClick = (event: MouseEvent) => {
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
            duration: 1,
            y: Math.atan2(targetPosition.x, targetPosition.z),
            ease: "power2.inOut",
          });

          gsap.to(camera.current.position, {
            duration: 1,
            z: 4, // Zoom in by reducing the z position
            ease: "power2.inOut",
            onComplete: () => {
              router.push(clickedObject.userData.route); // Route after the animation completes
            },
          });
        }
      }
    }
  };

  useEffect(() => {
    // Add event listeners for mouse move and click
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div ref={containerRef}>
      {hoveredProfile && (
        <div
          style={{
            position: "absolute",
            top: hoveredProfile.position.y + 20, // Offset the div 20px below the mouse pointer
            left: hoveredProfile.position.x + 20, // Offset the div 20px to the right of the mouse pointer
            backgroundColor: "white",
            border: "1px solid black",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            borderRadius: "10px",
            width: "7%",
            padding: "4px",
            pointerEvents: "none", // Disable pointer events so it won't block mouse interactions
          }}
        >
          <img
            src={hoveredProfile.picture}
            alt={hoveredProfile.name}
            style={{ height: "50px", borderRadius: "50%" }}
          />
          <p className="text-black">{hoveredProfile.name}</p>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;

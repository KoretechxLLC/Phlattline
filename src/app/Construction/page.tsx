"use client";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useRouter } from "next/navigation";

// interface HomeScreenProps {
//   onModelLoaded: () => void;
// }

const Construction = ({ onModelLoaded }:any) => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const hasModelLoaded = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const earthMeshRef: React.MutableRefObject<THREE.Group> = useRef(null!);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const router = useRouter();
  const isHovering = useRef(false);

  const [hoveredProfile, setHoveredProfile] = useState<{
    name: string;
    picture: string;
    position: { x: number; y: number };
  } | null>(null);

  // Define clickable mesh identifiers
  const clickableMeshNames = ["Home Screen", "Elijah Martinez", "Mrs. Nancy"];

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

    // Initialize the camera
    camera.current = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.current.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    container?.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Orbit Controls
    const controls = new OrbitControls(camera.current, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enablePan = true;
    controls.minDistance = 3;
    controls.maxDistance = 5;

    // Restrict rotation to X-axis only
    controls.maxPolarAngle = Math.PI / 2.5; // Lock camera to X-axis rotation only
    controls.minPolarAngle = Math.PI / 2.5;

    // Load GLB Model
    const loader = new GLTFLoader();
    loader.load(
      "/assets/Construction.glb", // Path to your construction model
      (gltf) => {
        const earthMesh = gltf.scene;

        // Center the model based on bounding box
        const box = new THREE.Box3().setFromObject(earthMesh);
        const center = box.getCenter(new THREE.Vector3());
        earthMesh.position.sub(center); // Reposition the model to center at (0, 0, 0)
        const height = box.getSize(new THREE.Vector3()).y;
        earthMesh.position.y += height / 2; // Vertically center the model

        // Create a pivot group for model rotation
        const pivot = new THREE.Group();
        pivot.add(earthMesh);
        scene.add(pivot);
        earthMeshRef.current = pivot; // Store reference for rotation

        // Add clickable cylinder meshes with different sizes
        const clickableMeshes = [
          {
            position: [1.3, 0.5, -0.6],
            route: "/About",
            name: "Home Screen",
            size: [0.18, 0.18, 0.85],
          },
          {
            position: [0.1, 0.4, 0.62],
            route: "/ElijahMartinez",
            name: "Elijah Martinez",
            size: [0.1, 0.1, 0.3],
          },
          {
            position: [1.05, 0.4, 0.72],
            route: "/Nancy",
            name: "Mrs. Nancy",
            size: [0.1, 0.1, 0.3],
          },
        ];

        clickableMeshes.forEach(({ position, route, name, size }) => {
          const geometry = new THREE.CylinderGeometry(
            size[0],
            size[1],
            size[2],
            32
          );
          const material = new THREE.MeshStandardMaterial({
            color: "blue",
            transparent: true,
            opacity: 0,
          });
          const cylinder = new THREE.Mesh(geometry, material);
          cylinder.position.set(position[0], position[1], position[2]);
          cylinder.userData = { route, name };
          earthMesh.add(cylinder); // Add the cylinder to the model
        });

        if (!hasModelLoaded.current) {
          setIsModelLoaded(true);
          onModelLoaded();
          hasModelLoaded.current = true;
        }
      },
      undefined,
      (error) => {
        console.error("Error loading the GLB model:", error);
      }
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      if (earthMeshRef.current && !isHovering.current) {
        earthMeshRef.current.rotation.y -= 0.007; // Continuous rotation on Y-axis
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

    // Function to handle mouse hover
    const onMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      if (earthMeshRef.current) {
        raycaster.current.setFromCamera(mouse.current, camera.current!);
        const intersects = raycaster.current.intersectObjects(
          earthMeshRef.current.children,
          true
        );

        if (intersects.length > 0) {
          const hoveredObject: any = intersects[0].object;

          // Check if the intersected object is a clickable mesh
          if (
            hoveredObject.userData.name &&
            clickableMeshNames.includes(hoveredObject.userData.name)
          ) {
            isHovering.current = true; // Set hover state

            // Set the profile info for the hovered object
            setHoveredProfile({
              name: hoveredObject.userData.name,
              picture: "", // Add picture URL if needed
              position: { x: event.clientX, y: event.clientY }, // Set the position for the floating div
            });

            // Set opacity for visual feedback on hover
            hoveredObject.material.opacity = 0; // Change opacity for hover effect
          }
        } else {
          isHovering.current = false; // Reset hover state
          setHoveredProfile(null); // Hide the profile info when not hovering
        }
      }
    };

    // Handle mouse leaving the meshes
    const onMouseLeave = () => {
      isHovering.current = false; // Reset hover state
      setHoveredProfile(null); // Hide the profile info
    };

    // Helper function for smooth zoom out animation
    const zoomOutOnClick = (callback: () => void) => {
      const duration = 400; // Animation duration in milliseconds
      const start = performance.now();
      const initialPosition = camera.current?.position.clone();
      const targetPosition = new THREE.Vector3(0, 0, 5); // Zoom out to z = 5

      const animateZoom = (time: number) => {
        const elapsed = time - start;
        const t = Math.min(elapsed / duration, 1); // Calculate interpolation factor

        // Linear interpolation for smooth zooming out
        camera.current?.position.lerpVectors(
          initialPosition!,
          targetPosition,
          t
        );

        if (t < 1) {
          requestAnimationFrame(animateZoom); // Continue animation
        } else {
          callback(); // Trigger callback (e.g., route) after animation completes
        }
      };
      requestAnimationFrame(animateZoom);
    };

    // Handle mouse clicks for mesh selection
    const onMouseClick = (event: MouseEvent) => {
      event.preventDefault();
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.current.setFromCamera(mouse.current, camera.current!);
      const intersects = raycaster.current.intersectObjects(
        earthMeshRef.current.children, // children is now correctly recognized
        true
      );

      if (intersects.length > 0) {
        const clickedObject: any = intersects[0].object;
        if (clickedObject.userData.route) {
          zoomOutOnClick(() => {
            router.push(clickedObject.userData.route); // Route to the corresponding page
          });
        }
      }
    };

    // Event listeners
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onMouseClick);
    window.addEventListener("mouseleave", onMouseLeave); // Handle mouse leave event

    return () => {
      // Clean up
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onMouseClick);
      window.removeEventListener("mouseleave", onMouseLeave); // Clean up event listener
      renderer.dispose();
    };
  }, [onModelLoaded, router]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
    ></div>
  );
};

export default Construction;

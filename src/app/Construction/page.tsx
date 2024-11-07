"use client";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useRouter } from "next/navigation";

const Construction = ({ onModelLoaded }: any) => {
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

  // Use refs to store the rotation functions
  const rotateArrow1 = useRef<() => void>(null!);
  const rotateArrow2 = useRef<() => void>(null!);
  const rotateArrow3 = useRef<() => void>(null!);

  useEffect(() => {
    const clickableMeshNames = ["Home Screen", "Elijah Martinez", "Mrs. Nancy"];
    if (hasModelLoaded.current) return; // Prevent duplicate model loading

    const container: any = containerRef.current;
    if (container) {
      container.innerHTML = "";
    }

    const w = window.innerWidth;
    const h = window.innerHeight;
    const scene = new THREE.Scene();

    camera.current = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.current.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    container?.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    const controls = new OrbitControls(camera.current, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enablePan = true;
    controls.minDistance = 3;
    controls.maxDistance = 5;

    controls.maxPolarAngle = Math.PI / 2.5;
    controls.minPolarAngle = Math.PI / 2.5;

    // Load GLB Model
    const loader = new GLTFLoader();
    loader.load(
      "/assets/Agri-v1.glb", // Path to your construction model
      (gltf) => {
        const earthMesh = gltf.scene;
        const box = new THREE.Box3().setFromObject(earthMesh);
        const center = box.getCenter(new THREE.Vector3());
        earthMesh.position.sub(center);
        const height = box.getSize(new THREE.Vector3()).y;
        earthMesh.position.y += height / 2;

        const pivot = new THREE.Group();
        pivot.add(earthMesh);
        scene.add(pivot);
        earthMeshRef.current = pivot;

        const clickableMeshes = [
          {
            position: [1.3, 0.5, -0.6],
            route: "/About",
            name: "Home Screen",
            size: [0.18, 0.18, 0.85],
          },
          {
            position: [0.1, 0.35, 0.62],
            route: "/ElijahMartinez",
            name: "Elijah Martinez",
            size: [0.1, 0.1, 0.3],
          },
          {
            position: [1.05, 0.33, 0.72],
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
          earthMesh.add(cylinder);
        });

        // Function to create and add an arrow with up-and-down animation
        const addArrow = (position: THREE.Vector3, imageUrl: string) => {
          const textureLoader = new THREE.TextureLoader();
          const imageTexture = textureLoader.load(imageUrl);

          const planeGeometry = new THREE.PlaneGeometry(0.13, 0.13); // Adjust size as needed
          const planeMaterial = new THREE.MeshStandardMaterial({
            map: imageTexture,
            transparent: true,
            opacity: 1.5,
            side: THREE.DoubleSide,
          });

          const arrowPlane = new THREE.Mesh(planeGeometry, planeMaterial);
          arrowPlane.position.copy(position);
          arrowPlane.scale.set(0.5, 0.5, 0.5); // Adjust scale for visibility
          earthMesh.add(arrowPlane); // Add arrowPlane to the earthMesh

          // Store the original y-position to oscillate around it
          const initialY = position.y;
          let time = 0;

          // Return a function to animate the arrow
          return () => {
            arrowPlane.rotation.y += 0.1; // Rotate around the Y-axis

            // Update time and calculate new y-position using a sine wave for up-and-down motion
            time += 0.2;
            arrowPlane.position.y = initialY + Math.sin(time) * 0.05; // Adjust amplitude as needed
          };
        };

        // Store the rotate functions with up-and-down animation in refs
        rotateArrow1.current = addArrow(
          new THREE.Vector3(0.07, 0.6, 0.61),
          "/assets/ProfileArrow.png"
        );
        rotateArrow2.current = addArrow(
          new THREE.Vector3(1.05, 0.58, 0.71),
          "/assets/ProfileArrow.png"
        );
        rotateArrow3.current = addArrow(
          new THREE.Vector3(1.32, 1.05, -0.62),
          "/assets/ProfileArrow.png"
        );

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

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      // Stop rotation if hovering over a mesh
      if (earthMeshRef.current && !isHovering.current) {
        earthMeshRef.current.rotation.y -= 0.007; // Continuous rotation of the model
      }
      renderer.render(scene, camera.current!);
      // Call the rotate functions for arrows if they are defined
      if (rotateArrow1.current) rotateArrow1.current();
      if (rotateArrow2.current) rotateArrow2.current();
      if (rotateArrow3.current) rotateArrow3.current();
    };
    animate();

    const handleWindowResize = () => {
      if (camera.current) {
        camera.current.aspect = window.innerWidth / window.innerHeight;
        camera.current.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener("resize", handleWindowResize);

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

          if (
            hoveredObject.userData.name &&
            clickableMeshNames.includes(hoveredObject.userData.name)
          ) {
            isHovering.current = true;
            setHoveredProfile({
              name: hoveredObject.userData.name,
              picture: "",
              position: { x: event.clientX, y: event.clientY },
            });

            hoveredObject.material.opacity = 0;
          }
        } else {
          isHovering.current = false;
          setHoveredProfile(null);
        }
      }
    };

    const onMouseLeave = () => {
      isHovering.current = false;
      setHoveredProfile(null);
    };

    const zoomOutOnClick = (callback: () => void) => {
      const duration = 400;
      const start = performance.now();
      const initialPosition = camera.current?.position.clone();
      const targetPosition = new THREE.Vector3(0, 0, 5);

      const animateZoom = (time: number) => {
        const elapsed = time - start;
        const t = Math.min(elapsed / duration, 1);

        camera.current?.position.lerpVectors(
          initialPosition!,
          targetPosition,
          t
        );

        if (t < 1) {
          requestAnimationFrame(animateZoom);
        } else {
          callback();
        }
      };
      requestAnimationFrame(animateZoom);
    };

    const onMouseClick = (event: MouseEvent) => {
      event.preventDefault();
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.current.setFromCamera(mouse.current, camera.current!);
      const intersects = raycaster.current.intersectObjects(
        earthMeshRef.current.children,
        true
      );

      if (intersects.length > 0) {
        const clickedObject: any = intersects[0].object;
        if (clickedObject.userData.route) {
          zoomOutOnClick(() => {
            router.push(clickedObject.userData.route);
          });
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onMouseClick);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onMouseClick);
      window.removeEventListener("mouseleave", onMouseLeave);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [onModelLoaded, router]);

  return <div ref={containerRef} style={{ height: "100vh", width: "100%" }} />;
};

export default Construction;

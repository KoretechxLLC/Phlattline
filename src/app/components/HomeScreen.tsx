"use client"
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import GetStarField from "../components/GetStarField";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import ButtonWrapper from "./Button";

interface HomeScreenProps {
  onModelLoaded: () => void;
}

interface ProfileData {
  name: string;
  picture: string;
  position: { x: number; y: number };
  route: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onModelLoaded }) => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [hoveredProfile, setHoveredProfile] = useState<ProfileData | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const earthMeshRef = useRef<THREE.Group | null>(null);
  const camera:any = useRef<THREE.PerspectiveCamera | null>(null);
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const router = useRouter();
  const isHovering = useRef(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const hasModelLoaded = useRef(false);

  useEffect(() => {
    if (hasModelLoaded.current) return; // Prevent duplicate model loading

    const container = containerRef.current;
    if (container) container.innerHTML = ""; // Clear previous renders

    const w = window.innerWidth;
    const h = window.innerHeight;
    const scene = new THREE.Scene();
    camera.current = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.current.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    container?.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 4);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    const controls = new OrbitControls(camera.current, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enablePan = true;
    controls.minDistance = 3;
    controls.maxDistance = 10;

    const loader = new GLTFLoader();
    loader.load(
      "/assets/Earth.glb",
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
            route: "/Corporate",
          },
          {
            position: [-1, 0.1, 0.05],
            name: "Construction",
            size: 0.7,
            route: "/Construction",
          },
          {
            position: [0.3, 0.1, -0.7],
            name: "Agriculture",
            size: 0.75,
            route: "/Agriculture",
          },
        ];

        clickableMeshes.forEach(({ position, name, size, route }) => {
          const geometry = new THREE.SphereGeometry(size, 32, 32);
          const material = new THREE.MeshStandardMaterial({
            color: "red",
            transparent: true,
            opacity: 0,
          });
          const sphere = new THREE.Mesh(geometry, material);
          sphere.position.set(position[0], position[1], position[2]);
          sphere.userData = { name, route };
          earthMesh.add(sphere);
        });
      },
      undefined,
      (error) =>
        console.error("An error occurred while loading the GLB model:", error)
    );

    const [stars, milkyWay] = GetStarField({ numStars: 10000 });
    scene.add(stars, milkyWay);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      if (earthMeshRef.current && !isHovering.current)
        earthMeshRef.current.rotation.y += 0.002;
      renderer.render(scene, camera.current!);
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
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      renderer.dispose();
    };
  }, [onModelLoaded]);

  const onMouseMove = (event: MouseEvent) => {
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
        if (hoveredObject.userData.name) {
          isHovering.current = true;
          if (hoverTimeout.current) clearTimeout(hoverTimeout.current);

          setHoveredProfile({
            name: hoveredObject.userData.name,
            picture: "",
            position: { x: event.clientX, y: event.clientY },
            route: hoveredObject.userData.route,
          });

          hoverTimeout.current = setTimeout(
            () => setHoveredProfile(null),
            5000
          );
        }
      } else {
        isHovering.current = false;
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        hoverTimeout.current = setTimeout(() => setHoveredProfile(null), 8000);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (hoveredProfile && profileRef.current) {
      gsap.to(profileRef.current, { opacity: 1, duration: 0.5 });
    } else if (profileRef.current) {
      gsap.to(profileRef.current, { opacity: 0, duration: 0.5 });
    }
  }, [hoveredProfile]);

  const handleExploreClick = () => {
    if (hoveredProfile?.route && earthMeshRef.current) {
      const meshToAnimate = earthMeshRef.current.children.find(
        (child: any) => child.userData.name === hoveredProfile.name
      );

      if (meshToAnimate) {
        gsap.to(meshToAnimate.position, { x: 0, y: 0, z: 0, duration: 1 });
        gsap.to(camera.current.position, {
          z: 3.2,
          duration: 1,
          onComplete: () => router.push(hoveredProfile.route),
        });
      }
    }
  };

  return (
    <div ref={containerRef}>
      {hoveredProfile && (
        <div
          ref={profileRef}
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            zIndex: 10,
            opacity: 0, // Initial opacity
            transition: "opacity 0.5s ease",
          }}
        >
          <div className="flex flex-col">
            <p className="text-[44px] uppercase">{hoveredProfile.name}</p>
            <p>
              Explore the area of {hoveredProfile.name} & read our client
              stories.
            </p>
            <div className="flex flex-start">
              <ButtonWrapper
                text="Explore"
                className="text-white flex justify-center border-red-500 w-[130px]"
                onClick={handleExploreClick}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;

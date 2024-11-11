"use client";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useRouter } from "next/navigation";
import SplashScreen from "../components/SplashScreen";

const Corporate = ({ onModelLoaded }: any) => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
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
    designation: string;
    picture: string;
    position: { x: number; y: number };
  } | null>(null);

  // Use refs to store the rotation functions
  const rotateArrow1 = useRef<() => void>(null!);
  const rotateArrow2 = useRef<() => void>(null!);
  const rotateArrow3 = useRef<() => void>(null!);

  useEffect(() => {
    const clickableMeshNames = [
      "About",
      "Contact Us",
      "Chatbot",
      "Jordan Lee",
      "Sophia Rodriguez",
      "Amina Patel",
    ];
    if (hasModelLoaded.current) return; // Prevent duplicate model loading

    const container: any = containerRef.current;
    if (container) {
      container.innerHTML = "";
    }

    const w = window.innerWidth;
    const h = window.innerHeight;
    const scene = new THREE.Scene();

    camera.current = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.current.position.z = 4.4;

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
    controls.maxDistance = 6;

    controls.maxPolarAngle = Math.PI / 2.3;
    controls.minPolarAngle = Math.PI / 2.3;

    // Load GLB Model
    const loader = new GLTFLoader();
    setIsLoading(true); // Start loading
    loader.load(
      "/assets/Corporate.glb", // Path to your construction model
      (gltf) => {
        const earthMesh = gltf.scene;
        const box = new THREE.Box3().setFromObject(earthMesh);
        const center = box.getCenter(new THREE.Vector3());
        earthMesh.position.sub(center);
        const height = box.getSize(new THREE.Vector3()).y;
        earthMesh.position.y += height / 3.7;

        const pivot = new THREE.Group();
        pivot.add(earthMesh);
        scene.add(pivot);
        earthMeshRef.current = pivot;

        const clickableMeshes = [
          {
            position: [0.88, 0.7, -0.4],
            route: "/About",
            name: "About",
            designation: "",
            size: [0.25, 0.25, 1],
          },
          {
            position: [0.32, 0.28, 0.5],
            route: "/Contact",
            name: "Contact Us",
            designation: "",
            size: [0.1, 0.1, 0.51],
          },
          {
            position: [0.85, 0.28, 1.3],
            route: "",
            name: "Chatbot",
            designation: "",
            size: [0.1, 0.1, 0.54],
          },
          {
            position: [-0.93, 1.2, -0.4],
            route: "/JordanLee",
            name: "Jordan Lee",
            designation: "Director",
            size: [0.12, 0.12, 0.18],
          },
          {
            position: [-0.83, 1.45, 0.98],
            route: "/SophiaRodriguez",
            name: "Sophia Rodriguez",
            designation: "Senior Vice President",
            size: [0.12, 0.12, 0.18],
          },
          {
            position: [-0.43, 1.28, -1.25],
            route: "/AminaPatel",
            name: "Amina Patel",
            designation: "Chief Operating Officer",
            size: [0.12, 0.12, 0.18],
          },
        ];

        clickableMeshes.forEach(
          ({ position, route, name, size, designation }) => {
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
            cylinder.userData = { route, name, designation };
            earthMesh.add(cylinder);
          }
        );

        // Function to add profile image on buildings without animation
        const addProfileImage = (
          position: THREE.Vector3Like,
          imageUrl: string
        ) => {
          const textureLoader = new THREE.TextureLoader();
          const imageTexture = textureLoader.load(imageUrl);

          const planeGeometry = new THREE.PlaneGeometry(0.4, 0.4); // Adjust size as needed
          const planeMaterial = new THREE.MeshStandardMaterial({
            map: imageTexture,
            transparent: true,
            opacity: 1,
            side: THREE.DoubleSide,
          });

          const profileImagePlane = new THREE.Mesh(
            planeGeometry,
            planeMaterial
          );
          profileImagePlane.position.copy(position);
          profileImagePlane.scale.set(0.5, 0.5, 0.5); // Adjust scale for visibility
          earthMeshRef.current.add(profileImagePlane); // Add profile image to the earthMesh
        };

        // Inside loader.load callback, add static profile images
        addProfileImage(
          new THREE.Vector3(-0.93, 0.78, -0.4),
          "/assets/Jordan.png"
        );
        addProfileImage(
          new THREE.Vector3(-0.83, 1.03, 0.98),
          "/assets/Sophia.png"
        );
        addProfileImage(
          new THREE.Vector3(-0.43, 0.86, -1.25),
          "/assets/Amina.png"
        );

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
          new THREE.Vector3(0.32, 0.68, 0.5),
          "/assets/ProfileArrow.png"
        );
        rotateArrow2.current = addArrow(
          new THREE.Vector3(0.86, 0.68, 1.31),
          "/assets/ProfileArrow.png"
        );
        rotateArrow3.current = addArrow(
          new THREE.Vector3(0.9, 1.28, -0.37),
          "/assets/ProfileArrow.png"
        );

        if (!hasModelLoaded.current) {
          setIsModelLoaded(true);
          onModelLoaded();
          setIsLoading(false);
          hasModelLoaded.current = true;
        }
      },
      undefined,
      (error) => {
        console.error("Error loading the GLB model:", error);
        setIsLoading(false);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      // Stop rotation if hovering over a mesh
      if (earthMeshRef.current && !isHovering.current) {
        earthMeshRef.current.rotation.y -= 0.002; // Continuous rotation of the model
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
            if (
              hoveredObject.userData.name === "Jordan Lee" ||
              hoveredObject.userData.name === "Sophia Rodriguez" ||
              hoveredObject.userData.name === "Amina Patel"
            ) {
              setHoveredProfile({
                name: hoveredObject.userData.name,
                designation: hoveredObject.userData.designation,
                picture: "",
                position: { x: event.clientX, y: event.clientY },
              });
            }
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
      const duration = 1000;
      const start = performance.now();
      const initialPosition = camera.current?.position.clone();
      const targetPosition = new THREE.Vector3(0, 0, 3);

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
  return (
    <>
      {isLoading && (
        <div className="z-50 w-screen h-screen fixed">
          <SplashScreen />
        </div>
      )}
      <div
        ref={containerRef}
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
      >
        {hoveredProfile && (
          <div
            style={{
              position: "absolute",
              top: hoveredProfile.position.y - 40,
              left: hoveredProfile.position.x + 30,
              background: "linear-gradient(to right, #BAA716, #B50D34)", // Gradient background
              padding: "2px", // Thin padding to create the "border" effect
              borderRadius: "10px", // Rounded corners
              boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                backgroundColor: "white", // Inner background color
                borderRadius: "8px", // Slightly smaller radius to fit inside the "border"
                padding: "10px 22px",
              }}
            >
              <h3
                className="text-black text-[24px] font-bold"
                style={{ fontFamily: "Sansation" }}
              >
                {hoveredProfile.name}
              </h3>
              <div className="flex items-center gap-4">
                <p className="w-[6px] h-[6px] rounded-full bg-gradient-to-b from-[#BAA716] to-[#B50D34]"></p>
                <h3
                  className="text-black text-[16px] font-bold"
                  style={{ fontFamily: "Sansation" }}
                >
                  {hoveredProfile.designation}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Corporate;

// src/components/GetStarField.js
"use client";
import * as THREE from "three";
 
export default function getStarfield({ numStars = 1000 } = {}) {
  function randomSpherePoint() {
    const radius = Math.random() * 50 + 50; // Increase the radius for a larger universe
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.sin(phi) * Math.sin(theta);
    let z = radius * Math.cos(phi);
 
    return {
      pos: new THREE.Vector3(x, y, z),
      minDist: radius,
    };
  }
 
  const verts = [];
  const colors = [];
  const stars: any = [];
 
  for (let i = 0; i < numStars; i += 1) {
    let p = randomSpherePoint();
    const { pos } = p;
 
    // Set color to white for all stars
    const color = new THREE.Color(1, 1, 1); // White color
    verts.push(pos.x, pos.y, pos.z);
    colors.push(color.r, color.g, color.b);
    stars.push({ pos, baseColor: color }); // Store base color
  }
 
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
 
  // Create the PointsMaterial with vertexColors and small size
  const mat = new THREE.PointsMaterial({
    size: 0.2, // Keep the stars small
    vertexColors: true,
    transparent: true,
    opacity: 1, // Slight transparency for a more realistic look
  });
 
  const points = new THREE.Points(geo, mat);
 
  // Animation variables
  let time = 0;
 
  // Animation function
  function animate() {
    requestAnimationFrame(animate);
    time += 0.02;
 
    // Update the glow effect for the selected stars
    stars.forEach((star: any, index: number) => {
      // Use the white color for all stars without glow effect
      colors[index * 3] = star.baseColor.r;
      colors[index * 3 + 1] = star.baseColor.g;
      colors[index * 3 + 2] = star.baseColor.b;
    });
 
    // Update the colors in the geometry
    geo.attributes.color.needsUpdate = true;
  }
 
  // Milky Way Effect: Create an arc of densely packed stars
  function createMilkyWay() {
    const milkyWayGeo = new THREE.BufferGeometry();
    const milkyWayVerts = [];
    const milkyWayColors = [];
    for (let i = 0; i < numStars / 5; i++) {
      // Fewer stars for the Milky Way
      let p = randomSpherePoint();
      // Constrain stars to a specific band to simulate the Milky Way
      if (Math.abs(p.pos.y) < 20) {
        milkyWayVerts.push(p.pos.x, p.pos.y, p.pos.z);
        milkyWayColors.push(1, 1, 1); // White color for Milky Way stars
      }
    }
    milkyWayGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(milkyWayVerts, 3)
    );
    milkyWayGeo.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(milkyWayColors, 3)
    );
 
    const milkyWayMat = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
    });
 
    return new THREE.Points(milkyWayGeo, milkyWayMat);
  }
 
  // Start animation
  animate();
 
  // Return both the main starfield and the Milky Way band
  const milkyWay = createMilkyWay();
  return [points, milkyWay];
}
 
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function init3DShowroom(onItemSelect) {
  const container = document.querySelector('.hero-3d-container');
  const canvas = document.getElementById('canvas3d');
  
  if (!canvas || !container) return;

  // 1. Scene, Camera, Renderer Setup
  const scene = new THREE.Scene();
  scene.background = null; // Transparent background to blend with CSS radial gradient

  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 1.8, 6.5);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // 2. Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 3.5;
  controls.maxDistance = 10;
  controls.minPolarAngle = Math.PI / 4;
  controls.maxPolarAngle = Math.PI / 1.8;
  controls.enableZoom = false; // Prevent zooming from hijacking mouse scrolling

  // 3. Lighting System
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(5, 8, 5);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.bias = -0.001;
  scene.add(dirLight);

  const pointLight = new THREE.PointLight(0xffaa00, 1.5, 8);
  pointLight.position.set(0, 1, 1);
  scene.add(pointLight);

  // 4. Build Procedural Shop Shelf Stand
  const shelfMaterial = new THREE.MeshStandardMaterial({
    color: 0x3d271d,
    roughness: 0.7,
    metalness: 0.1
  });
  
  const goldBraceMaterial = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    roughness: 0.2,
    metalness: 0.8
  });

  // Base platform
  const base = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.15, 1.8), shelfMaterial);
  base.position.y = -1.2;
  base.receiveShadow = true;
  scene.add(base);

  // Shelf Planks
  const shelfBottom = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.08, 1.4), shelfMaterial);
  shelfBottom.position.y = -0.5;
  shelfBottom.receiveShadow = true;
  scene.add(shelfBottom);

  const shelfTop = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.08, 1.4), shelfMaterial);
  shelfTop.position.y = 0.6;
  shelfTop.receiveShadow = true;
  scene.add(shelfTop);

  // Side Support Columns (Gold accents)
  const leftColumn = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2, 1.4), goldBraceMaterial);
  leftColumn.position.set(-1.6, -0.2, 0);
  scene.add(leftColumn);

  const rightColumn = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2, 1.4), goldBraceMaterial);
  rightColumn.position.set(1.6, -0.2, 0);
  scene.add(rightColumn);

  // Group to hold all selectable products
  const productGroup = new THREE.Group();
  scene.add(productGroup);

  // 5. Build Products (Procedural 3D Geometry)
  
  // A. Toy Car (Category: toys)
  const carGroup = new THREE.Group();
  carGroup.position.set(-0.9, 0.82, 0);
  carGroup.userData = { category: 'toys', name: 'Premium Toys Collection' };
  
  // Car Body
  const carBodyMat = new THREE.MeshStandardMaterial({ color: 0xff3b30, roughness: 0.1, metalness: 0.6 });
  const carBody = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.18, 0.35), carBodyMat);
  carBody.castShadow = true;
  carGroup.add(carBody);
  
  // Car Cabin
  const carCabinMat = new THREE.MeshStandardMaterial({ color: 0x1c1c1e, roughness: 0.1 });
  const carCabin = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.15, 0.28), carCabinMat);
  carCabin.position.set(-0.05, 0.15, 0);
  carCabin.castShadow = true;
  carGroup.add(carCabin);

  // Wheels (4 cylinders)
  const wheelGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.06, 16);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
  wheelGeom.rotateX(Math.PI / 2);
  
  const w1 = new THREE.Mesh(wheelGeom, wheelMat); w1.position.set(-0.2, -0.09, 0.18);
  const w2 = new THREE.Mesh(wheelGeom, wheelMat); w2.position.set(0.2, -0.09, 0.18);
  const w3 = new THREE.Mesh(wheelGeom, wheelMat); w3.position.set(-0.2, -0.09, -0.18);
  const w4 = new THREE.Mesh(wheelGeom, wheelMat); w4.position.set(0.2, -0.09, -0.18);
  carGroup.add(w1, w2, w3, w4);

  productGroup.add(carGroup);

  // B. Gift Box (Category: gifts)
  const giftGroup = new THREE.Group();
  giftGroup.position.set(0.9, 0.85, 0);
  giftGroup.userData = { category: 'gifts', name: 'Return Gifts sets of 10' };

  // Box base
  const giftBoxMat = new THREE.MeshStandardMaterial({ color: 0xff9500, roughness: 0.3, metalness: 0.2 });
  const boxBase = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), giftBoxMat);
  boxBase.castShadow = true;
  giftGroup.add(boxBase);

  // Ribbons (Red cylinders or flats crossing)
  const ribbonMat = new THREE.MeshStandardMaterial({ color: 0xff2d55, roughness: 0.5 });
  const ribbonH = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.05, 0.42), ribbonMat);
  ribbonH.position.y = 0.01;
  const ribbonV = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.42, 0.42), ribbonMat);
  const ribbonCross = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.05), ribbonMat);
  giftGroup.add(ribbonH, ribbonV, ribbonCross);

  // Bow on top
  const bowNode = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), ribbonMat);
  bowNode.position.set(0, 0.22, 0);
  giftGroup.add(bowNode);

  productGroup.add(giftGroup);

  // C. Kitchen Pot (Category: kitchen)
  const potGroup = new THREE.Group();
  potGroup.position.set(0, -0.28, 0);
  potGroup.userData = { category: 'kitchen', name: 'Premium Stainless Steel Kitchenware' };

  // Pot body (metallic cylinder)
  const steelMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.2, metalness: 0.9 });
  const potBody = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.35, 24), steelMat);
  potBody.castShadow = true;
  potGroup.add(potBody);

  // Pot handles (toruses or small rings)
  const handleGeom = new THREE.TorusGeometry(0.07, 0.02, 8, 16, Math.PI);
  handleGeom.rotateZ(-Math.PI/2);
  const handleL = new THREE.Mesh(handleGeom, steelMat);
  handleL.position.set(-0.32, 0.08, 0);
  const handleR = new THREE.Mesh(handleGeom, steelMat);
  handleR.position.set(0.32, 0.08, 0);
  handleR.rotateY(Math.PI);
  potGroup.add(handleL, handleR);

  // Pot Lid
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.31, 0.03, 24), steelMat);
  lid.position.y = 0.19;
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), goldBraceMaterial);
  knob.position.set(0, 0.22, 0);
  potGroup.add(lid, knob);

  productGroup.add(potGroup);

  // 6. Interaction logic (Raycasting)
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let currentlyHovered = null;

  function onPointerMove(event) {
    // Calculate mouse position relative to canvas
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(productGroup.children, true);

    if (intersects.length > 0) {
      // Find parent group directly inside productGroup
      let rootObj = intersects[0].object;
      while (rootObj.parent && rootObj.parent !== productGroup) {
        rootObj = rootObj.parent;
      }
      
      if (currentlyHovered !== rootObj) {
        // Reset old hover
        if (currentlyHovered) {
          currentlyHovered.scale.set(1, 1, 1);
        }
        currentlyHovered = rootObj;
        currentlyHovered.scale.set(1.15, 1.15, 1.15); // Emphasize item
        document.body.style.cursor = 'pointer';
      }
    } else {
      if (currentlyHovered) {
        currentlyHovered.scale.set(1, 1, 1);
        currentlyHovered = null;
      }
      document.body.style.cursor = 'default';
    }
  }

  function onPointerClick(event) {
    if (!currentlyHovered) return;
    
    // Animate clicked item (jump effect)
    const originalY = currentlyHovered.position.y;
    let time = 0;
    
    function jumpAnim() {
      time += 0.15;
      currentlyHovered.position.y = originalY + Math.sin(time) * 0.25;
      if (time < Math.PI) {
        requestAnimationFrame(jumpAnim);
      } else {
        currentlyHovered.position.y = originalY;
      }
    }
    jumpAnim();

    // Call callback in catalog
    if (typeof onItemSelect === 'function') {
      onItemSelect(currentlyHovered.userData.category);
    }
  }

  window.addEventListener('mousemove', onPointerMove);
  canvas.addEventListener('click', onPointerClick);

  // 7. Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();

    // Gently rotate/float models
    carGroup.rotation.y = elapsedTime * 0.4;
    giftGroup.rotation.y = -elapsedTime * 0.3;
    potGroup.rotation.y = elapsedTime * 0.35;
    
    carGroup.position.y = 0.82 + Math.sin(elapsedTime * 2) * 0.03;
    giftGroup.position.y = 0.85 + Math.sin(elapsedTime * 2.5) * 0.03;
    potGroup.position.y = -0.28 + Math.sin(elapsedTime * 1.8) * 0.03;

    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  // 8. Responsiveness Window resize
  function onWindowResize() {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  }
  
  const resizeObserver = new ResizeObserver(() => onWindowResize());
  resizeObserver.observe(container);
}

import React from "react";
import * as THREE from "three";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

// Debugging
const DEFAULT_INTERACTIVE_ZONES = [
  { id: "zone1", name: "Zone 1" },
  { id: "zone2", name: "Zone 2" },
  { id: "zone3", name: "Zone 3" },
];

const StarfieldBackground = ({
  interactiveZonesConfig = DEFAULT_INTERACTIVE_ZONES,
  onZoneClick = (zoneId) => console.log("Clicked zone:", zoneId),
}) => {
  const theme = useTheme();
  const canvasRef = React.useRef(null);
  const rendererRef = React.useRef(null);
  const sceneRef = React.useRef(null);
  const cameraRef = React.useRef(null);
  const raycasterRef = React.useRef(new THREE.Raycaster());
  const mouseNdcRef = React.useRef(new THREE.Vector2(1, 1));
  const parallaxMousePosRef = React.useRef({ x: 0, y: 0 });
  const hoveredStarRef = React.useRef(null);
  const zoneInteractiveStarsRef = React.useRef([]);
  const backgroundStarLayersRef = React.useRef([]);
  const animationFrameId = React.useRef(null);

  const currThemeColor = React.useMemo(
    () =>
      theme.palette.threejsback && theme.palette.threejsback.default
        ? theme.palette.threejsback.default
        : "#000011",
    [theme.palette.threejsback]
  );

  // ========== Scene Initialization ==========
  const initializeScene = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize scene if it doesn't exist
    if (!sceneRef.current) {
      sceneRef.current = new THREE.Scene();
    }

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setClearColor(new THREE.Color(currThemeColor), 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    // Initial size, will be updated by resize handler
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    rendererRef.current = renderer;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      55, // Field of View
      canvas.clientWidth / canvas.clientHeight, // Aspect Ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    camera.position.z = 5; // Original camera Z position
    cameraRef.current = camera;
    sceneRef.current.add(camera);

    // Setup lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(-1, 2, 4);
    sceneRef.current.add(ambientLight);
    sceneRef.current.add(directionalLight);
  }, [currThemeColor]);

  // Actual starry background
  const createStarLayers = React.useCallback(() => {
    if (!sceneRef.current) {
      return;
    }
    const scene = sceneRef.current;
    const loader = new THREE.TextureLoader();

    const onTextureError = (err) =>
      console.error("Error loading star texture:", err);

    const starTexture1 = loader.load(
      "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp1.png",
      undefined, // onLoad callback
      undefined, // onProgress callback
      onTextureError // onError callback
    );
    const starTexture2 = loader.load(
      "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png",
      undefined, // onLoad callback
      undefined, // onProgress callback
      onTextureError // onError callback
    );

    const getRandomPositions = (count, spread) => {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) {
        arr[i] = (Math.random() - 0.5) * spread;
      }
      return arr;
    };

    // Helper to create a star layer
    const createLayer = (count, size, texture, spread) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(getRandomPositions(count, spread), 3)
      );
      const material = new THREE.PointsMaterial({
        size,
        map: texture,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(geometry, material);
      scene.add(points);
      return { points, geometry, material };
    };

    const layer1 = createLayer(700, 0.1, starTexture1, 20);
    const layer2 = createLayer(1500, 0.15, starTexture2, 30);

    backgroundStarLayersRef.current = [layer1, layer2];
  }, []);

  // Interactive stars
  const createZoneStars = React.useCallback(() => {
    if (
      !sceneRef.current ||
      !interactiveZonesConfig ||
      interactiveZonesConfig.length === 0
    ) {
      zoneInteractiveStarsRef.current = [];
      return;
    }
    const scene = sceneRef.current;
    // Clear existing zone stars and dispose their resources
    zoneInteractiveStarsRef.current.forEach((star) => {
      if (star.geometry) {
        star.geometry.dispose();
      }
      if (star.material) {
        star.material.dispose();
      }
      scene.remove(star);
    });
    zoneInteractiveStarsRef.current = [];

    const baseGeometry = new THREE.SphereGeometry(0.25, 32, 32);

    const newZoneStars = interactiveZonesConfig.map((zone, index) => {
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x00ccff).lerp(
          new THREE.Color(0xff00ff),
          index / (interactiveZonesConfig.length - 1 || 1) // Avoid division by zero
        ),
        emissive: new THREE.Color(0x00ffff).lerp(
          new THREE.Color(0xff00aa),
          index / (interactiveZonesConfig.length - 1 || 1)
        ),
        emissiveIntensity: 0.7,
        transparent: true,
        opacity: 0.95,
        metalness: 0.3,
        roughness: 0.4,
      });

      const star = new THREE.Mesh(baseGeometry.clone(), material);

      const angle = (index / interactiveZonesConfig.length) * Math.PI * 2;
      const radius = Math.min(3.8, 2 + interactiveZonesConfig.length * 0.2);

      star.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.65,
        (Math.random() - 0.5) * 2.8
      );
      star.userData = {
        isZoneStar: true,
        zoneId: zone.id,
        originalScale: new THREE.Vector3(1, 1, 1).clone(),
        hoverScaleFactor: 1.7,

        initialColor: material.color.clone(),
        initialEmissive: material.emissive.clone(),
      };
      scene.add(star);
      return star;
    });
    zoneInteractiveStarsRef.current = newZoneStars;
  }, [interactiveZonesConfig]);

  // Ensures the background actually resizes correctly when the window size changes
  const handleCanvasResize = React.useCallback(() => {
    const renderer = rendererRef.current;
    const camera = cameraRef.current;
    const canvas = canvasRef.current;

    if (!renderer || !camera || !canvas) {
      return false;
    }

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const MIGHT_NEED_RESIZE =
      canvas.width !== width || canvas.height !== height;

    if (MIGHT_NEED_RESIZE) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    return MIGHT_NEED_RESIZE;
  }, []);

  const handleClick = React.useCallback(() => {
    if (!cameraRef.current || zoneInteractiveStarsRef.current.length === 0) {
      return;
    }
    raycasterRef.current.setFromCamera(mouseNdcRef.current, cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(
      zoneInteractiveStarsRef.current,
      false
    );
    if (intersects.length > 0) {
      const firstIntersectedObject = intersects[0].object;
      if (
        firstIntersectedObject.userData.isZoneStar &&
        firstIntersectedObject.userData.zoneId
      ) {
        onZoneClick(firstIntersectedObject.userData.zoneId);
      }
    }
  }, [onZoneClick]);

  // Mouse event handlers
  React.useEffect(() => {
    const canvas = canvasRef.current;

    const handleMouseMove = (event) => {
      parallaxMousePosRef.current = { x: event.clientX, y: event.clientY };
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }
      mouseNdcRef.current.x =
        ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNdcRef.current.y =
        -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    document.addEventListener("mousemove", handleMouseMove);
    if (canvas) {
      canvas.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (canvas) {
        canvas.removeEventListener("click", handleClick);
      }
    };
  }, [onZoneClick, handleClick]);

  React.useEffect(() => {
    initializeScene();
    createStarLayers();

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      handleCanvasResize();

      const renderer = rendererRef.current;
      const scene = sceneRef.current;
      const camera = cameraRef.current;
      if (!renderer || !scene || !camera) {
        return;
      }

      if (backgroundStarLayersRef.current.length === 2) {
        const [stars1Layer, stars2Layer] = backgroundStarLayersRef.current;
        if (
          stars1Layer &&
          stars1Layer.points &&
          stars2Layer &&
          stars2Layer.points
        ) {
          const stars1 = stars1Layer.points;
          const stars2 = stars2Layer.points;

          const parallax = 0.00004;
          stars1.position.x = parallaxMousePosRef.current.x * parallax * 0.75;
          stars1.position.y = parallaxMousePosRef.current.y * -parallax * 0.75;
          stars2.position.x = parallaxMousePosRef.current.x * parallax * 1.5;
          stars2.position.y = parallaxMousePosRef.current.y * -parallax * 1.5;

          stars1.rotation.y += 0.00003;
          stars2.rotation.y += 0.00005;
        }
      }

      // Interactive star animations (hover effect)
      if (zoneInteractiveStarsRef.current.length > 0 && camera) {
        raycasterRef.current.setFromCamera(mouseNdcRef.current, camera);
        const intersects = raycasterRef.current.intersectObjects(
          zoneInteractiveStarsRef.current,
          false
        );

        if (intersects.length > 0) {
          hoveredStarRef.current = intersects[0].object;
        } else {
          hoveredStarRef.current = null;
        }

        if (canvasRef.current) {
          if (hoveredStarRef.current) {
            canvasRef.current.style.cursor = "pointer";
          } else {
            canvasRef.current.style.cursor = "default";
          }
        }

        zoneInteractiveStarsRef.current.forEach((star) => {
          const isHovered = hoveredStarRef.current?.uuid === star.uuid;
          let targetScaleValue;
          if (isHovered) {
            targetScaleValue =
              star.userData.originalScale.x * star.userData.hoverScaleFactor;
          } else {
            targetScaleValue = star.userData.originalScale.x;
          }

          star.scale.lerp(
            new THREE.Vector3(
              targetScaleValue,
              targetScaleValue,
              targetScaleValue
            ),
            0.15
          );

          let targetColor;
          let targetEmissive;
          let targetEmissiveIntensity;

          if (isHovered) {
            targetColor = new THREE.Color(0xffffff);
            targetEmissive = new THREE.Color(0xffffff);
            targetEmissiveIntensity = 1.0;
          } else {
            targetColor = star.userData.initialColor;
            targetEmissive = star.userData.initialEmissive;
            targetEmissiveIntensity = 0.7;
          }

          if (star.material.color) {
            star.material.color.lerp(targetColor, 0.1);
          }
          if (star.material.emissive) {
            star.material.emissive.lerp(targetEmissive, 0.1);
          }
          if (star.material.emissiveIntensity !== undefined) {
            star.material.emissiveIntensity = THREE.MathUtils.lerp(
              star.material.emissiveIntensity,
              targetEmissiveIntensity,
              0.1
            );
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function for this effect
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      rendererRef.current?.dispose();
      if (sceneRef.current) {
        backgroundStarLayersRef.current.forEach((layer) => {
          if (layer && layer.geometry) {
            layer.geometry.dispose();
          }
          if (layer && layer.material) {
            layer.material.dispose();
          }
        });
        zoneInteractiveStarsRef.current.forEach((star) => {
          if (star.geometry) {
            star.geometry.dispose();
          }
          if (star.material) {
            star.material.dispose();
          }
        });
        sceneRef.current.clear();
      }
      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      backgroundStarLayersRef.current = [];
      zoneInteractiveStarsRef.current = [];
    };
  }, [initializeScene, createStarLayers, handleCanvasResize]);

  // Effect to update interactive stars when config changes
  React.useEffect(() => {
    if (sceneRef.current) {
      createZoneStars();
    }
  }, [createZoneStars, interactiveZonesConfig]);

  // Effect to update renderer clear color when theme changes
  React.useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setClearColor(new THREE.Color(currThemeColor), 1);
    }
  }, [currThemeColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        outline: "none",
        display: "block",
      }}
    />
  );
};

export default StarfieldBackground;

StarfieldBackground.propTypes = {
  interactiveZonesConfig: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onZoneClick: PropTypes.func,
};

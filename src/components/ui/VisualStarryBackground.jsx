import React from "react";
import * as THREE from "three";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

const INTRO_ANIMATION_DURATION = 4000;
const INITIAL_CAMERA_Z = 60;
const FINAL_CAMERA_Z = 10;

const FOV = 60;
const NEAR_PLANE = 0.1;
const FAR_PLANE = 1000;

const PARALLAX_FACTOR = 0.0035;
const LERP_FACTOR = 0.03;

const VisualStarryBackground = ({
  onIntroComplete = () => {},
  scrollProgress = 0,
}) => {
  const theme = useTheme();

  const animationFrameId = React.useRef(null);
  const backgroundStarLayersRef = React.useRef([]);
  const cameraRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const introStartTimeRef = React.useRef(null);
  const mouseRef = React.useRef(new THREE.Vector2());
  const parallaxMousePosRef = React.useRef({ x: 0, y: 0 });
  const rendererRef = React.useRef(null);
  const sceneRef = React.useRef(null);
  const prevThemeColorRef = React.useRef(null);

  const [isIntroAnimating, setIsIntroAnimating] = React.useState(true);

  const currThemeColor = React.useMemo(
    () => theme.palette.threejsback?.default || "#00000A",
    [theme.palette.threejsback]
  );

  // Initialize Scene
  const initializeScene = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || (canvas.clientWidth === 0 && canvas.clientHeight === 0)) {
      return;
    }

    if (sceneRef.current) {
      sceneRef.current.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      sceneRef.current.clear();
    }
    if (rendererRef.current) {
      rendererRef.current.dispose();
    }

    sceneRef.current = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
    });
    renderer.setClearColor(new THREE.Color(currThemeColor), 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    rendererRef.current = renderer;

    const camera = new THREE.PerspectiveCamera(
      FOV,
      canvas.clientWidth / canvas.clientHeight,
      NEAR_PLANE,
      FAR_PLANE
    );
    camera.position.z = INITIAL_CAMERA_Z;
    cameraRef.current = camera;
    sceneRef.current.add(camera);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createStarLayers = React.useCallback(() => {
    if (!sceneRef.current || !canvasRef.current) {
      return;
    }
    const scene = sceneRef.current;
    backgroundStarLayersRef.current = [];

    const loader = new THREE.TextureLoader();
    const starTexture = loader.load(
      "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp1.png",
      undefined,
      undefined,
      (err) => console.error("Error loading star texture:", err)
    );

    const createLayer = (count, size, spread, depthSpread, baseZ) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const aspectRatio =
        canvasRef.current.clientHeight / canvasRef.current.clientWidth || 1;

      const verticalSpread = spread * aspectRatio * 5;
      const horizontalSpread = spread * 1.5;

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * horizontalSpread;
        positions[i * 3 + 1] = (Math.random() - 0.5) * verticalSpread;
        positions[i * 3 + 2] = baseZ + (Math.random() - 0.5) * depthSpread;
      }
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      const material = new THREE.PointsMaterial({
        size,
        map: starTexture,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      const points = new THREE.Points(geometry, material);
      scene.add(points);
      return {
        points,
        geometry,
        material,
        baseZ,
        depthSpread,
        count,
        parallaxOffset: { x: 0, y: 0 },
        scrollOffset: 0,
        verticalSpread,
        horizontalSpread,
      };
    };

    backgroundStarLayersRef.current = [
      createLayer(2000, 0.07, 100, 80, -40), // Far layer (more stars, moves slower)
      createLayer(1500, 0.05, 80, 60, 0), // Middle layer
      createLayer(1000, 0.04, 60, 40, 30), // Near layer (moves faster)
    ];
  }, []);

  // Handle Canvas Resize
  const handleCanvasResize = React.useCallback(() => {
    const renderer = rendererRef.current;
    const camera = cameraRef.current;
    const canvas = canvasRef.current;
    if (!renderer || !camera || !canvas) {
      return false;
    }

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      return true;
    }
    return false;
  }, []);

  const handleMouseMove = React.useCallback((event) => {
    parallaxMousePosRef.current = { x: event.clientX, y: event.clientY };
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }, []);

  const handleWheel = React.useCallback(
    (event) => {
      if (isIntroAnimating) {
        event.preventDefault();
      }
    },
    [isIntroAnimating]
  );

  const animate = React.useCallback(() => {
    animationFrameId.current = requestAnimationFrame(animate);
    handleCanvasResize();

    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    if (!renderer || !scene || !camera) {
      return;
    }

    const currentTime = Date.now();

    if (isIntroAnimating) {
      const elapsedTime =
        currentTime - (introStartTimeRef.current || currentTime);
      const progress = Math.min(elapsedTime / INTRO_ANIMATION_DURATION, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      camera.position.z =
        INITIAL_CAMERA_Z - (INITIAL_CAMERA_Z - FINAL_CAMERA_Z) * easedProgress;

      backgroundStarLayersRef.current.forEach((layer) => {
        if (layer.points) {
          layer.points.rotation.z += 0.00005 * (layer.baseZ / 100 + 1);
        }
      });

      if (progress >= 1) {
        camera.position.z = FINAL_CAMERA_Z;
        setIsIntroAnimating(false);
        onIntroComplete();
      }
    } else {
      backgroundStarLayersRef.current.forEach((layer, index) => {
        if (layer?.points) {
          let depthMod =
            Math.abs(layer.baseZ - FINAL_CAMERA_Z) / 50 + 0.2 * (index + 1);
          depthMod = Math.max(0.1, depthMod);
          const normalizedMouseX =
            (parallaxMousePosRef.current.x / window.innerWidth - 0.5) * 2;
          const normalizedMouseY =
            (parallaxMousePosRef.current.y / window.innerHeight - 0.5) * 2;
          const targetX = normalizedMouseX * PARALLAX_FACTOR * depthMod * 50;
          const targetY = normalizedMouseY * -PARALLAX_FACTOR * depthMod * 50;

          // Smooth movement
          layer.parallaxOffset.x +=
            (targetX - layer.parallaxOffset.x) * LERP_FACTOR;
          layer.parallaxOffset.y +=
            (targetY - layer.parallaxOffset.y) * LERP_FACTOR;

          // Scroll movement
          const scrollSpeed = 0.5 * (index + 1);
          layer.scrollOffset = -scrollProgress * scrollSpeed * 100;

          // Enhanced infinite scrolling effect
          const positions = layer.geometry.attributes.position.array;
          const viewHeight = layer.verticalSpread * 2;
          const scrollThreshold = layer.verticalSpread * 0.8; // Start recycling before stars leave view

          for (let i = 0; i < layer.count; i++) {
            const yPos = positions[i * 3 + 1];
            const visibleYPos = yPos - layer.scrollOffset;

            // If star is above the threshold, move it to the bottom
            if (visibleYPos > scrollThreshold) {
              positions[i * 3 + 1] += viewHeight * 0.9;
              positions[i * 3] = (Math.random() - 0.5) * layer.horizontalSpread;
            }
            // If star is below the threshold, move it to the top
            else if (visibleYPos < -scrollThreshold) {
              positions[i * 3 + 1] -= viewHeight * 0.9;
              positions[i * 3] = (Math.random() - 0.5) * layer.horizontalSpread;
            }
          }
          layer.geometry.attributes.position.needsUpdate = true;
          layer.points.position.x = layer.parallaxOffset.x;
          layer.points.position.y = layer.parallaxOffset.y - layer.scrollOffset;
        }
      });
    }
    renderer.render(scene, camera);
  }, [handleCanvasResize, isIntroAnimating, onIntroComplete, scrollProgress]);

  // Mouse Move for Parallax
  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Prevent scrolling during intro animation
  React.useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isIntroAnimating, handleWheel]);

  React.useEffect(() => {
    initializeScene();
    createStarLayers();
  }, [initializeScene, createStarLayers]);

  React.useEffect(() => {
    introStartTimeRef.current = Date.now();
    animate();
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [
    isIntroAnimating,
    handleCanvasResize,
    onIntroComplete,
    scrollProgress,
    animate,
  ]);

  React.useEffect(() => {
    if (rendererRef.current && prevThemeColorRef.current !== currThemeColor) {
      rendererRef.current.setClearColor(new THREE.Color(currThemeColor), 1);
      prevThemeColorRef.current = currThemeColor;
    }
  }, [currThemeColor]);

  React.useEffect(() => {
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      backgroundStarLayersRef.current.forEach((layer) => {
        sceneRef.current?.remove(layer.points);
        layer.geometry?.dispose();
        layer.material?.dispose();
      });
      rendererRef.current?.dispose();
      sceneRef.current?.clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        outline: "none",
        display: "block",
      }}
      aria-hidden="true"
    />
  );
};

VisualStarryBackground.propTypes = {
  onIntroComplete: PropTypes.func,
  scrollProgress: PropTypes.number,
};

export default React.memo(VisualStarryBackground);

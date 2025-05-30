import React from "react";
import * as THREE from "three";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

const VisualStarryBackground = ({ onIntroComplete = () => {} }) => {
  const theme = useTheme();
  const canvasRef = React.useRef(null);
  const rendererRef = React.useRef(null);
  const sceneRef = React.useRef(null);
  const cameraRef = React.useRef(null);
  const backgroundStarLayersRef = React.useRef([]);
  const animationFrameId = React.useRef(null);
  const parallaxMousePosRef = React.useRef({ x: 0, y: 0 });
  const raycasterRef = React.useRef(new THREE.Raycaster());
  const mouseRef = React.useRef(new THREE.Vector2());

  const [isIntroAnimating, setIsIntroAnimating] = React.useState(true);
  const introAnimationDuration = 4000;
  const introStartTimeRef = React.useRef(null);
  const initialCameraZ = 60;
  const finalCameraZ = 10;

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

    // Clear previous scene objects if re-initializing
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
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.z = initialCameraZ;
    cameraRef.current = camera;
    sceneRef.current.add(camera);
  }, [currThemeColor, initialCameraZ]);

  // Create Star Layers
  const createStarLayers = React.useCallback(() => {
    if (!sceneRef.current || !canvasRef.current) {
      return;
    }
    const scene = sceneRef.current;

    // Clear existing star layers before creating new ones
    backgroundStarLayersRef.current.forEach((layer) => {
      if (layer.points) scene.remove(layer.points);
      layer.geometry?.dispose();
      layer.material?.dispose();
    });
    backgroundStarLayersRef.current = [];

    const loader = new THREE.TextureLoader();
    const onTextureError = (err) =>
      console.error("Error loading star texture:", err.target?.src, err);
    const starTexture = loader.load(
      "https://placehold.co/32x32/FFFFFF/FFFFFF.png?text=.",
      undefined,
      undefined,
      onTextureError
    );

    const createLayer = (count, size, spread, depthSpread, baseZ) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const currentCanvas = canvasRef.current;
      let aspectRatio;

      if (currentCanvas.clientWidth > 0 && currentCanvas.clientHeight > 0) {
        aspectRatio = currentCanvas.clientHeight / currentCanvas.clientWidth;
      } else {
        aspectRatio = 1;
      }

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread * aspectRatio;
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
      };
    };

    backgroundStarLayersRef.current = [
      createLayer(1500, 0.07, 100, 80, -40),
      createLayer(1000, 0.05, 80, 60, 0),
      createLayer(800, 0.04, 60, 40, 30),
    ];
  }, []);

  // Handle Canvas Resize
  const handleCanvasResize = React.useCallback(() => {
    const renderer = rendererRef.current;
    const camera = cameraRef.current;
    const canvas = canvasRef.current;
    if (
      !renderer ||
      !camera ||
      !canvas ||
      (canvas.clientWidth === 0 && canvas.clientHeight === 0)
    ) {
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

  // Mouse Move for Parallax
  React.useEffect(() => {
    const handleMouseMove = (event) => {
      parallaxMousePosRef.current = { x: event.clientX, y: event.clientY };
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  React.useEffect(() => {
    initializeScene();
    createStarLayers();
  }, [initializeScene, createStarLayers]);

  React.useEffect(() => {
    introStartTimeRef.current = Date.now();

    const animate = () => {
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
        const progress = Math.min(elapsedTime / introAnimationDuration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        camera.position.z =
          initialCameraZ - (initialCameraZ - finalCameraZ) * easedProgress;

        backgroundStarLayersRef.current.forEach((layer) => {
          if (layer.points) {
            layer.points.rotation.z += 0.00005 * (layer.baseZ / 100 + 1);
          }
        });

        if (progress >= 1) {
          camera.position.z = finalCameraZ;
          setIsIntroAnimating(false);
          onIntroComplete();
        }
      } else {
        backgroundStarLayersRef.current.forEach((layer, index) => {
          if (layer?.points) {
            const parallaxFactor = 0.0035;
            let depthMod =
              Math.abs(layer.baseZ - finalCameraZ) / 50 + 0.2 * (index + 1);
            depthMod = Math.max(0.1, depthMod);
            const normalizedMouseX =
              (parallaxMousePosRef.current.x / window.innerWidth - 0.5) * 2;
            const normalizedMouseY =
              (parallaxMousePosRef.current.y / window.innerHeight - 0.5) * 2;
            const targetX = normalizedMouseX * parallaxFactor * depthMod * 50;
            const targetY = normalizedMouseY * -parallaxFactor * depthMod * 50;

            // Lerp to smooth it
            const lerpFactor = 0.03;

            layer.parallaxOffset.x +=
              (targetX - layer.parallaxOffset.x) * lerpFactor;
            layer.parallaxOffset.y +=
              (targetY - layer.parallaxOffset.y) * lerpFactor;

            layer.points.position.x = layer.parallaxOffset.x;
            layer.points.position.y = layer.parallaxOffset.y;
          }
        });

        if (raycasterRef.current && cameraRef.current) {
          raycasterRef.current.setFromCamera(
            mouseRef.current,
            cameraRef.current
          );
        }
      }
      renderer.render(scene, camera);
    };

    animate(); // Start animation

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [
    isIntroAnimating,
    handleCanvasResize,
    onIntroComplete,
    introAnimationDuration,
    initialCameraZ,
    finalCameraZ,
    theme.palette.secondary.main,
  ]);

  // Full cleanup on component unmount
  React.useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      backgroundStarLayersRef.current.forEach((layer) => {
        sceneRef.current?.remove(layer.points);
        layer.geometry?.dispose();
        layer.material?.dispose();
      });
      backgroundStarLayersRef.current = [];

      rendererRef.current?.dispose();
      sceneRef.current?.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      sceneRef.current?.clear();

      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      animationFrameId.current = null;
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
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onIntroComplete: PropTypes.func,
  onNavigate: PropTypes.func,
};

export default React.memo(VisualStarryBackground);

// src/components/VisualStarryBackground.jsx
import React, { useRef, useMemo, useCallback, useEffect } from "react";
import * as THREE from "three";
import { useTheme } from "@mui/material/styles";

const VisualStarryBackground = () => {
  const theme = useTheme();
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const backgroundStarLayersRef = useRef([]);
  const animationFrameId = useRef(null);
  const parallaxMousePosRef = useRef({ x: 0, y: 0 });

  const currThemeColor = useMemo(
    () => theme.palette.threejsback?.default || "#000011",
    [theme.palette.threejsback]
  );

  const initializeScene = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || (canvas.clientWidth === 0 && canvas.clientHeight === 0))
      return; // Avoid init if canvas not sized

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
      55,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;
    sceneRef.current.add(camera);
  }, [currThemeColor]);

  const createStarLayers = useCallback(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    backgroundStarLayersRef.current.forEach((layer) => {
      if (layer.points && scene) scene.remove(layer.points);
      layer.geometry?.dispose();
      layer.material?.dispose();
    });
    backgroundStarLayersRef.current = [];

    const loader = new THREE.TextureLoader();
    const onTextureError = (err) =>
      console.error("Error loading star texture:", err);
    const starTexture1 = loader.load(
      "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp1.png",
      undefined,
      undefined,
      onTextureError
    );
    const starTexture2 = loader.load(
      "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png",
      undefined,
      undefined,
      onTextureError
    );

    const getRandomPositions = (count, spread) => {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++)
        arr[i] = (Math.random() - 0.5) * spread;
      return arr;
    };

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

    backgroundStarLayersRef.current = [
      createLayer(700, 0.1, starTexture1, 20),
      createLayer(1500, 0.15, starTexture2, 30),
    ];
  }, []);

  const handleCanvasResize = useCallback(() => {
    const renderer = rendererRef.current;
    const camera = cameraRef.current;
    const canvas = canvasRef.current;
    if (
      !renderer ||
      !camera ||
      !canvas ||
      canvas.clientWidth === 0 ||
      canvas.clientHeight === 0
    )
      return false;

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

  useEffect(() => {
    const handleMouseMove = (event) => {
      parallaxMousePosRef.current = { x: event.clientX, y: event.clientY };
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    initializeScene();
    createStarLayers();

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      handleCanvasResize();
      const { current: renderer } = rendererRef;
      const { current: scene } = sceneRef;
      const { current: camera } = cameraRef;
      if (!renderer || !scene || !camera) return;

      if (backgroundStarLayersRef.current.length === 2) {
        const [stars1Layer, stars2Layer] = backgroundStarLayersRef.current;
        const parallax = 0.00004;
        if (stars1Layer?.points) {
          stars1Layer.points.position.x =
            parallaxMousePosRef.current.x * parallax * 0.75;
          stars1Layer.points.position.y =
            parallaxMousePosRef.current.y * -parallax * 0.75;
          stars1Layer.points.rotation.y += 0.00003;
        }
        if (stars2Layer?.points) {
          stars2Layer.points.position.x =
            parallaxMousePosRef.current.x * parallax * 1.5;
          stars2Layer.points.position.y =
            parallaxMousePosRef.current.y * -parallax * 1.5;
          stars2Layer.points.rotation.y += 0.00005;
        }
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      backgroundStarLayersRef.current.forEach((layer) => {
        if (layer.points && sceneRef.current)
          sceneRef.current.remove(layer.points);
        layer.geometry?.dispose();
        layer.material?.dispose();
      });
      backgroundStarLayersRef.current = [];
      rendererRef.current?.dispose();
      sceneRef.current?.clear();
      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
    };
  }, [initializeScene, createStarLayers, handleCanvasResize]);

  useEffect(() => {
    if (rendererRef.current && currThemeColor) {
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
      aria-hidden="true"
    />
  );
};

export default React.memo(VisualStarryBackground);

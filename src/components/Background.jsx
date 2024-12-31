import React from "react";
import * as THREE from "three";
import { useTheme } from "@mui/material/styles";

const StarfieldBackground = () => {
  const theme = useTheme();
  const canvasRef = React.useRef();
  const rendererRef = React.useRef();
  const sceneRef = React.useRef();

  // Determine the current theme color
  const currTheme = React.useMemo(
    () => theme.palette.threejsback.default,
    [theme]
  );

  // actually initialize the background
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas });
    rendererRef.current = renderer;
    renderer.setClearColor(new THREE.Color(currTheme));

    const scene = new THREE.Scene();
    sceneRef.current = scene; // Store scene reference

    // Light setup
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-1, 2, 4);
    scene.add(light);

    // Camera setup
    const fov = 55;
    const aspect = canvas.clientWidth / canvas.clientHeight;
    const near = 1.5;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    // Function to generate random star positions
    const getRandomParticelPos = (particleCount) => {
      const arr = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i++) {
        arr[i] = (Math.random() - 0.5) * 10;
      }
      return arr;
    };

    // Create star geometries and materials
    const geometry1 = new THREE.BufferGeometry();
    geometry1.setAttribute(
      "position",
      new THREE.BufferAttribute(getRandomParticelPos(350), 3)
    );

    const geometry2 = new THREE.BufferGeometry();
    geometry2.setAttribute(
      "position",
      new THREE.BufferAttribute(getRandomParticelPos(1500), 3)
    );

    const loader = new THREE.TextureLoader();
    const material1 = new THREE.PointsMaterial({
      size: 0.05,
      map: loader.load(
        "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp1.png"
      ),
      transparent: true,
    });
    const material2 = new THREE.PointsMaterial({
      size: 0.075,
      map: loader.load(
        "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png"
      ),
      transparent: true,
    });

    const stars1 = new THREE.Points(geometry1, material1);
    const stars2 = new THREE.Points(geometry2, material2);

    scene.add(stars1, stars2);

    // Mouse interaction
    let mouseX = 0,
      mouseY = 0;
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const resizeRendererToDisplaySize = (renderer) => {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    };

    const render = () => {
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      // Update star positions based on mouse
      stars1.position.x = mouseX * 0.0001;
      stars1.position.y = mouseY * -0.0001;
      stars2.position.x = mouseX * 0.0001;
      stars2.position.y = mouseY * -0.0001;

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };

    render();

    // Cleanup function
    return () => {
      renderer.dispose();
      scene.clear();
    };

    // disable here because we only want to render the theme change if the currTheme is changed
    // which is done in the next useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Second useEffect: Update the background color dynamically when the theme changes
  React.useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setClearColor(new THREE.Color(currTheme));
    }
  }, [currTheme]);

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
      }}
    />
  );
};

export default StarfieldBackground;

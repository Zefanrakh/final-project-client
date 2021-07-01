import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "react-three-fiber";
import { Suspense } from "react";

const Background = (props) => {
  const texture = useLoader(
    THREE.TextureLoader,
    "minsk-belarus-september-2017-panorama-360-angle-view-in-interior-of-modern-child-kindergarden-development-room-full-360-degree-seamless-panorama-RGC1R1.jpg"
  );
  texture.anisotropy = 16;

  const { gl } = useThree();
  const formatted = new THREE.WebGLCubeRenderTarget(
    texture.image.height
  ).fromEquirectangularTexture(gl, texture);
  let x;
  window.addEventListener("mousemove", (state) => {
    let stateScreenX = state.screenX;
    let calculatedValue =
      (stateScreenX - window.screen.width / 2) *
      (Math.PI / (window.screen.width * 8));
    x = calculatedValue + (Math.PI * 13) / 8;
  });
  useFrame(({ camera }) => {
    camera.rotation.y = x;
    camera.rotation.x = 0;
  });
  return <primitive attach="background" object={formatted}></primitive>;
};
const MainCanvas = (props) => {
  return (
    <div
      style={{
        position: "fixed",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        top: 0,
        left: 0,
      }}
    >
      <Canvas
        style={{ backgroundColor: "black" }}
        camera={{ position: [0, 0, 0] }}
        shadowMap
      >
        <Suspense fallback={null}>
          <Background />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MainCanvas;

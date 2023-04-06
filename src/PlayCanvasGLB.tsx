import React, { useEffect, useRef } from "react";
import * as pc from "playcanvas";

interface PlayCanvasGLBProps {
  width: number;
  height: number;
  modelUrl: string;
}

const PlayCanvasGLB: React.FC<PlayCanvasGLBProps> = ({ width, height, modelUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const app = new pc.Application(canvas, {});

    // Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);

    // Create a camera entity with a perspective camera component
    const camera = new pc.Entity();
    camera.addComponent("camera", {
      clearColor: new pc.Color(0.1, 0.1, 0.1),
      fov: 75,
    });
      // 이 부분에서 OrbitCamera 스크립트를 추가합니다.
      camera.addComponent("script");
      camera.script.create("orbitCamera", {
        attributes: {
          distance: 10,
          phi: 45,
          theta: 0,
        },
      });

    app.root.addChild(camera);
    camera.setPosition(0, 0, 3);

    // Create a directional light entity with a light component
    const light = new pc.Entity();
    light.addComponent("light", {
      type: "directional",
    });
    app.root.addChild(light);
    light.setEulerAngles(45, 0, 0);

    // Load the GLB model
    app.assets.loadFromUrl(modelUrl, "container", (err, asset) => {
      if (err) {
        console.error("Error loading GLB model:", err);
        return;
      }

      // Add the model to the scene
      const container = asset.resource;
      const modelEntity = new pc.Entity();
      modelEntity.addComponent("model", {
        type: "asset",
        asset: container.model,
      });

      app.root.addChild(modelEntity);
    });

    app.start();

    return () => {
      app.destroy();
    };
  }, [modelUrl]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default PlayCanvasGLB;

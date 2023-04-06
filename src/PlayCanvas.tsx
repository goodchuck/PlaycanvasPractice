import React, { useEffect, useRef } from "react";
import * as pc from "playcanvas";

interface PlayCanvasProps {
  width: number;
  height: number;
}

const PlayCanvas: React.FC<PlayCanvasProps> = ({ width, height }) => {
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

    // Create a basic box entity with a box shape and box render component
    const box = new pc.Entity();
    box.addComponent("shape", {
      type: "box",
    });
    box.addComponent("render", {
      material: new pc.StandardMaterial(),
      type: "box",
    });
    app.root.addChild(box);

    // Create a camera entity with a perspective camera component
    const camera = new pc.Entity();
    camera.addComponent("camera", {
      clearColor: new pc.Color(0.1, 0.1, 0.1),
      fov: 75,
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

    // Set an update function to rotate the box entity
    app.on("update", (dt) => {
      box.rotate(10 * dt, 20 * dt, 30 * dt);
    });

    app.start();

    return () => {
      app.destroy();
    };
  }, []);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default PlayCanvas;

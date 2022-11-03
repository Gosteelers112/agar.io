import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Sprite1 from "./Sprite1/Sprite1.js";
import Sprite2 from "./Sprite2/Sprite2.js";
import Pellets from "./Pellets/Pellets.js";
import Sprite3 from "./Sprite3/Sprite3.js";
import Sprite4 from "./Sprite4/Sprite4.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Sprite1: new Sprite1({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 4,
    size: 26,
    visible: false,
    layerOrder: 3
  }),
  Sprite2: new Sprite2({
    x: 22.00000089009596,
    y: 1.0000022888181626,
    direction: 90,
    costumeNumber: 1,
    size: 70,
    visible: false,
    layerOrder: 1
  }),
  Pellets: new Pellets({
    x: 185,
    y: 96,
    direction: 0,
    costumeNumber: 2,
    size: 5,
    visible: false,
    layerOrder: 4
  }),
  Sprite3: new Sprite3({
    x: 77.8628098844118,
    y: -74.62465588820035,
    direction: 90,
    costumeNumber: 2,
    size: 23,
    visible: false,
    layerOrder: 2
  }),
  Sprite4: new Sprite4({
    x: -161.99998741149983,
    y: -152.9999846564412,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 5
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;

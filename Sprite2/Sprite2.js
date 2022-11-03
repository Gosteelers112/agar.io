/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite2/costumes/costume1.svg", {
        x: 117.30557250976562,
        y: 84.34376525878906
      })
    ];

    this.sounds = [new Sound("pop", "./Sprite2/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "pick skin" },
        this.whenIReceivePickSkin
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    this.size = 70;
  }

  *whenthisspriteclicked() {
    this.broadcast("start");
    this.visible = false;
  }

  *whenIReceivePickSkin() {
    this.visible = false;
  }
}

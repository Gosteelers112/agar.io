/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Pellets extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("blue", "./Pellets/costumes/blue.svg", {
        x: 99.30557250976562,
        y: 96.34376525878906
      }),
      new Costume("default", "./Pellets/costumes/default.svg", {
        x: 99.30557250976562,
        y: 96.34376525878906
      }),
      new Costume("yellow", "./Pellets/costumes/yellow.svg", {
        x: 99.30557250976562,
        y: 96.34376525878906
      }),
      new Costume("smiley", "./Pellets/costumes/smiley.svg", {
        x: 99.30557250976562,
        y: 96.34376525878906
      })
    ];

    this.sounds = [new Sound("pop", "./Pellets/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "start" }, this.whenIReceiveStart),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "respawn" },
        this.whenIReceiveRespawn
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveStart() {
    this.stage.vars.died = "FALSE";
    this.stage.vars.map = 1;
    while (!(this.stage.vars.died == "TRUE")) {
      this.createClone();
      yield* this.wait(0.3);
      yield;
    }
  }

  *startAsClone() {
    this.visible = true;
    this.size = 5;
    this.effects.color += this.random(-10, 15);
    this.goto(this.random(-240, 240), this.random(-180, 180));
    while (true) {
      if (this.touching(this.sprites["Sprite1"].andClones())) {
        this.stage.vars.cloneSize = this.size;
        this.broadcast("eat");
        this.deleteThisClone();
      }
      yield;
    }
  }

  *whenGreenFlagClicked2() {}

  *startAsClone2() {
    this.createClone();
  }

  *whenIReceiveRespawn() {
    this.createClone();
  }
}

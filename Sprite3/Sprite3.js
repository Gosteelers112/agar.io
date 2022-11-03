/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite3 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("blue", "./Sprite3/costumes/blue.svg", {
        x: 99.30557250976562,
        y: 96.34376525878906
      }),
      new Costume("default", "./Sprite3/costumes/default.svg", {
        x: 99.30557250976562,
        y: 96.34376525878906
      }),
      new Costume("yellow", "./Sprite3/costumes/yellow.svg", {
        x: 99.30557250976562,
        y: 96.34376525878906
      }),
      new Costume("smiley", "./Sprite3/costumes/smiley.svg", {
        x: 99.30557250976562,
        y: 96.34376525878906
      })
    ];

    this.sounds = [new Sound("pop", "./Sprite3/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "start" }, this.whenIReceiveStart),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "respawn" },
        this.whenIReceiveRespawn
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "start" },
        this.whenIReceiveStart2
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone3)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.costume = "default";
  }

  *whenIReceiveStart() {
    while (true) {
      this.createClone();
      yield* this.wait(2.2);
      yield;
    }
  }

  *startAsClone() {
    this.visible = true;
    this.goto(this.random(-240, 240), this.random(-180, 180));
    this.size = this.random(8, 80 + this.stage.vars.map);
    while (true) {
      yield* this.glide(3, this.random(-240, 240), this.random(-180, 180));
      yield;
    }
  }

  *startAsClone2() {
    while (true) {
      if (this.touching(this.sprites["Sprite1"].andClones())) {
        if (this.size > this.stage.vars.mySize) {
          this.broadcast("kill player");
          this.size += this.stage.vars.mySize;
        } else {
          this.stage.vars.otherSize = this.size;
          this.broadcast("kill other");
          this.deleteThisClone();
        }
      }
      yield;
    }
  }

  *whenIReceiveRespawn() {
    this.deleteThisClone();
  }

  *whenIReceiveStart2() {
    this.deleteThisClone();
  }

  *startAsClone3() {}
}

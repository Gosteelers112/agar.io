/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("blue", "./Sprite1/costumes/blue.svg", {
        x: 99.30557250976562,
        y: 96.34376525878906
      }),
      new Costume("default", "./Sprite1/costumes/default.svg", {
        x: 99.30557250976562,
        y: 96.34376525878906
      }),
      new Costume("smiley", "./Sprite1/costumes/smiley.svg", {
        x: 99.30557250976562,
        y: 96.34376525878906
      }),
      new Costume("yellow", "./Sprite1/costumes/yellow.svg", {
        x: 99.30557250976562,
        y: 96.34376525878906
      })
    ];

    this.sounds = [new Sound("pop", "./Sprite1/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "start" }, this.whenIReceiveStart),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "up arrow" },
        this.whenKeyUpArrowPressed
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "down arrow" },
        this.whenKeyDownArrowPressed
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "right arrow" },
        this.whenKeyRightArrowPressed
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "left arrow" },
        this.whenKeyLeftArrowPressed
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "kill player" },
        this.whenIReceiveKillPlayer
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "kill other" },
        this.whenIReceiveKillOther
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "pick skin" },
        this.whenIReceivePickSkin
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "start" },
        this.whenIReceiveStart2
      ),
      new Trigger(Trigger.BROADCAST, { name: "start" }, this.whenIReceiveStart3)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.stage.vars.inPlay = "FALSE";
    this.stage.watchers.mySize.visible = false;
  }

  *whenIReceiveStart() {
    this.size = 25;
    this.stage.vars.mySize = 25;
    this.stage.watchers.mySize.visible = true;
    this.visible = true;
    this.goto(0, 0);
    this.stage.vars.inPlay = "TRUE";
    while (true) {
      if (this.touching(this.sprites["Pellets"].andClones())) {
        this.size += 0.2;
        this.stage.vars.mySize += 0.2;
        this.stage.vars.TotalSizeAllTime += 0.2;
        this.sprites["Pellets"].createClone();
      }
      yield;
    }
  }

  *whenKeyUpArrowPressed() {
    if (this.stage.vars.inPlay == "TRUE") {
      this.y += 11;
    }
  }

  *whenKeyDownArrowPressed() {
    if (this.stage.vars.inPlay == "TRUE") {
      this.y += -11;
    }
  }

  *whenKeyRightArrowPressed() {
    if (this.stage.vars.inPlay == "TRUE") {
      this.x += 11;
    }
  }

  *whenKeyLeftArrowPressed() {
    if (this.stage.vars.inPlay == "TRUE") {
      this.x += -11;
    }
  }

  *whenIReceiveKillPlayer() {
    this.stage.vars.died = "TRUE";
    this.visible = false;
    yield* this.askAndWait(
      "Do you want to respawn using 1000 total size all time?"
    );
    if (this.answer == "no") {
      if (this.stage.vars.map > this.stage.vars.Highscore) {
        this.stage.vars.Highscore = this.stage.vars.map;
      }
      this.broadcast("start");
    } else {
      if (999 < this.stage.vars.TotalSizeAllTime) {
        this.visible = true;
        this.stage.vars.TotalSizeAllTime += -1000;
        this.broadcast("respawn");
      } else {
        this.broadcast("start");
      }
    }
  }

  *whenIReceiveKillOther() {
    this.stage.vars.mySize += this.stage.vars.otherSize;
    this.size += this.stage.vars.otherSize;
    this.stage.vars.TotalSizeAllTime += this.stage.vars.otherSize;
    if (this.stage.vars.mySize > 255 + this.stage.vars.map * 2) {
      this.stage.vars.map += 1;
      this.stage.vars.mySize = 2 * this.stage.vars.map;
      this.size = 2 * this.stage.vars.map;
    }
  }

  *whenIReceivePickSkin() {
    this.visible = true;
    yield* this.askAndWait(
      "What skin do you want? Blue, yellow, red, or smiley face? More skins coming soon."
    );
    if (this.answer == "Blue") {
      this.costume = "blue";
    }
    if (this.answer == "Red") {
      this.costume = "default";
    }
    if (this.answer == "Yellow") {
      this.costume = "yellow";
    }
    if (this.answer == "Smiley face") {
      this.costume = "smiley";
    }
    this.broadcast("start");
  }

  *whenIReceiveStart2() {
    this.stage.vars.rank = "Newbie";
    while (true) {
      if (this.stage.vars.map == 5) {
        this.stage.vars.rank = "Amateur";
      }
      if (this.stage.vars.map == 10) {
        this.stage.vars.rank = "ok";
      }
      if (this.stage.vars.map == 15) {
        this.stage.vars.rank = "good";
      }
      if (this.stage.vars.map == 25) {
        this.stage.vars.rank = "cool";
      }
      if (this.stage.vars.map == 50) {
        this.stage.vars.rank = "amazing";
      }
      if (this.stage.vars.map == 100) {
        this.stage.vars.rank = "world domination";
      }
      if (this.stage.vars.map == this.stage.vars.Highscore) {
        this.stage.vars.rank = "almost to beationg the highscore";
      }
      if (this.stage.vars.map == this.stage.vars.Highscore + 1) {
        this.stage.vars.rank = "You beat the highscore!";
        this.stage.vars.Highscore = this.stage.vars.map;
      }
      yield;
    }
  }

  *whenIReceiveStart3() {
    this.stage.vars.mySize = 2 * this.stage.vars.map;
    this.size = 2 * this.stage.vars.map;
  }
}

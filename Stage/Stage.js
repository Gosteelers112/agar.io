/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 240,
        y: 180
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.myVariable = 0;
    this.vars.inPlay = "TRUE";
    this.vars.sprite1sSize = 0;
    this.vars.mySize = 26;
    this.vars.cloneSize = 5;
    this.vars.otherSize = 48;
    this.vars.Highscore = 19;
    this.vars.map = 1;
    this.vars.TotalSizeAllTime = 779;
    this.vars.died = "TRUE";
    this.vars.rank = "Newbie";

    this.watchers.mySize = new Watcher({
      label: "my size",
      style: "normal",
      visible: true,
      value: () => this.vars.mySize,
      x: 245,
      y: 175
    });
    this.watchers.Highscore = new Watcher({
      label: "☁ highscore",
      style: "normal",
      visible: true,
      value: () => this.vars.Highscore,
      x: 239,
      y: 141
    });
    this.watchers.map = new Watcher({
      label: "map",
      style: "normal",
      visible: true,
      value: () => this.vars.map,
      x: 245,
      y: 110
    });
    this.watchers.TotalSizeAllTime = new Watcher({
      label: "☁ total size all time",
      style: "normal",
      visible: true,
      value: () => this.vars.TotalSizeAllTime,
      x: 245,
      y: 82
    });
    this.watchers.rank = new Watcher({
      label: "rank",
      style: "normal",
      visible: true,
      value: () => this.vars.rank,
      x: 245,
      y: 52
    });
  }
}

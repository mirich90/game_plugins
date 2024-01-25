(function () {
  let helpers = {
    Vec: class {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
      add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
      }
      mult(v) {
        if (v instanceof helpers.Vec) {
          this.x *= v.x;
          this.y *= v.y;
          return this;
        } else {
          this.x *= v;
          this.y *= v;
          return this;
        }
      }
    },
    garbageCollector() {
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].size <= 0) {
          particles.splice(i, 1);
        }
      }
      for (let i = 0; i < flameParticles.length; i++) {
        if (flameParticles[i].size <= 0) {
          flameParticles.splice(i, 1);
        }
      }
    },
    randHue() {
      return ~~(Math.random() * 360);
    },
    hsl2rgb(hue, saturation, lightness) {
      if (hue == undefined) {
        return [0, 0, 0];
      }
      var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
      var huePrime = hue / 60;
      var secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

      huePrime = ~~huePrime;
      var red;
      var green;
      var blue;

      if (huePrime === 0) {
        red = chroma;
        green = secondComponent;
        blue = 0;
      } else if (huePrime === 1) {
        red = secondComponent;
        green = chroma;
        blue = 0;
      } else if (huePrime === 2) {
        red = 0;
        green = chroma;
        blue = secondComponent;
      } else if (huePrime === 3) {
        red = 0;
        green = secondComponent;
        blue = chroma;
      } else if (huePrime === 4) {
        red = secondComponent;
        green = 0;
        blue = chroma;
      } else if (huePrime === 5) {
        red = chroma;
        green = 0;
        blue = secondComponent;
      }

      var lightnessAdjustment = lightness - chroma / 2;
      red += lightnessAdjustment;
      green += lightnessAdjustment;
      blue += lightnessAdjustment;

      return [
        Math.round(red * 255),
        Math.round(green * 255),
        Math.round(blue * 255),
      ];
    },
  };
  class Particle {
    constructor(pos, color, size, vel, gravity = -0.4) {
      this.pos = pos;
      this.color = color;
      this.size = Math.abs(size / 2);
      this.ttl = 0;
      this.gravity = gravity;
      this.vel = vel;
    }
    draw(ctx) {
      let { x, y } = this.pos;
      let hsl = this.color
        .split("")
        .filter((l) => l.match(/[^hsl()$% ]/g))
        .join("")
        .split(",")
        .map((n) => +n);
      let [r, g, b] = helpers.hsl2rgb(hsl[0], hsl[1] / 100, hsl[2] / 100);
      ctx.shadowColor = `rgb(${r},${g},${b},${1})`;
      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = `rgb(100,255,100,1)`;
      ctx.fillRect(x, y, this.size, this.size);
      ctx.globalCompositeOperation = "source-over";
    }
    update(ctx) {
      this.draw(ctx);
      this.size -= 0.4;
      this.ttl += 2;
      this.pos.add(this.vel);
      this.vel.y -= this.gravity;
    }
  }

  class ParticleFlame2 {
    constructor(pos, color, size, vel, gravity = 0.4) {
      this.pos = pos;
      this.color = color;
      this.size = Math.abs(size / 2);
      this.ttl = 0;
      this.gravity = gravity;
      this.vel = vel;
    }
    draw(ctx) {
      let { x, y } = this.pos;
      // ctx.shadowColor = this.color;
      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = this.color;
      // ctx.fillRect(x, y, this.size, this.size);
      let max = this.size;
      ctx.arc(
        x,
        y,
        ((max - this.size) / max) * (this.size / 2) + this.size / 2,
        0,
        2 * Math.PI
      );
      ctx.globalCompositeOperation = "source-over";
    }
    update(ctx) {
      this.draw(ctx);
      this.size -= 0.1;
      this.ttl += 2;
      this.pos.add(this.vel);
      if ($gamePlayer.direction() === 8) this.vel.y -= this.gravity;
      if ($gamePlayer.direction() === 2) this.vel.y += this.gravity;
      if ($gamePlayer.direction() === 4) this.vel.x -= this.gravity;
      if ($gamePlayer.direction() === 6) this.vel.x += this.gravity;
    }
  }

  // let splashingParticleCount = 50;
  // let splashingParticleCount = 40;
  let particles = [];
  let flameParticles = [];
  let currentHue;
  let cellSize = 12;

  Game_Character.prototype.particleSplash = function (
    splashingParticleCount = 40
  ) {
    let x = (this._realX - $gameMap.displayX()) * 48 + 20;
    let y = (this._realY - $gameMap.displayY()) * 48 + 30;

    for (let i = 0; i < splashingParticleCount; i++) {
      let vel = new helpers.Vec(Math.random() * 6 - 3, Math.random() * 6 - 3);
      let position = new helpers.Vec(x, y);
      currentHue = `hsl(${helpers.randHue()}, 100%, 50%)`;
      particles.push(new Particle(position, currentHue, cellSize, vel));
    }
  };
  Game_Character.prototype.particleFlame2 = function (
    splashingParticleCount = 100
  ) {
    let x = (this._realX - $gameMap.displayX()) * 48 + 20;
    let y = (this._realY - $gameMap.displayY()) * 48 + 30;

    if ($gamePlayer.direction() === 8) y -= 44;

    // if ($gamePlayer.direction() === 2) y += 34;
    if ($gamePlayer.direction() === 4) x -= 14;
    if ($gamePlayer.direction() === 6) x += 14;

    for (let i = 0; i < splashingParticleCount; i++) {
      // let vel = new helpers.Vec(
      //   (Math.random() * 2 * speed - speed) / 2,
      //   0 - Math.random() * 2 * speed
      // );
      // let position = new helpers.Vec(x, y);
      // let life = i;
      // currentHue =
      //   "rgba(" +
      //   (260 - life * 2) +
      //   "," +
      //   (life * 2 + 50) +
      //   "," +
      //   life * 2 +
      //   "," +
      //   ((splashingParticleCount - life) / splashingParticleCount) * 0.4 +
      //   ")";

      var speed = 2;
      currentHue = getColor(i, speed);
      let vel = new helpers.Vec(
        (Math.random() * 2 * speed - speed) / 2,
        (Math.random() * 2 * speed - speed) / 2
      );
      let position = new helpers.Vec(x, y);
      particles.push(new ParticleFlame(position, currentHue, cellSize, vel));
    }

    function getColor(i) {
      let life = i;
      return (
        "rgba(" +
        (260 - life * 2) +
        "," +
        (life * 2 + 50) +
        "," +
        life * 2 +
        "," +
        ((splashingParticleCount - life) / splashingParticleCount) * 0.4 +
        ")"
      );
    }
  };

  class ParticleFlame {
    constructor(pos, color, size) {
      this.pos = pos;
      this.color = color;
      this.size = Math.abs(size / 2);
      this.ttl = 0;
    }
    draw(ctx) {
      let { x, y } = this.pos;
      // ctx.shadowColor = this.color;
      ctx.shadowBlur = 0;
      // ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = this.color;
      ctx.fillRect(x, y, this.size, this.size);
      // ctx.globalCompositeOperation = "source-over";
    }
    update(ctx) {
      this.draw(ctx);
      // this.ttl += 2;
      // if ($gamePlayer.direction() === 8) this.vel.y -= this.gravity;
      // if ($gamePlayer.direction() === 2) this.vel.y += this.gravity;
      // if ($gamePlayer.direction() === 4) this.vel.x -= this.gravity;
      // if ($gamePlayer.direction() === 6) this.vel.x += this.gravity;
    }
  }

  const W = 30;
  const H = 80;
  const S = 3;
  const mtx = new Uint16Array((W + 1) * H);
  Game_Character.prototype.particleFlame = function (
    splashingParticleCount = 5
  ) {
    let event = this;
    flame();
    function flame() {
      let cellSize = 6;
      setTimeout(() => {
        if (!Input.isPressed("f") || $gamePlayer._Yabs.getMagazine(0) == 0) {
          flameParticles.forEach((p, index) => {
            if (p.pos.x > 100 || p.pos.y > 180) flameParticles.splice(index, 1);
            console.log(p, index);
          });
        }
      }, 100);
      setTimeout(() => {
        if (!Input.isPressed("f") || $gamePlayer._Yabs.getMagazine(0) == 0) {
          flameParticles.forEach((p, index) => {
            if (p.pos.x > 50 || p.pos.y > 120) flameParticles.splice(index, 1);
            console.log(p, index);
          });
        }
      }, 200);
      setTimeout(() => {
        if (!Input.isPressed("f") || $gamePlayer._Yabs.getMagazine(0) == 0) {
          flameParticles.length = 0;
        }
      }, 300);

      let xm = 20; // (this._realX - $gameMap.displayX()) * 48 + 20;
      let ym = 74; //(this._realY - $gameMap.displayY()) * 48 + 30;

      for (let cnt = 0; cnt < splashingParticleCount; cnt++) {
        if (xm > 1 && xm < W - 1 && ym > 1 && ym < H - 1) {
          mtx[ym * W + xm] = 8192 * Math.random();
        }
        flameParticles.length = 0;
        for (let i = 1; i < H - 1; i++) {
          for (let j = 1; j < W - 1; j++) {
            const p = i * W + j;
            const ap = p + W - Math.round(Math.random());
            const color = Math.round(
              (mtx[ap] + mtx[ap + 1] + mtx[ap - W] + mtx[ap - W + 1]) *
                0.485 *
                Math.random()
            );
            mtx[p] = color;
            const z = -ym + i;
            let x = (event._realX - $gameMap.displayX()) * 48 - 38 + j * S;
            let y =
              (event._realY - $gameMap.displayY()) * 48 - i * S + 24 + H * S;
            let position = new helpers.Vec(x, y);
            if (color > 30) {
              let r = changeColor(Math.round(color * 4));
              let g = changeColor(Math.round(color * 2));
              let b = changeColor(
                Math.round(
                  color * color * color * 0.000005 + color * 0.001 * z * z * z
                )
              );
              let rgb = `rgb(${r}, ${g},${b})`;

              flameParticles.push(new ParticleFlame(position, rgb, cellSize));
            }
          }
        }
      }
    }

    function changeColor(c) {
      return c > 255 ? 255 : c < 0 ? 0 : c;
    }
  };

  let ZeldaOnMapLoaded = Scene_Map.prototype.onMapLoaded;
  Scene_Map.prototype.onMapLoaded = function () {
    ZeldaOnMapLoaded.call(this);
    this.ZeldaParticles = new ZeldaParticles();
    this.addChild(this.ZeldaParticles);
  };

  function ZeldaParticles() {
    this.initialize.apply(this, arguments);
  }

  ZeldaParticles.prototype = Object.create(Sprite.prototype);
  ZeldaParticles.prototype.constructor = ZeldaParticles;
  ZeldaParticles.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this.x = 0;
    this.y = 0;
    this.bitmap = new Bitmap(Graphics.width, Graphics.height);
    this.update();
  };

  ZeldaParticles.prototype.update = function () {
    this.bitmap.clear();
    this.drawParticles(this.bitmap);
  };

  ZeldaParticles.prototype.drawParticles = function (ctx) {
    if (particles.length > 0) {
      for (let p of particles) {
        p.update(ctx._context);
      }
    }
    if (flameParticles.length > 0) {
      for (let p of flameParticles) {
        p.update(ctx._context);
      }
    }
    helpers.garbageCollector();
  };
})();

//=============================================================================
// Zelda_MedusaMonster.js
//=============================================================================
(function () {
  let widthTentacle = 4,
    radiusBodyMonster = 16,
    colorBody = "hsl(10,30%,5%)",
    // colorBody = "hsl(230,100%,85%)",
    hueTent = 10,
    // hueTent = 190,
    saturTent = 10,
    // saturTent = 100,
    lightTent = 0;
  // lightTent = 25;
  (maxl = 100),
    (minl = 10),
    (nSegments = 3),
    (numt = 550),
    (tent = []),
    (maxTent = 8),
    (target = { x: 0, y: 0 }),
    (last_target = {}),
    (t = 0),
    (q = 10);

  function dist(p1x, p1y, p2x, p2y) {
    return Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2));
  }
  function start(bitmap) {
    let c = bitmap.context,
      w = bitmap.width,
      h = bitmap.height;

    class segment {
      constructor(parent, l, a, first) {
        this.first = first;
        if (first) {
          this.pos = {
            x: parent.x,
            y: parent.y,
          };
        } else {
          this.pos = {
            x: parent.nextPos.x,
            y: parent.nextPos.y,
          };
        }
        this.l = l;
        this.ang = a;
        this.nextPos = {
          x: this.pos.x + this.l * Math.cos(this.ang),
          y: this.pos.y + this.l * Math.sin(this.ang),
        };
      }
      update(t) {
        this.ang = Math.atan2(t.y - this.pos.y, t.x - this.pos.x);
        this.pos.x = t.x + this.l * Math.cos(this.ang - Math.PI);
        this.pos.y = t.y + this.l * Math.sin(this.ang - Math.PI);
        this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
        this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
      }
      fallback(t) {
        this.pos.x = t.x;
        this.pos.y = t.y;
        this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
        this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
      }
      show() {
        c.lineTo(this.nextPos.x, this.nextPos.y);
      }
    }

    class Tentacle {
      constructor(x, y, l, n, a) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.n = n;
        this.t = {};
        this.rand = Math.random();
        this.segments = [new segment(this, this.l / this.n, 0, true)];
        for (let i = 1; i < this.n; i++) {
          this.segments.push(
            new segment(this.segments[i - 1], this.l / this.n, 0, false)
          );
        }
      }
      move(last_target, target) {
        this.angle = Math.atan2(target.y - this.y, target.x - this.x);
        this.dt = dist(last_target.x, last_target.y, target.x, target.y) + 5;
        this.t = {
          x: target.x - 0.8 * this.dt * Math.cos(this.angle),
          y: target.y - 0.8 * this.dt * Math.sin(this.angle),
        };
        if (this.t.x) {
          this.segments[this.n - 1].update(this.t);
        } else {
          this.segments[this.n - 1].update(target);
        }
        for (let i = this.n - 2; i >= 0; i--) {
          this.segments[i].update(this.segments[i + 1].pos);
        }
        if (
          dist(this.x, this.y, target.x, target.y) <=
          this.l + dist(last_target.x, last_target.y, target.x, target.y)
        ) {
          this.segments[0].fallback({ x: this.x, y: this.y });
          for (let i = 1; i < this.n; i++) {
            this.segments[i].fallback(this.segments[i - 1].nextPos);
          }
        }
      }
      show(target) {
        if (dist(this.x, this.y, target.x, target.y) <= this.l) {
          c.globalCompositeOperation = "lighter";
          c.beginPath();
          c.lineTo(this.x, this.y);
          for (let i = 0; i < this.n; i++) {
            this.segments[i].show();
          }
          c.strokeStyle =
            "hsl(" +
            (this.rand * 60 + hueTent) +
            "," +
            saturTent +
            "%," +
            (this.rand * 60 + lightTent) +
            "%)";
          c.lineWidth = this.rand * widthTentacle;
          c.lineCap = "round";
          c.lineJoin = "round";
          c.stroke();
          c.globalCompositeOperation = "source-over";
        }
      }
      showStars(target) {
        // let h = $dataMap.height;
        // let w = $dataMap.width;
        // for (let iX = 0; iX < w; iX++) {
        //   for (let jY = 0; jY < h; jY++) {
        //     if ($gameMap.tileId(iX, jY, 3) === 237) {
        //       c.arc(this.x, this.y, 2 * this.rand + 1, 0, 2 * Math.PI);
        //       c.fillStyle = "black";
        //     }
        //   }
        // }
        c.beginPath();
        if (dist(this.x, this.y, target.x, target.y) <= this.l) {
          //   c.arc(this.x, this.y, 2 * this.rand + 1, 0, 2 * Math.PI);
          //   c.fillStyle = "black";
        } else {
          //   c.arc(this.x, this.y, this.rand * 2, 0, 2 * Math.PI);
          //   c.fillStyle = "darkcyan";
        }
        c.fill();
      }
    }

    for (let i = 0; i < numt; i++) {
      tent.push(
        new Tentacle(
          Math.random() * w,
          Math.random() * h,
          Math.random() * (maxl - minl) + minl,
          nSegments,
          Math.random() * 2 * Math.PI
        )
      );
    }
  }

  let Zelda_MedusaMonsterOnMapLoaded = Scene_Map.prototype.onMapLoaded;
  Scene_Map.prototype.onMapLoaded = function () {
    w = Graphics.width;
    h = Graphics.height;
    Zelda_MedusaMonsterOnMapLoaded.call(this);
    this.Zelda_MedusaMonster_Sprite = new Zelda_MedusaMonster_Sprite();
    this.addChild(this.Zelda_MedusaMonster_Sprite);
  };

  class Zelda_MedusaMonster_Sprite extends Sprite {
    constructor() {
      super();
      this.bitmap = new Bitmap(Graphics.width, Graphics.height);

      start(this.bitmap);

      this.update();
    }

    update() {
      this.bitmap.clear();
      this.draw();
    }

    draw() {
      let playerX = $gameMap.event(1)._realX * 48 + 24;
      let playerY = $gameMap.event(1)._realY * 48 + 24;
      //   target.errx =
      //     playerX +
      //     ((playerY - q) * Math.sqrt(2) * Math.cos(t)) /
      //       (Math.pow(Math.sin(t), 2) + 1) -
      //     target.x;

      //   target.erry =
      //     playerY +
      //     ((playerY - q) * Math.sqrt(2) * Math.cos(t) * Math.sin(t)) /
      //       (Math.pow(Math.sin(t), 2) + 1) -
      //     target.y;

      target.x = playerX;
      target.y = playerY;

      //   t += 0.1;
      //   if (t > 1) t = 0;
      //   console.log(t);

      for (let i = 0; i < numt; i++) {
        tent[i].move(last_target, target);
        tent[i].showStars(target);
      }
      for (let i = 0; i < numt; i++) {
        tent[i].show(target);
      }
      this.bitmap.drawCircle(
        target.x,
        target.y,
        dist(last_target.x, last_target.y, target.x, target.y) +
          radiusBodyMonster,
        colorBody
      );
      this.bitmap.context.globalCompositeOperation = "source-over";
      last_target.x = target.x;
      last_target.y = target.y;
    }
  }
})();

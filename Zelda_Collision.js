//=============================================================================
// Zelda_Collision.js
//=============================================================================
/*:
 
 * @plugindesc Добавление всех клавиш клавиатуры
 * @author Zelda
 * @help Плагин позволяет добавлять всех клавиши клавиатуры для рзличных действий.
 *  
 * @param CommonEvent
 * @desc Общее событие, которое вызовается после смерти игрока
 * @type number
 * @default 1
 * 
 */

(function () {
  class ZeldaCollision {
    constructor(scene) {
      this.commonEvent =
        PluginManager.parameters("Zelda_Collision")["CommonEvent"];
      this.pixelPlugin = "Rosedale_CollisionAlteringPlugin";
      // this.pixelPlugin = "Luna_QMovement";
      this.isPixelMovement = this.isPixelMovement();
      this.check = this.check();
    }

    check() {
      $gameMap.events().map((event) => {
        if (this.isYabs(event)) {
          if (this.checkWithEnemy(event)) return;
          if (this.checkWithPlayer(event)) return;
          this.checkCollisionWithTile(event);
        }
      });
    }

    checkWithPlayer(event) {
      if (this.collided($gamePlayer, event)) {
        if (this.isCollision(event, $gamePlayer)) {
          this.collisionEffect(event, $gamePlayer);
        }
      }
    }
    checkWithEnemy(event1) {
      $gameMap._events.map((event2) => {
        if (this.collided(event1, event2)) {
          if (this.isCollision(event1, event2)) {
            this.collisionEffect(event1, event2);
            return true;
          }
        }
      });
      return false;
    }
    isCollision(attacking, defensive) {
      if (!this.isYabs(defensive)) return false;

      if (attacking._Yabs.isBullet) {
        return this.isCollisionBullet(attacking, defensive);
      }

      if (attacking.isEnemy()) {
        return this.isCollisionBullet(attacking, defensive);
      }
      return false;
    }
    isCollisionBullet(attacking, defensive) {
      if (defensive._Yabs.isStun) {
        this.setRemoveBullet(attacking, defensive._Yabs.typeDef);
        return false;
      }
      if (defensive._Yabs.noCollision) return false;
      if (attacking._Yabs.noCollision) return false;
      if (!attacking._Yabs.attacking) return false;
      if (defensive._Yabs.immortal) return false;

      if (!this.checkTypeCollision(defensive._Yabs, attacking._Yabs))
        return false;
      if (this.isCollisionWithUser(attacking, defensive)) return false;

      if (this.isCollisionWithBullet(defensive)) return false;
      if (defensive._Yabs.isDead) return false;
      if (attacking._Yabs.isDead) return false;
      if (!this.checkPiercing(attacking)) return false;
      return true;
    }
    isCollisionWithUser(attacking, defensive) {
      let user = attacking._Yabs.user;
      let withEvent = user === defensive._eventId;
      let withPlayer = user === 0 && !defensive._Yabs.isEvent;
      return withEvent || withPlayer;
    }
    checkPiercing(attacking) {
      if (attacking._Yabs.piercing === false) return true;
      attacking._Yabs.piercing -= 1;
      if (attacking._Yabs.piercing >= 0) return true;
    }

    checkCollisionWithTile(bullet) {
      if (bullet._Yabs.noCollision) return false;
      if (!bullet._Yabs.attacking) return false;
      if (this.isPixelMovement) {
        this.checkPixelCollisionWithTile(bullet);
      } else {
        this.checkNoPixelCollisionWithTile(bullet);
      }
    }

    checkPixelCollisionWithTile(bullet) {
      let tile;
      let bdTiles = SceneManager._scene._Yabs.tiles;
      let bulletCollider = bullet.getCollider();
      let mapColliders = bullet.getMapColliders();
      let terrainTag = bullet.terrainTag();

      if (
        terrainTag === 1
        //|| (terrainTag === 2 && !$gameMap.isPassable(x, y, direction))
      ) {
        let collidedTile = mapColliders.find((mapCollider) =>
          bdTiles.some((bdTile) => {
            if (mapCollider._tileId == bdTile.id) {
              if (CollisionManager.testCollision(bulletCollider, mapCollider)) {
                tile = bdTile;
                return true;
              }
            }
          })
        );

        if (collidedTile) {
          let x = collidedTile._x / 48;
          let y = collidedTile._y / 48;
          this.tileAction(tile, bullet, x, y);
          return true;
        }
      }
    }

    actionsOnTile(x, y, bullet, z = 3) {
      let tile;
      let tileId = $gameMap.tileId(x, y, z);
      console.log(tile, bullet._Yabs);
      if (tileId === 0) {
        z = 0;
        tileId = $gameMap.autotileType(x, y, z);
        let findedTile = SceneManager._scene._Yabs.tiles?.find(
          (t) => t.id == tileId
        );
        if (!findedTile) {
          z = 1;
          tileId = $gameMap.autotileType(x, y, z);
          findedTile = SceneManager._scene._Yabs.tiles?.find(
            (t) => t.id == tileId
          );
        }
        tile = findedTile;
        console.log(tile, tileId);
      } else {
        tile = SceneManager._scene._Yabs.tiles?.find((t) => t.id == tileId);
      }

      this.tileAction(tile, bullet, x, y);
    }

    tileAction(tile, bullet, x, y, z = 3) {
      if (tile && this.checkTypeCollision(tile, bullet._Yabs)) {
        this.changedTiles(x, y, tile.idNew, z);
        //включениие свича
        this.setSwitch(tile);
        this.setCommonEvent(tile);
        //прибавление единицы к переменной
        this.setVariable(tile);
        // this.createEnemy(tile, x, y);
        //создание события
        if (tile.event) EventFactory.createEvent(tile.event, x, y);
        this.setRemoveBullet(bullet, tile.typeDef);
        // console.log("tile.typeDef.piercing: ", tile.typeDef.piercing);
      }
    }

    checkNoPixelCollisionWithTile(bullet) {
      let terrainTag = $gameMap.terrainTag(x, y);
      if (!terrainTag) return false;
      // let direction = this.getDirection(bullet, "b");
      if (
        terrainTag == 1
        // ||(terrainTag == 2 && !$gameMap.isPassable(x, y, direction))
      ) {
        this.actionsOnTile(x, y, bullet);
        // if (bullet.YABS.piercing != true) bullet.Zelda_RemoveEvent();
        return true;
      }
    }
    changedTiles(x, y, id, z = 3) {
      if (!id) return;
      if (z === 0 || z === 1) {
        this.addChangedTile(x, y, 3, id);
      } else {
        this.addChangedTile(x, y, z, id);
      }
      SceneManager._scene._spriteset.refreshTilemap();
    }
    addChangedTile(x, y, z, id) {
      $gameSystem.changedTiles().addChangedTile($gameMap.mapId(), x, y, z, id);
    }

    checkTypeCollision(defensive, bullet) {
      let typeAtk = bullet.typeAtk;
      let typeDef = defensive.typeDef;
      if (!typeDef || typeDef.length === 0) return true;
      const commons = typeDef.filter((tDef) => {
        return typeAtk.some((tAtk) => tDef.dataId === tAtk.dataId);
      });
      if (!commons.length) return false;
      let commonsZero = commons.filter((t) => t.value !== 0);
      return commonsZero.length !== 0;
    }

    getCoordinate(bullet) {
      if (this.isPixelMovement) {
        let collider = bullet.collider("collision");
        let grid = collider.sectorEdge();
        return [grid.x1, grid.y1];
      } else {
        return [bullet.x, bullet.y];
      }
    }
    isCollisionWithBullet(event) {
      return event._Yabs.isBullet;
    }
    collisionEffect(attacking, defensive) {
      this.setStun(defensive);
      this.setDeparture(attacking, defensive);
      attacking._Yabs.playSe(attacking._Yabs.seCollision);
      defensive._Yabs.playSe(defensive._Yabs.seDamage);
      this.setHp(attacking, defensive);
      this.setRemoveBullet(attacking, defensive._Yabs.typeDef);
      this.setHudEnemy(defensive);
      this.startAnimation(defensive);
    }
    startAnimation(event) {
      switch (event._Yabs.animationDamage) {
        case -1:
          event.particleSplash();
          break;
        case 0:
          event._Yabs.setParamTime("_blendMode", 1, 0, 50);
          break;
        default:
          break;
      }
    }
    setDeparture(attacking, defensive) {
      defensive.Zelda_Depart(attacking.direction());
    }
    setStun(defensive) {
      defensive._Yabs.isStun = true;
      setTimeout(function () {
        defensive._Yabs.isStun = false;
      }, defensive._Yabs.stun);
    }
    setHudEnemy(enemy) {
      if (enemy._Yabs.isDead || enemy._Yabs.hp === 0) return;
      if (enemy._Yabs.isEvent) {
        SceneManager._scene._Yabs.damageEnemy = enemy;
        setTimeout(function () {
          if (!SceneManager._scene._Yabs) return;
          SceneManager._scene._Yabs.damageEnemy = null;
        }, 1700);
      }
    }
    setHp(attacking, defensive) {
      let typeAtk = attacking._Yabs?.typeAtk;
      let typeDef = defensive._Yabs?.typeDef;
      let atk = attacking._Yabs.atk;
      let sumAtk = 0;
      if (typeDef.length > 0) {
        typeDef.filter((tDef) => {
          let intersection = typeAtk.some(
            (tAtk) => tDef.dataId === tAtk.dataId
          );
          if (intersection) sumAtk += atk * tDef.value;
          console.log(tDef, atk, tDef.value, atk * tDef.value);
          return intersection;
        });
      } else {
        sumAtk = attacking._Yabs.atk;
      }
      console.log(sumAtk);

      defensive._Yabs.changeHp(sumAtk);
      this.setDead(defensive);
    }
    setDead(event) {
      if (event._Yabs.hp <= 0) {
        this.setVariable(event._Yabs);
        this.setCommonEvent(event._Yabs);
        // this.setSwitch(event._Yabs);
        if (event._Yabs.isEvent) {
          if (this.setFormEnemy(event)) return;
          event._Yabs.playSe(event._Yabs.seDead);
          event._opacity = 255;
          this.setSwitch(event._Yabs);
        } else {
          $gameTemp.reserveCommonEvent(this.commonEvent);
        }
      }
    }
    setFormEnemy(event) {
      if (event._Yabs.form && event._Yabs.form[event._Yabs.formNext]) {
        let id = event._Yabs.formNext;
        event._Yabs.setSwitch(event._eventId, event._Yabs.form[id][0]);
        event._Yabs.hp = +event._Yabs.form[id][1];
        event._Yabs.mhp = +event._Yabs.form[id][1];
        event._Yabs.formNext = id + 1;
        return true;
      }
      return false;
    }
    setSwitch(event) {
      const sw = event.switch;
      console.log(event);
      if (sw) {
        if (sw === +sw) {
          $gameSwitches.setValue(sw, true);
        } else {
          event.setSwitch(event.eventId, sw);
        }
      } else {
        if (sw === 0) {
          $gameSwitches.setValue(sw, true);
        } else {
          event.setSwitch(event.eventId, "D");
          event.isDead = true;
        }
      }
    }
    setVariable(event) {
      let varId = event.var;
      let variable = $gameVariables.value(varId);
      if (varId) $gameVariables.setValue(varId, variable + 1);
    }
    setCommonEvent(event) {
      if (event.ce) $gameTemp.reserveCommonEvent(event.ce);
    }
    createEnemy(event, x, y) {
      let enemyName = event.enemy;
      if (enemyName) $gameMap.createEvent(enemyName, x, y);
    }
    setRemoveBullet(bullet, typeDef = []) {
      if (!bullet._Yabs.isBullet) return;
      if (bullet._Yabs.piercing && this.isPiercing(bullet, typeDef)) return;
      bullet._Yabs.remove();
    }
    isPiercing(bullet, typeDef) {
      if (typeDef) {
        let typeBullet = bullet._Yabs.piercingAtkType;
        let isPiercing = typeDef.filter((tDef) => {
          return typeBullet.some((tAtk) => tDef.dataId === tAtk);
        }).length;
        return isPiercing;
      }
      return false;
    }
    getDirection(event, d) {
      const DIRECT = {
        rf: { 2: 1, 4: 7, 6: 3, 8: 9 },
        lf: { 2: 3, 4: 1, 6: 9, 8: 7 },
        rb: { 2: 7, 4: 9, 6: 1, 8: 3 },
        lb: { 2: 9, 4: 3, 6: 7, 8: 1 },
        r: { 2: 4, 4: 8, 6: 2, 8: 6 },
        l: { 2: 6, 4: 2, 6: 8, 8: 4 },
        b: { 2: 8, 4: 6, 6: 4, 8: 2 },
      };

      return DIRECT[d][event.direction()];
    }
    collided(event1, event2) {
      if (this.isPixelMovement) {
        return this.pixelCollided("collision", event1, event2);
      } else {
        return event1.isCollidedWithEvent(event2._eventId);
      }
    }
    pixelCollided(type, event1, event2) {
      return (
        event1 &&
        event2 &&
        event2 !== event1 &&
        CollisionManager.testCollision(
          event1.getCollider(),
          event2.getCollider()
        )
      );
    }
    isPixelMovement() {
      return (
        $plugins.findIndex(
          (e) => e.name == this.pixelPlugin && e.status == true
        ) !== -1
      );
    }
    isYabs(event) {
      return "_Yabs" in event;
    }
  }

  var Zelda_SceneUpdate = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    Zelda_SceneUpdate.call(this);
    this.ZeldaCollision = new ZeldaCollision(this);
  };

  class ZeldaCollisionHud {
    constructor(scene) {
      this.damageEnemy = null;
      this.tiles = this.getTiles();
      this.tilesHp = [];
    }
    //0 - ид тайла
    //1 - ид тайла,на который меняется тайл при "смерти" тайла
    //2 - тип оружия, который действует на тайл
    //3 - имя события, появляющееся при смерти тайла
    //4 - свитч который включается при смене на тайл 1
    //5 - переменная которая увеличивается на 1 при смене на тайл 1
    //6 - общее событие
    //7 - "здоровье" тайла (пока нет)
    getTiles() {
      let meta = $dataTilesets[$gameMap._tilesetId].meta?.tiles || "";
      let tilesArr = meta.split(`,`);
      return tilesArr.map((tile) => {
        tile = tile.replace(/\n/g, "").split(" ");
        let paramTile = {
          id: +tile[0]?.trim() || 0,
          idNew: +tile[1]?.trim() || 0,
          typeDef: parseTile(tile[2]?.trim()) || null,
          event: tile[3]?.trim() || null,
          switch: tile[4]?.trim() || 0,
          var: +tile[5]?.trim() || 0,
          ce: +tile[6]?.trim() || 0,
          // hp: +tile[8]?.trim(),
        };
        console.log("paramTile: ", paramTile);
        return paramTile;
      });

      function parseTile(meta) {
        let tiles = [];
        if (meta) {
          meta = meta.split("|");
          meta.forEach((m) => {
            m = m.split("-");
            if (+m[0] !== 0) {
              tiles.push({
                dataId: +m[0],
                value: +m[1] || 1,
              });
            }
          });
        }
        return tiles;
      }
    }
  }

  var ZeldaSceneMapStart = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function () {
    ZeldaSceneMapStart.call(this);
    SceneManager._scene._Yabs = new ZeldaCollisionHud(this);
    console.log(SceneManager._scene._Yabs);
  };
})();

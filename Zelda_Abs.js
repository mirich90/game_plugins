//=============================================================================
// Zelda_Abs.js
//=============================================================================
/*:
 
 * @plugindesc Добавление всех клавиш клавиатуры
 * @author Zelda
 * @help Плагин позволяет добавлять всех клавиши клавиатуры для рзличных действий.
 * 
 * 
 */
(function () {
  class ZeldaAbs {
    constructor() {
      this.isEvent = false;
      this.eventId = null;
      this.isBullet = false;
      this.dataId = null;
      this.data = null;
      this.isDead = false;
      this.attacking = false;
      this.immortal = false;
      this.noCollision = false;
      this.isStun = false;
      this.noDeparture = false;
      this.intervalShot = false;
      this.typeCost = null;
      this.items = {};
      this.intervalItem = false;
      this.reload = [1, 1, 1, 1, 1];
      this.sumCost = 1;
      this.atkType = null;
      this.noAtkType = null;
      this.piercingAtkType = null;
      this.user = null;
      this.noUser = false;
      this.target = null;
      // пока не используются в конструкторе но есть в коде
      // this.se = null;
      // this.seNo = null;
      // this.char = null;
      this.piercing = false;
      this.seCollision = null;
      this.seDamage = null;
      this.seDead = null;
      this.type = null;
      this.typeAtk = [];
      this.typeDef = [];
      this.stun = 500;
      this.form = null;
      this.formNext = 0;
      this.ce = null;
      this.var = null;
      this.switch = null;
      this.hp = null;
      this.mp = null;
      this.mhp = null;
      this.mmp = null;
      this.atk = null;
      this.def = null;
      this.mat = null;
      this.mdf = null;
      this.agi = null;
      this.luk = null;
      this.equips = {};
      this.weapons = {};
      this.animationDamage = 0; // -1-particles, 0-blend, 1-1000-анимация
      // console.log(this.data);
      // console.log(event);
    }

    event() {
      return this.isEvent ? $gameMap.event(this.eventId) : $gamePlayer;
    }
    init(event, isBullet = false, weaponId = 0) {
      // console.log(event._eventId);
      this.isEvent = "_eventId" in event;
      this.weaponId = weaponId;
      this.eventId = this.isEvent ? event._eventId : 0;
      this.isBullet = isBullet;
      this.dataId = this.getDataId(event);
      this.data = this.getData();
      this.isDead = false;
      this.intervalShot = false;
      this.typeCost = null;
      this.items = this.getEquipItems();
      this.intervalItem = false;
      this.reload = [1, 1, 1, 1, 1];
      this.sumCost = 1;
      this.atkType = null;
      this.noAtkType = null;
      this.piercingAtkType = null;
      this.user = null;
      this.noUser = false;
      this.target = null;
      // пока не используются в конструкторе но есть в коде
      // this.se = null;
      // this.seNo = null;
      // this.char = null;
      this.piercing = false;
      this.seCollision = null;
      this.seDamage = this.getMeta("seDamage") || null;
      this.seDead = this.getMeta("seDead") || null;
      this.attacking = false;
      this.immortal = this.getMeta("immortal") || false;
      this.noCollision = this.getMeta("noCollision") || false;
      this.isStun = this.getMeta("isStun") || false;
      this.noDeparture = this.getMeta("noDeparture") || false;
      this.type = this.getMeta("type") || null;
      this.typeAtk = this.getTraits(31) || [];
      this.typeDef = this.getTraits(11) || [];
      this.stun = +this.getMeta("stun") || 500;
      this.ce = +this.getMeta("ce") || null;
      this.form =
        this.getMeta("form")
          ?.split(",")
          ?.map((e) => e.split("-")) || null;
      this.var = +this.getMeta("var") || null;
      this.switch = this.getMeta("switch") || null;
      this.hp = this.getParam("hp", 0);
      this.mp = this.getParam("mp", 1);
      this.mhp = this.getParam("mhp", 0);
      this.mmp = this.getParam("mmp", 1);
      this.atk = this.getParam("atk", 2);
      this.def = this.getParam("def", 3);
      this.mat = this.getParam("mat", 4);
      this.mdf = this.getParam("mdf", 5);
      this.agi = this.getParam("agi", 6);
      this.luk = this.getParam("luk", 7);
      this.equips = this.getEquips();
      this.weapons = this.initWeapons() || {};
      this.animationDamage = +this.getMeta("animationDamage") || 0;
    }

    setParamBullet(bullet, equip) {
      bullet.setDirection(this.event().direction());
      bullet._Yabs.init(bullet, true, equip.id);
      bullet._Yabs.attacking = equip.meta.attacking || true;
      bullet._Yabs.noCollision = equip.meta.noCollision || false;
      bullet._Yabs.noUser = equip.meta.noUser || false;
      bullet._Yabs.typeCost = equip.meta.typeCost || null;
      bullet._Yabs.item = +equip.meta.item || null;
      bullet._Yabs.magazine = +equip.meta.magazine || null;
      bullet._Yabs.seCollision = equip.meta.seCollision || null;
      bullet._Yabs.piercing = equip.meta.piercing || false;
      bullet._Yabs.sumCost = +equip.meta.sumCost || 1;

      bullet._Yabs.atk = equip.params[2] || 0;
      bullet._Yabs.typeAtk = this.getTraits(31, equip) || [];
      bullet._Yabs.atkType = equip.meta.atkType?.trim().split(",") || null;
      bullet._Yabs.noAtkType = equip.meta.noAtkType?.trim().split(",") || null;
      bullet._Yabs.piercingAtkType = this.getPiercingAtkType(equip) || [];

      this.getUserBullet(bullet);
    }

    getPiercingAtkType(equip) {
      let meta = equip.meta.piercingAtkType?.trim();
      if (meta) {
        let piercingAtkTypes = meta.split(",");
        piercingAtkTypes = piercingAtkTypes.map((p) => +p);
        return piercingAtkTypes;
      }
      return [];
    }
    changeHp(v) {
      let hp = this.hp;
      this.hp = hp > v ? hp - v : 0;
      if (!this.isEvent) $gameParty.members()[0].setHp(this.hp);
    }

    getDataId(event) {
      return this.isEvent
        ? this.getDataIdEnemy(event)
        : $gameParty.members()[0].actorId();
    }

    getData() {
      return this.isEvent ? $dataEnemies[this.dataId] : $gameParty.members()[0];
    }

    getTraits(id, data = null) {
      if (!data) {
        data = this.isEvent ? this.data : $dataActors[this.dataId];
      }
      return data.traits.filter((e) => e.code === id);
    }
    setTraits(data = null, traits = [{ code: 11, dataId: 1, value: 1 }]) {
      if (!data) {
        data = this.isEvent ? this.data : $dataActors[this.dataId];
      }
      return (data.traits = traits);
    }
    getMeta(metaName) {
      if (this.isEvent) {
        return this.data.meta?.[metaName];
      }
      return this.data.actor().meta?.[metaName];
    }

    getParam(prmPlayer, prmEnemy) {
      if (this.isEvent) {
        let data = this.data;
        // let data = this.isBullet && this.weaponId ? $dataWeapons[this.weaponId] : this.data;
        return data.params[prmEnemy];
      }
      return this.data[prmPlayer];
    }
    initWeapons() {
      if (this.isEvent) return;
      let actorid = this.dataId;
      let id = this.equips[actorid][0]?.id;
      if (!id) return;
      let weapons = {
        [actorid]: {
          [id]: 0,
        },
      };
      return weapons;
    }
    getEquipItems() {
      if (this.isEvent) return {};
      let id = this.getDataId();
      if (!this.items[id]) {
        this.items[id] = { 0: null };
        return this.items;
      }
    }
    getEquipItem(slotId = 1) {
      if (this.items) {
        const itemsActor = this.items[this.dataId];
        if (itemsActor) {
          return itemsActor[slotId];
        }
        return null;
      }
    }
    updateWeapons(slotId = 0) {
      this.updateEquips();
      let actorId = this.dataId;
      let id = this.equips[actorId][slotId]?.id;
      if (id) {
        console.log(this.weapons[actorId]);
        if (this.isWeaponActorInit(actorId)) {
          this.weapons[actorId] = { [id]: 0 };
        } else if (this.isWeaponInit(actorId, id)) {
          this.weapons[actorId][id] = 0;
        }
      }
    }
    isWeaponInit(actorId, id) {
      console.log(this.weapons[actorId]);
      return this.weapons[actorId][id] === undefined;
    }
    isWeaponActorInit(actorId) {
      return this.weapons[actorId] === undefined;
    }
    getEquips() {
      return this.isEvent ? this.getEquipsEvent() : this.getEquipsPlayer();
    }
    getEquipsPlayer() {
      let id = this.getDataId();
      this.equips[id] = this.getData().equips();
      return this.equips;
    }
    getEquipsEvent() {
      let metaEquips = this.getData().meta.equips;
      if (metaEquips) {
        let equips = metaEquips.split(",");
        equips = equips.map((e) => $dataWeapons[e]);
        equips = { [this.dataId]: equips };

        return equips;
      }
      return null;
    }
    updateEquips() {
      if (!this.isEvent) {
        this.dataId = this.getDataId();
        this.data = this.getData();
      }
      this.equips = this.getEquips();
    }

    getDataIdEnemy(event) {
      let note = event.event().note;
      return +note.split("_")[1];
    }
    useItem(slotId = 1) {
      let equipItems = this.items[this.dataId];
      if (!equipItems) return;
      if (!equipItems[slotId]) return;

      const id = equipItems[slotId].id;
      const item = $dataItems[id];

      if (!this.checkIntervalItem(item)) return;

      if ($gameParty.numItems(item)) {
        const player = $gameParty.leader();
        const action = new Game_Action(player);

        player.useItem(item);
        action.setItemObject(item);
        this.playAnimation(item.animationId);
        action.apply(player);

        if (!$gameParty.numItems(item)) equipItems[slotId] = null;
      }
    }
    checkIntervalItem(item) {
      if (this.intervalItem) {
        return false;
      } else {
        this.setSpeedItem(item.meta.speedItem?.trim());
        return true;
      }
    }
    setSpeedItem(speed = 500) {
      this.intervalItem = true;
      setTimeout(() => {
        this.intervalItem = false;
      }, speed);
    }

    use(slotId = 0) {
      this.updateEquips();
      let equip = this.equips[this.dataId][slotId];
      if (!equip) return;
      if (this.isIntervalShot(equip, slotId)) return;
      if (!this.checkCost(equip, slotId)) {
        this.playSe(equip.meta?.seNo);
        return;
      }
      this.createBullets(equip);
    }

    setTarget(id) {
      this.target = id;
      if (!this.isEvent) {
        $gameMap.event(id).forceShowGlowEffect(1);
        // $gameMap.event(this.target)._opacity = 170;
      }
    }

    changeTarget() {
      let currentTarget = this.target;
      let enemies = $gameMap
        .events()
        .filter((e) => e.isEnemy() && !e._Yabs.isDead);

      if (enemies.length === 0) return;

      enemies.map((e) => e.hideForcedGlowEffect());

      if (currentTarget) {
        let currentId = enemies.findIndex((e) => e._eventId === currentTarget);
        if (currentId === enemies.length - 1) {
          this.setTarget(enemies[0]._eventId);
        } else {
          this.setTarget(enemies[currentId + 1]._eventId);
        }
      } else {
        this.setTarget(enemies[0]._eventId);
      }
    }

    createBullets(equip) {
      let x = this.event()._x;
      let y = this.event()._y;
      if (!equip.meta.event) {
        console.log(
          `Добавьте meta-тег <event:ИмяСобытия> в описание брони с id=${equip.id} в базе данных`
        );
        return;
      }
      let bulletsName = equip.meta.event.split(",");
      bulletsName.forEach((bulletName) => {
        let eventId = EventFactory.createEvent(bulletName, x, y);
        let event = $gameMap.event(eventId);

        event._Yabs = new ZeldaAbs();
        this.setParamBullet(event, equip);
      });
      this.playSe(equip.meta?.se);
      this.playAnimation(equip.meta?.animation);
      this.playAnimationChar(equip.meta);
    }

    checkCost(equip, slotId) {
      if (this.isEvent) return true;
      let typeCost = equip.meta.typeCost;
      if (typeCost === "mp") {
        return this.setCostMp(equip.meta);
      } else if (typeCost === "item") {
        return this.setCostItem(equip, slotId);
      }
      return true;
    }

    setCostItem(equip, slotId) {
      let sumCost = +equip.meta.sumCost || 1;
      let magazine = this.getMagazine(slotId);
      let item = $dataItems[equip.meta.item];
      let weapon = this.weapons[this.dataId][equip.id];
      console.log(sumCost, magazine, item, weapon);
      if (magazine >= sumCost) {
        this.weapons[this.dataId][equip.id] = weapon - sumCost;
        return true;
      }
      const sumItem = $gameParty.numItems(item);
      if (sumItem !== 0) {
        // if (this._Yabs.isIntervalShot(equip, slotId)) return false;
        const maxMagazine = +equip.meta.magazine;
        if (isNaN(maxMagazine)) {
          $gameParty.gainItem(item, -sumCost);
          return true;
        } else {
          // reload
          if (sumItem >= maxMagazine) {
            $gameParty.gainItem(item, -maxMagazine);
            this.weapons[this.dataId][equip.id] = maxMagazine;
          } else {
            let cost = sumItem % maxMagazine;
            $gameParty.gainItem(item, -cost);
            this.weapons[this.dataId][equip.id] = cost;
          }
          this.playSe(equip.meta?.seReload);
        }
      }
      return false;
    }
    setCostMp(equip) {
      let sumCost = +equip.sumCost;
      if ($gameParty.leader().mp >= sumCost) {
        let mp = $gameParty.leader().mp - sumCost;
        $gameParty.leader().setMp(mp);
        return true;
      }
      return false;
    }

    getUserBullet(bullet) {
      if (this.isBullet) {
        if (!this.noUser) bullet._Yabs.user = this.user;
      } else {
        bullet._Yabs.user = this.isEvent ? this.event()._eventId : 0;
      }
    }

    isIntervalShot(equip, slotId) {
      if (this.isEvent) return false;
      if (this.intervalShot) {
        return true;
      } else {
        // if (!this.checkCost(equip, slotId)) return;
        this.setIntervalShot(equip, slotId);
        return false;
      }
    }
    setIntervalShot(equip, slotId) {
      let speed;
      this.intervalShot = true;
      if (
        this.weapons[this.dataId][equip.id] ||
        equip.meta.typeCost !== "item"
      ) {
        speed = +equip.meta.speed || 500;
      } else {
        speed = +equip.meta.speedReload || 1000;
      }

      this.setReloads(speed, slotId);
      setTimeout(() => {
        this.intervalShot = false;
      }, speed);
    }
    setReloads(reload, slotId = 0) {
      setTimeout(() => {
        this.reload[slotId] = 0.05;
      }, reload * 0.05);
      setTimeout(() => {
        this.reload[slotId] = 0.1;
      }, reload * 0.1);
      setTimeout(() => {
        this.reload[slotId] = 0.15;
      }, reload * 0.15);
      setTimeout(() => {
        this.reload[slotId] = 0.2;
      }, reload * 0.2);
      setTimeout(() => {
        this.reload[slotId] = 0.25;
      }, reload * 0.25);
      setTimeout(() => {
        this.reload[slotId] = 0.3;
      }, reload * 0.3);
      setTimeout(() => {
        this.reload[slotId] = 0.35;
      }, reload * 0.35);
      setTimeout(() => {
        this.reload[slotId] = 0.4;
      }, reload * 0.4);
      setTimeout(() => {
        this.reload[slotId] = 0.45;
      }, reload * 0.45);
      setTimeout(() => {
        this.reload[slotId] = 0.5;
      }, reload * 0.5);
      setTimeout(() => {
        this.reload[slotId] = 0.55;
      }, reload * 0.55);
      setTimeout(() => {
        this.reload[slotId] = 0.6;
      }, reload * 0.6);
      setTimeout(() => {
        this.reload[slotId] = 0.65;
      }, reload * 0.65);
      setTimeout(() => {
        this.reload[slotId] = 0.7;
      }, reload * 0.7);
      setTimeout(() => {
        this.reload[slotId] = 0.75;
      }, reload * 0.75);
      setTimeout(() => {
        this.reload[slotId] = 0.8;
      }, reload * 0.8);
      setTimeout(() => {
        this.reload[slotId] = 0.85;
      }, reload * 0.85);
      setTimeout(() => {
        this.reload[slotId] = 0.9;
      }, reload * 0.9);
      setTimeout(() => {
        this.reload[slotId] = 0.95;
      }, reload * 0.95);
      setTimeout(() => {
        this.reload[slotId] = 1;
      }, reload * 1);
    }

    getMagazine(slotId = 0) {
      this.updateEquips();
      const equip = this.equips[this.dataId][slotId];
      if (!equip) return "";
      const typeCost = equip.meta?.typeCost;
      if (typeCost !== "item") return "";
      const magazine = equip.meta?.magazine;
      if (!magazine) return "";
      // if (equip.magazine === null) {
      // return 0;
      // }
      let weapons = this.weapons[this.dataId];
      if (!weapons) return "";
      return weapons[equip.id];
    }
    getItem(slotId = 0) {
      this.updateEquips();
      const equip = this.equips[this.dataId][slotId];
      if (!equip) return "";

      const typeCost = equip.meta?.typeCost;
      if (!typeCost) return "∞";
      if (typeCost === "mp") return $gameParty.leader().mp;
      if (typeCost !== "item") return typeCost;
      const item = equip.meta?.item;
      return $gameParty.numItems($dataItems[item]);
    }

    getUserEvent() {
      if (this.user === null) return null;
      return this.user === 0 ? $gamePlayer : $gameMap.event(this.user);
    }

    playAnimation(id) {
      const direction =
        $gamePlayer._direction == 6 || $gamePlayer._direction == 2;
      $gameTemp.requestAnimation([this.event()], id, direction);
      return this;
    }

    playAnimationChar(equip) {
      const charsetNew = equip?.char;
      if (!charsetNew) return;
      let indexNew = 0;
      let charset = this.event()._characterName.split("_")[0];
      let index = this.event()._characterIndex;
      let time = equip?.timeChar ? equip.timeChar.split(",") : [50, 150, 250];
      this.event().Zelda_ABS_PlayAnimationChar(
        indexNew,
        charsetNew,
        charset,
        index,
        time
      );
    }

    playSe(se) {
      if (se)
        AudioManager.playSe({ name: se, volume: 100, pitch: 100, pan: 0 });
      // Play SE beep.ogg with 5% volume, 100% pitch, panned 50% left
      // AudioManager.playSe({ name: "beep", volume: 5, pitch: 100, pan: -50 })
    }
    directionFix() {
      this.event()._directionFix = true;
    }
    directionNoFix() {
      this.event()._directionFix = false;
    }
    switchDirectionFix() {
      this.event()._directionFix = !this._directionFix;
    }
    remove() {
      EventFactory.removeEvent(this.eventId);
    }
    setSwitch(eventId, sw = "D", v = true) {
      $gameSelfSwitches.setValue([$gameMap.mapId(), eventId, sw], v);
    }
    // изменение параметра события на определенное время
    // param = параметр события (например, _opacity)
    // v1 = значение параметра, которое станет мгновенно
    // v2 = значения параметра, которое будет равно через заданное время time
    // time = время в милисекундах
    setParamTime(param, v1, v2, time) {
      let event = this.event();
      if (!event) return;
      event[param] = v1;

      if (v2 === "delete") {
        setTimeout(() => {
          delete event[param];
        }, time);
      } else {
        setTimeout(() => {
          event[param] = v2;
        }, time);
      }
    }
  }

  let ZeldaGameEvent = Game_Event.prototype.initialize;
  Game_Event.prototype.initialize = function (mapId, eventId) {
    ZeldaGameEvent.call(this, mapId, eventId);
    if (this.event().note[0] === "_") {
      this._Yabs = new ZeldaAbs();
      this._Yabs.init(this);
    }
  };

  let ZeldaGamePlayer = Game_Player.prototype.locate;
  Game_Player.prototype.locate = function (x, y) {
    ZeldaGamePlayer.call(this, x, y);

    if (!Game_Player.prototype._Yabs) {
      Game_Player.prototype._Yabs = new ZeldaAbs();
      this._Yabs.init(this);
    }
  };
  let Zelda_GameActor_changeEquip = Game_Actor.prototype.changeEquip;
  Game_Actor.prototype.changeEquip = function () {
    Zelda_GameActor_changeEquip.apply(this, arguments);
    $gamePlayer._Yabs.updateWeapons(arguments[0]);
  };

  Game_Map.prototype.createEvent = function (nameEvent, x, y) {
    EventFactory.createEvent(nameEvent, x, y);
    this.setupEvents();
  };
})();

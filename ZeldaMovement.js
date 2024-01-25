// задание направления событию
Game_Character.prototype.setTypeDef = function (traits = [[1, 1]]) {
  this._Yabs.typeDef = traits.map(
    (trait) => (trait = { code: 11, dataId: trait[0], value: trait[1] })
  );
};
Game_Character.prototype.Zelda_SetDirection = function (d, direction = null) {
  direction = direction || this.direction();

  const DIRECT = {
    rf: { 2: 1, 4: 7, 6: 3, 8: 9 },
    lf: { 2: 3, 4: 1, 6: 9, 8: 7 },
    rb: { 2: 7, 4: 9, 6: 1, 8: 3 },
    lb: { 2: 9, 4: 3, 6: 7, 8: 1 },
    r: { 2: 4, 4: 8, 6: 2, 8: 6 },
    l: { 2: 6, 4: 2, 6: 8, 8: 4 },
    b: { 2: 8, 4: 6, 6: 4, 8: 2 },
  };
  if (["r", "l", "b"].contains(d)) {
    this.setDirection(DIRECT[d][direction]);
  } else {
    this.diagonalDirect = DIRECT[d][direction];
  }
};

// изменение "движение к персонажу" с поддержкой диагонали
var ZeldaMoveForward = Game_Character.prototype.moveForward;
Game_Character.prototype.moveForward = function () {
  switch (this.diagonalDirect) {
    case 1:
      this.moveDiagonally(4, 2);
      break;
    case 3:
      this.moveDiagonally(6, 2);
      break;
    case 7:
      this.moveDiagonally(4, 8);
      break;
    case 9:
      this.moveDiagonally(6, 8);
      break;
    default:
      ZeldaMoveForward.call(this);
      break;
  }
};

//движение события к герою/от героя с добавлением диагонального
var ZeldaMoveTowardCharacter = Game_Character.prototype.moveTowardCharacter;
Game_Character.prototype.moveTowardCharacter = function (character) {
  var sx = this.deltaXFrom(character.x);
  var sy = this.deltaYFrom(character.y);

  if (sx && sy) {
    sx > 0 && sy > 0
      ? this.moveDiagonally(4, 8)
      : sx > 0 && sy < 0
      ? this.moveDiagonally(4, 2)
      : sx < 0 && sy > 0
      ? this.moveDiagonally(6, 8)
      : this.moveDiagonally(6, 2);
  } else if (Math.abs(sx) > Math.abs(sy)) {
    this.moveStraight(sx > 0 ? 4 : 6);
    if (!this.isMovementSucceeded() && sy) {
      this.moveStraight(sy > 0 ? 8 : 2);
    }
  } else if (sy) {
    this.moveStraight(sy > 0 ? 8 : 2);
    if (!this.isMovementSucceeded() && sx) {
      this.moveStraight(sx > 0 ? 4 : 6);
    }
  }
};

// Приближение события к герою
Game_Character.prototype.movePlayer = function () {
  const isPixel = SceneManager._scene.ZeldaCollision.isPixelMovement;
  if (isPixel) {
    this.movePlayerPixel();
  } else {
    if (this._x == $gamePlayer.x && this._y == $gamePlayer.y) {
      EventFactory.removeEvent(this._eventId);
      // $gamePlayer.YABS.intervalShot = false;
    } else {
      this.moveTowardCharacter($gamePlayer);
      this._moveRoute.list.push({
        code: 45,
        parameters: ["this.movePlayer()"],
      });
    }
  }
};

Game_Character.prototype.isEnemy = function () {
  if ("_Yabs" in this && this._Yabs.isEvent) {
    return this.event().note[0] === "_";
  }
  return false;
};
Game_Character.prototype.enableCollision = function () {
  this._Yabs.noCollision = false;
  return this;
};

Game_Character.prototype.disableCollision = function () {
  this._Yabs.noCollision = true;
  return this;
};
Game_Character.prototype.disableAttacking = function () {
  this._Yabs.attacking = false;
  return this;
};
Game_Character.prototype.enableAttacking = function () {
  this._Yabs.attacking = true;
  return this;
};
Game_Character.prototype.disableImmortal = function () {
  this._Yabs.immortal = false;
  return this;
};
Game_Character.prototype.enableImmortal = function () {
  this._Yabs.immortal = true;
  return this;
};

Game_Character.prototype.remove = function () {
  EventFactory.removeEvent(this._eventId);
};

Game_Character.prototype.movePlayerPixel = function () {
  if (
    CollisionManager.testCollision(
      this.getCollider(),
      $gamePlayer.getCollider()
    )
  ) {
    EventFactory.removeEvent(this._eventId);
  } else {
    this.setDestination($gamePlayer.position);
    this._moveRoute.list.push({
      code: 45,
      parameters: ["this.movePlayer()"],
    });
  }
};

// прыжок на месте
Game_Character.prototype.Zelda_Depart = function (direction) {
  if (this._Yabs.noDeparture) return;

  // let direction = this.YABS.departure;
  // let direction = this.direction();
  let directionFix = this._directionFix;

  // this.setDirection(direction);
  this.Zelda_SetDirection("b", direction);
  this._directionFix = true;

  if (this.jumpCanPass(this.x, this.y, direction)) {
    switch (direction) {
      case 8:
        this.jump(0, -1);
        break;
      case 6:
        this.jump(1, 0);
        break;
      case 4:
        this.jump(-1, 0);
        break;
      case 2:
        this.jump(0, 1);
        break;
      default:
        this.jump(0, 0);
        break;
    }
  } else this.jump(0, 0);

  this._directionFix = directionFix;
};

Game_CharacterBase.prototype.goToEvent = function (id = 0) {
  let player = id ? $gameMap.event(id) : $gamePlayer;
  if (player) {
    this.setDestination(player.position);
  }
};

Game_CharacterBase.prototype.animation = function (id) {
  $gameTemp.requestAnimation([this], id);
};

Game_CharacterBase.prototype.goToTarget = function () {
  let user = this._Yabs.getUserEvent() || this;

  let target = user._Yabs.target;
  let event = target === 0 ? $gamePlayer : $gameMap.event(target);

  if (target === null || event._Yabs.isDead) {
    user._Yabs.changeTarget();
    event = $gameMap.event(user._Yabs.target);
  }
  this.setDestination(event.position);
};

Game_CharacterBase.prototype.goToXY = function (x, y) {
  this.setDestination(new Vector2(x, y));
};

Game_CharacterBase.prototype.goToOtherEventXY = function (
  id = 0,
  x = 1,
  y = 1
) {
  let player = id ? $gameMap.event(id) : $gamePlayer;
  let pos = player.position;
  this.setDestination(new Vector2(pos.x + x, pos.y + y));
};

Game_CharacterBase.prototype.goToEventXY = function (x, y) {
  let pos = this.position;
  this.setDestination(new Vector2(pos.x + x, pos.y + y));
};

Game_CharacterBase.prototype.goToEventDirXY = function (
  distance = 1,
  side = 0
) {
  let X = {
    2: -side,
    4: -distance,
    6: distance,
    8: side,
  };

  let Y = {
    2: distance,
    4: -side,
    6: side,
    8: -distance,
  };

  let dir = this.direction();
  this.goToEventXY(X[dir], Y[dir]);
};

// Game_CharacterBase.prototype.goToAngle = function (angle = 180) {
//   let vector2 = new Vector2();
//   vector2.angle = angle;
//   console.log(vector2);
//   this.setDestination(vector2);
// };

Game_CharacterBase.prototype.jumpCanPass = function (x, y, d) {
  var x2 = $gameMap.roundXWithDirection(x, d);
  var y2 = $gameMap.roundYWithDirection(y, d);

  if (d === 2) {
    x3 = x;
    y3 = y + 1;
  } else if (d === 4) {
    x3 = x - 1;
    y3 = y;
  } else if (d === 6) {
    x3 = x + 1;
    y3 = y;
  } else {
    x3 = x;
    y3 = y - 1;
  }

  if (!$gameMap.isValid(x2, y2)) return false;
  if (this.isThrough() || this.isDebugThrough()) return true;
  if (!this.isMapPassable(x, y, d)) return false;
  if (!$gameMap.isPassable(x3, y3)) return false;
  if (this.isCollidedWithCharacters(x2, y2)) return false;

  return true;
};

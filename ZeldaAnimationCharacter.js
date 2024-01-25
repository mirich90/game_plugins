Game_Character.prototype.Zelda_RequestAnimation = function (id) {
  const direction = $gamePlayer._direction == 6 || $gamePlayer._direction == 2;
  $gameTemp.requestAnimation([this], id, direction);
  return this;
};

Game_Character.prototype.Zelda_ABS_PlayAnimationShot = function (equip) {
  this.Zelda_RequestAnimation(
    +equip.meta.animation?.trim()
  ).Zelda_ABS_PlayAnimationCharShot(equip);
  return this;
};

Game_Character.prototype.Zelda_ABS_PlayAnimationChar = async function (
  indexNew,
  charsetNew,
  charset,
  index,
  time
) {
  await this.Zelda_ABS_SetFrames(charset + charsetNew, indexNew, 1, 0);
  await this.Zelda_ABS_SetFrames(charset + charsetNew, indexNew, 2, time[0]);
  await this.Zelda_ABS_SetFrames(charset + charsetNew, indexNew, 3, time[1]);

  //первоначальная поза
  await this.Zelda_ABS_SetDefaultCharacter(charset, index, time[2]);
  return this;
};

Game_Character.prototype.Zelda_ABS_IsPlayAnimationCharShot = function (
  arrEvent
) {
  return (
    arrEvent?.filter((e) => +e == this._eventId || (!this.isEvent() && +e == 0))
      .length || false
  );
};

Game_Character.prototype.Zelda_ABS_PlayAnimationCharShot = function (equip) {
  let arrEvent = equip.meta.eventPoseShot?.split(",");
  if (this.Zelda_ABS_IsPlayAnimationCharShot(arrEvent)) {
    let indexNew = equip.meta.indexPoseShot || 1;
    let charsetNew = equip.meta.namePoseShot;

    if (indexNew && charsetNew) {
      let charset = this._characterName.split("_")[0];
      let index = this._characterIndex;
      let time = equip.meta.timePoseShot
        ? equip.meta.timePoseShot.split(",")
        : [50, 150, 250];
      this.Zelda_ABS_PlayAnimationChar(
        indexNew,
        charsetNew,
        charset,
        index,
        time
      );
    }
  }
  return this;
};
Game_Character.prototype.Zelda_ABS_PlayAnimationCharColl = function () {
  let indexNew = this.YABS.indexPoseColl || 1;
  let charsetNew = this.YABS.namePoseColl;

  if (indexNew && charsetNew) {
    let charset = this._characterName.split("_")[0];
    let index = this._characterIndex;
    let time = this.YABS.timePoseColl
      ? this.YABS.timePoseColl.split(",")
      : [50, 150, 250];
    console.log(indexNew, charsetNew, charset, index, time);
    this.Zelda_ABS_PlayAnimationChar(
      indexNew,
      charsetNew,
      charset,
      index,
      time
    );
  }

  return this;
};

Game_Character.prototype.Zelda_ABS_SetFrames = async function (
  charset,
  indexNew,
  frame,
  time
) {
  setTimeout(() => {
    this.Zelda_ABS_SetFrame(charset, indexNew, frame, this._direction);
  }, time);
};

Game_Character.prototype.Zelda_ABS_SetDefaultCharacter = async function (
  charset,
  index,
  time
) {
  setTimeout(() => {
    this.setImage(charset, index);
    this.frameStop = false;
  }, time);
};

// показ графики
Game_Character.prototype.Zelda_ABS_SetFrame = function (
  name,
  index,
  frame,
  direction
) {
  this.frameStop = true;
  this._characterName = name !== 0 ? name : this._characterName;
  this._characterIndex = index - 1;
  this._pattern = frame - 1;
  this._direction = direction;
};

// MOD
var ABSZelda_CharacterBase_updatePattern =
  Game_CharacterBase.prototype.updatePattern;
Game_CharacterBase.prototype.updatePattern = function () {
  if (this.frameStop) return;
  ABSZelda_CharacterBase_updatePattern.call(this);
};

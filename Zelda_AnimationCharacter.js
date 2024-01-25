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

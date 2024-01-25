(function () {
  var _Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function () {
    _Game_Temp_initialize.apply(this, arguments);
    this._isPlaytest = 1;
  };
})();

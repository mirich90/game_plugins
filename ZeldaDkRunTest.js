/*
Title: ZeldaDkRunTest
Author: Mirich, DK

/*:ru
* @plugindesc ZeldaDkRunTest (запуск игры в тестовой версии)
* @author Mirich
* @help

 ### Информация о плагине ###
 Название: ZeldaDkRunTest (запуск игры в браузере в тестовой версии)
 Автор: Mirich, DK
 
 ### Лицензии и правила использования плагина ###

 Вы можете:
 -Бесплатно использовать данный плагин в некоммерческих и коммерческих проектах
 -Переводить плагин на другие языки 
 -Изменять код плагина, но Вы обязаны указать ссылку на оригинальный плагин

 Вы не можете:
 -Убирать или изменять любую информацию о плагине (название, авторство)

 */

(function () {
  var _Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function () {
    _Game_Temp_initialize.apply(this, arguments);
    this._isPlaytest = 1;
  };
})();

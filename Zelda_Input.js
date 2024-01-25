//=============================================================================
// Zelda_Input.js
//=============================================================================
/*:
 
 * @plugindesc Добавление всех клавиш клавиатуры
 * @author Zelda
 * @help Плагин позволяет добавлять всех клавиши клавиатуры для рзличных действий.
 * 
 * 
 * Простенький плагин, позволяющий привязать клавиши к определенным действиям:
 * - вызов общего события
 * - увеличение/уменьшение переменной
 * - включение/выключение переключателя
 * - вызов какого-либо скрипта
 *
 * Значение параметров более подробно:
 * 
 * Кнопка клавиатуры
 * - именования клавиш можно посмотреть в данном скрипте со 110-ой строчки
 * 
 * Тип нажатия клавиши:
 * - isTriggered - однократное нажатие,
 * - isPressed - зажатие клавиши,
 * - isNoPressed - клавиш не зажата,
 * - isLongPressed - долгое нажатие)
 * 
 * Тип действия
 * - Common Event - вызов общего события,
 * - Variable+ - увеличение переменной на 1, 
 * - Variable- - уменьшение переменной на 1,
 * - Switch - смена переключателя на противоположный,
 * - Switch+ - включение переключателя,
 * - Switch- - выключение переключателя,
 * - Script - ввод пользовательского скрипта
 * 
 * Значение:
 * - номер общего события, если параметр action = Common Event
 * - номер переменной, если параметр action = Variable
 * - номер переключателя, если параметр action = Switch
 * - скрипт, если параметр action = Script
 * 
 * Спасибо ДК, Dmy, Caveman
 * 
 * Условия использования:
 * 1. Плагин полностью свободен для использования.
 * 2. Описание и название плагина менять нельзя
 *  
 * @param Keys
 * @type struct<Keys>[]
 * @default ["{\"key\":\"a\",\"type\":\"isTriggered\",\"action\":\"Common Event\",\"value\":\"1\"}","{\"key\":\"w\",\"type\":\"isTriggered\",\"action\":\"Variable+\",\"value\":\"1\"}","{\"key\":\"q\",\"type\":\"isTriggered\",\"action\":\"Variable-\",\"value\":\"1\"}","{\"key\":\"s\",\"type\":\"isTriggered\",\"action\":\"Switch\",\"value\":\"1\"}","{\"key\":\"d\",\"type\":\"isTriggered\",\"action\":\"Switch-\",\"value\":\"1\"}","{\"key\":\"f\",\"type\":\"isTriggered\",\"action\":\"Switch+\",\"value\":\"1\"}","{\"key\":\"space\",\"type\":\"isTriggered\",\"action\":\"Script\",\"value\":\"console.log(123)\"}"]
 */
/*~struct~Keys:
 *
 * @param key
 * @desc Кнопка клавиатуры
 * @type text
 * @default a
 *
 * @param type
 * @desc Тип нажатия клавиши
 * @type select
 * @default isTriggered
 * @option isTriggered
 * @option isPressed
 * @option isNoPressed
 * @option isLongPressed
 *
 * @param action
 * @desc Тип действия
 * @default Common Event
 * @type select
 * @option Common Event
 * @option Variable+
 * @option Variable-
 * @option Switch
 * @option Switch+
 * @option Switch-
 * @option Script
 *
 * @param value
 * @desc Значение
 * @type text
 * @default 1
 */

(function () {
  class ZeldaInput {
    constructor() {
      this.keys = this.getKeys();
      this.actions = this.getActions();
    }
    getKeys() {
      const keys = PluginManager.parameters("Zelda_Input")["Keys"];
      return JSON.parse(keys).map((key) => JSON.parse(key));
    }
    getActions() {
      const actions = {
        "Common Event": (id) => $gameTemp.reserveCommonEvent(id),
        "Variable+": (id) => setVar(id, $gameVariables.value(id) + 1),
        "Variable-": (id) => setVar(id, $gameVariables.value(id) - 1),
        Switch: (id) => setSwitch(id, !$gameSwitches.value(id)),
        "Switch+": (id) => setSwitch(id, true),
        "Switch-": (id) => setSwitch(id, false),
        Script: (id) => eval(id),
      };
      function setVar(id, v) {
        $gameVariables.setValue(id, v);
      }
      function setSwitch(id, v) {
        $gameSwitches.setValue(id, v);
      }
      return actions;
    }
  }

  let ZeldaUpdate = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    ZeldaUpdate.call(this);
    ZeldaUpdateInput();
  };

  ZeldaUpdateInput = function () {
    let zeldaInput = new ZeldaInput();

    zeldaInput.keys.map((key) => {
      if (key.type === "isTriggered") {
        if (Input.isTriggered(key.key)) {
          zeldaInput.actions[key.action](key.value);
        }
      } else if (key.type === "isPressed") {
        if (Input.isPressed(key.key)) {
          zeldaInput.actions[key.action](key.value);
        }
      } else if (key.type === "isNoPressed") {
        if (!Input.isPressed(key.key)) {
          zeldaInput.actions[key.action](key.value);
        }
      }
    });
  };

  Input.keyMapper = {
    8: "backspace", // backspace
    9: "tab", // tab
    13: "ok", // enter
    16: "shift", // shift
    17: "control", // control
    18: "alt", // alt
    19: "pause", // pause
    20: "capslock", // capslock
    27: "escape", // escape
    32: "space", // space
    33: "pageup", // pageup
    34: "pagedown", // pagedown
    35: "end", // end
    36: "home", // home
    37: "left", // left arrow
    38: "up", // up arrow
    39: "right", // right arrow
    40: "down", // down arrow
    44: "printscreen", // printscreen
    45: "insert", // insert
    46: "delete", // delete
    48: "0", // 0
    49: "1", // 1
    50: "2", // 2
    51: "3", // 3
    52: "4", // 4
    53: "5", // 5
    54: "6", // 6
    55: "7", // 7
    56: "8", // 8
    57: "9", // 9
    65: "a", // A ф
    66: "b", // B и
    67: "c", // C с
    68: "d", // D в
    69: "e", // E у
    70: "f", // F а
    71: "g", // G п
    72: "h", // H р
    73: "i", // I ш
    74: "j", // J о
    75: "k", // K л
    76: "l", // L д
    77: "m", // M ь
    78: "n", // N т
    79: "o", // O щ
    80: "p", // P з
    81: "q", // Q й
    82: "r", // R к
    83: "s", // S ы
    84: "t", // T е
    85: "u", // U г
    86: "v", // V м
    87: "w", // W ц
    88: "x", // X ч
    89: "y", // Y н
    90: "z", // Z я
    96: "escape", // numpad 0
    97: "numpad1", // numpad 1
    98: "down", // numpad 2
    99: "numpad3", // numpad 3
    100: "left", // numpad 4
    101: "numpad5", // numpad 5
    102: "right", // numpad 6
    103: "numpad7", // numpad 7
    104: "up", // numpad 8
    105: "numpad9", // numpad 9
    106: "*", // *
    107: "+", // +
    109: "-", // -
    110: ".", // .
    111: "/", // /
    112: "f1", // F1
    113: "f2", // F2
    114: "f3", // F3
    115: "f4", // F4
    116: "f5", // F5
    117: "f6", // F6
    118: "f7", // F7
    119: "f8", // F8
    120: "debug", // F9
    121: "f10", // F10
    122: "f11", // F11
    123: "f12", // F12
    144: "numlock", // numlock
    145: "scrolllock", // scrolllock
    186: ";", // :;ж
    187: "=", // +=
    188: "<", // <,Б
    189: "-", // -_
    190: ">", // >.Ю
    191: "?", // /?,/.
    192: "`", // ~`ё
    219: "[", // {[х
    220: "|", // |
    221: "]", // }]ъ
    222: '"', // "'э
  };
})();

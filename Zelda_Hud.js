//=============================================================================
// Zelda_Hud.js
//=============================================================================
/*:
 * Условия использования:
 * 1. Плагин полностью свободен для использования.
 * 2. Описание и название плагина менять нельзя
 *
 * @param variable
 * @text Стандартная переменная
 * @desc Переменная для включения определенного набора худов. Если переменная равна нулю - все худы выключены.
 * @type variable
 * @default 2
 *
 * @param huds
 * @type struct<huds>[]
 * @default ["{\"description\":\"худ здоровья\",\"values\":\"[1]\",\"x\":\"76\",\"y\":\"10\",\"width\":\"100\",\"height\":\"14\",\"color_1\":\"#22cd00\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"hudbar\",\"value\":\"$gameParty.members()[0].hp\",\"maxValue\":\"$gameParty.members()[0].mhp\"}","{\"description\":\"худ магии\",\"values\":\"[1]\",\"x\":\"76\",\"y\":\"26\",\"width\":\"100\",\"height\":\"14\",\"color_1\":\"#2200cd\",\"color_2\":\"#000059\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"hudbar\",\"value\":\"$gameParty.members()[0].mp\",\"maxValue\":\"$gameParty.members()[0].mmp\"}","{\"description\":\"худ TP\",\"values\":\"[1]\",\"x\":\"76\",\"y\":\"42\",\"width\":\"100\",\"height\":\"14\",\"color_1\":\"#cd2200\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"hudbar\",\"value\":\"$gameParty.members()[0].tp\",\"maxValue\":\"10\"}","{\"description\":\"цифры здоровья\",\"values\":\"[1]\",\"x\":\"186\",\"y\":\"10\",\"width\":\"80\",\"height\":\"14\",\"color_1\":\"#ccc\",\"color_2\":\"\",\"colorBackground\":\"#000\",\"colorBorder\":\"#650\",\"type\":\"text\",\"value\":\"$gameParty.members()[0].hp + ' / ' + $gameParty.members()[0].mhp\",\"maxValue\":\"\"}","{\"description\":\"цифры магии\",\"values\":\"[1]\",\"x\":\"186\",\"y\":\"26\",\"width\":\"80\",\"height\":\"14\",\"color_1\":\"#ccc\",\"color_2\":\"\",\"colorBackground\":\"#000\",\"colorBorder\":\"#650\",\"type\":\"text\",\"value\":\"$gameParty.members()[0].mp + ' / ' + $gameParty.members()[0].mmp\",\"maxValue\":\"\"}","{\"description\":\"цифры TP\",\"values\":\"[1]\",\"x\":\"186\",\"y\":\"42\",\"width\":\"80\",\"height\":\"14\",\"color_1\":\"#ccc\",\"color_2\":\"\",\"colorBackground\":\"#000\",\"colorBorder\":\"#650\",\"type\":\"text\",\"value\":\"$gameParty.members()[0].tp + ' / 10'\",\"maxValue\":\"\"}","{\"description\":\"предметы слот 0\",\"values\":\"[1]\",\"x\":\"266\",\"y\":\"10\",\"width\":\"40\",\"height\":\"40\",\"color_1\":\"#cd2200\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"icon\",\"value\":\"($gameParty.members()[0].equips()[1]) ?  $gameParty.members()[0].equips()[1].iconIndex : 16\",\"maxValue\":\"\",\"zoom\":\"1\"}","{\"description\":\"оружие слот 0\",\"values\":\"[1]\",\"x\":\"312\",\"y\":\"10\",\"width\":\"40\",\"height\":\"40\",\"color_1\":\"#cd2200\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"icon\",\"value\":\"($gameParty.members()[0].equips()[0]) ?  $gameParty.members()[0].equips()[0].iconIndex : 16\",\"maxValue\":\"\",\"zoom\":\"1\"}","{\"description\":\"патроны оружия 0\",\"values\":\"[\\\"1\\\"]\",\"x\":\"312\",\"y\":\"56\",\"width\":\"40\",\"height\":\"14\",\"color_1\":\"#ccc\",\"color_2\":\"\",\"colorBackground\":\"#000\",\"colorBorder\":\"#650\",\"type\":\"text\",\"value\":\"$gamePlayer._Yabs.getMagazine(0) + '/' + $gamePlayer._Yabs.getItem(0)\",\"maxValue\":\"\",\"zoom\":\"\"}","{\"description\":\"оружие слот 1\",\"values\":\"[1]\",\"x\":\"358\",\"y\":\"10\",\"width\":\"40\",\"height\":\"40\",\"color_1\":\"#cd2200\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"icon\",\"value\":\"($gameParty.members()[0].equips()[1]) ?  $gameParty.members()[0].equips()[1].iconIndex : 16\",\"maxValue\":\"\",\"zoom\":\"1\"}","{\"description\":\"оружие слот 2\",\"values\":\"[1]\",\"x\":\"404\",\"y\":\"10\",\"width\":\"40\",\"height\":\"40\",\"color_1\":\"#cd2200\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"icon\",\"value\":\"($gameParty.members()[0].equips()[2]) ?  $gameParty.members()[0].equips()[2].iconIndex : 16\",\"maxValue\":\"\",\"zoom\":\"1\"}","{\"description\":\"оружие слот 3\",\"values\":\"[1]\",\"x\":\"450\",\"y\":\"10\",\"width\":\"40\",\"height\":\"40\",\"color_1\":\"#cd2200\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"icon\",\"value\":\"($gameParty.members()[0].equips()[3]) ?  $gameParty.members()[0].equips()[3].iconIndex : 16\",\"maxValue\":\"\",\"zoom\":\"1\"}","{\"description\":\"оружие слот 4\",\"values\":\"[1]\",\"x\":\"496\",\"y\":\"10\",\"width\":\"40\",\"height\":\"40\",\"color_1\":\"#cd2200\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"icon\",\"value\":\"($gameParty.members()[0].equips()[4]) ?  $gameParty.members()[0].equips()[4].iconIndex : 16\",\"maxValue\":\"\",\"zoom\":\"1\"}","{\"description\":\"Фейс перса\",\"values\":\"[1]\",\"x\":\"10\",\"y\":\"10\",\"width\":\"64\",\"height\":\"64\",\"color_1\":\"#cd2200\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"face\",\"value\":\"$gameParty.members()[0].faceIndex()\",\"maxValue\":\"$gameParty.members()[0].faceName()\"}","{\"description\":\"Фейс 2ого перса\",\"values\":\"[1]\",\"x\":\"76\",\"y\":\"58\",\"width\":\"32\",\"height\":\"32\",\"color_1\":\"#cd2200\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"face\",\"value\":\"($gameParty.members()[1]) ? $gameParty.members()[1].faceIndex() : ''\",\"maxValue\":\"($gameParty.members()[1]) ? $gameParty.members()[1].faceName() : ''\",\"zoom\":\"\"}","{\"description\":\"Фейс 3его перса\",\"values\":\"[1]\",\"x\":\"110\",\"y\":\"58\",\"width\":\"32\",\"height\":\"32\",\"color_1\":\"#cd2200\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"face\",\"value\":\"($gameParty.members()[2]) ? $gameParty.members()[2].faceIndex() : ''\",\"maxValue\":\"($gameParty.members()[2]) ? $gameParty.members()[2].faceName() : ''\",\"zoom\":\"\"}","{\"description\":\"худ здоровья врага\",\"values\":\"[1]\",\"x\":\"(SceneManager._scene._Yabs?.damageEnemy) ? (SceneManager._scene._Yabs.damageEnemy._realX - $gameMap.displayX()) * 48-11 : 0\",\"y\":\"(SceneManager._scene._Yabs?.damageEnemy) ? (SceneManager._scene._Yabs.damageEnemy._realY - $gameMap.displayY()) * 48 - 42 : 0\",\"width\":\"70\",\"height\":\"14\",\"color_1\":\"#cd2200\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"hudbar\",\"value\":\"(SceneManager._scene._Yabs?.damageEnemy) ? SceneManager._scene._Yabs.damageEnemy._Yabs.hp : null\",\"maxValue\":\"(SceneManager._scene._Yabs?.damageEnemy) ? SceneManager._scene._Yabs.damageEnemy._Yabs.mhp : null\",\"zoom\":\"\"}"]
 */
/*~struct~huds:
 *
 * @param description
 * @desc Описание
 * @type text
 * @default худ здоровья
 *
 * @param values
 * @text Значения переменной
 * @desc Значения переменной, при которой худ виден.
 * @type number[]
 * @default [1]
 * 
 * @param x
 * @desc Формула координаты X левой верхней точки худбара
 * @type text
 * @default 10
 * 
 * @param y
 * @desc ормула координаты Y левой верхней точки худбара
 * @type text
 * @default 10
 * 
 * @param width
 * @desc Ширина худбара в пикселях
 * @type number
 * @default 100
 * 
 * @param height
 * @desc Высота худбара в пикселях
 * @type number
 * @default 14
 *
 * @param color_1
 * @desc Первый цвет градиента худбара
 * @type text
 * @default #cd2200
 * 
 * @param color_2
 * @desc Второй цвет градиента худбара
 * @type text
 * @default #005900
 * 
 * @param colorBackground
 * @desc Цвет фона худбара
 * @type text
 * @default #000
 * 
 * @param colorBorder
 * @desc Цвет рамки худбара
 * @type text
 * @default #98830a
 *
 * @param type
 * @desc Тип худбара
 * @type select
 * @default hudbar
 * @option hudbar
 * @option text
 * @option icon
 * @option face
 *
 * @param value
 * @desc Значение (текст пишите в кавычках)
 * @type text
 * @default $gameParty.members()[0].hp
 *
 * @param maxValue
 * @desc Максимальное значение (текст пишите в кавычках) либо название faceseta
 * @type text
 * @default $gameParty.members()[0].mhp
 *
 * @param zoom
 * @desc Увеличение размера иконки
 * @type number
 * @default 1
 *

 */
// SceneManager.showDevTools();
(function () {
  let ZeldaOnMapLoaded = Scene_Map.prototype.onMapLoaded;
  Scene_Map.prototype.onMapLoaded = function () {
    ZeldaOnMapLoaded.call(this);
    this.ZeldaHuds = new ZeldaHuds();
    this.addChild(this.ZeldaHuds);
  };

  class ZeldaHud {
    constructor(bitmap, type, x, y, w, h, value, maxValue, colors, zoom = 1) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.zoom = zoom;
      this.value = value;
      this.maxValue = maxValue;
      this.borderSize = 2;
      this.bitmap = bitmap;
      this.colors = colors;
      this[type]();
    }

    hudbar() {
      let x = eval(this.x),
        y = eval(this.y),
        w = this.w,
        h = this.h,
        border = this.borderSize,
        primary = this.colors.primary,
        secondary = this.colors.secondary,
        borderColor = this.colors.border,
        background = this.colors.background,
        value = eval(this.value);
      if (value === null) return;
      value = Math.round((this.w * value) / eval(this.maxValue));
      this.drawRect(x, y, w, h, 0, borderColor);
      this.drawRect(x, y, w, h, border, background);
      this.drawRect(x, y, value, h, border, primary, secondary);
    }
    text() {
      this.bitmap.drawText(eval(this.value), this.x, this.y, this.w, this.h);
      this.bitmap.textColor = this.colors.primary;
      this.bitmap.outlineColor = this.colors.border;
      this.bitmap.fontSize = this.h;
    }
    icon() {
      if (!this.bitmap) return false;
      const index = eval(this.value);
      const zoom = eval(this.zoom);
      const w = this.w * zoom;
      const bitmap = ImageManager.loadSystem("IconSet");
      const pw = ImageManager.iconWidth;
      const ph = ImageManager.iconHeight;
      const sx = (index % 16) * pw;
      const sy = Math.floor(index / 16) * pw;
      const maxValue = this.maxValue !== "" ? eval(this.maxValue) : 1;
      this.bitmap.blt(
        bitmap,
        sx,
        sy,
        pw * zoom * maxValue,
        ph,
        this.x,
        this.y,
        w * maxValue,
        this.h
      );
      return true;
    }
    face() {
      if (!this.bitmap) return false;
      const index = eval(this.value);
      this.value = 16;
      this.icon();
      var bitmap = ImageManager.loadFace(eval(this.maxValue));
      var pw = ImageManager.faceHeight;
      var ph = ImageManager.faceHeight;
      var sx = (index % 4) * pw;
      var sy = Math.floor(index / 4) * pw;
      this.bitmap.blt(
        bitmap,
        sx,
        sy,
        pw,
        ph,
        this.x + 4,
        this.y + 4,
        this.w - 8,
        this.h - 8
      );
      return true;
    }
    drawRect(x, y, w, h, border, color, color2 = null) {
      if (!color2) color2 = color;
      x = x + border;
      y = y + border;
      h = h - border * 2;
      w = w > border ? w - border * 2 : 0;
      this.bitmap.gradientFillRect(x, y, w, h, color, color2);
    }
  }

  class ZeldaHuds extends Sprite {
    constructor() {
      super(new Bitmap(Graphics.width, Graphics.height));
      this.params = this.parseParams();
      this.update();
    }

    update() {
      this.bitmap.clear();
      this.drawHuds();
    }

    drawHuds() {
      this.params.huds.map((hud) => {
        let v = $gameVariables.value(this.params.variable);
        if (!hud.values.includes(v)) return;
        new ZeldaHud(
          this.bitmap,
          hud.type,
          hud.x,
          hud.y,
          hud.width,
          hud.height,
          hud.value,
          hud.maxValue,
          {
            primary: hud.color_1,
            secondary: hud.color_2,
            border: hud.colorBorder,
            background: hud.colorBackground,
          },
          hud.zoom
        );
      });
    }

    parseParams() {
      const parameters = PluginManager.parameters("Zelda_Hud");
      function parse(string) {
        try {
          return JSON.parse(string, function (key, value) {
            if (typeof string === "number" || typeof string === "boolean") {
              return string;
            }

            try {
              if (Array.isArray(value)) {
                return value.map((val) => parse(val));
              }

              return parse(value);
            } catch (e) {
              return value;
            }
          });
        } catch (e) {
          return string;
        }
      }

      return Object.entries(parameters).reduce((acc, [key, value]) => {
        acc[key] = parse(value);
        return acc;
      }, {});
    }
  }
})();

/*
["{\"description\":\"худ здоровья\",\"values\":\"[1]\",\"x\":\"76\",\"y\":\"10\",\"width\":\"100\",\"height\":\"14\",\"color_1\":\"#22cd00\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"hudbar\",\"value\":\"$gameParty.members()[0].hp\",\"maxValue\":\"$gameParty.members()[0].mhp\"}","{\"description\":\"худ магии\",\"values\":\"[1]\",\"x\":\"76\",\"y\":\"26\",\"width\":\"100\",\"height\":\"14\",\"color_1\":\"#2200cd\",\"color_2\":\"#000059\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"hudbar\",\"value\":\"$gameParty.members()[0].mp\",\"maxValue\":\"$gameParty.members()[0].mmp\"}","{\"description\":\"худ TP\",\"values\":\"[1]\",\"x\":\"76\",\"y\":\"42\",\"width\":\"100\",\"height\":\"14\",\"color_1\":\"#cd2200\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"hudbar\",\"value\":\"$gameParty.members()[0].tp\",\"maxValue\":\"10\"}","{\"description\":\"цифры здоровья\",\"values\":\"[1]\",\"x\":\"186\",\"y\":\"10\",\"width\":\"80\",\"height\":\"14\",\"color_1\":\"#ccc\",\"color_2\":\"\",\"colorBackground\":\"#000\",\"colorBorder\":\"#650\",\"type\":\"text\",\"value\":\"$gameParty.members()[0].hp + ' / ' + $gameParty.members()[0].mhp\",\"maxValue\":\"\"}","{\"description\":\"цифры магии\",\"values\":\"[1]\",\"x\":\"186\",\"y\":\"26\",\"width\":\"80\",\"height\":\"14\",\"color_1\":\"#ccc\",\"color_2\":\"\",\"colorBackground\":\"#000\",\"colorBorder\":\"#650\",\"type\":\"text\",\"value\":\"$gameParty.members()[0].mp + ' / ' + $gameParty.members()[0].mmp\",\"maxValue\":\"\"}","{\"description\":\"цифры TP\",\"values\":\"[1]\",\"x\":\"186\",\"y\":\"42\",\"width\":\"80\",\"height\":\"14\",\"color_1\":\"#ccc\",\"color_2\":\"\",\"colorBackground\":\"#000\",\"colorBorder\":\"#650\",\"type\":\"text\",\"value\":\"$gameParty.members()[0].tp + ' / 10'\",\"maxValue\":\"\"}","{\"description\":\"оружие слот 0\",\"values\":\"[1]\",\"x\":\"266\",\"y\":\"10\",\"width\":\"40\",\"height\":\"40\",\"color_1\":\"#cd2200\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"icon\",\"value\":\"($gameParty.members()[0].equips()[0]) ?  $gameParty.members()[0].equips()[0].iconIndex : 16\",\"maxValue\":\"\"}","{\"description\":\"оружие слот 1\",\"values\":\"[1]\",\"x\":\"312\",\"y\":\"10\",\"width\":\"40\",\"height\":\"40\",\"color_1\":\"#cd2200\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"icon\",\"value\":\"($gameParty.members()[0].equips()[1]) ?  $gameParty.members()[0].equips()[1].iconIndex : 16\",\"maxValue\":\"\"}","{\"description\":\"оружие слот 2\",\"values\":\"[1]\",\"x\":\"358\",\"y\":\"10\",\"width\":\"40\",\"height\":\"40\",\"color_1\":\"#cd2200\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"icon\",\"value\":\"($gameParty.members()[0].equips()[2]) ?  $gameParty.members()[0].equips()[2].iconIndex : 16\",\"maxValue\":\"\"}","{\"description\":\"оружие слот 3\",\"values\":\"[1]\",\"x\":\"404\",\"y\":\"10\",\"width\":\"40\",\"height\":\"40\",\"color_1\":\"#cd2200\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"icon\",\"value\":\"($gameParty.members()[0].equips()[3]) ?  $gameParty.members()[0].equips()[3].iconIndex : 16\",\"maxValue\":\"\"}","{\"description\":\"оружие слот 4\",\"values\":\"[1]\",\"x\":\"450\",\"y\":\"10\",\"width\":\"40\",\"height\":\"40\",\"color_1\":\"#cd2200\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"icon\",\"value\":\"($gameParty.members()[0].equips()[4]) ?  $gameParty.members()[0].equips()[4].iconIndex : 16\",\"maxValue\":\"\"}","{\"description\":\"Фейс перса\",\"values\":\"[1]\",\"x\":\"10\",\"y\":\"10\",\"width\":\"64\",\"height\":\"64\",\"color_1\":\"#cd2200\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"face\",\"value\":\"$gameParty.members()[0].faceIndex()\",\"maxValue\":\"$gameParty.members()[0].faceName()\"}","{\"description\":\"Фейс 2ого перса\",\"values\":\"[1]\",\"x\":\"76\",\"y\":\"58\",\"width\":\"14\",\"height\":\"14\",\"color_1\":\"#cd2200\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"face\",\"value\":\"($gameParty.members()[1]) ? $gameParty.members()[1].faceIndex() : ''\",\"maxValue\":\"($gameParty.members()[1]) ? $gameParty.members()[1].faceName() : ''\"}","{\"description\":\"худ здоровья врага\",\"values\":\"[1]\",\"x\":\"10\",\"y\":\"200\",\"width\":\"100\",\"height\":\"14\",\"color_1\":\"#cd2200\",\"color_2\":\"#005900\",\"colorBackground\":\"#000\",\"colorBorder\":\"#98830a\",\"type\":\"hudbar\",\"value\":\"($gameMap._Yabs.damageEnemy) ? $gameMap._Yabs.damageEnemy._Yabs.hp : null\",\"maxValue\":\"($gameMap._Yabs.damageEnemy) ? $gameMap._Yabs.damageEnemy._Yabs.mhp : null\"}"]
*/

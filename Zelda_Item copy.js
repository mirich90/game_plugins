//=============================================================================
// Zelda_Item.js
//=============================================================================

(function () {
  const MENU_INV = {
    bg: "BgItem",
    font: {
      x: 10,
      y: 11,
      size: 15,
    },
    item: {
      x: 117,
      y: 195,
      width: 248,
      height: 200,
      maxCols: 4,
    },
    weapon: {
      x: 384,
      y: 240,
      width: 70,
      height: 176,
      maxCols: 1,
    },
    armor: {
      x: 20,
      y: 290,
      width: 70,
      height: 124,
      maxCols: 1,
    },
    keyItem: {
      x: 130,
      y: 440,
      width: 215,
      height: 68,
      maxCols: 4,
    },
    category: {
      x: 0,
      y: 155,
      width: 470,
      height: 366,
      item: [
        { x: 102, y: 28, width: 248, height: 202 }, //item
        { x: 368, y: 70, width: 78, height: 182 }, //weapon
        { x: 4, y: 118, width: 78, height: 134 }, //armor
        { x: 122, y: 272, width: 208, height: 68 },
      ],
      font: {
        size: 15,
      },
    },
  };

  let Zelda_Scene_Item_create = Scene_Item.prototype.create;
  Scene_Item.prototype.create = function () {
    Zelda_Scene_Item_create.call(this);
    // this.createGoldWindow(); //надо добавить золото
  };

  Window_ItemCategory.prototype.itemRect = function (index) {
    const x = MENU_INV.category.item[index].x; //col * itemWidth + colSpacing / 2 - this.scrollBaseX();
    const y = MENU_INV.category.item[index].y; //row * itemHeight + rowSpacing / 2 - this.scrollBaseY();

    const width = MENU_INV.category.item[index].width; //itemWidth - colSpacing;
    const height = MENU_INV.category.item[index].height; //itemHeight - rowSpacing;
    return new Rectangle(x, y, width, height);
  };

  Scene_Item.prototype.itemWindowRect = function () {
    const wx = MENU_INV.item.x;
    const wy = MENU_INV.item.y;
    const ww = MENU_INV.item.width;
    const wh = MENU_INV.item.height;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_Item.prototype.onCategoryOk = function () {
    this._itemWindow.show();
    this._helpWindow.show();
    this._itemWindow.activate();
    this._itemWindow.selectLast();
  };

  Scene_Item.prototype.createCategoryWindow = function () {
    const rect = this.categoryWindowRect();

    this._categoryWindow = new Window_ItemCategory(rect);
    this._categoryWindow.setHelpWindow(this._helpWindow);
    this._categoryWindow.backOpacity = 0;
    this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._categoryWindow);
  };

  Window_ItemCategory.prototype.cursorDown = function (wrap) {
    this._index = 3;
    this.activate();
  };
  Window_ItemCategory.prototype.cursorUp = function (wrap) {
    this._index = 0;
    this.activate();
  };
  Window_ItemCategory.prototype.cursorRight = function (wrap) {
    this._index = 1;
    this.activate();
  };
  Window_ItemCategory.prototype.cursorLeft = function (wrap) {
    this._index = 2;
    this.activate();
  };

  Scene_Item.prototype.categoryWindowRect = function () {
    const wx = MENU_INV.category.x || 0;
    const wy = MENU_INV.category.y || this.mainAreaTop() + 100;
    // const wy = this.mainAreaTop();
    const ww = MENU_INV.category.width || Graphics.boxWidth;
    const wh = MENU_INV.category.height || this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_Item.prototype.onItemCancel = function () {
    if (this._categoryWindow.needsSelection()) {
      this._itemWindow.hide();
      this._helpWindow.hide();

      this._itemWindow.deselect();
      this._categoryWindow.activate();
    } else {
      this.popScene();
    }
  };

  Window_ItemList.prototype.maxCols = function () {
    return 4;
  };
  Window_ItemList.prototype.colSpacing = function () {
    return 4;
  };
  Window_ItemList.prototype.drawItem = function (index) {
    const item = this.itemAt(index);
    if (item) {
      const numberWidth = this.numberWidth();
      const rect = this.itemLineRect(index);
      this.changeItemPosition();
      this.changePaintOpacity(this.isEnabled(item));
      this.drawItemIcon(item, rect.x - 3, rect.y - 1, rect.width - numberWidth);
      this.drawItemNumber_2(item, rect.x, rect.y, rect.width, rect.height);
      // this.changePaintOpacity(1);
    }
  };

  Window_ItemList.prototype.changeItemPosition = function () {
    const categoryName = this._category;

    if (categoryName === "none") return;

    this.maxCols = function () {
      return MENU_INV[categoryName].maxCols;
    };
    this.x = MENU_INV[categoryName].x;
    this.y = MENU_INV[categoryName].y;
    this.width = MENU_INV[categoryName].width;
    this.height = MENU_INV[categoryName].height;
    // console.log(this);
  };

  Window_ItemList.prototype.drawItemIcon = function (item, x, y, width) {
    if (item) {
      const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
      // const textMargin = ImageManager.iconWidth + 4;
      // const itemWidth = Math.max(0, width - textMargin);
      this.resetTextColor();
      this.drawIcon(item.iconIndex, x, iconY);
      // this.drawText(item.name, x + textMargin, y, itemWidth);
    }
  };

  Window_ItemList.prototype.drawItemNumber_2 = function (
    item,
    x,
    y,
    width,
    height
  ) {
    if (this.needsNumber()) {
      // this.visible = true;
      this.contents.fontSize = MENU_INV.font.size;
      this.contents.drawText(
        $gameParty.numItems(item),
        x + MENU_INV.font.x,
        y + MENU_INV.font.y,
        width,
        height,
        "right"
      );

      // this.drawText(":", x, y, width - this.textWidth("00"), "right");
      // this.drawText($gameParty.numItems(item), x, y, width, "right");
    }
  };

  let Zelda_Scene_Item_createWindowLayer =
    Scene_Item.prototype.createWindowLayer;
  Scene_Item.prototype.createWindowLayer = function () {
    this.createBackgroundItem();
    Zelda_Scene_Item_createWindowLayer.call(this);
  };

  Scene_Item.prototype.createBackgroundItem = function () {
    this._backSprite = new Sprite();
    this._backSprite.bitmap = ImageManager.loadSystem(MENU_INV.bg);
    this.addChild(this._backSprite);
  };

  let Zelda_Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
  Scene_Item.prototype.createItemWindow = function () {
    Zelda_Scene_Item_createItemWindow.call(this);
    this._itemWindow.hide();
  };

  let Zelda_Scene_Item_createHelpWindow = Scene_Item.prototype.createHelpWindow;
  Scene_Item.prototype.createHelpWindow = function () {
    Zelda_Scene_Item_createHelpWindow.call(this);
    this._helpWindow.hide();
  };

  let Zelda_Scene_Boot_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
  Scene_Boot.prototype.loadSystemImages = function () {
    Zelda_Scene_Boot_loadSystemImages.call(this);
    ImageManager.loadSystem(MENU_INV.bg);
  };
})();

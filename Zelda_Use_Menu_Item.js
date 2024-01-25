//=============================================================================
// Zelda_Use_Menu_Item.js
//=============================================================================

(function () {
  Zelda_Scene_Item_onItemOk = Scene_Item.prototype.onItemOk;
  Scene_Item.prototype.onItemOk = function () {
    this.openItemOptions();
  };

  Scene_Item.prototype.openItemOptions = function () {
    this._itemOptions.show();
    this._itemOptions.activate();
    this._itemOptions.select(0);
    this._itemWindow.deactivate();
  };

  Zelda_Scene_Item_Create = Scene_Item.prototype.create;
  Scene_Item.prototype.create = function () {
    Zelda_Scene_Item_Create.call(this);
    this.createWindowsItem();
  };

  Scene_Item.prototype.createWindowsItem = function () {
    this.createItemCommand();
  };

  Scene_Item.prototype.createItemCommand = function () {
    const w = 240;
    const h = 160;
    const x = Graphics.width * 0.5 - w * 0.5;
    const y = Graphics.height * 0.5 - h * 0.5;
    const rect = new Rectangle(x, y, w, h);
    this._itemOptions = new Window_itemOptions(rect);
    this._itemOptions.hide();
    this._itemOptions.deactivate();
    this._itemOptions.setHandler(`use`, this.useItemOk.bind(this));
    this._itemOptions.setHandler(`equip`, this.onItemOk.bind(this));
    this._itemOptions.setHandler(`cancel`, this.cancelItemOk.bind(this));
    this.addWindow(this._itemOptions);
  };

  Scene_Item.prototype.useItemOk = function () {
    this._itemOptions.deactivate();
    this._itemOptions.hide();
    Zelda_Scene_Item_onItemOk.call(this);
  };

  Scene_Item.prototype.cancelItemOk = function () {
    this._itemOptions.deactivate();
    this._itemOptions.hide();
    this._itemWindow.refresh();
    this._itemWindow.activate();
  };

  function Window_itemOptions() {
    this.initialize(...arguments);
  }

  Window_itemOptions.prototype = Object.create(Window_Command.prototype);
  Window_itemOptions.prototype.constructor = Window_itemOptions;

  Window_itemOptions.prototype.initialize = function (rect) {
    Window_Command.prototype.initialize.call(this, rect);
  };

  Window_itemOptions.prototype.windowWidth = function () {
    return this._width;
  };

  Window_itemOptions.prototype.windowHeight = function () {
    return this._height;
  };

  Window_itemOptions.prototype.makeCommandList = function () {
    const item = SceneManager._scene.item();
    if (item) {
      const non_discard = item.meta["No Discard"];
      this.addCommand(`использовать`, "use", DataManager.isItem(item));
      if (!non_discard) this.addCommand(`экипировать`, "equip");
      let index = $gameParty.items().findIndex((e) => e.id === item.id);
      console.log(this, item);
      console.log(this.itemLineRect(index));
      const rect = this.itemLineRect(index);
      this.x = rect.x;
      this.y = rect.y;
      console.log(Window_ItemList);
    }
    this.addCommand(`отмена`, "cancel");

    // console.log($gameParty.items().findIndex((e) => e.id === this.item().id));
  };

  Window_itemOptions.prototype.update = function () {
    Window_Command.prototype.update.call(this);
    this.refresh();
  };
})();

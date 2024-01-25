//=============================================================================
// Zelda_ItemEquip.js
//=============================================================================

(function () {
  Window_ItemCategory.prototype.maxCols = function () {
    return 5;
  };

  let Zelda_Window_ItemCategory_makeCommandList =
    Window_ItemCategory.prototype.makeCommandList;
  Window_ItemCategory.prototype.makeCommandList = function () {
    Zelda_Window_ItemCategory_makeCommandList.call(this);
    this.addCommand("Броня", "cloth");
  };

  Window_ItemList.prototype.includes = function (item) {
    switch (this._category) {
      case "item":
        return DataManager.isItem(item) && item.itypeId === 1;
      case "weapon":
        return DataManager.isWeapon(item);
      case "armor":
        return DataManager.isArmor(item) && item.etypeId === 2;
      case "keyItem":
        return DataManager.isItem(item) && item.itypeId === 2;
      case "cloth":
        return DataManager.isArmor(item) && item.etypeId !== 2;
      default:
        return false;
    }
  };
})();

(function () {
  Game_Character.prototype.Zelda_Equip = function (
    type = "show",
    slotId = 0,
    actorId = 0
  ) {
    new ZeldaEquip(type, slotId, actorId);
  };

  class ZeldaEquip {
    constructor(type = "show", slotId = 0, actorId = 0) {
      this.actorId = actorId;
      this.slotId = slotId;
      this.actor = $gameParty.members()[this.actorId];
      this.etypeId = this.actor.equipSlots()[this.slotId];
      this.currentItem = this.actor.equips()[this.slotId];
      this.currentItemId = this.currentItem?.id || -1;
      this.items = this.getItems();
      if (this.items.length === 0 && !this.currentItem) return;
      this[type]();
    }
    show() {
      console.log(this);
    }
    next() {
      let currentIndex = this.getCurrentIndex();
      switch (currentIndex) {
        case -1:
          this.equipFirst();
          break;
        case this.items.length - 1:
          this.clear();
          break;
        default:
          this.equipNext(currentIndex);
      }
      SoundManager.playEquip();
    }
    prev() {
      let currentIndex = this.getCurrentIndex();
      switch (currentIndex) {
        case -1:
          this.equipLast();
          break;
        case 0:
          this.clear();
          break;
        default:
          this.equipPrev(currentIndex);
      }
      SoundManager.playEquip();
    }
    getCurrentIndex() {
      return this.items.findIndex((item) => item.id === this.currentItemId);
    }
    getItems() {
      let items = this.getCanItems();
      if (this.currentItem) items = [...items, this.currentItem];
      items.sort((a, b) => a.id - b.id);
      return items;
    }
    getCanItems() {
      let allItems = $gameParty.equipItems();
      return allItems.filter(
        (item) =>
          item.etypeId === this.etypeId &&
          this.actor.canEquip(item) &&
          this.currentItemId !== item.id
      );
    }
    equipNext(currentIndex) {
      this.actor.changeEquip(this.slotId, this.items[currentIndex + 1]);
    }
    equipPrev(currentIndex) {
      this.actor.changeEquip(this.slotId, this.items[currentIndex - 1]);
    }
    equipFirst() {
      this.actor.changeEquip(this.slotId, this.items[0]);
    }
    clear() {
      this.actor.changeEquip(this.slotId, null);
    }
    equipLast() {
      let index = this.items.length - 1;
      this.actor.changeEquip(this.slotId, this.items[index]);
    }
  }
})();

(function () {
  Game_Character.prototype.Zelda_Equip_Item = function (
    type = "show",
    slotId = 1,
    actorId = 0
  ) {
    new ZeldaEquipItem(type, slotId, actorId);
  };

  class ZeldaEquipItem {
    constructor(type = "show", slotId = 1, actorId = 0) {
      this.actorId = actorId;
      this.slotId = slotId;
      this.actor = $gameParty.members()[this.actorId];
      this.currentItem = this.getCurrentItem();

      this.currentItemId = this.getCurrentItemId();
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
    getAbsActor() {
      return $gamePlayer._Yabs.items[this.actor.actorId()];
    }
    getCurrentItem() {
      if (!this.getAbsActor()[this.slotId]) {
        this.getAbsActor()[this.slotId] = null;
      }
      return this.getAbsActor()[this.slotId];
    }
    getCurrentItemId() {
      return this.currentItem?.id || -1;
    }
    getCurrentIndex() {
      return this.items.findIndex((item) => item.id === this.currentItemId);
    }
    getItems() {
      let items = $gameParty.items();
      let filtredItems = items.filter(
        (e) => e.meta.noequip != "true" && e.itypeId === this.slotId
      );
      return filtredItems;
    }
    equipNext(currentIndex) {
      this.getAbsActor()[this.slotId] = this.items[currentIndex + 1];
    }
    equipPrev(currentIndex) {
      this.getAbsActor()[this.slotId] = this.items[currentIndex - 1];
    }
    equipFirst() {
      this.getAbsActor()[this.slotId] = this.items[0];
    }
    clear() {
      this.getAbsActor()[this.slotId] = null;
    }
    equipLast() {
      let index = this.items.length - 1;
      this.getAbsActor()[this.slotId] = this.items[index];
    }
  }
})();

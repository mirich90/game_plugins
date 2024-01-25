(function () {
  Game_Party.prototype.changeNextActor = function (actor) {
    let actors = $gameParty._actors;
    let leaderId = actors.shift();
    actors.push(leaderId);
    $gameParty._actors = actors;
    $gamePlayer.refresh();
  };
  Game_Party.prototype.changePrevActor = function (actor) {
    let actors = $gameParty._actors;
    let lastId = actors[actors.length - 1];
    let allOtherIds = actors.slice(0, actors.length - 1);
    $gameParty._actors = [lastId].concat(allOtherIds);
    $gamePlayer.refresh();
  };
})();

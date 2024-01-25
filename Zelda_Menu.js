//=============================================================================
// Zelda_Menu.js
//=============================================================================

function changeBg(id) {
  SceneManager._scene.changeBg(id);
}

(function () {
  const MENU = {
    pathImage: "phone",
    images: ["phone_1", "phone_2", "phone_3", "phone_4"],
    bg: "BgMenu",
    maxCols: 4,
    image: null,
    desctop: {
      x: 105,
      y: 58,
    },
    x: 30,
    y: 30,
    fontSize: 18,
    lineHeight: 108,
    gold: {
      x: 0,
      y: -20,
    },
    status: {
      fontSize: 18,
    },
    icons: {
      x: 106,
      y: 70,
      w: 550,
      h: 380,
      bg: false,
      size: 64,
      iconList: {
        default: 5,
        item: 210,
        skill: 76,
        equip: 153,
        status: 193,
        formation: 82,
        gallery: 82,
        quests: 79,
        maps: 82,
        options: "settings",
        save: "save",
        gameEnd: 5,
      },
    },
  };
  const SIZE = MENU.icons.size;
  const PATH = MENU.pathImage + "/";

  let Zelda_Scene_MenuBase_createWindowLayer =
    Scene_MenuBase.prototype.createWindowLayer;
  Scene_MenuBase.prototype.createWindowLayer = function () {
    this.createBackgroundPhone();
    Zelda_Scene_MenuBase_createWindowLayer.call(this);
  };

  Scene_MenuBase.prototype.changeBg = function (id) {
    MENU.image = MENU.images[id];
    this._bgSprite.bitmap = ImageManager.loadSystem(PATH + MENU.image);
  };

  Scene_MenuBase.prototype.createBackgroundPhone = function () {
    this.createBg = function (name, image, x, y) {
      this[name] = new Sprite();
      this[name].bitmap = ImageManager.loadSystem(PATH + image);
      this[name].x = x;
      this[name].y = y;
      this.addChild(this[name]);
    };

    let image = MENU.image || MENU.images[0];
    this.createBg("_bgSprite", image, MENU.desctop.x, MENU.desctop.y);
    this.createBg("_backSprite", MENU.bg, MENU.x, MENU.y);
  };

  // const Zelda_Scene_Menu_CreateCommandWindow =
  //   Scene_Menu.prototype.createCommandWindow;
  // Scene_Menu.prototype.createCommandWindow = function () {
  //   Zelda_Scene_Menu_CreateCommandWindow.apply(this, arguments);
  //   this._commandWindow.setHandler("gallery", this.commandGallery.bind(this));
  //   this._commandWindow.setHandler("maps", this.commandMap.bind(this));
  // // this._commandWindow = commandWindow;
  // this._commandWindow.backOpacity = 0;
  // };

  let Zelda_Scene_Menu_CreateCommandWindow =
    Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function () {
    // Zelda_Scene_Menu_CreateCommandWindow.call(this);
    const rect = this.commandWindowRect();
    const commandWindow = new Window_MenuCommand(rect);
    commandWindow.setHandler("item", this.commandItem.bind(this));
    commandWindow.setHandler("skill", this.commandPersonal.bind(this));
    commandWindow.setHandler("equip", this.commandPersonal.bind(this));
    commandWindow.setHandler("status", this.commandPersonal.bind(this));
    commandWindow.setHandler("formation", this.commandFormation.bind(this));
    commandWindow.setHandler("gallery", this.commandGallery.bind(this));
    commandWindow.setHandler("maps", this.commandMap.bind(this));
    commandWindow.setHandler("options", this.commandOptions.bind(this));
    commandWindow.setHandler("save", this.commandSave.bind(this));
    commandWindow.setHandler("gameEnd", this.commandGameEnd.bind(this));
    commandWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(commandWindow);
    this._commandWindow = commandWindow;
    this._commandWindow.backOpacity = 0;
  };

  let Zelda_Scene_Options_createOptionsWindow =
    Scene_Options.prototype.createOptionsWindow;
  Scene_Options.prototype.createOptionsWindow = function () {
    Zelda_Scene_Options_createOptionsWindow.call(this);
    this._optionsWindow.backOpacity = 0;
  };

  let Zelda_Scene_Menu_createStatusWindow =
    Scene_Menu.prototype.createStatusWindow;
  Scene_Menu.prototype.createStatusWindow = function () {
    Zelda_Scene_Menu_createStatusWindow.call(this);
    this._statusWindow.backOpacity = 0;
    this._statusWindow.hide();
  };
  let Zelda_Scene_Menu_createGoldWindow = Scene_Menu.prototype.createGoldWindow;
  Scene_Menu.prototype.createGoldWindow = function () {
    Zelda_Scene_Menu_createGoldWindow.call(this);
    this._goldWindow.backOpacity = 0;
  };

  let Zelda_Scene_File_createHelpWindow = Scene_File.prototype.createHelpWindow;
  Scene_File.prototype.createHelpWindow = function () {
    Zelda_Scene_File_createHelpWindow.call(this);
    this._helpWindow.backOpacity = 0;
  };

  let Zelda_Scene_File_createListWindow = Scene_File.prototype.createListWindow;
  Scene_File.prototype.createListWindow = function () {
    Zelda_Scene_File_createListWindow.call(this);
    this._listWindow.backOpacity = 0;
  };

  let Zelda_Scene_Menu_commandPersonal = Scene_Menu.prototype.commandPersonal;
  Scene_Menu.prototype.commandPersonal = function () {
    this._statusWindow.show();
    Zelda_Scene_Menu_commandPersonal.call(this);
  };

  let Zelda_Scene_Menu_onPersonalCancel = Scene_Menu.prototype.onPersonalCancel;
  Scene_Menu.prototype.onPersonalCancel = function () {
    this._statusWindow.hide();
    Zelda_Scene_Menu_onPersonalCancel.call(this);
  };

  let Zelda_Scene_Menu_commandFormation = Scene_Menu.prototype.commandFormation;
  Scene_Menu.prototype.commandFormation = function () {
    this._statusWindow.show();
    Zelda_Scene_Menu_commandFormation.call(this);
  };

  let Zelda_Scene_Menu_onFormationCancel =
    Scene_Menu.prototype.onFormationCancel;
  Scene_Menu.prototype.onFormationCancel = function () {
    this._statusWindow.hide();
    Zelda_Scene_Menu_onFormationCancel.call(this);
  };

  Scene_Menu.prototype.commandWindowRect = function () {
    return createRectangle();
  };

  Scene_Menu.prototype.statusWindowRect = function () {
    return createRectangle();
  };

  Scene_Options.prototype.optionsWindowRect = function () {
    return createRectangle();
  };

  Scene_GameEnd.prototype.commandWindowRect = function () {
    const ww = this.mainCommandWidth();
    const wh = this.calcWindowHeight(2, true);
    const wx = MENU.icons.x + (MENU.icons.w - ww) / 2;
    const wy = MENU.icons.y + (MENU.icons.h - wh) / 2;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_Menu.prototype.goldWindowRect = function () {
    const ww = this.mainCommandWidth();
    const wh = this.calcWindowHeight(1, true);
    const wx = this.isRightInputMode()
      ? MENU.icons.x + MENU.icons.w - ww + MENU.gold.x
      : MENU.icons.x + MENU.icons.w + MENU.gold.x;
    const wy = MENU.icons.y + MENU.icons.h - wh + MENU.gold.y;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_File.prototype.listWindowRect = function () {
    const wx = MENU.icons.x;
    const wy = this.mainAreaTop() + this._helpWindow.height;
    const ww = MENU.icons.w;
    const wh = MENU.icons.h - this._helpWindow.height;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_File.prototype.helpWindowRect = function () {
    const wx = MENU.icons.x;
    const wy = this.mainAreaTop();
    const ww = MENU.icons.w;
    const wh = this.calcWindowHeight(1, false);
    return new Rectangle(wx, wy, ww, wh);
  };

  function createRectangle() {
    const ww = MENU.icons.w;
    const wh = MENU.icons.h;
    const wx = MENU.icons.x;
    const wy = MENU.icons.y;
    return new Rectangle(wx, wy, ww, wh);
  }

  Window_StatusBase.prototype.drawActorSimpleStatus = function (actor, x, y) {
    const lineHeight = this.lineHeight();
    const x2 = x + 180;
    this.contents.fontSize = MENU.status.fontSize;
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x, y + lineHeight * 2);
    this.drawActorIcons(actor, x, y + lineHeight * 2);
    this.drawActorClass(actor, x, y + lineHeight * 1);
    this.placeBasicGauges(actor, x2, y);
  };

  Window_MenuStatus.prototype.gaugeLineHeight = function () {
    return MENU.status.fontSize;
  };

  Window_MenuCommand.prototype.maxCols = function () {
    return MENU.maxCols;
  };

  Window_MenuCommand.prototype.lineHeight = function () {
    return MENU.lineHeight;
  };

  Window_MenuStatus.prototype.lineHeight = function () {
    return MENU.status.fontSize;
  };
  // let Zelda_Window_MenuCommand_DrawItem =
  // Window_MenuCommand.prototype.drawItem;
  Window_MenuCommand.prototype.drawItem = function (index) {
    this.contents.fontSize = MENU.fontSize;

    const rect = this.itemLineRect(index);
    const align = this.itemTextAlign();
    const textY = rect.y + ImageManager.iconHeight;

    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, textY, rect.width, align);

    let x = rect.x + rect.width / 2 - ImageManager.iconWidth;
    let y = rect.y + this.colSpacing();
    this.drawIconPhone(index, x, y, 2);
  };

  Window_MenuCommand.prototype.drawIconPhone = function (index, x, y) {
    const symbol = this.commandSymbol(index);
    const iconList = MENU.icons.iconList;
    const icon = iconList[symbol];
    if (!icon) return this.drawIcon(iconList.default, x, y, SIZE);
    if (typeof icon === "number") {
      this.drawIcon(icon, x, y, SIZE);
    } else {
      const bitmap = ImageManager.loadSystem(PATH + icon);
      const w = bitmap.width;
      const h = bitmap.height;
      this.contents.blt(bitmap, 0, 0, w, h, x, y, SIZE, SIZE);
    }
  };

  Window_MenuCommand.prototype.drawIcon = function (
    iconIndex,
    x,
    y,
    size = ImageManager.iconWidth
  ) {
    const bitmap = ImageManager.loadSystem("IconSet");
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, size, size);
  };

  let Zelda_Scene_Boot_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
  Scene_Boot.prototype.loadSystemImages = function () {
    Zelda_Scene_Boot_loadSystemImages.call(this);

    ImageManager.loadSystem(PATH + MENU.bg);
    MENU.images.forEach((img) => ImageManager.loadSystem(PATH + img));
    let iconList = MENU.icons.iconList;
    for (icon in iconList) {
      let filename = iconList[icon];
      if (typeof filename !== "number")
        ImageManager.loadSystem(PATH + iconList[icon]);
    }
  };

  Window_MenuCommand.prototype.drawItemBackground = function (index) {
    if (MENU.icons.bg) {
      const rect = this.itemRect(index);
      this.drawBackgroundRect(rect);
    }
  };

  //=========================

  // Window_MenuCommand.prototype.addMainCommands = function () {
  //   const enabled = this.areMainCommandsEnabled();
  //   if (this.needsCommand("item")) {
  //     this.addCommand(TextManager.item, "item", enabled);
  //   }
  //   if (this.needsCommand("skill")) {
  //     this.addCommand(TextManager.skill, "skill", enabled);
  //   }
  //   if (this.needsCommand("equip")) {
  //     this.addCommand(TextManager.equip, "equip", enabled);
  //   }
  //   if (this.needsCommand("status")) {
  //     this.addCommand(TextManager.status, "status", enabled);
  //   }
  //   this.addCommand("Сменить фон", "gallery", enabled);
  //   this.addCommand("Карта", "maps", enabled);
  // };
  const Zelda_Window_MenuCommand_addOriginalCommands =
    Window_MenuCommand.prototype.addOriginalCommands;
  Window_MenuCommand.prototype.addOriginalCommands = function () {
    Zelda_Window_MenuCommand_addOriginalCommands.apply(this, arguments);
    this.addCommand("Сменить фон", "gallery");
    this.addCommand("Карта", "maps");
  };
  Scene_Menu.prototype.commandGallery = function () {
    SceneManager.push(Scene_Gallery);
  };

  Scene_Menu.prototype.commandMap = function () {
    SceneManager.push(Scene_MapMenu);
    // MK.Minimap.show();
  };

  function Scene_MapMenu() {
    this.initialize(...arguments);
  }

  Scene_MapMenu.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_MapMenu.prototype.constructor = Scene_MapMenu;

  Scene_MapMenu.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
  };

  Scene_MapMenu.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this._mapMenuWindow.backOpacity = 0;
  };

  Scene_MapMenu.prototype.stop = function () {
    Scene_MenuBase.prototype.stop.call(this);
    this._mapMenuWindow.close();
  };

  Scene_MapMenu.prototype.createBackground = function () {
    Scene_MenuBase.prototype.createBackground.call(this);
    // this.setBackgroundOpacity(128);

    this.createMinimap();
  };

  MK = {
    tileSize: 16,
    widthEval: 400 || Graphics.boxWidth * 0.3,
    heightEval: 400 || Graphics.boxHeight * 0.3,
    xEval: 30,
    yEval: 30,
  };
  Scene_MapMenu.prototype.createMinimap = function () {
    const targetWidth = eval(MK.widthEval);
    const targetHeight = eval(MK.heightEval);

    this._minimapSprite = new Spriteset_Minimap(targetWidth, targetHeight);
    this.addChild(this._minimapSprite);
  };

  Scene_MapMenu.prototype.createCommandWindow = function () {
    const rect = this.commandWindowRect();
    this._mapMenuWindow = new Window_MapMenu(rect);
    // this._mapMenuWindow.setHandler("toImage", this.commandToImage.bind(this));
    this._mapMenuWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._mapMenuWindow);
  };

  Scene_MapMenu.prototype.commandWindowRect = function () {
    return createRectangle();
  };

  // Scene_MapMenu.prototype.commandToImage = function (index) {
  //   this.changeBg(this._galleryWindow.index());
  //   this._galleryWindow.activate();
  // };

  function Scene_Gallery() {
    this.initialize(...arguments);
  }

  Scene_Gallery.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_Gallery.prototype.constructor = Scene_Gallery;

  Scene_Gallery.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
  };

  Scene_Gallery.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this._galleryWindow.backOpacity = 0;
  };

  Scene_Gallery.prototype.stop = function () {
    Scene_MenuBase.prototype.stop.call(this);
    this._galleryWindow.close();
  };

  Scene_Gallery.prototype.createBackground = function () {
    Scene_MenuBase.prototype.createBackground.call(this);
    this.setBackgroundOpacity(128);
  };

  Scene_Gallery.prototype.createCommandWindow = function () {
    const rect = this.commandWindowRect();
    this._galleryWindow = new Window_Gallery(rect);
    this._galleryWindow.setHandler("toImage", this.commandToImage.bind(this));
    this._galleryWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._galleryWindow);
  };

  Scene_Gallery.prototype.commandWindowRect = function () {
    return createRectangle();
  };

  Scene_Gallery.prototype.commandToImage = function (index) {
    this.changeBg(this._galleryWindow.index());
    this._galleryWindow.activate();
  };

  //===========================================================================
  // Window_Gallery
  //===========================================================================

  class Window_Gallery extends Window_Command {
    initialize(rect) {
      super.initialize(rect);
    }

    setup() {
      this.refresh();
      this.select(0);
    }

    makeCommandList() {
      MENU.images.forEach((img) => {
        this.addCommand(img, "toImage", true);
      });
      this.addCommand("Выйти", "cancel");
    }

    lineHeight() {
      return MENU.lineHeight;
    }

    maxCols() {
      return 4;
    }

    drawItem(index) {
      const rect = this.itemLineRect(index);
      const align = this.itemTextAlign();
      this.resetTextColor();
      this.changePaintOpacity(this.isCommandEnabled(index));
      this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
      this.drawImage(index, rect.x, rect.y, rect.width, align);
    }

    drawImage(index, x, y, width, align) {
      if (this.commandSymbol(index) === "toImage") {
        const filename = this.commandName(index);
        const bitmap = ImageManager.loadSystem(PATH + filename);
        const w = bitmap.width;
        const h = bitmap.height;
        this.contents.blt(bitmap, 0, 0, w, h, x, y, width, width);
      }
    }
  }
  class Window_MapMenu extends Window_Command {
    initialize(rect) {
      super.initialize(rect);
    }

    setup() {
      this.refresh();
      this.select(0);
    }

    makeCommandList() {
      // MENU.images.forEach((img) => {
      //   this.addCommand(img, "toImage", true);
      // });
      this.addCommand("Выйти", "cancel");
    }

    lineHeight() {
      return MENU.lineHeight;
    }

    maxCols() {
      return 4;
    }

    // drawItem(index) {
    //   const rect = this.itemLineRect(index);
    //   const align = this.itemTextAlign();
    //   this.resetTextColor();
    //   this.changePaintOpacity(this.isCommandEnabled(index));
    //   this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
    //   this.drawImage(index, rect.x, rect.y, rect.width, align);
    // }

    // drawImage(index, x, y, width, align) {
    //   if (this.commandSymbol(index) === "toImage") {
    //     const filename = this.commandName(index);
    //     const bitmap = ImageManager.loadSystem(PATH + filename);
    //     const w = bitmap.width;
    //     const h = bitmap.height;
    //     this.contents.blt(bitmap, 0, 0, w, h, x, y, width, width);
    //   }
    // }
  }

  // =====================================================================================
  // Spriteset Minimap
  // =====================================================================================

  function Spriteset_Minimap() {
    this.initialize(...arguments);
  }

  // if (typeof Sprite_Clickable !== "undefined") {
  Spriteset_Minimap.prototype = Object.create(Sprite_Clickable.prototype);
  Spriteset_Minimap.prototype.constructor = Sprite_Clickable;
  // } else {
  // Spriteset_Minimap.prototype = Object.create(Sprite.prototype);
  // Spriteset_Minimap.prototype.constructor = Sprite;
  // }

  Spriteset_Minimap.prototype.initialize = function (width, height) {
    // if (typeof Sprite_Clickable !== "undefined") {
    Sprite_Clickable.prototype.initialize.call(this);
    // } else {
    // Sprite.prototype.initialize.call(this);
    // }

    this.width = width;
    this.height = height;

    this.createBackground();
    this.createMap();
    this.createEvents();
    this.update();
  };

  Spriteset_Minimap.prototype.createMap = function () {
    console.log($gameMap.width(), MK.tileSize);
    this.mapSprite = new Sprite_Minimap(
      $gameMap.width() * MK.tileSize,
      $gameMap.height() * MK.tileSize
    );
    this.addChild(this.mapSprite);
  };

  Spriteset_Minimap.prototype.createEvents = function () {
    // $gameMap
    //   .events()
    //   .map((event) => new Sprite_Minimap_Event(event))
    //   .forEach((sprite) => this.mapSprite.addChild(sprite));
    // const boatSprite = new Sprite_Minimap_Vehicle($gameMap.boat(), "boat");
    // const shipSprite = new Sprite_Minimap_Vehicle($gameMap.ship(), "ship");
    // const airshipSprite = new Sprite_Minimap_Vehicle(
    //   $gameMap.airship(),
    //   "airship"
    // );
    // const playerSprite = new Sprite_Minimap_Player();
    // this.mapSprite.addChild(boatSprite);
    // this.mapSprite.addChild(shipSprite);
    // this.mapSprite.addChild(airshipSprite);
    // this.mapSprite.addChild(playerSprite);
  };

  Spriteset_Minimap.prototype.createBackground = function () {
    if ("MZ" == Utils.RPGMAKER_NAME) {
      const rectangle = new Rectangle(0, 0, this.width, this.height);
      this.background = new Window_Base(rectangle);
    } else {
      this.background = new Window_Base(0, 0, this.width, this.height);
    }
    this.addChild(this.background);
  };

  Spriteset_Minimap.prototype.update = function () {
    if (typeof Sprite_Clickable !== "undefined") {
      Sprite_Clickable.prototype.update.call(this);
    } else {
      Sprite.prototype.update.call(this);
    }

    this.updateMain();
    this.updateMapScaleAndPosition();
  };

  Spriteset_Minimap.prototype.updateMain = function () {
    const scene = SceneManager._scene;
    const targetWidth = eval(MK.widthEval);
    const targetHeight = eval(MK.heightEval);

    const x = MK.xEval;
    const y = MK.yEval;

    this.move(x, y);
    this.width = targetWidth;
    this.height = targetHeight;
    this.opacity = 1;
    this.visible = true;
  };

  Spriteset_Minimap.prototype.updateMapScaleAndPosition = function () {
    const scale = Math.min(
      (this.width - 2 * this.padding()) / ($gameMap.width() * MK.tileSize),
      (this.height - 2 * this.padding()) / ($gameMap.height() * MK.tileSize)
    );
    this.mapSprite.scale.x = scale;
    this.mapSprite.scale.y = scale;

    const x =
      Math.floor(
        (this.width -
          2 * this.padding() -
          this.mapSprite.width * this.mapSprite.scale.x) /
          2
      ) + this.padding();
    const y =
      Math.floor(
        (this.height -
          2 * this.padding() -
          this.mapSprite.height * this.mapSprite.scale.y) /
          2
      ) + this.padding();
    this.mapSprite.move(x, y);
  };

  Spriteset_Minimap.prototype.padding = function () {
    if ("MZ" == Utils.RPGMAKER_NAME) {
      return $gameSystem.windowPadding();
    } else {
      // MV
      return Window_Base.prototype.standardPadding.call(this);
    }
  };

  // =====================================================================================
  // Sprite Minimap
  // =====================================================================================

  function Sprite_Minimap() {
    this.initialize(...arguments);
  }

  Sprite_Minimap.prototype = Object.create(Sprite.prototype);
  Sprite_Minimap.prototype.constructor = Sprite;

  Sprite_Minimap.prototype.initialize = function (width, height) {
    const bitmap = new Bitmap(width, height);
    Sprite.prototype.initialize.call(this, bitmap);

    this.setup();
  };

  Sprite_Minimap.prototype.setup = function () {
    this.tilesetId = $gameMap.tilesetId();
    this.tilesetNames = $dataTilesets[this.tilesetId].tilesetNames;
    this.tilesetBitmaps = this.tilesetNames.map((name) =>
      name ? ImageManager.loadTileset(name) : null
    );

    for (let bitmap of this.tilesetBitmaps.filter(Boolean)) {
      bitmap.addLoadListener(this.onTilesetBitmapLoaded.bind(this));
    }
  };

  Sprite_Minimap.prototype.onTilesetBitmapLoaded = function () {
    if ($dataMap && this.isReady()) {
      this.createTilemap();
    }
  };

  Sprite_Minimap.prototype.createTilemap = function () {
    this.bitmap.clear();

    for (let x = 0; x < $dataMap.width; x++) {
      for (let y = 0; y < $dataMap.height; y++) {
        this.drawSpot(x, y);
      }
    }
  };

  Sprite_Minimap.prototype.drawSpot = function (x, y) {
    this.bitmap.clearRect(
      x * MK.tileSize,
      y * MK.tileSize,
      MK.tileSize,
      MK.tileSize
    );
    for (let z = 0; z < 4; z++) {
      const tileId = $gameMap.tileId(x, y, z);

      if (Tilemap.isTileA5(tileId)) this.drawTileA5(tileId, x, y);
      else if (Tilemap.isAutotile(tileId)) this.drawAutotile(tileId, x, y);
      else if (tileId) this.drawBTile(tileId, x, y);
    }
  };

  Sprite_Minimap.prototype.drawAutotile = function (tileId, x, y) {
    const w = MK.tileSize;
    const h = MK.tileSize;
    const w1 = w / 2;
    const h1 = h / 2;
    const kind = Tilemap.getAutotileKind(tileId);
    const shape = Tilemap.getAutotileShape(tileId);
    const tx = kind % 8;
    const ty = Math.floor(kind / 8);
    let autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
    let tilesetNumber, bx, by;

    if (Tilemap.isTileA1(tileId)) {
      tilesetNumber = 0;
      const waterSurfaceIndex = 0;

      if (kind == 0) {
        bx = waterSurfaceIndex * 2;
        by = 0;
      } else if (kind == 1) {
        bx = waterSurfaceIndex * 2;
        by = 3;
      } else if (kind == 2) {
        bx = 6;
        by = 0;
      } else if (kind == 3) {
        bx = 6;
        by = 3;
      } else {
        bx = Math.floor(tx / 4) * 8;
        by = ty * 6 + (Math.floor(tx / 2) % 2) * 3;

        if (kind % 2 == 0) {
          bx += waterSurfaceIndex * 2;
        } else {
          bx += 6;
          autotileTable = Tilemap.WATERFALL_AUTOTILE_TABLE;
        }
      }
    }
    if (Tilemap.isTileA2(tileId)) {
      tilesetNumber = 1;
      bx = tx * 2;
      by = (ty - 2) * 3;
    }
    if (Tilemap.isTileA3(tileId)) {
      tilesetNumber = 2;
      bx = tx * 2;
      by = (ty - 6) * 2;
      autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
    }
    if (Tilemap.isTileA4(tileId)) {
      tilesetNumber = 3;
      bx = tx * 2;
      by = Math.floor((ty - 10) * 2.5 + (ty % 2 === 1 ? 0.5 : 0));
      if (ty % 2 === 1) {
        autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
      }
    }

    for (let i = 0; i < 4; i++) {
      const qsx = autotileTable[shape][i][0];
      const qsy = autotileTable[shape][i][1];
      const sx = (bx * 2 + qsx) * w1;
      const sy = (by * 2 + qsy) * h1;
      const dx = (i % 2) * w1 + w * x;
      const dy = Math.floor(i / 2) * h1 + h * y;

      this.blt(tilesetNumber, sx, sy, w1, h1, dx, dy);
    }
  };

  Sprite_Minimap.prototype.drawTileA5 = function (tileId, x, y) {
    this.drawNormalTile(4, tileId, x, y);
  };

  Sprite_Minimap.prototype.drawBTile = function (tileId, x, y) {
    const tilesetNumber = Math.floor(tileId / 256) + 5;
    this.drawNormalTile(tilesetNumber, tileId, x, y);
  };

  Sprite_Minimap.prototype.drawNormalTile = function (
    tilesetNumber,
    tileId,
    x,
    y
  ) {
    const w = MK.tileSize;
    const h = MK.tileSize;
    const sx = ((Math.floor(tileId / 128) % 2) * 8 + (tileId % 8)) * w;
    const sy = (Math.floor((tileId % 256) / 8) % 16) * h;

    this.blt(tilesetNumber, sx, sy, w, h, w * x, h * y);
  };

  Sprite_Minimap.prototype.blt = function (
    tilesetNumber,
    sx,
    sy,
    w,
    h,
    dx,
    dy
  ) {
    const tilesetBitmap = this.tilesetBitmaps[tilesetNumber];

    this.bitmap.blt(tilesetBitmap, sx, sy, w, h, dx, dy);
  };

  Sprite_Minimap.prototype.isReady = function () {
    return (
      this.tilesetBitmaps &&
      this.tilesetBitmaps.every((bitmap) => !bitmap || bitmap.isReady())
    );
  };
})();

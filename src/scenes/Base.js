class Base extends Phaser.Scene {
    constructor(SceneName)
    {
        super(SceneName);
    }
    preload()
    {
        this.load.audio("hurt", "assets/hurt.wav");
        this.load.audio("pickupKey", "assets/pickupKey.wav");
        this.load.audio("pickupSeed", "assets/pickupSeed.wav");
        this.load.audio("timeTravel", "assets/timeTravelSFX.wav");
        this.load.audio("doorUnlock", "assets/doorUnlock.mp3");
        this.load.spritesheet("player", "assets/testplayer.png", {frameWidth: 24, frameHeight: 72, startFrame: 0, endFrame: 27});
        //walking right animation - frames: [0-7]
        //walking left animation - frames: [8 - 15]
        //pickup right animation - frames: [16 -19]
        //pickup left animation - frames: [20 - 23]
        //climbing animation - frames: [24 - 27]
        this.load.spritesheet("plain", "assets/testplain.png", {frameWidth: 32, frameHeight: 100, startFrame: 0, endFrame: 3});
        this.load.spritesheet("ladder", "assets/testladder.png", {frameWidth: 32, frameHeight: 120, startFrame: 0, endFrame: 1});
        this.load.image("inventory", "assets/testInventory.png");
        this.load.image("key", "assets/testKey.png");
        this.load.image("door", "assets/testdoor.png");
        this.load.image("seed", "assets/testseed.png");
        this.load.image("tree", "assets/testtree.png");
        this.load.image("background", "assets/towerpresent.png");
        this.load.image("switch", "assets/switch.png");
        this.load.spritesheet("enemy", "assets/testenemy.png", {frameWidth: 24, frameHeight: 72, startingFrame: 0, endFrame: 1});
        this.load.spritesheet("timeTravelVFX", "assets/timeTravelVFX.png", {frameWidth: 960, frameHeight: 720, startingFrame: 0, endFrame: 11});
    }

}
/**
 * 引动页面
 */
var bootState = function (game) {

    this.init = function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.stage.setBackgroundColor(0xffffff);
        game.scale.pageAlignVertically = true;
        game.scale.pageAlignHorizontally = true;
    }
    this.preload = function () {
        game.load.image('loading', 'images/loading.png');
        game.load.image('loading_line', 'images/loading_line.png');
        game.load.image('logo', 'images/logo.png');
        game.load.atlasXML('yuan', 'images/elf-yuan/yuan.png', 'images/elf-yuan/yuan.xml')
    }
    this.create = function () {
        game.state.start('loader');
    }
}
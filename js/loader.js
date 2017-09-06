/**
 * 加载资源
 */
var loaderState = function (game) {
    var loading_line, log
    this.init = function() {
        // 添加logo
        game.add.image(game.world.centerX / 1.9, game.world.centerY / 5, 'logo');
        // 添加进图条
        loading_line = game.add.tileSprite(60, game.world.centerY + 260, 500, 10, 'loading_line')
        // 创建组
        log = game.add.group()
        // 添加成员
        game.add.image(60, game.world.centerY + 200, 'loading', 0, log);
        progressText = game.add.text(70, game.world.centerY + 170, '0%', { fill: '#666', fontSize: '25px' }, log);
        var yuan = game.add.sprite(63, game.world.centerY + 204, 'yuan', 0, log);
        yuan.animations.add('tidy', ['01.png', '02.png', '03.png']);
        yuan.play('tidy', 10, true);

    }
    this.preload = function() {
        game.load.image('map', 'images/map.jpg');
        game.load.atlasXML('tel', 'images/elf-tel/tel.png', 'images/elf-tel/tel.xml')
        game.load.atlasXML('person', 'images/elf-person/person.png', 'images/elf-person/person.xml');
        game.load.atlasXML('hand', 'images/elf-hand/hand.png', 'images/elf-hand/hand.xml');
        game.load.atlasXML('xiaoren', 'images/elf-xiaoren/xiaoren.png', 'images/elf-xiaoren/xiaoren.xml')
        game.load.atlasXML('bell', 'images/elf-bell/bell.png', 'images/elf-bell/bell.xml')
        game.load.atlasXML('bird', 'images/elf-bird/bird.png', 'images/elf-bird/bird.xml')
        game.load.atlasXML('fire', 'images/elf-fire/fire.png', 'images/elf-fire/fire.xml')
        game.load.atlasXML('fireMap', 'images/elf-fireMap/fire.png', 'images/elf-fireMap/fire.xml')
        game.load.atlasXML('banner', 'images/elf-banner/banner.png', 'images/elf-banner/banner.xml')
        game.load.atlasXML('turn', 'images/elf-turn/turn.png', 'images/elf-turn/turn.xml')
        game.load.atlasXML('crown', 'images/elf-crown/crown.png', 'images/elf-crown/crown.xml')
        game.load.atlasXML('light1', 'images/elf-light1/light.png', 'images/elf-light1/light.xml')
        game.load.atlasXML('light2', 'images/elf-light2/light.png', 'images/elf-light2/light.xml')
        game.load.atlasXML('pool', 'images/elf-pool/pool.png', 'images/elf-pool/pool.xml')
        game.load.atlasXML('molecule', 'images/elf-molecule/molecule.png', 'images/elf-molecule/molecule.xml')
        game.load.atlasXML('shuttle1', 'images/elf-shuttle1/shuttle.jpg', 'images/elf-shuttle1/shuttle.xml')
        game.load.atlasXML('shuttle2', 'images/elf-shuttle2/shuttle.jpg', 'images/elf-shuttle2/shuttle.xml')
        game.load.atlasXML('shuttle3', 'images/elf-shuttle3/shuttle.jpg', 'images/elf-shuttle3/shuttle.xml')
        game.load.atlasXML('bgIcon', 'images/elf-bgm/bgm.png', 'images/elf-bgm/bgm.xml')
        game.load.audio('tel_mp3', ['images/audio/telMp3.mp3', 'images/audio/telMp3.ogg', 'images/audio/telMp3.wav'])
        game.load.audio('returnMp3', ['images/audio/returnMp3.mp3', 'images/audio/returnMp3.ogg', 'images/audio/returnMp3.wav'])
        game.load.audio('photogMp3', ['images/audio/photogMp3.mp3', 'images/audio/photogMp3.ogg', 'images/audio/telMp3.wav'])
        game.load.audio('bellMp3', ['images/audio/bellMp3.mp3', 'images/audio/bellMp3.ogg', 'images/audio/telMp3.wav'])
        game.load.audio('bg_mp3', ['images/audio/bg_Mp3.mp3', 'images/audio/bg_Mp3.ogg'])
        game.load.audio('stateMp3', ['images/audio/stateMp3.mp3', 'images/audio/stateMp3.ogg'])
        game.load.image('glass', 'images/glass.png');
        game.load.image('cloud', 'images/cloud.png');
        game.load.image('click', 'images/click.png');
        game.load.image('click1', 'images/click1.png');
        game.load.image('return', 'images/return.png');
        game.load.image('popup', 'images/popup.png');
        game.load.image('left', 'images/left.png');
        game.load.image('right', 'images/right.png');
        game.load.image('shadow', 'images/shadow.png');
        game.load.image('returnMap', 'images/returnMap.png');
        game.load.image('hintMap', 'images/hintMap.png');
        game.load.image('hintReturn', 'images/hintReturn.png');
        game.load.image('hint', 'images/hint.png');
        game.load.image('a01-01', 'images/01-01.jpg');
        game.load.image('a01-02', 'images/01-02.jpg');
        game.load.image('a01-03', 'images/01-03.jpg');
        game.load.image('a01-04', 'images/01-04.jpg');
        game.load.image('a01-05', 'images/01-05.jpg');
        game.load.image('a01-06', 'images/01-06.jpg');
        game.load.image('a01-07', 'images/01-07.jpg');
        game.load.image('a01-08', 'images/01-08.png');
        game.load.image('a01-09', 'images/01-09.jpg');
        game.load.image('b02-01', 'images/02-01.jpg');
        game.load.image('b02-02', 'images/02-02.jpg');
        game.load.image('b02-03', 'images/02-03.jpg');
        game.load.image('b02-04', 'images/02-04.jpg');
        game.load.image('b02-05', 'images/02-05.jpg');
        game.load.image('c03-01', 'images/03-01.jpg');
        game.load.image('c03-02', 'images/03-02.jpg');
        game.load.image('c03-03', 'images/03-03.jpg');
        game.load.image('c03-04', 'images/03-04.jpg');
        game.load.image('c03-05', 'images/03-05.jpg');
        game.load.image('c03-06', 'images/03-06.jpg');
        game.load.image('c03-07', 'images/03-07.jpg');
        game.load.image('d04-01', 'images/04-01.jpg');
        game.load.image('d04-02', 'images/04-02.jpg');
        game.load.image('d04-03', 'images/04-03.jpg');
        game.load.image('d04-04', 'images/04-04.jpg');
        game.load.image('e05-01', 'images/05-01.jpg');
        game.load.image('e05-02', 'images/05-02.jpg');
        game.load.image('e05-03', 'images/05-03.jpg');
        game.load.image('e05-04', 'images/05-04.jpg');
        game.load.image('e05-05', 'images/05-05.png');
        game.load.image('f06-01', 'images/06-01.jpg');
        game.load.image('f06-02', 'images/06-02.jpg');
        game.load.image('f06-03', 'images/06-03.jpg');
        game.load.image('f06-04', 'images/06-04.jpg');
        game.load.image('f06-05', 'images/06-05.jpg');
        game.load.image('f06-06', 'images/06-06.jpg');
        game.load.image('f06-07', 'images/06-07.jpg');
        game.load.image('f06-08', 'images/06-08.jpg');
        game.load.image('j07-01', 'images/07-01.jpg');
        game.load.image('j07-02', 'images/07-02.jpg');
        game.load.image('j07-03', 'images/07-03.jpg');
        game.load.image('j07-04', 'images/07-04.jpg');
        game.load.image('j07-05', 'images/07-05.jpg');
        game.load.image('j07-06', 'images/07-06.png');
        game.load.onFileComplete.add(function (progress) {
            progressText.text = progress + '%';
            log.x += 5.5
            loading_line.autoScroll(20, 0)
        });
    }
    this.create = function() {
        shareOption({
            title: '富春江集团企业文化动画展示',
            link: 'http://saas.zeego.cn/project/FCJGroup/FCJ',
            pic: 'http://saas.zeego.cn/project/FCJGroup/FCJ/images/share_logo.jpg',
            desc: '这个“主题公园”向你呈现富春江集团“实”的企业文化',
            success: function () {
                // 成功回调
            },
            cancel: function () {
                // 失败回调
            }
        })
        game.state.add('menu', menuState)
        game.state.start('menu');

        // game.state.add('main1', main1State)
        // game.state.start('main1')
        // game.state.add('main2', main2State)
        // game.state.start('main2')
        // game.state.add('main3', main3State)
        // game.state.start('main3')
        // game.state.add('main4', main4State)
        // game.state.start('main4')
        // game.state.add('main5', main5State)
        // game.state.start('main5')
        // game.state.add('main6', main6State)
        // game.state.start('main6')
        // game.state.add('main7', main7State)
        // game.state.start('main7')
    }

}
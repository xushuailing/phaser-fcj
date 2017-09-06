let game = new Phaser.Game(640, 1008, Phaser.AUTO, 'container')

var renPosition = { x: 370, y: 415, t: 1, k: 0 }
game.state.add('boot', bootState)
game.state.add('loader', loaderState)
game.state.start('boot')

/* 背景音乐 */
var bgMp3, bgIcon,flag,isPause
function bgmFun() {
    if (!flag) { // 防止重复调用
        bgMp3 = game.add.audio('bg_mp3')
        bgMp3.play('', 0, .5, true) // 播放背景音乐
        flag = true
    }
    var sum = 0
    bgIcon = game.add.image(game.width - 78, 26, 'bgIcon')
    bgIcon.inputEnabled = true;
    bgIcon.bringToTop()
    bgIcon.events.onInputUp.add(function () { // 改变音乐图片状态
        sum++
        if (sum % 2 == 1) { // 暂定播放
            bgIcon.frame = 24
            bgIcon.animations.stop('bgIcon')
            bgMp3.pause()
            isPause = true
        } else if (sum % 2 == 0) { // 恢复播放
            bgIcon.animations.add('bgIcon', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23])
            bgIcon.animations.play('bgIcon', 10, true)
            bgMp3.resume()
            isPause = false
        }
    })
    if (!isPause) {
        bgIcon.animations.add('bgIcon', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23])
        bgIcon.animations.play('bgIcon', 10, true)// 开启背景音乐图标动画
    }else{
        sum++
        bgIcon.frame = 24
    }
}
/* 调位置 */
/* function key(name) {
    name.inputEnabled = true;
    name.input.enableDrag();
    name.events.onDragStop.add(function () {
        console.log("x:" + name.x + "," + name.y);
    }, this);
} */
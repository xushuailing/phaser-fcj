var menuState = function (game) {
    var popUpIs, position, map, time
    this.create = function() {

        /* 添加地图 */
        map = game.add.image(0, 0, 'map')
        // bgMp3 = game.add.audio('bg_mp3')
        /* 创建小人 */
        var xiaoren = game.add.sprite(renPosition.x, renPosition.y, 'xiaoren', renPosition.t)
        xiaoren.inputEnabled = true;
        map.addChild(xiaoren)
        xiaoren.input.priorityID = 4

        /* 开始弹框只出现一次 */
        if (!popUpIs) {
            var popUp = game.add.sprite(0, 0, 'popup')
            popUp.inputEnabled = true
            popUp.input.priorityID = 3
            popUp.events.onInputUp.add(function () {
                popUp.destroy() //杀死提示
                var hintMap = game.add.image(0, 0, 'hintMap')
                hintMap.inputEnabled = true
                hintMap.input.priorityID = 3
                var hintMapClick = game.add.image(170, 852, 'click')
                hintMapClick.inputEnabled = true
                hintMapClick.input.priorityID = 4
                hintMapClick.scale.set(6, 1.5)
                hintMapClick.events.onInputUp.add(function () {
                    hintMap.destroy() // 杀死指示
                    hintMapClick.destroy() // 杀死指示按钮
                    popUpIs = true // 防止下一次进入
                    bgmFun() // 添加背景音乐
                })
            })
        } else {
            bgmFun() // 添加背景音乐
        }

        /* 云 */
        var cloud = game.add.sprite(2, 257, 'cloud')
        game.add.tween(cloud).to({ x: 140, y: 195 }, 2200, 'Linear', true, 1, 99999, true)
        map.addChild(cloud)

        /* 国旗动画 */
        var banner = game.add.sprite(42, 1042, 'banner')
        banner.animations.add('banner', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
        banner.animations.play('banner', 10, true)
        map.addChild(banner)
        /* 火炬的火 */
        var fireMap = game.add.sprite(208, 625, 'fireMap')
        fireMap.animations.add('fireMap', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
        fireMap.animations.play('fireMap', 10, true)
        map.addChild(fireMap)
        /* 转盘 */
        var turn = game.add.sprite(398, 230, 'turn')
        turn.animations.add('turn', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21])
        turn.animations.play('turn', 5, true)
        map.addChild(turn)

        /* 皇冠 */
        var crown = game.add.sprite(401, 907, 'crown')
        crown.animations.add('crown', [0, 1, 2, 3, 4, 5, 6, 7, 8])
        crown.animations.play('crown', 5, true)
        map.addChild(crown)

        /* 红绿灯1 */
        var light1 = game.add.sprite(221, 548, 'light1')
        light1.animations.add('light1', [0, 1, 2])
        light1.animations.play('light1', 2, true)
        map.addChild(light1)

        /* 红绿灯2 */
        var light2 = game.add.sprite(160, 515, 'light2')
        light2.animations.add('light2', [0, 1, 2])
        light2.animations.play('light2', 2, true)
        map.addChild(light2)
        /* 红绿灯3 */
        var light3 = game.add.sprite(160, 1451, 'light1')
        light3.animations.add('light1', [0, 1, 2])
        light3.animations.play('light1', 2, true)
        map.addChild(light3)

        /* 红绿灯4 */
        var light4 = game.add.sprite(15, 1444, 'light2')
        light4.animations.add('light2', [0, 1, 2])
        light4.animations.play('light2', 2, true)
        map.addChild(light4)

        /* 喷泉 */
        var pool = game.add.sprite(526, 786, 'pool')
        pool.animations.add('pool', [0, 1, 2, 3, 4, 5, 6, 7, 8])
        pool.animations.play('pool', 3, true)
        map.addChild(pool)

        /* 玻璃 */
        var glass = game.add.sprite(410, 1489, 'glass')
        game.add.tween(glass).to({ alpha: 0 }, 1000, 'Linear', true, 1, 99999, true)
        map.addChild(glass)

        /* 分子 */
        var molecule = game.add.sprite(200, 1980, 'molecule')
        molecule.animations.add('molecule', [0, 1])
        molecule.animations.play('molecule', 5, true)
        map.addChild(molecule)




        /* 点击场景事件 */
        map.inputEnabled = true;
        map.input.allowHorizontalDrag = false
        map.input.enableDrag()
        var area1 = game.add.sprite(50, 440, 'click')
        var area2 = game.add.sprite(285, 670, 'click')
        var area3 = game.add.sprite(330, 755, 'click')
        var area4 = game.add.sprite(380, 1000, 'click')
        var area5 = game.add.sprite(264, 1207, 'click')
        var area6 = game.add.sprite(344, 1420, 'click')
        var area7 = game.add.sprite(378, 1718, 'click')
        // map.addChild(area1)
        /* 设置拖动地图是防止场景触发 */
        var isDoubleTap;
        game.input.onTap.add(addSprite, this);
        function addSprite(pointer, doubleTap) {

            if (!doubleTap) {
                isDoubleTap = 1;
            }
        };

        /* 场景事件函数 */
        function foo(name, angle, scaleX, scaleY, callBack) {
            var flag = false
            map.addChild(name)
            name.inputEnabled = true
            name.input.priorityID = 2;
            name.events.onInputUp.add(function () {
                if (game.input.activePointer.isUp) {
                    game.time.events.remove(time)
                }
                if (isDoubleTap == 1 && flag) {
                    callBack()
                }
            }, this)

            name.events.onInputDown.add(function () {

                if (game.input.activePointer.isDown) {
                    var Y = map.y
                    time = game.time.events.loop(10, function () {
                        if (game.input.activePointer.duration < 200) {
                            flag = true
                        } else {
                            flag = false
                        }
                        var a = game.input.pointer1.positionDown.y - game.input.pointer1.y
                        map.y = -a + Y
                    }, this);
                }
            })
            name.angle = angle
            name.scale.set(scaleX, scaleY)
        }
        // 场景1
        foo(area1, -30, 5, 3, function () {

            game.state.add('main1', main1State)
            game.state.start('main1')
        })

        // 场景2
        foo(area2, -62, 3, 4, function () {
            game.state.add('main2', main2State)
            game.state.start('main2')
        })
        // 场景3
        foo(area3, 60, 3, 4, function () {
            game.state.add('main3', main3State)
            game.state.start('main3')
        })


        // 场景4
        foo(area4, 30, 4, 4, function () {
            game.state.add('main4', main4State)
            game.state.start('main4')
        })

        // 场景5
        foo(area5, 60, 3, 4, function () {
            game.state.add('main5', main5State)
            game.state.start('main5')
        })

        // 场景6
        foo(area6, 30, 4, 4, function () {
            game.state.add('main6', main6State)
            game.state.start('main6')
        })

        // 场景7
        foo(area7, 60, 5, 6, function () {
            game.state.add('main7', main7State)
            game.state.start('main7')
        })



    }
    this.update = function() {

        if (renPosition.r == 1) {
            map.y = 0
            renPosition.r = 0
        } else if (renPosition.r == 3) {
            map.y = -400
            renPosition.r = 0
        } else if (renPosition.r == 4) {
            map.y = -600
            renPosition.r = 0
        } else if (renPosition.r == 5) {
            map.y = -800
            renPosition.r = 0
        } else if (renPosition.r == 6) {
            map.y = -1000
            renPosition.r = 0
        } else if (renPosition.r == 7) {
            map.y = -1080
            renPosition.r = 0
        }
        if (game.input.activePointer.isUp) {
            if (map.y >= 0) {
                if (map.y == 0) {
                    game.input.activePointer.isUp = false
                    return
                }
                if (map.y <= 50) {
                    map.y = 0
                    return
                }
                map.y -= 50
            }
            if (map.y <= -1080) {
                if (map.y == -1080) {
                    game.input.activePointer.isUp = false
                    return
                }
                if (map.y >= -1080 - 50) {
                    map.y = -1080
                    return
                }
                map.y -= -50
            }
        }
    }
}
var common = {
    person: function () { // 创建人物对象
        person = game.add.sprite(0, 250, 'person')
        return person
    },
    closeButton: function () { // 创建返回场景对象
        closeButton = game.add.sprite(0, 0, 'return')
        closeButton.inputEnabled = true
        closeButton.input.priorityID = 1  // 优先级
        return closeButton
    },
    returnMap: function () { // 创建返回地图对
        returnMap = game.add.sprite(0, 0, 'returnMap')
        returnMap.inputEnabled = true
        return returnMap
    },
    shadow: function () { // 人物影子
        shadow = game.add.image(game.world.centerX / 2, 900, 'shadow')
        return shadow
    },
    return: function (X, Y, T, R) { // 返回地图事件
        returnMap.events.onInputDown.add(function () {
            common.returnMp3() // 返回音乐
            game.state.start('menu');
            renPosition = {
                x: X, // x坐标
                y: Y, // y坐标
                t: T, // 小人朝向
                r: R // 场景数
            }
        })
    },
    shiftPerson: function (map, width, main, mainState, callBack) { // 左右按钮
        left = game.add.image(0, game.world.centerY, 'left')
        right = game.add.image(640 - 119, game.world.centerY, 'right')
        left.inputEnabled = true
        right.inputEnabled = true
        left.events.onInputDown.add(function () {
            person.animations.add('left', ['09.png', '10.png', '11.png', '12.png', '13.png', '14.png'])
            person.play('left', 7, true) // 开启动画
            person.x = -60 // 改变人的位置
            leftTime = game.time.events.loop(100, function () {
                if (callBack) {
                    callBack()
                }
                if (map.x >= 0) {
                    map.x += 0
                    return
                }
                map.x += 20
            }, this);
        }, this)
        left.events.onInputUp.add(function () {
            person.animations.stop('left')
            person.frame = 7
            game.time.events.remove(leftTime);
        }, this)
        right.events.onInputDown.add(function () {
            person.animations.add('right', ['02.png', '03.png', '04.png', '05.png', '06.png', '07.png'])
            person.play('right', 7, true) // 开启动画
            person.x = 0 // 改变人的位置
            var sum = 0
            rightTime = game.time.events.loop(100, function () {
                // 回调函数
                if (callBack) {
                    callBack()
                }
                // 人物走到最后
                if (map.x <= -width + game.world.width) {
                    map.x += 0
                    sum++

                    if (sum == 10) { // 切换下一个场景
                        if (main == 'menu' && !mainState) { //场景7返回地图
                            game.state.start(main)
                            renPosition = {
                                x: 431, // x坐标
                                y: 1908, // y坐标
                                t: 1, // 小人朝向
                                r: 7 // 场景数
                            }
                            return
                        }
                        game.state.add(main, mainState)
                        game.state.start(main)
                    }
                    if (sum == 1 && isHint == 1) { // 第一次提示指示
                        game.time.events.remove(rightTime);
                        var hintReturn = game.add.image(0, 0, 'hintReturn')
                        hintReturn.inputEnabled = true
                        hintReturn.input.priorityID = 3
                        var hintReturnClick = game.add.image(170, 815, 'click')
                        hintReturnClick.inputEnabled = true
                        hintReturnClick.input.priorityID = 4
                        hintReturnClick.scale.set(6, 1.5)
                        hintReturnClick.events.onInputUp.add(function () {
                            hintReturn.destroy()
                            hintReturnClick.destroy()
                            isHint++
                        })
                    }
                    return
                }
                map.x += -20

                // console.log('map.x'+map.x);
                // console.log(map.width);
            }, this);

        }, this)
        right.events.onInputUp.add(function () {
            person.frame = 0
            person.animations.stop('right')
            game.time.events.remove(rightTime);
        }, this)
    },
    hide_R_L: function () { // 显示隐藏左右按钮
        left.visible = !left.visible
        right.visible = !right.visible
        returnMap.visible = !returnMap.visible
        closeButton.inputEnabled = true
        person.visible = !person.visible
        shadow.visible = !shadow.visible
    },
    alpha_visible: function (name) { // 默认隐藏对象
        name.alpha = 0
        name.visible = false
    },
    Tween: function (name, boole) { // 补间动画
        if (boole) {
            return game.add.tween(name).to({ alpha: 1, visible: true }, 500, 'Linear', true)
        } else {
            return game.add.tween(name).to({ alpha: 0, visible: false }, 500, 'Linear', true)
        }
    },
    PrintText: function (textObj, content, callBack, callBack1) { // 文字打印效果
        var i = 0
        game.time.events.repeat(50, content.length, function () {
            i++
            textObj.text = content.substr(0, i)
            if (callBack1) {
                if (textObj.text.length == Math.round(content.length / 2)) {
                    callBack1()
                }
            }
            if (callBack) {
                if (textObj.text.length == content.length) {
                    callBack()
                }
            }

        }, this);
    },
    throughTween: function (name, scene, sum, callBack, callBack1) { // 虫洞动画
        returnMap.inputEnabled = false // 关闭返回地图按键
        // person.frame = 14 // 设置人物显示姿势
        var speed = 0 // 动画速度
        if (scene == 1 || scene == 3) {
            var shuttle = game.add.sprite(0, 0, 'shuttle1') // 创建图片
            shuttle.animations.add(shuttle, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])
            shuttle.scale.set(2, 2)
            speed = 13
        } else if (scene == 2 || scene == 4 || scene == 5 || scene == 6) {
            var shuttle = game.add.sprite(0, 0, 'shuttle2') // 创建图片
            shuttle.animations.add(shuttle, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23])
            shuttle.scale.set(1.85, 1.7)
            speed = 25
        } else if (scene == 7) {
            var shuttle = game.add.sprite(0, 0, 'shuttle3') // 创建图片
            shuttle.animations.add(shuttle, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23])
            shuttle.scale.set(2, 2)
            speed = 17
        }

        shuttle.animations.play(shuttle, speed, false).onComplete.add(function () {
            common.hide_R_L()// 隐藏左右按钮
            name.bringToTop() // 层级提高
            common.Tween(name, true).onComplete.add(function () {// 补间动画
                shuttle.destroy()
                if (!sum) {
                    if (callBack) {
                        callBack()
                    }
                } else {
                    if (callBack1) {
                        callBack1()
                    }
                    name.addChild(closeButton)
                }
                returnMap.inputEnabled = true
            })
        })

    },
    clickVisible: function (arr) { // 点击事件添加移除
        arr.forEach(function (v) {
            v.visible = !v.visible
        }, this);
    },
    birdTween: function (parents) { // 大雁动画
        var bird = game.add.sprite(448, 754, 'bird')
        bird.animations.add('bird', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])
        bird.animations.play('bird', 8, true)
        parents.addChild(bird)
        game.add.tween(bird).to({ x: -204, y: 420 }, 8000, 'Linear', true)
        game.add.tween(bird.scale).to({ x: .2, y: .2 }, 8000, 'Linear', true)
        return bird
    },
    hint: function (number) { // 提示指示
        if (!isHint) {
            var hint = game.add.image(0, 0, 'hint')
            hint.inputEnabled = true
            hint.input.priorityID = 3
            var hintClick = game.add.image(170, 815, 'click')
            hintClick.inputEnabled = true
            hintClick.input.priorityID = 4
            hintClick.scale.set(6, 1.5)
            hintClick.events.onInputUp.add(function () {
                hint.destroy()
                hintClick.destroy()
                isHint++
                Text()
            })
        } else {
            Text()
        }
        function Text() {
            /* 提示场景 */
            var a = game.add.graphics(0, 0)
            a.beginFill(0x000000);
            a.drawRoundedRect(208, 473, 250, 80)
            a.endFill();
            a.alpha = .5
            var b = game.add.text(294, 495, '场馆' + number, { fill: '#fff', fontSize: '30px', fontWeight: 400 })
            game.add.tween(b).to({ alpha: 0 }, 3000, 'Linear', true)
            game.add.tween(a).to({ alpha: 0 }, 3000, 'Linear', true).onComplete.add(function () {
                a.destroy()
                b.destroy()
            }, this)
        }
    },
    MP3: function (name, state) { // 控制特效音乐
        if (state == 'pause') {
            name.pause() // 暂停
        } else if (state == 'resume') {
            name.resume() // 恢复
        } else if (state == 'stop') {
            name.stop() // 停止
        }
    },
    returnMp3: function () { // 返回音乐
        game.add.audio('returnMp3').play('', 0, 2, false)
    },
    resumeMp3: function (stateMp3) { // 恢复背景音乐
        if (bgIcon.frame != 24) { // 判断用户是不是进去之前就暂停背景音乐
<<<<<<< HEAD
            var sum = 0
            var a = setInterval(function () {
                bgMp3.resume() // 恢复背景音乐
                sum += .1
                bgMp3.volume = Math.floor(sum * 10) / 100
=======
            let sum = 0
            let a = setInterval(() => {
                bgMp3.resume() // 恢复背景音乐
                sum += .1
                bgMp3.volume = Math.floor(sum*10) / 100
>>>>>>> 6212cde66564c8e82247792b2b8e4e875210efb6
                if (Math.floor(sum) == 5) {
                    clearInterval(a)
                }
            }, 80)
        }
        stateMp3.stop() //停止stateMp3
        bgIcon.visible = true // 显示背景音乐图标
    }
}
var isHint = 0 // 控制第一次进入场馆的提示指示
var main1State = function (game) {
    var sum = sum1 = sum2 = 0, text, leftTime, rightTime, left, right, returnMap, closeButton, person, shadow, istel
    this.create = function () {
        var a01 = game.add.group() // 创建地图组
        var a01_map = a01.create(0, 0, 'a01-01')
        var popup1 = game.add.image(0, 0, 'a01-02')
        var popup2 = game.add.image(0, 0, 'a01-03')
        var popup3 = game.add.image(0, 0, 'a01-05')
        var popup4 = game.add.image(0, 0, 'a01-04')
        var popup5 = game.add.image(0, 0, 'a01-07')
        var tel_mp3 = game.add.audio('tel_mp3')
        shadow = common.shadow() // 人物影子
        person = common.person() // 创建人物对象
        closeButton = common.closeButton() // 创建返回场景对象
        closeButton.visible = false
        returnMap = common.returnMap() // 创建返回地图对象
        /* 返回地图事件 */
        returnMap.events.onInputDown.add(function () {
            common.returnMp3() // 返回音乐
            common.MP3(tel_mp3, 'stop') // 关闭电话声音
            game.state.start('menu');
            renPosition = {
                x: 270, // x坐标
                y: 470, // y坐标
                t: 1, // 小人朝向
                r: 1 // 场景数
            }
        })

        bgmFun() // 添加背景音乐
        /* 左右移动事件 */
        common.shiftPerson(a01, a01_map.width, 'main2', main2State, function () {
            if (a01.x == -900 && !istel) {
                tel_mp3.play('', 0, 0, true)
                istel = true
            }//1700
            for (var i = 0; i < 20; i++) {
                if (a01.x == -(900 + i * 80) && i < 11) {
                    tel_mp3.volume = Math.floor(i * .1 * 10) / 10
                }
                if (a01.x == -(900 + i * 80) && i >= 11) {
                    tel_mp3.volume = Math.floor((1 - (i - 10) * .1) * 10) / 10
                }
            }
        })

        /* 默认隐藏对象 */
        common.alpha_visible(popup1)
        common.alpha_visible(popup2)
        common.alpha_visible(popup3)
        common.alpha_visible(popup4)
        common.alpha_visible(popup5)

        /* 提示指示 */
        common.hint(1)
        /* 按钮1 */
        var a01_click = game.add.button(1066, 200, 'click', function () {
            common.hide_R_L() // 隐藏左右按钮
            common.clickVisible(arrClick) // 移除所有点击事件
            common.MP3(tel_mp3, 'pause') // 关闭电话声音
            common.Tween(popup1, true).onComplete.add(function () { // 补间动画             
                if (!sum) {
                    var content = `1985年，富春江集团创始人孙庆炎，三\n顾茅庐，最终用诚意感动上海电缆研究\n所专家来厂技术援助。渴了乏了喝一杯\n土烧酒，饿了困了啃一个冷馒头，正是\n凭借着这些  “不达目的不罢休”  的坚韧\n品质，才孕育出了  ”刻苦、励志、实干\n、创新”  企业精神。`
                    text = game.add.text(100, 410, '', { fontSize: "26px", fill: "#000", fontWeight: '400' })
                    /* 文字打印效果 */
                    common.PrintText(text, content, function () {
                        popup1.addChild(closeButton)
                        closeButton.visible = true
                    })
                    popup1.addChild(game.add.image(60, 370, 'a01-08'))
                    popup1.addChild(text)
                    sum++
                } else {
                    popup1.addChild(closeButton)
                }
            })

        }, this, 0, 0, 0, 0, a01)
        a01_click.scale.set(11.5, 8)

        /* 按钮2 */
        var a02_click = game.add.button(1864, 330, 'tel', function () {
            common.MP3(tel_mp3, 'stop') // 关闭电话声音
            common.hide_R_L()// 隐藏左右按钮
            common.clickVisible(arrClick) // 移除所有点击事件
            common.Tween(popup2, true).onComplete.add(function () { // 补间动画
                if (!sum2) {
                    var content = '\t\t\t\t\t1986年7月成功研发\n杭州第一根市话通信电\n缆。'
                    var text2 = game.add.text(295, 77, '', { fontSize: "26px", fontWeight: '400' })
                    /* 文字打印效果 */
                    common.PrintText(text2, content, function () {
                        popup2.addChild(closeButton)
                        closeButton.visible = true
                    })
                    popup2.addChild(text2)
                    sum2++
                } else {
                    popup2.addChild(closeButton)
                }
            })

        }, this, 0, 0, 0, 0, a01)
        a02_click.animations.add('tel', ['01.png', '02.png'])
        a02_click.play('tel', 5, true)

        /* 按钮3 */
        var a03_click = game.add.button(2559, 130, 'click', function () {
            common.hide_R_L()// 隐藏左右按钮
            common.Tween(popup3, true) // 补间动画
            common.clickVisible(arrClick) // 移除所有点击事件
            common.MP3(tel_mp3, 'pause') // 关闭电话声音
            popup3.addChild(closeButton)
            closeButton.visible = true
        }, this, 0, 0, 0, 0, a01)
        a03_click.scale.set(3.8, 5.4)

        /* 按钮4 */
        var a04_click = game.add.button(2444, 485, 'click', function () {
            common.hide_R_L() // 隐藏左右按钮
            common.Tween(popup4, true)  // 补间动画
            common.clickVisible(arrClick) // 移除所有点击事件
            common.MP3(tel_mp3, 'pause') // 关闭电话声音
            popup4.addChild(closeButton)
            closeButton.visible = true
        }, this, 0, 0, 0, 0, a01)
        a04_click.scale.set(6, 4.15)
        /* 按钮5 */

        var a05_click = game.add.button(2854, 130, 'click', function () {
            common.clickVisible(arrClick) // 移除所有点击事件
            common.MP3(tel_mp3, 'pause') // 关闭电话声音
            common.throughTween(popup5, 1, sum1, function () {
                game.time.events.add(Phaser.Timer.SECOND, function () { // 延迟器
                    var graphics = game.add.graphics(0, 0);
                    graphics.beginFill(0xffffff);
                    graphics.drawRect(0, 0, game.world.width, game.world.height);
                    graphics.endFill();
                    game.time.events.add(Phaser.Timer.SECOND / 10, function () {
                        graphics.destroy() // 杀死对象
                        game.add.audio('photogMp3').play('', 0, 2, false) // 拍照音乐
                        popup5.addChild(game.add.image(0, 0, 'a01-09'))
                        popup5.addChild(closeButton)
                        closeButton.visible = true
                        var photo = a01.create(2861, 156, 'a01-06') // 覆盖相片
                    }, this);
                }, this);
            }, function () {
                popup5.addChild(game.add.image(0, 0, 'a01-09'))
            })
            sum1++

        }, this, 0, 0, 0, 0, a01)
        a05_click.scale.set(8, 11)

        /* 返回按钮 */
        closeButton.events.onInputDown.add(function () {
            common.hide_R_L() // 显示左右按钮
            common.clickVisible(arrClick) // 移除所有点击事件
            closeButton.inputEnabled = false
            common.MP3(tel_mp3, 'resume') // 恢复电话声音
            common.returnMp3() // 返回音乐
            // 弹框1
            if (popup1.alpha !== 0) {
                common.Tween(popup1, false)
                return
            }
            // 弹框2
            if (popup2.alpha !== 0) {
                common.Tween(popup2, false)
                return
            }
            // 弹框3
            if (popup3.alpha !== 0) {
                common.Tween(popup3, false)
                return
            }
            // 弹框4
            if (popup4.alpha !== 0) {
                common.Tween(popup4, false)
                return
            }
            // 弹框5
            if (popup5.alpha !== 0) {
                common.Tween(popup5, false)
                return
            }
        }, this)

        /* 点击事件 */
        var arrClick = [a01_click, a02_click, a03_click, a04_click, a05_click,]

        /* 手指动画 */
        var hand1, hand2, hand3, hand4, hand5
        var arrHand = [hand1, hand2, hand3, hand4, hand5]
        for (var i = 0; i < arrHand.length; i++) {
            var hand = arrHand[i]
            if (i === 0) {
                hand = a01.create(1556, 190, 'hand')
            } else if (i === 1) {
                hand = a01.create(1980, 430, 'hand')
            } else if (i === 2) {
                hand = a01.create(2724, 100, 'hand')
            } else if (i === 3) {
                hand = a01.create(2724, 450, 'hand')
            } else if (i === 4) {
                hand = a01.create(3160, 150, 'hand')
            }
            hand.animations.add('hand', [0, 1, 2, 3, 4, 5, 6])
            hand.play('hand', 5, true)
        }

    }
    this.update = function () {
    }
}
var main2State = function (game) {
    var sum1 = sum2 = sum3 = 0, text
    this.create = function () {
        var b01 = game.add.group()
        var b01_map = b01.create(0, 0, 'b02-01')
        var popup1 = game.add.image(0, 0, 'b02-02')
        var popup2 = game.add.image(0, 0, 'b02-03')
        var popup3 = game.add.image(0, 0, 'b02-05')
        var shadow = common.shadow() // 人物影子
        var person = common.person() // 创建人物对象
        var closeButton = common.closeButton() // 创建返回场景对象
        closeButton.visible = false
        var returnMap = common.returnMap() // 创建返回地图对象
        common.return(300, 650, 0, 2) // 返回地图事件
        common.shiftPerson(b01, b01_map.width, 'main3', main3State) // 左右按钮
        var popup4 = game.add.image(0, 0, 'b02-04')
        bgmFun() // 添加背景音乐

        /* 默认隐藏对象 */
        common.alpha_visible(popup1)
        common.alpha_visible(popup2)
        common.alpha_visible(popup3)
        common.alpha_visible(popup4)

        /* 提示指示 */
        common.hint(2)

        // 按钮1
        var b01_click = game.add.button(1070, 165, 'click', function () {
            common.clickVisible(arrClick) // 移除所有点击事件
            common.throughTween(popup1, 2, sum1, function () {
                var content = `富春环保自2005年投运以来，\n已连续十二年为富阳城区处理\n垃圾210万吨，污泥275万吨，\n有效保护了生态环境。 未来将\n争做世界级的环境治理专家。`
<<<<<<< HEAD
                text = game.add.text(276, 629, '', { fontSize: "24px", fill: "#333", fontWeight: 'normal' })
=======
                text = game.add.text(276,629, '', { fontSize: "24px", fill: "#333", fontWeight: 'normal' })
>>>>>>> 6212cde66564c8e82247792b2b8e4e875210efb6
                common.PrintText(text, content, function () {
                    popup1.addChild(closeButton)
                    closeButton.visible = true
                })
                popup1.addChild(text)
            })
            sum1++
        }, this, 0, 0, 0, 0, b01)
        b01_click.scale.set(12, 8)

        // 按钮2
        var b02_click = game.add.button(1970, 155, 'click', function () {
            common.clickVisible(arrClick) // 移除所有点击事件
            common.throughTween(popup2, 2, sum2, function () {
                var content = '杭电股份 “ 永通 ”  产品广泛\n用于三峡电站、奥运鸟巢、\n高铁等国家级工程，争做世\n界级的电缆制造专家。'
                text = game.add.text(306, 688, '', { fontSize: "21px", fill: "#333", fontWeight: 'normal' })
                common.PrintText(text, content, function () {
                    popup2.addChild(closeButton)
                    closeButton.visible = true
                })
                popup2.addChild(text)
            })
            sum2++
        }, this, 0, 0, 0, 0, b01)
        b02_click.scale.set(12, 8.5)
        // 按钮3
        var b03_click = game.add.button(2866, 155, 'click', function () {
            common.clickVisible(arrClick) // 移除所有点击事件
            common.throughTween(popup3, 2, sum3, function () {
                var content = '信息通信是集团起家产业，\n我们要继续为 “ 信息高速公\n路 ” 铺路，争做世界级的信\n息智慧专家。'
                text = game.add.text(304, 688, '', { fontSize: "21px", fill: "#333", fontWeight: 'normal' })
                common.PrintText(text, content, function () {
                    closeButton.visible = true
                    popup4.addChild(closeButton)
                    popup3 = popup4
                }, function () {
                    popup4.alpha = 1
                    popup4.visible = true
                    popup4.addChild(text)
                    popup3.destroy() // 杀死
                })
                popup3.addChild(text)
            })
            sum3++
        }, this, 0, 0, 0, 0, b01)
        b03_click.scale.set(12.5, 8.5)

        /* 返回场景按钮 */
        closeButton.events.onInputDown.add(function () {
            common.hide_R_L() // 显示左右按钮
            closeButton.inputEnabled = false
            common.clickVisible(arrClick) // 移除所有点击事件
            common.returnMp3() // 返回音乐
            // 弹框1
            if (popup1.alpha !== 0) {
                common.Tween(popup1, false)
                return
            }
            // 弹框2
            if (popup2.alpha !== 0) {
                common.Tween(popup2, false)
                return
            }
            // 弹框3
            if (popup3.alpha !== 0 || popup4.alpha !== 0) {
                common.Tween(popup3, false)
                common.Tween(popup4, false)
                return
            }
        }, this)

        /* 手指动画 */
        var hand1, hand2, hand3
        var arrHand = [hand1, hand2, hand3]
        for (var i = 0; i < arrHand.length; i++) {
            var hand = arrHand[i]
            if (i === 0) {
                hand = b01.create(1580, 170, 'hand')
            } else if (i === 1) {
                hand = b01.create(2480, 170, 'hand')
            } else if (i === 2) {
                hand = b01.create(3388, 170, 'hand')
            }
            hand.animations.add('hand', [0, 1, 2, 3, 4, 5, 6])
            hand.play('hand', 5, true)

        }

        /* 点击事件 */
        var arrClick = [b01_click, b02_click, b03_click]
    }
}
var main3State = function (game) {
    var sum1 = sum2 = sum3 = sum4 = sum5 = 0, text
    this.create = function () {
        var c01 = game.add.group()
        var c01_map = c01.create(0, 0, 'c03-01')
        var popup1 = game.add.image(0, 0, 'c03-02')
        var popup2 = game.add.image(0, 0, 'c03-03')
        var popup3 = game.add.image(0, 0, 'c03-04')
        var popup4 = game.add.image(0, 0, 'c03-05')
        var popup5 = game.add.image(0, 0, 'c03-06')
        var shadow = common.shadow() // 人物影子
        var person = common.person() // 创建人物对象
        var closeButton = common.closeButton() // 创建返回场景对象
        closeButton.visible = false
        var returnMap = common.returnMap() // 创建返回地图对象
        common.return(302, 875, 1, 3) // 返回地图事件
        common.shiftPerson(c01, c01_map.width, 'main4', main4State) // 左右按钮
        bgmFun() // 添加背景音乐

        /* 默认隐藏对象 */
        common.alpha_visible(popup1)
        common.alpha_visible(popup2)
        common.alpha_visible(popup3)
        common.alpha_visible(popup4)
        common.alpha_visible(popup5)

        /* 提示指示 */
        common.hint(3)
        // 按钮1
        var c01_click = game.add.button(920, 203, 'click', function () {
            common.hide_R_L() // 隐藏左右按钮
            common.clickVisible(arrClick) // 移除所有点击事件
            common.Tween(popup1, true).onComplete.add(function () { // 补间动画
                if (!sum1) {
                    var content = '1998年，创建光通信产业园，孙庆炎被\n行业成为 “  浙江光谷第一人 ” ，集团被\n誉为 “  光通信产业 ” 的黄埔军校。'
                    text = game.add.text(84, 734, '', { fontSize: "26px", fill: "#000", fontWeight: '400' })
                    /* 文字打印效果 */
                    common.PrintText(text, content, function () {
                        popup1.addChild(closeButton)
                        closeButton.visible = true
                    })
                    popup1.addChild(text)
                    sum1++
                } else {
                    popup1.addChild(closeButton)
                }
            })

        }, this, 0, 0, 0, 0, c01)
        c01_click.scale.set(11.5, 8)

        // 按钮4
        var c04_click = game.add.button(1706, 180, 'click', function () {
            common.clickVisible(arrClick) // 移除所有点击事件
            common.throughTween(popup4, 3, sum4, function () {
                game.time.events.add(Phaser.Timer.SECOND, function () { // 延迟器
                    var graphics = game.add.graphics(0, 0);
                    graphics.beginFill(0xffffff);
                    graphics.drawRect(0, 0, game.world.width, game.world.height);
                    graphics.endFill();
                    game.time.events.add(Phaser.Timer.SECOND / 10, function () {
                        game.add.audio('photogMp3').play('', 0, 2, false) // 拍照音乐
                        graphics.destroy() // 杀死对象
                        popup4.addChild(game.add.image(0, 0, 'c03-07'))
                        popup4.addChild(closeButton)
                        closeButton.visible = true
                    }, this);
                }, this);
            }, function () {
                popup4.addChild(game.add.image(0, 0, 'c03-07'))
            })
            sum4++
        }, this, 0, 0, 0, 0, c01)
        c04_click.scale.set(7, 9)

        // 按钮2
        var c02_click = game.add.button(2130, 166, 'click', function () {
            common.clickVisible(arrClick) // 移除所有点击事件
            common.throughTween(popup2, 3, sum2, function () {
                var content = `\t\t\t\t\t\t\t\t1996年，兼并国营富阳热\n电厂，踏上向外高速扩张发展\n之路。`
                text = game.add.text(264, 670, '', { fontSize: "22px", fill: "#333", fontWeight: 'normal' })

                common.PrintText(text, content, function () {
                    popup2.addChild(closeButton)
                    closeButton.visible = true
                })
                popup2.addChild(text)
            })
            sum2++


        }, this, 0, 0, 0, 0, c01)
        c02_click.scale.set(6, 3.5)

        // 按钮3
        var c03_click = game.add.button(2142, 425, 'click', function () {
            common.clickVisible(arrClick) // 移除所有点击事件
            common.throughTween(popup3, 3, sum3, function () {
                var content = '\t\t\t\t\t\t\t\t1991年,成功兼并富阳麻纺\n厂，成为富阳首家亿元工程双达\n标企业。'
                text = game.add.text(264, 670, '', { fontSize: "22px", fill: "#333", fontWeight: 'normal' })

                common.PrintText(text, content, function () {
                    popup3.addChild(closeButton)
                    closeButton.visible = true
                })
                popup3.addChild(text)
            })
            sum3++



        }, this, 0, 0, 0, 0, c01)
        c03_click.scale.set(7.4, 4)

        // 按钮5
        var c05_click = game.add.button(2912, 209, 'click', function () {
            common.clickVisible(arrClick) // 移除所有点击事件
            common.hide_R_L()
            if (!sum5) {
                var graphics = game.add.graphics(0, 0);
                graphics.beginFill(0x000000);
                graphics.drawRect(0, 0, game.world.width, game.world.height);
                graphics.endFill();
                graphics.alpha = .5;
                game.time.events.add(500, function () {
                    game.add.audio('bellMp3').play('', 0, 2, false) // 敲钟音乐
                }, this)
                var bell = game.add.sprite(72, 128, 'bell', 4)
                bell.animations.add('bell', [0, 1, 2, 3])
                bell.animations.play('bell', 2, false).onComplete.add(function () {
                    game.time.events.add(500, function () {
                        game.add.audio('bellMp3').play('', 0, 2, false) // 敲钟音乐
                    }, this)
                    bell.animations.add('bell', [0, 1, 2, 3])
                    bell.animations.play('bell', 2, false, true).onComplete.add(function () {
                        graphics.destroy()
                        common.Tween(popup5, true).onComplete.add(function () {
                            popup5.alpha = 1
                            popup5.visible = true
                            var content = '\t\t\t\t\t\t\t\t2010年9月富春环保登陆深\n圳A股市场，实现富阳上市企业\n“零”的突破；2015年2月17日杭\n电股份在上交所成功上市，大大\n提升集团两大产业核心竞争力。'
                            text = game.add.text(264, 618, '', { fontSize: "22px", fill: "#333", fontWeight: 'normal' })
                            text.lineSpacing = 5
                            common.PrintText(text, content, function () {
                                popup5.addChild(closeButton)
                                closeButton.visible = true
                            })
                            popup5.addChild(text)
                            sum5++
                        })
                    }, this)
                }, this)
            } else {
                common.Tween(popup5, true).onComplete.add(function () {
                    popup5.addChild(closeButton)
                    popup5.alpha = 1
                    popup5.visible = true
                })
            }
        }, this, 0, 0, 0, 0, c01)
        c05_click.scale.set(5.5, 8)

        /* 返回场景按钮 */
        closeButton.events.onInputDown.add(function () {
            common.hide_R_L() // 显示左右按钮
            closeButton.inputEnabled = false
            common.clickVisible(arrClick) // 移除所有点击事件
            common.returnMp3() // 返回音乐
            // 弹框1
            if (popup1.alpha !== 0) {
                common.Tween(popup1, false)
                return
            }
            // 弹框2
            if (popup2.alpha !== 0) {
                common.Tween(popup2, false)
                return
            }
            // 弹框3
            if (popup3.alpha !== 0) {
                common.Tween(popup3, false)
                return
            }
            // 弹框4
            if (popup4.alpha !== 0) {
                common.Tween(popup4, false)
                return
            }
            // 弹框5
            if (popup5.alpha !== 0) {
                common.Tween(popup5, false)
                return
            }
        }, this)

        /* 手指动画 */
        var hand1, hand2, hand3, hand4, hand5
        var arrHand = [hand1, hand2, hand3, hand4, hand5]
        for (var i = 0; i < arrHand.length; i++) {
            var hand = arrHand[i]
            if (i === 0) {
                hand = c01.create(1400, 200, 'hand')
            } else if (i === 1) {
                hand = c01.create(1940, 190, 'hand')
            } else if (i === 2) {
                hand = c01.create(2430, 430, 'hand')
            } else if (i === 3) {
                hand = c01.create(2350, 180, 'hand')
            } else if (i === 4) {
                hand = c01.create(3000, 370, 'hand')
            }
            hand.animations.add('hand', [0, 1, 2, 3, 4, 5, 6])
            hand.play('hand', 5, true)
        }

        /* 点击事件 */
        var arrClick = [c01_click, c02_click, c03_click, c04_click, c05_click]
    }
}
var main4State = function (game) {
    var sum1 = sum2 = sum3 = 0, text
    this.create = function () {
        var d01 = game.add.group()
        var d01_map = d01.create(0, 0, 'd04-01')
        var popup1 = game.add.image(0, 0, 'd04-02')
        var popup2 = game.add.image(0, 0, 'd04-03')
        var popup3 = game.add.image(0, 0, 'd04-04')

        var shadow = common.shadow() // 人物影子
        var person = common.person() // 创建人物对象
        var closeButton = common.closeButton() // 创建返回场景对象
        closeButton.visible = false
        var returnMap = common.returnMap() // 创建返回地图对象
        common.return(326, 1204, 0, 4) // 返回地图事件
        // common.return(302, 875, 1, 3) // 返回地图事件
        common.shiftPerson(d01, d01_map.width, 'main5', main5State) // 左右按钮
        bgmFun() // 添加背景音乐

        /* 默认隐藏对象 */
        common.alpha_visible(popup1)
        common.alpha_visible(popup2)
        common.alpha_visible(popup3)

        /* 提示指示 */
        common.hint(4)

        // 按钮1
        var d01_click = game.add.button(980, 134, 'click', function () {
            common.hide_R_L() // 隐藏左右按钮
            common.clickVisible(arrClick) // 移除所有点击事件
            common.Tween(popup1, true).onComplete.add(function () { // 补间动画
                if (!sum1) {
                    var content = `\t\t\t\t集团是富阳首家荣获\n全国文明单位的非公企业`
                    text = game.add.text(180, 920, '', { fontSize: "26px", fill: "#000", fontWeight: '400' })

                    /* 文字打印效果 */
                    common.PrintText(text, content, function () {
                        popup1.addChild(closeButton)
                        closeButton.visible = true
                    })
                    popup1.addChild(text)
                    sum1++
                } else {
                    popup1.addChild(closeButton)
                }
            })
        }, this, 0, 0, 0, 0, d01)
        d01_click.scale.set(13, 10)

        // 按钮2
        var d02_click = game.add.button(1884, 160, 'click', function () {
            common.hide_R_L() // 隐藏左右按钮
            common.clickVisible(arrClick) // 移除所有点击事件
            common.Tween(popup2, true).onComplete.add(function () { // 补间动画
                if (!sum2) {
                    var content = `“永通”牌商标获全国驰名商标`
                    text = game.add.text(170, 935, '', { fontSize: "26px", fill: "#000", fontWeight: '400' })

                    /* 文字打印效果 */
                    common.PrintText(text, content, function () {
                        popup2.addChild(closeButton)
                        closeButton.visible = true
                    })
                    popup2.addChild(text)
                    sum2++
                } else {
                    popup2.addChild(closeButton)
                }
            })
        }, this, 0, 0, 0, 0, d01)
        d02_click.scale.set(6.5, 9)

        // 按钮3
        var d03_click = game.add.button(2476, 158, 'click', function () {
            common.hide_R_L() // 隐藏左右按钮
            common.clickVisible(arrClick) // 移除所有点击事件
            common.Tween(popup3, true).onComplete.add(function () { // 补间动画
                if (!sum3) {
                    var content = `2017年 6月 5日 ，全国人大常委会副委员长\n沈跃跃（前排右二）来到集团旗下富春环保\n（清园生态）视察指导，充分肯定集团在固\n废领域取得的成绩。`
                    text = game.add.text(75, 830, '', { fontSize: "26px", fill: "#000", fontWeight: '400' })

                    /* 文字打印效果 */
                    common.PrintText(text, content, function () {
                        popup3.addChild(closeButton)
                        closeButton.visible = true
                    })
                    popup3.addChild(text)
                    sum3++
                } else {
                    popup3.addChild(closeButton)
                }
            })
        }, this, 0, 0, 0, 0, d01)
        d03_click.scale.set(12.7, 9)

        /* 返回场景按钮 */
        closeButton.events.onInputDown.add(function () {
            common.hide_R_L() // 显示左右按钮
            closeButton.inputEnabled = false
            common.clickVisible(arrClick) // 移除所有点击事件
            common.returnMp3() // 返回音乐
            // 弹框1
            if (popup1.alpha !== 0) {
                common.Tween(popup1, false)
                return
            }
            // 弹框2
            if (popup2.alpha !== 0) {
                common.Tween(popup2, false)
                return
            }
            // 弹框3
            if (popup3.alpha !== 0) {
                common.Tween(popup3, false)
                return
            }
        }, this)

        /* 点击事件 */
        var arrClick = [d01_click, d02_click, d03_click]

        /* 手指动画 */
        var hand1, hand2, hand3
        var arrHand = [hand1, hand2, hand3]
        for (var i = 0; i < arrHand.length; i++) {
            var hand = arrHand[i]
            if (i === 0) {
                hand = d01.create(1530, 130, 'hand')
            } else if (i === 1) {
                hand = d01.create(2114, 170, 'hand')
            } else if (i === 2) {
                hand = d01.create(3020, 177, 'hand')
            }
            hand.animations.add('hand', [0, 1, 2, 3, 4, 5, 6])
            hand.play('hand', 5, true)
        }



    }
}
var main5State = function (game) {
    var sum1 = sum2 = sum3 = 0, text, stateMp3
    this.create = function () {

        var e01 = game.add.group()
        var e01_map = e01.create(0, 0, 'e05-01')
        var popup1 = game.add.image(0, 0, 'e05-02')
        var popup2 = game.add.image(0, 0, 'e05-03')
        var popup3 = game.add.image(0, 0, 'e05-04')

        var shadow = common.shadow() // 人物影子
        var person = common.person() // 创建人物对象
        var closeButton = common.closeButton() // 创建返回场景对象
        closeButton.visible = false
        var returnMap = common.returnMap() // 创建返回地图对象
        common.return(235, 1348, 1, 5) // 返回地图事件
        common.shiftPerson(e01, e01_map.width, 'main6', main6State) // 左右按钮
        bgmFun() // 添加背景音乐

        /* 默认隐藏对象 */
        common.alpha_visible(popup1)
        common.alpha_visible(popup2)
        common.alpha_visible(popup3)

        /* 提示指示 */
        common.hint(5)

        // 按钮1
        var e01_click = game.add.button(1166, 260, 'click', function () {
            /* 播放音乐 */
            if (bgMp3.isPlaying) {
                bgMp3.pause() // 停止背景音乐
            }
            bgIcon.visible = false // 隐藏背景音乐图标
            stateMp3 = game.add.audio('stateMp3')
            stateMp3.play('', 0, .3, true) // 播放背景音乐
            common.hide_R_L() // 隐藏左右按钮
            common.clickVisible(arrClick) // 移除所有点击事件
            common.Tween(popup1, true).onComplete.add(function () { // 补间动画
                /* 大雁动画 */
                var bird = common.birdTween(popup1)
                /* 文字打印效果 */
                if (!sum1) {
                    var content = `没\n有\n共\n产\n党\n就\n没\n有\n新\n中\n国`
                    text = game.add.text(132, 250, '', { fontSize: "26px", fill: "#333", fontWeight: '400' })
                    common.PrintText(text, content, function () {
                        var content1 = `没\n有\n改\n革\n开\n放\n就\n没\n有\n富\n春\n江\n集\n团`
                        var text1 = game.add.text(222, 250, '', { fontSize: "26px", fill: "#333", fontWeight: '400' })
                        common.PrintText(text1, content1, function () {
                            var content2 = `党\n组\n织\n在\n企\n业\n里\n的\n作\n用`
                            var text2 = game.add.text(310, 250, '', { fontSize: "26px", fill: "#333", fontWeight: '400' })
                            common.PrintText(text2, content2, function () {
                                var content3 = `是\n任\n何\n组\n织\n都\n无\n法\n取\n代\n的`
                                var text3 = game.add.text(350, 250, '', { fontSize: "26px", fill: "#333", fontWeight: '400' })
                                common.PrintText(text3, content3, function () {
                                    var content4 = `这\r是\r党\r委\r书\r记\r孙\r庆\r炎\r永\r远\r不\r变\r的`
                                    var text4 = game.add.text(450, 180, '', { font: "26pt 楷体", fill: "#000", fontWeight: '900' })
                                    common.PrintText(text4, content4, function () {
                                        // 添加三个情怀图片
                                        var san = game.add.image(520, 544, 'e05-05')
                                        san.visible = false
                                        san.alpha = 0
                                        popup1.addChild(san)
                                        game.add.tween(san).to({ alpha: 1, visible: true }, 500, 'Linear', true).onComplete.add(function () {
                                            popup1.addChild(closeButton)
                                            closeButton.visible = true
                                        }, this)
                                    })
                                    popup1.addChild(text4)
                                })
                                popup1.addChild(text3)
                            })
                            popup1.addChild(text2)
                        })
                        popup1.addChild(text1)
                    })
                    popup1.addChild(text)
                    sum1++
                } else {
                    popup1.addChild(closeButton)
                }

            })
        }, this, 0, 0, 0, 0, e01)
        e01_click.scale.set(15, 11)

        // 按钮2
        var e02_click = game.add.button(2666, 374, 'click', function () {
            common.clickVisible(arrClick) // 移除所有点击事件
            common.throughTween(popup2, 5, sum2, function () {
                var content = `\t\t\t\t\t\t\t\t “ 通力回报社会 ” 不是一句\n空话，不管是支助教育、环保事\n业，还是面对汶川地震等自然灾\n害，集团都挺身而出，已累计捐\n资捐物近4亿元。`
                text = game.add.text(262, 695, '', { fontSize: "22px", fill: "#333", fontWeight: '400' })

                common.PrintText(text, content, function () {
                    popup2.addChild(closeButton)
                    closeButton.visible = true
                })
                popup2.addChild(text)
            })
            sum2++

        }, this, 0, 0, 0, 0, e01)
        e02_click.scale.set(8.5, 6)

        // 按钮3
        var e03_click = game.add.button(3198, 246, 'click', function () {
            common.clickVisible(arrClick) // 移除所有点击事件
            common.throughTween(popup3, 5, sum3, function () {
                var content = `\t\t\t\t\t\t\t\t2015年，创业30周年之际\n，集团在富阳区慈善总会设立了\n2000万元慈善基金，关爱弱势\n群体，为困难的父老乡亲送去温\n暖。`
                text = game.add.text(262, 695, '', { fontSize: "22px", fill: "#333", fontWeight: '400' })

                common.PrintText(text, content, function () {
                    popup3.addChild(closeButton)
                    closeButton.visible = true
                })
                popup3.addChild(text)
            })
            sum3++
        }, this, 0, 0, 0, 0, e01)
        e03_click.scale.set(12, 8.5)

        /* 返回场景按钮 */
        closeButton.events.onInputDown.add(function () {
            common.hide_R_L() // 显示左右按钮
            closeButton.inputEnabled = false
            common.clickVisible(arrClick) // 移除所有点击事件
            common.returnMp3() // 返回音乐
            // 弹框1
            if (popup1.alpha !== 0) {
                common.Tween(popup1, false)
                common.resumeMp3(stateMp3) // 恢复背景音乐
                return
            }
            // 弹框2
            if (popup2.alpha !== 0) {
                common.Tween(popup2, false)
                return
            }
            // 弹框3
            if (popup3.alpha !== 0) {
                common.Tween(popup3, false)
                return
            }
        }, this)

        /* 点击事件 */
        var arrClick = [e01_click, e02_click, e03_click]

        /* 手指动画 */
        var hand1, hand2, hand3
        var arrHand = [hand1, hand2, hand3]
        for (var i = 0; i < arrHand.length; i++) {
            var hand = arrHand[i]
            if (i === 0) {
                hand = e01.create(1432, 430, 'hand')
            } else if (i === 1) {
                hand = e01.create(2988, 390, 'hand')
            } else if (i === 2) {
                hand = e01.create(3690, 260, 'hand')
            }
            hand.animations.add('hand', [0, 1, 2, 3, 4, 5, 6])
            hand.play('hand', 5, true)
        }
    }
}
var main6State = function (game) {
    var sum1 = sum2 = sum3 = sum4 = 0, text, text1, stateMp3
    this.create = function () {
        var f01 = game.add.group()
        var f01_map = f01.create(0, 0, 'f06-01')
        var popup1 = game.add.image(0, 0, 'f06-02')
        var popup2 = game.add.image(0, 0, 'f06-03')
        var popup3 = game.add.image(0, 0, 'f06-04')
        var popup4 = game.add.image(0, 0, 'f06-05')

        var shadow = common.shadow() // 人物影子
        var person = common.person() // 创建人物对象
        var closeButton = common.closeButton() // 创建返回场景对象
        closeButton.visible = false
        var returnMap = common.returnMap() // 创建返回地图对象
        common.return(266, 1585, 0, 6) // 返回地图事件
        common.shiftPerson(f01, f01_map.width, 'main7', main7State) // 左右按钮
        bgmFun() // 添加背景音乐

        /* 默认隐藏对象 */
        common.alpha_visible(popup1)
        common.alpha_visible(popup2)
        common.alpha_visible(popup3)
        common.alpha_visible(popup4)

        /* 提示指示 */
        common.hint(6)

        // 场景1
        var f01_click = game.add.button(740, 346, 'click', function () {
            /* 添加音乐 */
            bgIcon.visible = false // 隐藏背景音乐图标
            stateMp3 = game.add.audio('stateMp3')
            stateMp3.play('', 0, .3, true) // 播放背景音乐
            bgMp3.pause() // 停止背景音乐

            common.hide_R_L() // 隐藏左右按钮
            common.clickVisible(arrClick) // 移除所有点击事件
            common.Tween(popup1, true).onComplete.add(function () { // 补间动画
                if (!sum1) {
                    var content = '绝不做权钱交易\n\n绝不偷税漏税\n\n绝不拖欠员工薪资'
                    text = game.add.text(236, 314, '', { fontSize: "26px", fill: "#000", fontWeight: '400' })
                    /* 文字打印效果 */
                    common.PrintText(text, content, function () {
                        var content1 = '\t\t\t\t\t\t\t\t这是党委书记孙庆炎在创业初期就提出\n的三条底线，也是“亲”、“清”政商关系，合规\n经营，关爱员工，最朴实的体现。'
                        text1 = game.add.text(70, 605, '', { fontSize: "26px", fill: "#b51d22", fontWeight: '400' })
                        common.PrintText(text1, content1, function () {
                            popup1.addChild(closeButton)
                            closeButton.visible = true
                        })
                        popup1.addChild(text1)
                    })
                    popup1.addChild(text)
                    sum1++
                } else {
                    popup1.addChild(closeButton)
                }
            })
        }, this, 0, 0, 0, 0, f01)
        f01_click.scale.set(8, 5)

        // 场景2
        var f02_click = game.add.button(1250, 296, 'click', function () {
            /* 添加音乐 */
            bgIcon.visible = false // 隐藏背景音乐图标
            stateMp3 = game.add.audio('stateMp3')
            stateMp3.play('', 0, .3, true) // 播放背景音乐
            bgMp3.pause() // 停止背景音乐

            common.hide_R_L() // 隐藏左右按钮
            common.clickVisible(arrClick) // 移除所有点击事件
            common.Tween(popup2, true).onComplete.add(function () { // 补间动画

                /* 大雁动画 */
                var bird = common.birdTween(popup2)

                /* 文字打印效果 */
                if (!sum2) {
                    /* 图片特效 */
                    var san = game.add.image(112, 221, 'f06-08')
                    san.visible = false
                    san.alpha = 0
                    popup2.addChild(san)
                    /* 文字特效 */
                    game.add.tween(san).to({ alpha: 1, visible: true }, 500, 'Linear', true).onComplete.add(function () {
                        var content = `实\n现\n中\n国\n梦\n，\n企\n业\n为\n国\n家\n做\n什\n么\n？`
                        text = game.add.text(254, 332, '', { fontSize: "26px", fill: "#333", fontWeight: '400' })
                        text.lineSpacing = -8
                        common.PrintText(text, content, function () {
                            var content1 = `人\n民\n对\n美\n好\n生\n活\n的\n向\n往\n，\n党\n委\n为\n员\n工\n做\n什\n么\n？`
                            var text1 = game.add.text(352, 332, '', { fontSize: "26px", fill: "#333", fontWeight: '400' })
                            text1.lineSpacing = -8
                            common.PrintText(text1, content1, function () {
                                var content2 = ` “\n两\n学\n一\n做\n ”\n党\n员\n对\n自\n己\n做\n什\n么\n？`
                                text2 = game.add.text(456, 332, '', { fontSize: "26px", fill: "#333", fontWeight: '400' })
                                text2.lineSpacing = -8
                                common.PrintText(text2, content2, function () {
                                    popup2.addChild(closeButton)
                                    closeButton.visible = true
                                })
                                popup2.addChild(text2)
                            })
                            popup2.addChild(text1)
                        })
                        popup2.addChild(text)
                    }, this)
                    sum2++
                } else {
                    popup2.addChild(closeButton)
                }
            })
        }, this, 0, 0, 0, 0, f01)
        f02_click.scale.set(8, 5)

        // 场景3
        var f03_click = game.add.button(1948, 158, 'click', function () {
            common.clickVisible(arrClick) // 移除所有点击事件
            common.throughTween(popup3, 6, sum3, function () {
                var content = '2000年党委成立'
                text = game.add.text(210, 930, '', { fontSize: "30px", fill: "#000", fontWeight: '400', boundsAlignH: 'center' })
                common.PrintText(text, content, function () {
                    popup3.addChild(closeButton)
                    closeButton.visible = true
                    var photo = f01.create(1954, 172, 'f06-07') // 覆盖相片
                    photo = popup3
                })
                popup3.addChild(text)
            })
            sum3++
        }, this, 0, 0, 0, 0, f01)
        f03_click.scale.set(11, 9)

        // 场景4
        var f04_click = game.add.button(2680, 170, 'click', function () {
            common.clickVisible(arrClick) // 移除所有点击事件
            common.throughTween(popup4, 6, sum4, function () {
                var content = '\t\t\t\t\t\t\t\t每年“七一”，集团都会\n开展纪念党的活动，已经持\n续了28年。'
                text = game.add.text(272, 666, '', { fontSize: "24px", fill: "#000", fontWeight: '400' })
                common.PrintText(text, content, function () {
                    popup4.addChild(closeButton)
                    closeButton.visible = true
                    var photo = f01.create(2676, 173, 'f06-06') // 覆盖相片
                    photo = popup4
                })
                popup4.addChild(text)
            })
            sum4++
        }, this, 0, 0, 0, 0, f01)
        f04_click.scale.set(12, 8.5)

        /* 返回场景按钮 */
        closeButton.events.onInputDown.add(function () {
            common.hide_R_L() // 显示左右按钮
            closeButton.inputEnabled = false
            common.clickVisible(arrClick) // 移除所有点击事件
            common.returnMp3() // 返回音乐
            // 弹框1
            if (popup1.alpha !== 0) {
                common.resumeMp3(stateMp3) // 恢复背景音乐
                common.Tween(popup1, false)
                return
            }
            // 弹框2
            if (popup2.alpha !== 0) {
                common.resumeMp3(stateMp3) // 恢复背景音乐
                common.Tween(popup2, false)
                return
            }
            // 弹框3
            if (popup3.alpha !== 0) {
                common.Tween(popup3, false)
                return
            }
            // 弹框4
            if (popup4.alpha !== 0) {
                common.Tween(popup4, false)
                return
            }
        }, this)

        /* 手指动画 */
        var hand1, hand2, hand3, hand4
        var arrHand = [hand1, hand2, hand3, hand4]
        for (var i = 0; i < arrHand.length; i++) {
            var hand = arrHand[i]
            if (i === 0) {
                hand = f01.create(1040, 440, 'hand')
            } else if (i === 1) {
                hand = f01.create(1460, 360, 'hand')
            } else if (i === 2) {
                hand = f01.create(2390, 179, 'hand')
            } else if (i === 3) {
                hand = f01.create(3190, 180, 'hand')
            }
            hand.animations.add('hand', [0, 1, 2, 3, 4, 5, 6])
            hand.play('hand', 5, true)
        }

        /* 点击事件集合 */
        var arrClick = [f01_click, f02_click, f03_click, f04_click]
    }
}
var main7State = function (game) {
    var sum1 = sum2 = sum3 = sum4 = 0
    this.create = function () {
        var j01 = game.add.group()
        var j01_map = j01.create(0, 0, 'j07-01')
        var popup1 = game.add.image(0, 0, 'j07-02')
        var popup2 = game.add.image(0, 0, 'j07-03')
        var popup3 = game.add.image(0, 0, 'j07-04')
        var popup4 = game.add.image(0, 0, 'j07-05')
        var shadow = common.shadow() // 人物影子
        var person = common.person() // 创建人物对象
        var closeButton = common.closeButton() // 创建返回场景对象
        closeButton.visible = false
        var returnMap = common.returnMap() // 创建返回地图对象
        common.return(431, 1908, 1, 7) // 返回地图事件
        common.shiftPerson(j01, j01_map.width, 'menu') // 左右按钮
        bgmFun() // 添加背景音乐

        /* 默认隐藏对象 */
        common.alpha_visible(popup1)
        common.alpha_visible(popup2)
        common.alpha_visible(popup3)
        common.alpha_visible(popup4)

        /* 提示指示 */
        common.hint(7)

        /* 火炬的火 */
        var fire = j01.create(2870, 175, 'fire')
        fire.animations.add('fire', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
        fire.animations.play('fire', 10, true)

        // 场景1
        var j01_click = game.add.button(994, 136, 'click', function () {
            common.clickVisible(arrClick) // 移除所有点击事件
            common.throughTween(popup1, 7, sum1, function () {
                var content = `\t\t\t\t\t\t\t\t2016年9月，杭电股份与\n澳大利亚新南威尔士大学”石墨\n烯超导电缆”项目启动，树立集\n团科技创新里程牌。`
                text = game.add.text(260, 77, '', { fontSize: "22px", fill: "#333", fontWeight: '400' })
                var light = game.add.sprite(0, 370, 'j07-06')
                common.alpha_visible(light)
                popup1.addChild(light)
                common.PrintText(text, content, function () {
                    popup1.addChild(closeButton)
                    closeButton.visible = true
                }, function () {
                    common.Tween(light, true).onComplete.add(function () {
                        common.Tween(light, false).onComplete.add(function () {
                            common.Tween(light, true)
                        }, this)
                    }, this)
                })
                popup1.addChild(text)
            })
            sum1++
        }, this, 0, 0, 0, 0, j01)
        j01_click.scale.set(4, 6)

        // 场景2
        var j02_click = game.add.button(890, 512, 'click', function () {
            common.hide_R_L() // 隐藏左右按钮
            common.clickVisible(arrClick) // 移除所有点击事件
            common.Tween(popup2, true).onComplete.add(function () { // 补间动画
                if (!sum2) {
                    var content = `2017年3月，集团旗下富春环保与浙大联合组建\n全国首个垃圾焚烧国家工程实验室`
                    text = game.add.text(53, 916, '', { fontSize: "26px", fill: "#333", fontWeight: '400' })
                    /* 文字打印效果 */
                    common.PrintText(text, content, function () {
                        popup2.addChild(closeButton)
                        closeButton.visible = true
                    })
                    popup2.addChild(text)
                    sum2++
                } else {
                    popup2.addChild(closeButton)
                }
            })
        }, this, 0, 0, 0, 0, j01)
        j02_click.scale.set(6.5, 3.5)
        // 场景3
        var j03_click = game.add.button(1332, 176, 'click', function () {
            common.hide_R_L() // 隐藏左右按钮
            common.clickVisible(arrClick) // 移除所有点击事件
            common.Tween(popup3, true).onComplete.add(function () { // 补间动画
                if (!sum3) {
                    var content = `两国总理见证石墨烯项目签约`
                    text = game.add.text(150, 937, '', { fontSize: "26px", fill: "#333", fontWeight: '400' })
                    /* 文字打印效果 */
                    common.PrintText(text, content, function () {
                        popup3.addChild(closeButton)
                        closeButton.visible = true
                    })
                    popup3.addChild(text)
                    sum3++
                } else {
                    popup3.addChild(closeButton)
                }
            })
        }, this, 0, 0, 0, 0, j01)
        j03_click.scale.set(14, 10)
        // 场景4
        var j04_click = game.add.button(2828, 337, 'click', function () {
            common.clickVisible(arrClick) // 移除所有点击事件
            common.throughTween(popup4, 7, sum4, function () {
                var content = `传承和梦想`
                text = game.add.text(260, 850, '', { fontSize: "28px", fill: "#000", fontWeight: '400' })
                common.PrintText(text, content, function () {
                    var content1 = `富春江集团将继续传承“永续创新发展，通力回报社会”\n的发展理念，像奥运火炬一样代代传承、永不熄灭。`
                    var text1 = game.add.text(40, 908, '', { fontSize: "24px", fill: "#333", fontWeight: '400' })
                    common.PrintText(text1, content1, function () {
                        popup4.addChild(closeButton)
                        closeButton.visible = true
                    })
                    popup4.addChild(text1)
                })
                popup4.addChild(text)
            })
            sum4++
        }, this, 0, 0, 0, 0, j01)
        j04_click.scale.set(4, 8)

        /* 返回场景按钮 */
        closeButton.events.onInputDown.add(function () {
            common.hide_R_L() // 显示左右按钮
            closeButton.inputEnabled = false
            common.clickVisible(arrClick) // 移除所有点击事件
            common.returnMp3() // 返回音乐
            // 弹框1
            if (popup1.alpha !== 0) {
                common.Tween(popup1, false)
                return
            }
            // 弹框2
            if (popup2.alpha !== 0) {
                common.Tween(popup2, false)
                return
            }
            // 弹框3
            if (popup3.alpha !== 0) {
                common.Tween(popup3, false)
                return
            }
            // 弹框4
            if (popup4.alpha !== 0) {
                common.Tween(popup4, false)
                return
            }
        }, this)

        /* 手指动画 */
        var hand1, hand2, hand3, hand4
        var arrHand = [hand1, hand2, hand3, hand4]
        for (var i = 0; i < arrHand.length; i++) {
            var hand = arrHand[i]
            if (i === 0) {
                hand = j01.create(1118, 520, 'hand')
            } else if (i === 1) {
                hand = j01.create(1118, 144, 'hand')
            } else if (i === 2) {
                hand = j01.create(1930, 179, 'hand')
            } else if (i === 3) {
                hand = j01.create(2880, 480, 'hand')
            }
            hand.animations.add('hand', [0, 1, 2, 3, 4, 5, 6])
            hand.play('hand', 5, true)
        }

        /* 点击事件集合 */
        var arrClick = [j01_click, j02_click, j03_click, j04_click]
    }
}
<template>
    <div class="storm">
        <canvas></canvas>
        <canvas></canvas>
        <canvas></canvas>
    </div>
</template>

<script>
    export default {
        name: "IndexDefault",
        mounted() {
            let oC = document.querySelectorAll('canvas'),
                cxt1 = oC[0].getContext('2d'),  // 绘制线性的 雨水
                cxt2 = oC[1].getContext('2d'),  // 绘制 雨点
                cxt3 = oC[2].getContext('2d'),  // 雷电
                w,
                h,
                rainThroughNum = 500, // 雨线的数量
                speedRainThrough = 25,  // 雨水速度
                rainThrough = [], // 雨水
                rainNum = 500,  // 雨点的数量
                rain = [],   // 雨点
                lightning = [],  // 雷电
                lightTimeCuttent = 0,
                lightTimeTotal = 0

            // 0。 大小自适应
            resize()
            window.addEventListener('resize', resize)

            function resize() {
                oC.forEach((item, index) => {
                    w = item.width = window.innerWidth
                    h = item.height = window.innerHeight
                })
            }

            // min <= n <= max 的随机小数
            function random(min, max) {
                return Math.random() * (max - min + 1) + min
            }

            // 2. 创建雨水
            function createRainThrough() {
                for (let i = 0; i < rainThroughNum; i++) {
                    rainThrough[i] = {
                        x: random(0, w),
                        y: random(0, h),
                        length: Math.floor(random(1, 800)),
                        opacity: Math.random() * 0.2,
                        xs: random(-2, 2),
                        ys: random(10, 20)
                    }
                }
            }

            // 3. 创建雨点
            function createRain() {
                for (let i = 0; i < rainNum; i++) {
                    rain[i] = {
                        x: Math.random() * w,
                        y: Math.random() * h,
                        l: Math.random(),
                        xs: Math.random() * 4 - 2,
                        ys: Math.random() * 10 + 10
                    }
                }
            }


            // 利用函数式编程
            // 1. init 初始化 准备工作
            init()

            function init() {
                // 雨水 + 雨点的 配置信息
                // 2. 创建雨水
                createRainThrough()
                // 3. 创建雨点
                createRain()
                window.addEventListener('resize', createRainThrough)
            }

            // 4. 动画
            animLoop()

            function animLoop() {
                // 5. 绘制雨水
                animateRainThrough()
                // 6. 绘制雨点
                animateRain()

                // 8. 绘制雷电
                animateLightning()
                requestAnimationFrame(animLoop)
            }

            // 5. 雨水动画
            function clearCanvas1() {
                cxt1.clearRect(0, 0, w, h)
            }

            function animateRainThrough() {
                clearCanvas1()
                // 判断 雨水的边界
                for (let i = 0; i < rainThroughNum; i++) {
                    if (rainThrough[i].y >= h) {
                        rainThrough[i].y = h - rainThrough[i].y - rainThrough[i].length
                    } else {
                        rainThrough[i].y += speedRainThrough
                    }
                    // 6. 绘制雨水
                    drawRainThrough(i)
                }
            }

            function drawRainThrough(i) {
                cxt1.beginPath()
                let bg = cxt1.createLinearGradient(0, rainThrough[i].y, 0, rainThrough[i].y + rainThrough[i].length)
                bg.addColorStop(0, 'rgba(255,255,255,0)')
                bg.addColorStop(1, 'rgba(255,255,255,' + rainThrough[i].opacity + ')')

                cxt1.fillStyle = bg
                cxt1.fillRect(rainThrough[i].x, rainThrough[i].y, 1, rainThrough[i].length)
                cxt1.fill()
            }

            // 6. 动画雨点
            function createCanvas2() {
                cxt2.clearRect(0, 0, w, h)
            }

            function animateRain() {
                createCanvas2()
                for (let i = 0; i < rainNum; i++) {
                    rain[i].x += rain[i].xs
                    rain[i].y += rain[i].ys

                    if (rain[i].x > w || rain[i].y > h) {
                        rain[i].x = Math.random() * w
                        rain[i].y = 0
                    }

                    drawRain(i)
                }
            }

            // 7. 绘制雨点
            function drawRain(i) {

                cxt2.beginPath()
                cxt2.moveTo(rain[i].x, rain[i].y)
                cxt2.lineTo(rain[i].x + rain[i].l * rain[i].xs, rain[i].y + rain[i].l * rain[i].ys)
                cxt2.strokeStyle = 'rgba(174,194,224,0.5)'
                cxt2.lineWidth = 1
                cxt2.lineCap = 'round'
                cxt2.stroke()
            }

            // 8. 动画雷电
            function clearCanvas3() {
                cxt3.globalCompositeOperation = 'destination-out'
                cxt3.fillStyle = 'rgba(0,0,0,' + random(1, 30) / 100 + ')'
                cxt3.fillRect(0, 0, w, h)
                // cxt3.clearRect(0,0,w,h)
                cxt3.globalCompositeOperation = 'source-over'
            }

            function animateLightning() {
                clearCanvas3()

                // 不要生成一大遍的雷霆
                lightTimeCuttent +=150
                if (lightTimeCuttent >= lightTimeTotal) {
                    // 创建雷电的配置信息
                    createLightning()
                    lightTimeCuttent = 0
                    lightTimeTotal = random(100, 200)
                }
                // 绘制雷电到canvas画面上面
                drawLightning()
            }

            // 9. 创建雷电
            function createLightning() {
                // 雷霆的配置信息
                // 绘制雷电的起来坐标
                let x = random(100, w - 100)
                let y = random(0, h / 4)

                let createCount = random(1, 3)
                for (let i = 0; i < createCount; i++) {
                    lightning.push({
                        x: x,
                        y: y,
                        xRange: random(5, 30),  // 雷霆的范围
                        yRange: random(10, 25),
                        path: [{
                            x: x,   // 绘制雷电的路径x y
                            y: y
                        }],
                        pathLimit: random(40, 50)    // 路径的极限
                    })
                }
            }

            // 10. 绘制雷霆
            function drawLightning() {
                for (let i = 0; i < lightning.length; i++) {
                    let light = lightning[i]
                    light.path.push({
                        x: light.path[light.path.length - 1].x + (random(0, light.xRange) - (light.xRange / 2)),
                        y: light.path[light.path.length - 1].y + (random(0, light.yRange))
                    })
                    cxt3.strokeStyle = 'rgba(255,255,255,0.1)'
                    cxt3.lineWidth = 3

                    if (Math.floor(random(0, 15)) === 2) {
                        // console.log(6)
                        cxt3.lineWidth = 2
                    }
                    if (Math.floor(random(0, 30)) === 4) {
                        // console.log(8)
                        cxt3.lineWidth = 6
                    }

                    // 会一直 push 配置信息到 lightning 所以要清除前面的闪电 只留一个
                    if (light.path.length > light.pathLimit) {
                        lightning.splice(i, 1)
                    }

                    cxt3.beginPath()
                    cxt3.moveTo(light.x, light.y)
                    for (let p = 0; p < light.path.length; p++) {
                        cxt3.lineTo(light.path[p].x, light.path[p].y)
                    }

                    if (Math.floor(random(0, 30)) === 1) {
                        // console.log(123)
                        //cxt3.fillStyle = 'rgba(255,255,255,' + random(1, 3) / 10 + ')'
                        // cxt3.fillStyle = 'rgba(255,0,0,0.03)'
                        cxt3.fillRect(0, 0, w, h)
                    }

                    cxt3.stroke()
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .storm {
        width: 100%;
        height: 100%;
        background: #222;
        position: relative;
    }

    canvas {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    canvas:nth-child(1) {
        z-index: 100
    }

    canvas:nth-child(2) {
        z-index: 10
    }

    canvas:nth-child(3) {
        z-index: 1
    }
</style>
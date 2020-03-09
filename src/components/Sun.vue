<template>
    <canvas ref="sun"></canvas>
</template>

<script>
    export default {
        name: "Sun",
        mounted() {
            let This = this
            document.addEventListener('DOMContentLoaded', go);
            go();
            function go() {
                'use strict';
                let canvas = This.$refs.sun;
                let cxt = canvas.getContext('2d');
                canvas.style.cssText = 'width:100%;height:100%;Object-fit:contain;background:#000';
                // 帧计数器
                let frame = 0;

                function onFrame() {
                    /*
                    *   在我们的画布上设置宽高，我们将为 godrays 使用吏小的画布
                    *   这也可以清除重置他们的状态,当我们使用它的时候,我们会把它们的尺寸存储在一个变量中
                    *
                    * */
                    canvas.width = 512;
                    canvas.height = 256;
                    godraysCanvas.width = 128;
                    godraysCanvas.height = 64;

                    // 设置太阳的垂直位置
                    let sunY = Math.cos(frame++ / 512) * 24; //这实际上是画布中间的偏移
                    // 获取我们godrays画布的2D上下文,并为所有上下文属性创建环境
                    let godraysCxt = godraysCanvas.getContext('2d');
                    // 太阳的径向渐变
                    let emissionGradient = godraysCxt.createRadialGradient(
                        godraysCanvas.width / 2,
                        godraysCanvas.height / 2 + sunY,    //内圆
                        0,
                        godraysCanvas.width / 2,
                        godraysCanvas.height / 2 + sunY,    //外圆
                        44
                    )
                    godraysCxt.fillStyle = emissionGradient;
                    // 叠加在自己上面很多次,任何轻的东西都 会导致大量的白色
                    emissionGradient.addColorStop(0.1, '#0c0804');
                    emissionGradient.addColorStop(0.2, '#060201');
                    godraysCxt.fillRect(0, 0, godraysCanvas.width, godraysCanvas.height);
                    //把它的填色 设置成黑色,我们用它来画我们的遮挡(山)
                    godraysCxt.fillStyle = '#000';

                    let skyGradient = cxt.createLinearGradient(0, 0, 0, canvas.height);
                    skyGradient.addColorStop(0, '#2a3e55');  // 带青色的顶部
                    skyGradient.addColorStop(0.7, '#8d4835');    // 红色的底部
                    cxt.fillStyle = skyGradient;
                    cxt.fillRect(0, 0, canvas.width, canvas.height);

                    // 我们的山脉将通过不同频率和振幅的正统波进行求和
                    function mountainHeight(position, roughness) {
                        // 频率(质数以防止额外的重复)
                        let frequencies = [1721, 947, 547, 233, 73, 31, 7];
                        // 把数组的值加起来
                        return frequencies.reduce((height, freq) => height * roughness - Math.cos(freq * position), 0);
                    }

                    // 画四层山
                    for (let i = 0; i < 4; i++) {
                        // 将主帆布封装到一种颜色较浅的棕色（在首页较暗）
                        cxt.fillStyle = `hsl(7,23%,${23 - i * 6}%)`;
                        // 对于我信画布上的每列
                        for (let x = canvas.width; x--;) {  // x为0 就停止了 第2个参数是判断
                            // 靠近山脉的速度比远山要快，我们除以数字，因为我们的山脉在第1/7的数字中重复，
                            // 山脉位置
                            let mountainPosition = (frame + frame * i * i) / 1000 + x / 2000;
                            // 让更多的山变得更崎岖 ，增添一点现实主义 ，看起来会更好
                            let mountainRoughness = i / 19 - 0.5;
                            // 128是中间，我25把更近的山移动屏幕 上
                            let y = 128 + i * 25 + mountainHeight(mountainPosition, mountainRoughness) * 45;
                            // 从山顶上画册一个1个宽的长方形，从山顶到画布的底部
                            cxt.fillRect(x, y, 1, 999);
                            // 在太阳的发射画布上用黑色涂上东西，它的大小是1/4
                            // 然后把它移到一个像素点 （否则就会有一个很小 的光线不足的空间）山脉和天空
                            godraysCxt.fillRect(x / 4, y / 4 + 1, 1, 999);
                        }
                    }
                    cxt.globalCompositeOperation = godraysCxt.globalCompositeOperation = 'lighter';
                    /*
                    *    现在，让我们把这个混蛋点亮！我们会在我们的发射帆布上做几次
                    *    每一次个放大的副本，在狒一次，我们土建工程个拷贝，然后是4个
                    *    然后是8，然后是16，。。。 在每次迭代中，我们都 将比例因子平方
                    *
                    * */
                    for (let scaleFactor = 1.07; scaleFactor < 5; scaleFactor *= scaleFactor) {
                        // 用于实现目标的x,y 宽度和高度参数保持 光源(godratsCanvas.width 在的同位置上的高度/2+sunY), 基本让它沸腾
                        godraysCxt.drawImage(
                            godraysCanvas,
                            (godraysCanvas.width - godraysCanvas.width * scaleFactor) / 2,
                            (godraysCanvas.height - godraysCanvas.height * scaleFactor) / 2 - sunY * scaleFactor + sunY,
                            godraysCanvas.width * scaleFactor,
                            godraysCanvas.height * scaleFactor
                        )
                    }
                    // 太阳光射线
                    cxt.drawImage(godraysCanvas, 0, 0, canvas.width, canvas.height);
                    requestAnimationFrame(onFrame);
                }

                let godraysCanvas = canvas.cloneNode()
                onFrame();
            }
        }
    }
</script>

<style scoped>
    canvas{
        background: #000;
    }
</style>
<template>
    <div ref="music"></div>
</template>

<script>
    import option from '../option/music'
    export default {
        name: "Music",
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.echarts.init(this.$refs.music);
            var UPDATE_DURATION = 100;

            window.AudioContext = window.AudioContext || window.webkitAudioContext;

            var audioContext = new AudioContext();

            var oReq = new XMLHttpRequest();
            oReq.open('GET', '/static/yekongzhongzuiliangdexing.mp3', true);
            oReq.responseType = 'arraybuffer';

            oReq.onload = function(e) {
                audioContext.decodeAudioData(oReq.response, initVisualizer);
            };
            oReq.send();

            function initVisualizer(audioBuffer) {
                //inited = true;

                var source = audioContext.createBufferSource();
                source.buffer = audioBuffer;

                // Must invoked right after click event
                if (source.noteOn) {
                    source.noteOn(0);
                }
                else {
                    source.start(0);
                }

                var analyzer = audioContext.createAnalyser();
                var gainNode = audioContext.createGain();
                analyzer.fftSize = 4096;

                gainNode.gain.value = 1;
                source.connect(gainNode);
                gainNode.connect(analyzer);
                analyzer.connect(audioContext.destination);

                var frequencyBinCount = analyzer.frequencyBinCount;
                var dataArray = new Uint8Array(frequencyBinCount);


                var beta = 0;
                function update() {
                    analyzer.getByteFrequencyData(dataArray);

                    var item = [];
                    var size = 50;
                    var dataProvider = [];

                    for (var i = 0; i < size * size; i++) {
                        var x = i % size;
                        var y = Math.floor(i / size);
                        var dx = x - size / 2;
                        var dy = y - size / 2;

                        var angle = Math.atan2(dy, dx);
                        if (angle < 0) {
                            angle = Math.PI * 2 + angle;
                        }
                        var dist = Math.sqrt(dx * dx + dy * dy);
                        var idx = Math.min(
                            frequencyBinCount - 1, Math.round(angle / Math.PI / 2 * 60 + dist * 60) + 100
                        );

                        var val = Math.pow(dataArray[idx] / 100, 3);
                        dataProvider.push([x, y, Math.max(val, 0.1)]);
                    }

                    myChart.setOption({
                        grid3D: {
                            viewControl: {
                                beta: beta,
                                alpha: Math.sin(beta / 10 + 40) * (beta % 10 + 5) / 15 * 30 + 30,
                                distance: Math.cos(beta / 50 + 20) * (beta % 10 + 5) / 15 * 50 + 80,
                                animationDurationUpdate: UPDATE_DURATION,
                                animationEasingUpdate: 'linear'
                            }
                        },
                        series: [{
                            data: dataProvider
                        }]
                    });
                    beta += 2;

                    setTimeout(update, UPDATE_DURATION);
                };

                update();
            }
            myChart.setOption(option)


        }
    }
</script>

<style scoped>

</style>
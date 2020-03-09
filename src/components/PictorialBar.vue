<template>
    <div ref="PictorialBar"></div>
</template>

<script>
    import option from '../option/PictorialBar'
    export default {
        name: "PictorialBar",
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.echarts.init(this.$refs.PictorialBar);
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    }
</script>

<style scoped>

</style>
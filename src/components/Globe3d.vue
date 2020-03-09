<template>
    <div ref="Globe3d"></div>
</template>

<script>
    import option from '../option/Globe3d'
    export default {
        name: "Globe3d",
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.echarts.init(this.$refs.Globe3d);
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    }
</script>

<style scoped>

</style>
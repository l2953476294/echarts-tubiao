<template>
    <div ref="pie"></div>
</template>

<script>
    import option from '@/option/pie'
    export default {
        name: "Pie",
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.echarts.init(this.$refs.pie);
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    }
</script>

<style scoped>

</style>
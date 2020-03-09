<template>
    <div class="storm">
        <canvas id = "canvas"></canvas>
        <canvas></canvas>
        <canvas></canvas>
    </div>
</template>
<script>
    export default{
        name : 'LettersFountain',
        mounted(){
                let anim = {
                //初始数组：
                init(){
                this.oC = document.getElementById('canvas');
                this.ctx = this.oC.getContext( '2d' );
                this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                this.particle = [];  //用于存储粒子
                this.maxParticle = 100; //规定粒子的最大数量
                this.resize()   //调用resize内容
                //()=>this.resize()返回值
                // window.addEventListener( 'resize',()=>{return this.resize()} );
                window.addEventListener( 'resize',()=>this.resize());
                this.loop()
                },
                //自适应resize;
                resize(){
                //canvas标签的宽度与高度分别与浏览器等宽与等高；
                this.oC.width = window.innerWidth;
                this.oC.height = window.innerHeight;
                //绑定宽度与高度，进行调整：
                this.w = window.innerWidth;
                this.h = window.innerHeight;
                },
                //进行样式渲染；
                render(){
                this.fade()
                //每一个粒子对应进行赋值属性
                this.particle.push({
                x:this.w/2,
                y:this.h,
                xSpeed:(Math.random()*20)-10 ,//(0-1)*20 -> (0,20) -> (-10 , 10)
                ySpeed:(Math.random()*20)-10 ,//(0-1)*20 -> (0,20) -> (-10 , 10)
                //[0,1)  ->[0,26)
                //确定文本对象
                font:this.letters[Math.floor(Math.random()*this.letters.length)],
                // HSLA(H,S,L,A)
                color:[ 200 ,80 ,60,0.8 ]

                })
                this.drawParticle()
                this.clearParticle()
                },
                //反复去进行调用
                loop(){
                // console.log( this )  //loop里面的this是指向实例化对象
                this.render();
                // setInterval( this )
                //注意：requestAnimationFrame里的this是指向window;
                requestAnimationFrame( this.loop.bind( this ) )
                },
                //进行绘画
                drawParticle(){
                // console.log( 1 )
                //遍历到每一个字母；
                for( let i = 0 ;i<this.particle.length;i++ ){
                //遍历到每一个字母,然后进行保存；
                let particle = this.particle[i];
                let h = particle.color[0],
                s = particle.color[1] + "%",
                l = particle.color[2] + "%",
                a = particle.color[3],
                hsla = `hsla(${h},${s},${l},${a})`
                // console.log( hsla )
                //rgba:rgba( 255 )
                this.ctx.font = '16px 宋体';
                this.ctx.fillStyle = hsla;
                //绘制26个字母的文本
                this.ctx.fillText( particle.font ,particle.x,particle.y )
                particle.x += particle.xSpeed;
                particle.y += particle.ySpeed;
                particle.y *=0.98

                particle.color[0] += 1;
                particle.color[2] *=0.99

                if(  particle.color[0] > 299 ){
                particle.color[2] = 100
                particle.color[3] = 1
                }

                }
                },
                //闪动的情况：
                fade(){
                this.ctx.fillStyle = `rgba( 0,0,0,0.1 )`
                this.ctx.fillRect(0,0,this.w,this.h)
                },
                clearParticle(){
                if( this.particle.length > this.maxParticle ){
                this.particle.shift();//当到达100个值的情况，把数组里的值进行切除；
                }
                }
                }
                anim.init();
        }
    }
</script>

<style scoped lang="less">
    #canvas{
        width: 100%;
        height: 100%;
    }
</style>
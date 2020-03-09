<template>
  <div id="app">
    <div class='header'>
      <ul>
        <li><a href="javaScript:;"> Home </a></li>
        <li><a href="javaScript:;"> 登陆 </a></li>
        <li><a href="javaScript:;"> 注册 </a></li>
        <li><a href="javaScript:;"> 用户 </a></li>
      </ul>
    </div>
    <div class="main">
        <router-view></router-view>
    </div>

  </div>
</template>

<style lang="less">

  //.header{}
  //.header ul{}
  //.header ul li{}
    .header{
      height: 60px;
      background-color: #151c31;
      box-shadow: 0 1px 2px #999;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      ul{
        display: flex;
        color: #57697e;
        li{
          width: 60px;
          height: 26px;
          line-height: 26px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.3);
          margin-right: 16px;
        }
      }
    }



</style>
<script>
    import '@/assets/css/public.css'
    //写组件的时候 ，如果涉及到js的代码，需要把组件给暴露出去;
    export default {
      name:'App',




    }


</script>

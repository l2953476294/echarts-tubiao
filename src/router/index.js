import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import IndexDefault from '../components/IndexDefault.vue'
import Sun from '../components/Sun.vue'
import Line from '../views/Line'
import Pie from '../components/Pie.vue'
import RichText from '../components/RichText.vue'
import Sunburst from '../components/Sunburst.vue'
import PictorialBar from '../components/PictorialBar.vue'
import Gauge from '../components/Gauge.vue'
import City3d from '../components/city3d.vue'
import Globe3d from '../components/Globe3d.vue'
import Music from '../components/Music.vue'
import LettersFountain from '../components/LettersFountain'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'home',
    // component: Home
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children:[
      // 进来默认的组件
      {
        path:'',
        name:'index',
        component:IndexDefault
      },
      {
        path:'/sun',
        name:'sun',
        component:Sun
      },
      {
        path:'/line',
        name:'line',
        component:Line
      },
      {
        path:'/pie',
        name:'pie',
        component:Pie
      },
      {
        path: '/richtext',
        name: 'RichText',
        component: RichText
      },
      {
        path: '/suburst',
        name: 'Suburst',
        component: Sunburst
      },
      {
        path: '/PictorialBar',
        name: 'PictorialBar',
        component: PictorialBar
      },
      {
        path: '/gauge',
        name: 'Gauge',
        component: Gauge
      },
      {
        path: '/City3d',
        name: 'city3d',
        component: City3d
      },
      {
        path: '/Globe3d',
        name: 'Globe3d',
        component: Globe3d
      },
      {
        path: '/Music',
        name: 'Music',
        component: Music
      },
      {
        path: '/LettersFountain',
        name: 'LettersFountain',
        component: LettersFountain
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home/Home.vue'
import Review from '../views/Review/Review.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  }
  ,
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/review/',
    name: 'review',
    component: Review,
    props: route => ({ imdbId: route.query.reviewId})
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

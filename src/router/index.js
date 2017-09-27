import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Page/Hello'
import pos from '@/components/Page/Pos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pos',
      component: pos
    }
  ]
})

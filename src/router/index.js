// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
// login
import login from '@/views/login';
// op home page
import index from '@/views/index';


// register
import register from "../views/users/register";

// track user
import track from "@/views/operators/track";
import reviews from "../views/operators/reviews";

import datavis from "../views/manager/datavis";

// freshpotatoes
import homepage from "../views/homepage";
import movies from "../views/movies";
import detail from "../views/movie/detail";
import searchpage from "../views/movie/searchpage";
import sortchange from "../views/movie/sortchange";
import profile from "../views/users/profile";

// 启用路由
Vue.use(Router);
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


// 导出路由
export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: homepage,
      hidden: true,
      meta: {
        requireAuth: false
      }
    },
    {
    path: '/home',
    name: 'homepage',
    component: homepage,
    hidden: true,
    meta: {
      requireAuth: false
    }
  },
    {
      path: '/movies',
      name: 'movies',
      component: movies,
      hidden: true,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/movies/detail',
      name: 'detail',
      component: detail,
      hidden: true,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/movies/searchpage',
      name: 'searchpage',
      component: searchpage,
      hidden: true,
      meta: {
        requireAuth: false
      }
    },
    // 用于电影详情页刷新
    {
      path: '/movies/sortchange',
      name: 'sortchange',
      component: sortchange,
      hidden: true,
      meta: {
        requireAuth: false
      }
    },{
      path: '/users/profile',
      name: 'profile',
      component: profile,
      hidden: true,
      meta: {
        requireAuth: false
      }
    },

  // fresh end
    {
    path: '/login',
    name: 'login',
    component: login,
    hidden: true,
    meta: {
      requireAuth: false
    }
  },{path: '/users/register',
    name: 'register',
    component: register,
    hidden: true,
    meta: {
      requireAuth: false
    }
  } ,
    {
      path: '/index',
      name: 'home',
      component: index,
      iconCls: 'el-icon-tickets',
      children: [{
        path: '/operators/track',
        name: 'track',
        component: track,
        meta: {
          requireAuth: true,
        }
      },
        {
          path: '/operators/reviews',
          name: 'reviews',
          component: reviews,
          meta: {
            requireAuth: true,
          }
        },
        {
        path: '/manager/datavis',
        name: 'datavis',
        component: datavis,
        meta: {
          requireAuth: true
        }
      },
      ]
    }]
})

import Vue from 'vue'
import Router from 'vue-router'
import recommend from "../components/pages/Recommend/Recommend"
import singer from "pages/singer/singer";
import rank from "pages/rank/rank";
import Home from "pages/home/home";
import search from "pages/search/search";
import detList from "pages/songDataList/songDataList"
import Player from "../components/common/player/player"
import Error from "pages/Error/Error"
Vue.use(Router)
 

export default new Router({
  routes: [
  	{path:"/mc",component:Home,
  		children:[
  			{path:"recommend",component:recommend},
    		{
          path:"singer",
          component:singer,
          children:[
            {
              path:"detList",
              name:"detList",
              component:detList
            },
            {
              path:"player",
              name:"player",
              component:Player
            }

          ]
        },
        {
          path:"rank",
          component:rank,
           children:[
            {
              path:"detList",
              name:"detList",
              component:detList
            }
          ]
        },
        {path:"search",component:search}
      ]
    },
    {path:"/",redirect:"/mc/recommend"},
    {
      path:"888",
      component:Error
    }
  ]
})

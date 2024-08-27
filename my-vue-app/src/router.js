import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import login from "@/components/login.vue"
import landing from "@/components/landing.vue"
import dashboard from "@/components/dashboard.vue"
import code from "@/components/code.vue"
import me from "@/components/me.vue"
import tournaments from "@/components/tournaments.vue"
import exercice from "@/components/exercice.vue"
import createExercice from "@/components/ranking.vue"
import settings from "@/components/settings.vue"
import help from "@/components/help.vue"
const routes = [
  {path: '/dashboard', component: dashboard},
  { path: '/login', component: login },
  { path: '/', component: landing },
  {path: '/me', component: me},
  {path: '/code', component: code},
  {path: '/exercice', component: exercice},
  {path: '/test', component: createExercice},
  {path: '/tournaments', component: tournaments},
  {path: '/help', component: help},
  {path: '/settings', component: settings},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})



async function onload(){

  if(!localStorage.getItem('token')) router.push('/login')
  
  try {
      
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
      var urlencoded = new URLSearchParams();
      urlencoded.append("token", localStorage.getItem("token"));
  
      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
      };
  
      const response = await fetch("http://localhost:3000/auth/", requestOptions)
  
      const data = await response.json();
    
      if (data.valid != true) {
          
          localStorage.removeItem("token");
        router.push('/login')
         
      }else{
 
      }
  } catch (err) {
     console.log(err)
      localStorage.removeItem("token");
     
  }
  
  
  
   }

  


router.beforeEach(async (to,from)  => {



  if(to.fullPath !== '/' && to.fullPath !== '/login') await onload()

})
export default router   
<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { useColorMode } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'

const router = useRouter()
const route = useRoute()
const mode = useColorMode()



import { onMounted } from 'vue';
onMounted( async () => {
  await onload()
})
async function onload(){

if(!localStorage.getItem('token')) router.push('/login')

try {
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("token", localStorage.getItem("token"));

    var requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const response = await fetch("http://localhost:3000/auth/", requestOptions)

    const data = await response.json();
    
    if (data.valid != true) {
      console.log(data)
        localStorage.removeItem("token");
      router.push('/login')
       
    }else{
      alert('logado')
    }
} catch (err) {
   
    localStorage.removeItem("token");
   
}



 }
</script>

<template>
  <div class="w-3/6 h-screen items-center flex justify-center mt-3 ">
    <div class="grid gap-4 p-6 md:w-[400px] lg:w-[500px] lg:grid-rows-3">
           

           
             
              <RouterLink to="/code"
             
           
                  class="border-2 border-gray-100 block  select-none space-y-1 rounded-md  p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <h1 class="justify-center text-center text-sm font-medium leading-none">Programar</h1>
                  <p class="p-3  text-center text-sm leading-snug text-muted-foreground">
                    Pratique sua lógica de programação com exercicios criados pelos professores!
                  </p>
                
              </RouterLink>
             
            
             
              <RouterLink to="/tournaments"
           
                  class="border-2 border-gray-100 block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                <h1 class="justify-center text-center text-sm font-medium leading-none">Competições</h1>
                  <p class="p-3 text-center  text-sm leading-snug text-muted-foreground">
                    Participe de competições!
                  </p>
               
              </RouterLink>
            
            
             <RouterLink to="/me" 
                  class="border-2 border-gray-100 block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                <h1 class="justify-center text-center text-sm font-medium leading-none">Meu Perfil</h1>
                  <p class="p-3 text-center  text-sm leading-snug text-muted-foreground">
                      Gerencie seu perfil.
                  </p>
               
              </RouterLink>
            </div>
</div>
<div class="h-screen w-full items-center flex justify-center">
 

</div>
</template>
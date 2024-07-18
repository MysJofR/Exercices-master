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
import { onMounted } from 'vue';

const router = useRouter()
const route = useRoute()
const mode = useColorMode()
 


</script>

<template  >
  <div class="h-screen w-full bg-blue-400">
  <div class=" flex flex-row">
  <div class="w-3/6 h-full items-center flex justify-center mt-8 ">
    <div class="grid gap-4 p-6 md:w-[400px] lg:w-[500px] lg:grid-rows-4">
           

           
             
              <RouterLink to="/code"
             
           
                  class="border-2 bg-black border-gray-100 block  select-none space-y-1 rounded-md  p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <h1 class="justify-center text-center text-sm font-medium leading-none">Programar</h1>
                  <p class="p-3  text-center text-sm leading-snug text-muted-foreground">
                    Pratique sua lógica de programação com exercicios criados pelos professores!
                  </p>
                
              </RouterLink>
             
            
             
              <RouterLink to="/tournaments"
           
                  class="border-2  bg-black border-gray-100 block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                <h1 class="justify-center text-center text-sm font-medium leading-none">Competições</h1>
                  <p class="p-3 text-center  text-sm leading-snug text-muted-foreground">
                    Participe de competições!
                  </p>
               
              </RouterLink>
            
            
             <RouterLink to="/me" 
                  class="border-2  bg-black border-gray-100 block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                <h1 class="justify-center text-center text-sm font-medium leading-none">Meu Perfil</h1>
                  <p class="p-3 text-center  text-sm leading-snug text-muted-foreground">
                      Gerencie seu perfil.
                  </p>
               
              </RouterLink>


              <RouterLink to="/exercice" 
                  class="border-2  bg-black border-gray-100 block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                <h1 class="justify-center text-center text-sm font-medium leading-none">Gerenciar Exercicios</h1>
                  <p class="p-3 text-center  text-sm leading-snug text-muted-foreground">
                      Gerencie, crie e edite exercicios.
                  </p>
               
              </RouterLink>
            </div>
</div>
<div class="w-3/6 h-full items-center text-center flex justify-center mt-3">
  <div class="justify-center hover:bg-gray-900 bg-black hover:text-gray-100 w-80 rounded-full mt-28 items-center flex flex-col h-80 transform transition-transform duration-300 hover:translate-x-2 hover:translate-y-4">
    <h1 class="font-bold font-mono select-none text-7xl justify-center">Logic</h1>
</div>

</div>
  </div></div>
</template>
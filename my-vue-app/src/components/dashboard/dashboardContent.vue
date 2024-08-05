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

import { ref } from 'vue';
const router = useRouter()
const route = useRoute()
const mode = useColorMode()
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { toast } from '@/components/ui/toast';
import { onMounted } from 'vue';



onMounted(async () => {

  

})



</script>

<template>
  <div class="h-screen w-10/12 bg-gray-100 flex items-center flex-col ">
   <nav class="h-1/6 p-5 justify-left flex  w-full items-center"> <h1 class="text-black font-bold text-2xl">Meu perfil</h1> </nav>
   <div class="h-4/6    flex-col   rounded-lg flex  mt-5  w-5/6 ">
    


<div  class="w-full h-full flex flex-row ">
<div class="w-1/6 h-2/6 justify-center  flex items-center " ><img class="rounded-full border-2 border-black w-[100px] h-[100px]" src="./JGR-4624.jpg"></div>
<div class="w-3/6 h-2/6 border-2 p-3 text-black flex flex-col  border-black rounded-lg"> 
  <h1 class="font-bold text-xl ">João Guilherme Rodrigues</h1>
  <div class="w-full justify-start flex flex-col ">
      <p class="text-black font-semibold ">Matricula: 02150255</p>
      <p class="text-black font-semibold ">Turma: DS2</p>
      <p class="text-black font-semibold ">Data de ingresso: 21/06/2025</p>
      
  </div>

</div>


</div>
   </div>
  </div>
</template>
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
import Progress from '../ui/progress/Progress.vue';


async function getUser() {
  progress.value = 100
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("token", localStorage.getItem("token") ?? '');

    const requestOptions = {
      method: 'GET',
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "token": localStorage.getItem("token"),
      },
      redirect: 'follow'
    };

    const response = await fetch("http://localhost:3000/me", requestOptions);
   
    const data = await response.json();

    if (response.status === 200) {
     
      user.value = data;
     
    }
  } catch (err) {
    console.log(err);
    localStorage.removeItem("token");
  }
}
onMounted(async () => {

  await getUser()
  loading.value = false
})
const user = ref(null)
const progress= ref(33)
const loading = ref(true)
</script>

<template>
<div v-if="loading" class="flex items-center justify-center h-full w-full"> <Progress class="w-2/6 " v-model="progress"/></div>

  <div v-if="!loading" class="h-full w-full p-4 flex items-center flex-col ">
    <div class="w-full p-2 h-1/6 flex flex-col">
      <h1  class="text-lg font-bold">Bem-vindo {{user?.fullname}}!</h1>
      <p>O que você deseja fazer hoje?</p>
    </div>

    <div class="w-full h-2/6 gap-6 grid grid-cols-3">

      <div class="rounded-md  space-y-2 text-center border-2 items-center p-2 flex flex-col">
        <h1 class="text-lg font-bold">Programar!</h1>
        <p class="text-sm w-4/6">Pratique com os exercicios propostos pelos seus professores!</p>
        <div class="justify-end p-2 flex w-full ">
          <Button @click="$router.push('/code')" class="  w-1/6" variant="outline">Ir!</Button>
        </div>
      
      </div>
      <div class="rounded-md text-center space-y-2 border-2 items-center  p-2 flex flex-col">
        <h1 class="text-lg font-bold">Competições!</h1>
        <p class="text-sm w-4/6">Participar de competições entre usuários para testar a si mesmo!</p>
        <div class="justify-end p-2 flex w-full ">
          <Button @click="$router.push('/tournaments')" class="  w-1/6" variant="outline">Ir!</Button>
        </div>
      
      </div>
      <div class="rounded-md text-center space-y-2 border-2 items-center p-2 flex flex-col">
        <h1 class="text-lg font-bold">Gerenciador de exercicios</h1>
        <p class="text-sm w-5/6">Área de gerenciamento de Tarefas pelos professores.</p>
        <div class="justify-end p-2 flex w-full ">
          <Button @click="$router.push('/exercice')" class="  w-1/6" variant="outline">Ir!</Button>
        </div>
      
      </div>

    </div>
 
  </div>
</template>
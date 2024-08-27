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
import { onMounted, ref } from 'vue';
import Progress from './ui/progress/Progress.vue';

const router = useRouter()
const route = useRoute()
const mode = useColorMode()


async function getUser() {
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
      console.log(data)
      user.value = data;
      progress.value = 100
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
const handleLeave = () => {
  localStorage.removeItem("token")
  router.push('/')
}
const progress = ref(33)
const loading = ref(true)
</script>

<template>
  <div class="w-screen h-screen flex flex-col items-center">
  <div class="w-full px-1 py-4 h-1/6 flex-row flex justify-center ">
          
          <nav class="w-full rounded-md p-4   px-8 flex flex-row border-b-2 ">
           
        

              <div class="flex w-full flex-row space-x-10 items-center  justify-start">
                <div>   <h1 class="font-extrabold text-gray-100  text-3xl">LogiC</h1></div>
                  <div class="">
                      <button  @click="$router.push('/dashboard')" class=" text-lg font-semibold font-sans  hover:text-gray-300" >Dashboard</button>
                  </div>
                 
                  
                  <div>
                      <button class=" text-lg font-semibold hover:text-gray-300 " >Ajuda</button>
                  </div>
              </div>
            
          </nav>
      </div>
      <div v-if="loading" class="flex items-center justify-center h-full w-full"> <Progress class="w-2/6 " v-model="progress"/></div>
      <div v-if="!loading" class="w-3/6 h-4/6 rounded-md space-y-2 border-2  items-center flex p-20 flex-col">
        <img v-show="user"  style="" :src=" `http://localhost:3000${user?.profilePicture} `" class="rounded-full border-2  h-2/12 w-1/6">
        <h1 class="font-bold text-lg">{{ user?.fullname }}</h1>
        <h1  class="font-bold text-lg">{{ user?.schoolId }} - {{ user?.course }}</h1>
        <h1 class="font-semibold text-lg">Número de exercicios concluidos: {{  user?.exercisesDone.length }}</h1>
        
            <Button @click="handleLeave" variant="destructive">Sair da conta</Button>
      </div></div>
</template>
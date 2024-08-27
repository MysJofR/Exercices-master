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
import { Ref } from 'vue';
import { ref, emit, onMounted } from 'vue';
import { User } from 'lucide-vue-next';
const router = useRouter()
const route = useRoute()
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
      user.value = data;
    }
  } catch (err) {
    console.log(err);
    localStorage.removeItem("token");
  }
}
const mode = useColorMode()
onMounted(async () => {

await getUser()

})
const handleLeave = () => {
  localStorage.removeItem('token')
  router.push('/')
}
const user = ref(null)
</script>

<template>
  <div class="h-full justify-end w-2/12  flex  flex-col shadow-lg">


    <div  class="w-full h-1/6 p-4 items-center justify-center space-x-2  flex flex-row ">
<img class="rounded-full border-2 border-accent w-3/12" src="./JGR-4624.jpg">

  <h1 v-if="user" class="text-sm font-bold">{{user.schoolId}}</h1>
 

</div>
   
    <ul class="w-full h-5/6 items-center  flex flex-col  ">

        <li   class="w-4/6 flex flex-row justify-center hover:accent ">
           <button  class="text-gray-400 flex flex-row   hover:text-gray-100 text-left  font-semibold p-3 w-5/6">
             Meu Perfil</button>
        
        </li>
        <li  class="w-5/6 flex flex-row justify-center hover:accent ">
           <button class="text-gray-400 flex flex-row    hover:text-gray-100 text-left font-semibold p-3 w-5/6">
             Configurações</button>
          
        </li>
     
        <li  class="w-2/6 flex flex-row  justify-center hover:accent ">
           <button @click="handleLeave" class="text-gray-400 flex flex-row  hover:text-gray-100 text-left font-semibold p-3 w-full">Sair</button>
          
        </li>
      


    </ul>
    </div>
</template>
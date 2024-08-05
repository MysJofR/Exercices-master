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
import sideBar from '@/dashboardComponents/sideBar.vue';
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
const { toast } = useToast()
import { Toaster } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'
import { onMounted } from 'vue';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
const search = ref('')
const users = ref([])
import { Input } from '@/components/ui/input'
onMounted(async () => {

await getUsers()

})
async function getUsers() {

  try {

const requestOptions: RequestInit = {
    method: 'GET',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*",
    "token": localStorage.getItem('token')
  },
  redirect: 'follow'
};

const response = await fetch("http://localhost:3000/auth/list", requestOptions);
const data = await response.json();

if (response.status == 201) {
  if(data.length>0)users.value = data; getUsersThatMade()
  
} else {
  console.log(data);

  toast({
    title: 'Erro ao listar usuarios',
    description: data.message,
  });
}
} catch (err) {
console.error(err);
localStorage.removeItem("token");
}
}
const usersThatMade = ref([])
async function getUsersThatMade() {

users.value.map( e => {
  if(e.exercisesDone.some(obj => obj.id == localStorage.getItem('exercice'))){
    usersThatMade.value.push(e)
  }
})  

}


const emit = defineEmits(['getSearch'])
const handleSearch = async () => {
    await getUsers
   const formattedSearch = search.value.toLowerCase()
  
  const filter = users.value.filter((user) => user.fullname.toLowerCase().includes(formattedSearch) || user.schoolId.toLowerCase().includes(formattedSearch))
   
    emit('getSearch', filter)
    
}

</script>

<template>
  <Toaster />

  <Input @change="handleSearch" class="ml-5 w-40" v-model="search" type="text"  placeholder="Procurar pedidos por nome ou cliente"/>
  <Button class="ml-5" >
      Buscar
    </Button>
</template>
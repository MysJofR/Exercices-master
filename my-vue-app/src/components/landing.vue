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
import { Icon } from '@iconify/vue'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'

const router = useRouter()
const route = useRoute()
const mode = useColorMode()


async function handleStartButton(){



try {
  if(!localStorage.getItem('token'))  router.push('/login')
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
    
    if (data.valid !== true) {
      console.log(data)
        localStorage.removeItem("token");
      router.push('/login')
       
    }else{
      console.log(data)
      router.push('/dashboard')
    }
} catch (err) {
   console.log(err)
    localStorage.removeItem("token");
   
}



 }

</script>

<template>


<div class="overflow-y-auto h-screen bg-gradient-to-br from-background via-black to-gray-700">
    <div class="h-full w-full flex flex-col  ">


        <div class="w-full   h-1/6 flex-row  flex ">
          
            <nav class="w-full items-center flex  px-8 ">
             


                <div class="flex w-full items-center flex-row space-x-2 justify-start">
                    <div><img src="/LogiC.svg" class="shadow-lg rounded-lg "  width="26"></div>
                    <div>    <h1 class="text-4xl font-extrabold text-white">LOGIC</h1></div>
               
                   
                </div>
            </nav>
        </div>
        <div class="h-5/6 w-full   flex-col items-center flex justify-center">
            <div class="flex h-full px-10 justify-center w-full flex-row">
                <div class="w-3/6 h-4/6 space-y-4 flex flex-col items-center justify-end">
                    <h1 class="font-bold  justify-center text-center w-8/12 text-4xl">O lugar perfeito para praticar lógica de programação!</h1>
                    <p class="text-gray-400 justify-center text-center text-sm w-3/6">Simplifique os seus estudos submetendo exercicios e participando de competições</p>
                    <Button variant="outline" @click="handleStartButton" class="shadow-md bg-gray-800 w-52 rounded-md h-10">Começar</Button>
                </div>
               
            </div>
        </div>
    </div>

    <!-- Nova Seção com overflow -->
    <div class="h-full w-full flex flex-col ">
        <div class="h-full w-full  space-y-8 flex-col items-center flex ">
            <h1 id="about" class="font-bold  justify-center text-center w-7/12 text-4xl">Maximize sua lógica!</h1>
            <p class="text-gray-400 justify-center text-center text-sm w-3/6">O projeto LogiC visa facilitar o estudo da lógica de programação através de uma plataforma dedicada, onde os alunos podem submeter Tarefas online de maneira mais ágil e simplificada. Tradicionalmente, a resolução e submissão de Tarefas envolve a leitura do enunciado, a abertura de um editor de texto e o envio manual dos arquivos. A plataforma LogiC elimina essas etapas, proporcionando um ambiente integrado que otimiza o processo de aprendizagem. Este sistema não apenas economiza tempo, mas também aprimora a experiência educacional, permitindo que os alunos se concentrem no desenvolvimento de suas habilidades em lógica de programação de forma mais eficaz.</p>

                
            <Button @click="handleStartButton" variant="outline" class="shadow-md bg-gray-800 w-52 rounded-md h-10">Quero participar!</Button>
        </div>
    </div>
</div>





</template>
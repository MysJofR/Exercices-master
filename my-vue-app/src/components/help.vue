<template>
    <div class="flex flex-col h-screen w-screen">
        <div class="w-full px-1 py-4 h-1/6 flex-row flex justify-center ">
          
          <nav class="w-full rounded-md p-4   px-8 flex flex-row border-b-2 ">
           
        

              <div class="flex w-full flex-row space-x-10 items-center  justify-start">
                <div>   <h1 class="font-extrabold text-gray-100  text-3xl">LogiC</h1></div>
                  <div class="">
                      <button  @click="$router.push('/dashboard')" class=" text-lg font-semibold font-sans  hover:text-gray-300" >Dashboard</button>
                  </div>
                 
                  
                  <div>
                      <button  @click="$router.push('/help')" class=" text-lg font-semibold hover:text-gray-300 " >Ajuda</button>
                  </div>
              </div>
              <div class="flex flex-row justify-end w-full">

                
                <button @click="$router.push('/me')">
                <img :src=" `http://localhost:3000${user?.profilePicture} `" class="rounded-full border-2 border-accent h-10 w-10"></button>
              </div>
          </nav>
      </div>
      <!-- Sidebar -->
     
  
      <!-- Main Content -->
      <main class="flex-1 p-8">
       
  
        <div >

        
           
              <strong>Como eu devo submeter exercicios?</strong>

                <ol class="mt-4 w-3/6 space-y-2">
                  <li>Selecione o Tarefa</li>        
                  <li>Leia o enunciado com atenção</li>
                  <li>Escreva o código seguindo apenas o que for pedido</li>
                  <li>Você não deve escrever mensagens como: "Digite um número: ", apenas inicie as variaveis e as leia
                  </li>
                  <li>Para acertar a resposta você deve devolver na tela o que o exercicio pede, por exemplo: 
                    "Leia dois numeros inteiros e imprima a soma entre eles".
                  </li>
                  <li>Após feito, submeta o Tarefa</li>
                </ol>

             
          

        </div>
  
       
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  
  </script>
  
  <style scoped>
  body {
    font-family: 'Inter', sans-serif;
  }
  </style>
  
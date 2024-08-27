<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet'
import { useColorMode } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue';
import Button from '../ui/button/Button.vue';
import { ArrowUpRight } from 'lucide-vue-next';

const router = useRouter()
const route = useRoute()
const mode = useColorMode()

const exercicesDone = ref([])
const exercicesPending = ref([])
const user = ref(null)
const pendingList = ref(false)
const doneList = ref(false)
const isLoading = ref(true)  // Estado de loading

const handleDoneList = () => {
    doneList.value = !doneList.value;
}
const handlePendingList = () => {
    pendingList.value = !pendingList.value;
}
   
const emit = defineEmits(['select'])
const selectExercice = (exercice: object) => {
    emit('select', exercice.id)
}

async function getExercices() {
  try{
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "token": localStorage.getItem("token")
      },
      redirect: 'follow'
    };

    const response = await fetch("http://localhost:3000/exercice/", requestOptions);
    const data = await response.json();

    if (response.status === 200) {
      if (data.length > 0) {
        data.map(e => {
          if(e.doneBy.some(obj => obj.id == user.value.id)){
            exercicesDone.value.push(e)
          }else{ 
            exercicesPending.value.push(e)
          }
        })
      } 
    } else {
      
      throw new Error(data.message || "Erro ao enviar Tarefa");
    }
  }catch(err){
    console.log(err)
  } finally {
    isLoading.value = false; // Desabilitar o loading quando terminar
  }
}

async function getUser() {
  try {
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
      await getExercices();
    }
  } catch (err) {
    console.log(err);
    localStorage.removeItem("token");
  }
}

onMounted(async () => {
  await getUser()
})

</script>

<template>
  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
  </div>
  <div v-else>
    <Sheet class="">
      <SheetTrigger ><Button @click="handleDoneList; handlePendingList; getExercices; " as-child size="sm" class="ml-auto gap-1">
              <a >
               Lista de Tarefas
                <ArrowUpRight class="h-4 w-4" />
              </a>
            </Button></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Lista de Tarefas</SheetTitle>
          <SheetDescription>
            Selecione um Tarefa para resolver.
          </SheetDescription>
        </SheetHeader>
        <div class="w-full h-full flex flex-col space-y-1 items-center p-2">
          <button v-if="exercicesPending?.length > 0" @click="handlePendingList" class="w-full rounded-lg justify-center items-center flex flex-row border-2 h-10">
            <h1 class="font-medium text-sm">Tarefas Pendentes</h1>
          </button>
          <div v-if="pendingList" class="w-full h-2/6 rounded-lg overflow-y-auto border-2">
            <ul class="p-2 space-y-2">
              <li v-for="(exercice, index) in exercicesPending" class="w-full h-1/6 p-2 rounded-md border-2" :key="index">
                <SheetClose>
                  <button @click="selectExercice(exercice)" class="text-gray-100 text-sm">{{ new Date(exercice.createdAt).toLocaleDateString() + ' - ' + exercice.name }}</button>
                </SheetClose>
              </li>
            </ul>
          </div>
          <button v-if="exercicesDone?.length > 0" @click="handleDoneList" class="w-full justify-center rounded-lg items-center flex flex-row border-2 h-10">
            <h1 class="font-medium text-sm">Tarefas Concluídos</h1>
          </button>
          <div v-if="doneList" class="w-full rounded-lg h-2/6 overflow-y-auto border-2">
            <ul class="p-2 space-y-2">
              <li v-for="(exercice, index) in exercicesDone" class="w-full rounded-sm p-2 flex justify-center h-1/6 border-2" :key="index">
                <SheetClose>
                  <button @click="selectExercice(exercice)" class="text-gray-100 text-sm">{{ new Date(exercice.createdAt).toLocaleDateString() +' - ' + exercice.name }}</button>
                </SheetClose>
              </li>
            </ul>
          </div>

          <h1 v-if="exercicesDone?.length == 0 && exercicesPending?.length == 0" class="font-semibold text-md">Não há exercicios disponiveis no momento.</h1>
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
 
  border-top: 6px solid white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

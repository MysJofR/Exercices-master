<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { ref, reactive, onMounted } from 'vue';
import { toast } from '@/components/ui/toast';
import Label from '../ui/label/Label.vue';
import Textarea from '../ui/textarea/Textarea.vue';
import Toaster from '../ui/toast/Toaster.vue';
import { stat } from 'fs';
import Button from '../ui/button/Button.vue';

const onEdit = ref(false);
const exercice = ref(null);



async function getExercice() {
  toast({
    title: 'Buscando Usuários',
  })
  try {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "token": localStorage.getItem("token"),
      },
      redirect: 'follow',
    };

    const response = await fetch(`http://localhost:3000/exercice/${localStorage.getItem('exercice')}`, requestOptions);
    const data = await response.json();

    if (response.status === 200 && data) {
    toast({
      title: 'Tarefa carregado!',
      duration: 2000
    })
      exercice.value = data;
    
    } else {
      throw new Error(data.message || "Erro ao buscar Tarefa");
    }
  } catch (err) {
    console.error(err);
  }
}
const isLoading = ref(false)
onMounted(async () => {
  isLoading.value = true
  await getExercice();
  await getUsers()
  isLoading.value = false
});

const users = ref(null)
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
if(data.length>0) users.value = data; 

} else {


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

const updateExerciceInfo = async (name: string, difficulty: number, statement: string) => {

  if(!name || !difficulty || !statement){
    
    toast({
      title: 'Erro ao editar exercicio',
      description: 'Certifique-se de preencher todos os campos'
    })
    return
  }


 
  try {
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        exerciceId: exercice.value.id,
        doneBy: doneBy,
        tests: exercice.value.tests,
        difficulty: difficulty,
        name: name,
        statement: statement
      }),
      redirect: 'follow',
    };

    const response = await fetch(`http://localhost:3000/exercice/update`, requestOptions);
    const data = await response.json();

    if (response.status === 200 && data) {
      await getExercice()
      toast({ title: 'Operação concluida com sucesso', description: 'O exercicio foi editado com sucesso!'})
      onEdit.value = false
      
    } else {
      throw new Error(data.message || "Erro ao atualizar Tarefa");
    }
  } catch (err) {
    console.error(err);
  }
};

const search = ref()
const usersToList = ref([])
const handleUsers = () => {
  usersToList.value = []

 users.value.map(e => {
  if(!usersToList.value.includes(e)  &&  ( e.fullname.toLowerCase().includes(search.value.toLowerCase()) || e.schoolId.toLowerCase().includes(search.value.toLowerCase())) ) usersToList.value.push(e)
 })
}

const updateUser =  async () => {
isLoading.value = true
const formattedDoneBy = exercice.value.doneBy.map(e => {
  return e.schoolId
})

  try {
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        exerciceId: exercice.value.id,
       doneBy: formattedDoneBy,
        tests: exercice.value.tests,
        difficulty: exercice.value.difficulty,
        name: exercice.value.name,
        statement: exercice.value.statement
      }),
      redirect: 'follow',
    };

    const response = await fetch(`http://localhost:3000/exercice/update`, requestOptions);
    const data = await response.json();

    if (response.status === 200 && data) {
      await getExercice()
      isLoading.value = false
      toast({ title: 'Operação concluida com sucesso', description: 'O exercicio foi editado com sucesso!'})
      
      
    } else {
      throw new Error(data.message || "Erro ao atualizar Tarefa");
    }
  } catch (err) {
    console.error(err);
  }
}



</script>


<template>


 
<div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
  </div>
 

<div v-if="exercice && !isLoading" class="w-full border-t-2 flex flex-col items-start border-accent p-4 sm:h-2/6 lg:min-h-full lg:h-full">
<div class="h-1/6">

<Input @keyup="handleUsers" v-model="search" type="text" class=" text-gray-100  p-1 rounded-lg " placeholder="Buscar..."  />

</div>
  
    <Table v-if="!search"  class="lg:min-h-5/6 h-5/6   w-5/6" >
  
    <TableHeader>
      <TableRow class="">
        <TableHead class=" ">
          Nome
        </TableHead>
        <TableHead class="">Matricula</TableHead>
     
        
      </TableRow>
    </TableHeader>
    <TableBody>
    
       <TableRow class=" " v-for="(user, index) in exercice.doneBy" :key="index">
        <TableCell  class="font-medium ">
          {{ user.fullname }}
        </TableCell>
        <TableCell>{{ user.schoolId }}</TableCell>
       
        <TableCell><Button @click=" exercice.doneBy.splice(index,1);updateUser();" variant="destructive" class="">Remover</Button></TableCell>
      </TableRow>
      
    </TableBody>
  </Table>

  <Table v-else  class=" h-5/6   w-5/6" >
  
  <TableHeader>
    <TableRow class="">
      <TableHead class=" ">
        Nome
      </TableHead>
      <TableHead class="">Matricula</TableHead>
   

    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow class="" v-for="(user, index) in usersToList" :key="index">
      <TableCell  class="font-medium ">
        {{ user.fullname }}
      </TableCell>
      <TableCell>{{ user.schoolId }}</TableCell>
      <TableCell v-if="exercice.doneBy.some(obj => obj.schoolId == user.schoolId)"><Button @click="" variant="destructive" class="">Remover</Button></TableCell>
      <TableCell v-else><Button @click="exercice.doneBy.push(user);updateUser()" variant="outline" class="">Adicionar</Button></TableCell>
    </TableRow>
    
    
  </TableBody>
</Table>

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

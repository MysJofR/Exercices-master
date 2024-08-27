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


const exercice = ref(null);



async function getExercice() {

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
    
      exercice.value = data;
      isLoading.value = false
    } else {
      throw new Error(data.message || "Erro ao buscar Tarefa");
    }
  } catch (err) {
    console.error(err);
  }
}

onMounted(async () => {
  isLoading.value = true
  await getExercice();

});






const input = ref(null)
const output = ref(null)



const newTest =  async () => {
isLoading.value = true
const formattedDoneBy = exercice.value.doneBy.map(e => {
  return e.schoolId
})

if(input.value && output.value)  exercice.value.tests.push({input: input.value.split(','), output: output.value})
 


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
      input.value = null
      output.value = null
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
const newExercice = ref(false)

const isLoading = ref(false)
</script>


<template>


 
<div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
  </div>
  <div v-if="exercice && !isLoading" class="w-full  flex flex-col items-start border-accent p-4 h-5/6">
   
<div class="h-2/6 w-full space-y-2 flex flex-col">

<Button @click="newExercice=true" variant="outline"  class=" w-2/12 ">Novo teste</Button>
<div v-if="newExercice" class="flex space-x-2 flex-row">
<Input v-model="input" type="text" class="w-2/12  text-gray-100 p-1 rounded-lg " placeholder="Input: 5,5.4 ..."  />
<Input v-model="output" type="text"  class="w-2/12  text-gray-100 p-1 rounded-lg " placeholder="Output: 10.3 ..."  />
<Button @click="newExercice=false; newTest()" variant="outline" class="">+</Button>
</div>
</div>
  
    <Table   class=" h-4/6   w-5/6" >
  
    <TableHeader>
      <TableRow class="">
        <TableHead class=" ">
          Inputs
        </TableHead>
        <TableHead class="">Output</TableHead>
     
        
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow class="" v-for="(test, index) in exercice.tests" :key="index">
        <TableCell  class="font-medium ">
          {{ test.input }}
        </TableCell>
        <TableCell>{{ test.output }}</TableCell>
       
        <TableCell><Button @click=" exercice.tests.splice(index,1);newTest();" variant="destructive" class="">Remover</Button></TableCell>
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
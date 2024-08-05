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
      console.log(data)
    } else {
      throw new Error(data.message || "Erro ao buscar exercício");
    }
  } catch (err) {
    console.error(err);
  }
}

onMounted(async () => {
  await getExercice();

});






const input = ref(null)
const output = ref(null)



const newTest =  async () => {

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
      toast({ title: 'Operação concluida com sucesso', description: 'O exercicio foi editado com sucesso!'})
      
      
    } else {
      throw new Error(data.message || "Erro ao atualizar exercício");
    }
  } catch (err) {
    console.error(err);
  }
}
const newExercice = ref(false)


</script>


<template>


 

  <div v-if="exercice" class="w-full border-t-2 flex flex-col items-start border-gray-200 p-4 h-5/6">
<div class="h-2/6 w-full space-y-2 flex flex-col">

<Button @click="newExercice=true" class="border-2 w-2/12 border-black hover:bg-zinc-200">Novo exercício</Button>
<div v-if="newExercice" class="flex space-x-2 flex-row">
<input v-model="input" type="text" class=" border-2 text-black p-1 rounded-lg border-black" placeholder="Input: 5,5.4 ..."  />
<input v-model="output" type="text" class=" border-2 text-black p-1 rounded-lg border-black" placeholder="Output: 10.3 ..."  />
<Button @click="newExercice=false; newTest()" class="bg-neutral-100 border-black hover:bg-zinc-200">X</Button>
</div>
</div>
  
    <Table   class=" h-4/6   w-5/6" >
  
    <TableHeader>
      <TableRow class="hover:bg-neutral-100 bg-neutral-100">
        <TableHead class=" text-black">
          Inputs
        </TableHead>
        <TableHead class="text-black">Output</TableHead>
     
        
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow class="bg-neutral-100  hover:bg-neutral-100 text-black" v-for="(test, index) in exercice.tests" :key="index">
        <TableCell  class="font-medium ">
          {{ test.input }}
        </TableCell>
        <TableCell>{{ test.output }}</TableCell>
       
        <TableCell><Button @click=" exercice.tests.splice(index,1);newTest();" variant="destructive" class="border-2 border-black hover:bg-zinc-200">Remover</Button></TableCell>
      </TableRow>
      
    </TableBody>
  </Table>



  </div>
</template>


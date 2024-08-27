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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { ref, reactive, onMounted } from 'vue';
import { toast } from '@/components/ui/toast';
import Label from '../ui/label/Label.vue';
import Textarea from '../ui/textarea/Textarea.vue';
import Toaster from '../ui/toast/Toaster.vue';
import { stat } from 'fs';
import CircleLoader from '../circleLoader.vue';

const onEdit = ref(false);
const test = ref(localStorage.getItem('exercice'))
const exercice = ref(null);
const exerciceToUpdate = ref(null)


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
      exerciceName.value = data.name
      exerciceStatement.value = data.statement
      exerciceDifficulty.value = data.difficulty


      isLoading.value = false
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
});

const updateExerciceInfo = async (name: string, difficulty: number, statement: string) => {

  if(!name || !difficulty || !statement){
  
    toast({
      title: 'Erro ao editar exercicio',
      description: 'Certifique-se de preencher todos os campos'
    })
    return
  }
isLoading.value = true

  const doneBy = exercice.value.doneBy.map(e => {
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
     
      isLoading.value = false
    } else {
      throw new Error(data.message || "Erro ao atualizar Tarefa");
    }
  } catch (err) {
    console.error(err);
  }
};

const exerciceName = ref(null)
const exerciceDifficulty = ref(null)
const exerciceStatement = ref(null)

</script>


<template>
  

  

 

  <div class="grid grid-cols-1 md:grid-cols-2  gap-4 p-4 h-full w-full">
    <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
  </div>
  <div v-if="exercice && !isLoading" class="flex flex-col justify-center h-full space-y-4 w-full">
    <div>
      <Label class="">Nome do Tarefa:</Label>
      <Input id="nameUpdate" v-model="exerciceName" class="text-gray-100 w-full" type="text" />
    </div>

    <div>
      <Label class="">Dificuldade:</Label>
      <Select id="difficultyUpdate" v-model="exerciceDifficulty">
        <SelectTrigger class="w-full">
          <SelectValue placeholder="Selecione a dificuldade" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem :value="1">1</SelectItem>
            <SelectItem :value="2">2</SelectItem>
            <SelectItem :value="3">3</SelectItem>
            <SelectItem :value="4">4</SelectItem>
            <SelectItem :value="5">5</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div>
      <Label class="">Descrição do Tarefa:</Label>
      <Textarea id="statementUpdate" v-model="exerciceStatement" class="w-full" style="resize: none" />
     
    </div>
    
  </div>
  <div class="w-full justify-center  items-center flex">
  <Button @click="updateExerciceInfo(exerciceName, exerciceDifficulty, exerciceStatement)" variant="outline" class="w-3/6 ">Enviar alterações</Button>  
</div>
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
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

const onEdit = ref(false);
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

const updateExerciceInfo = async (name: string, difficulty: number, statement: string) => {

  if(!name || !difficulty || !statement){
    console.log(name,difficulty,statement)
    toast({
      title: 'Erro ao editar exercicio',
      description: 'Certifique-se de preencher todos os campos'
    })
    return
  }


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
      onEdit.value = false
      
    } else {
      throw new Error(data.message || "Erro ao atualizar exercício");
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


 

  <div class="w-full border-t-2 flex flex-row items-start border-gray-200 p-4 h-5/6">
    <div class="flex flex-col w-3/6">
    <header class="w-full h-1/6 space-x-2">
      <Button v-if="!onEdit" @click="onEdit = true; exerciceName = exercice.name; exerciceDifficulty = exercice.difficulty, exerciceStatement = exercice.statement" class="border-black border-2 hover:bg-zinc-200">Modo Edição</Button>
      <Button v-if="!onEdit" class="border-black border-2 hover:bg-zinc-200">Acessar exercício</Button>
    </header>

    <div v-if="exercice" class="flex flex-col justify-center h-full py-6 w-full">
      
        <div>
          <Label  class="text-gray-600">Nome do exercício:</Label>
          <Input id="nameShow" v-if="!onEdit" :default-value="exercice.name" readonly class="text-black  bg-neutral-400 w-3/6" type="text" />
        
                <Input id="nameUpdate" v-if="onEdit" v-model="exerciceName"  class="text-black bg-neutral-100 w-3/6" type="text" />
              
              
              
              
             
        </div>

        <div>
          <Label class="text-gray-600">Dificuldade:</Label>
          <Input id="difficultyShow" v-if="!onEdit" :default-value="exercice.difficulty" readonly class="w-3/6 text-black bg-neutral-400" type="text" />
        
        
                <Select id="difficultyUpdate" v-model="exerciceDifficulty"  v-if="onEdit" >
            <SelectTrigger class="bg-neutral-100 w-3/6">
              <SelectValue   class="text-black" placeholder="Selecione a dificuldade" />
            </SelectTrigger>
            <SelectContent class="bg-neutral-100 text-black">
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
          <Label class="text-gray-600">Descrição do exercício:</Label>
          <Textarea style="resize: none" id="statementShow" v-if="!onEdit" :default-value="exercice.statement" readonly class="text-black bg-neutral-400 w-3/6" type="text" />
       
                
                <Textarea id="statementUpdate" @click.prevent="" v-model="exerciceStatement" style="resize: none" maxlength="80" v-if="onEdit"  class="text-black bg-neutral-100 w-3/6" type="text" />
             
        </div>

        <footer class="w-full p-4 flex justify-end items-end space-x-2 h-1/6">
          <Button v-if="onEdit" @click.prevent="onEdit = false" variant="destructive">Cancelar Edição</Button>
          <Button v-if="onEdit" type="submit" @click="updateExerciceInfo(exerciceName, exerciceDifficulty, exerciceStatement)" variant="outline">Concluir</Button>
        </footer>
      </div>

        </div>
    
      

      <div v-if="exercice" class="w-3/6 border-l-2 p-2 text-center border-zinc-200 h-full">
        <p class="text-black">Este exercício foi feito por: {{ exercice.doneBy.length }} usuário(s)</p>
       
      </div>
    
  </div>
</template>


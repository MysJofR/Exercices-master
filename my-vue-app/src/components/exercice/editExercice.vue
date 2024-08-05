
<script setup lang="ts">
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from '@/components/ui/toast';
import Label from '../ui/label/Label.vue';
import MonacoExampleCode from '../monacoExampleCode.vue';
import Textarea from '../ui/textarea/Textarea.vue';
import Toaster from '../ui/toast/Toaster.vue';
import ExerciceInfo from './exerciceInfo.vue';
import UsersInfo from './usersInfo.vue';
import TestsInfo from './testsInfo.vue';

onMounted(async () => {
  
})

const content = ref(1)
</script>

<template>
  <Toaster />
  <div class="">
   
      <Dialog>
        <DialogTrigger as-child>
          <Button  variant="outline">Editar</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[1300px] p-0 flex flex-row bg-neutral-100 space-x-0 h-5/6 transition-all">
         

          <div class="h-full w-2/12  border-r-2 p-1 border-gray-200   flex  flex-col  ">
 
    <ul class="w-full space-y-1   h-full  flex flex-col  ">

      <li     class=" w-full h-1/6   flex flex-row  border-gray-200    ">
           teste
        
            </li>
        

      <li :class="{'bg-zinc-200': content==1, 'bg-neutral-100': content!==1}"  @click="content=1"  class="rounded-lg w-full h-10   flex flex-row  border-gray-200  hover:bg-zinc-200  ">
           <button  class="text-black  text-sm flex flex-row   hover:text-black text-left  font-semibold p-3 w-full">
           
             Visão Geral</button>
        
        </li>
        

        <li :class="{'bg-zinc-200': content==2, 'bg-neutral-100': content!==2}" @click="content=2" class="rounded-lg w-full h-10 flex flex-row   hover:bg-zinc-200 border-gray-200  ">
           <button  class="text-black  flex flex-row text-sm  hover:text-black text-left  font-semibold p-3 w-full">
           
             Edição</button>
        
        </li>
        
        <li :class="{'bg-zinc-200': content==3, 'bg-neutral-100': content!==3}" @click="content=3"  class="rounded-lg w-full h-10   flex flex-row  border-gray-200  hover:bg-zinc-200  ">
           <button  class="text-black  text-sm flex flex-row   hover:text-black text-left  font-semibold p-3 w-full">
           
             Gerenciar usúarios</button>
        
        </li>
        
     
        <li :class="{'bg-zinc-200': content==4, 'bg-neutral-100': content!==4}" @click="content=4"  class="rounded-lg w-full h-10   flex flex-row  border-gray-200  hover:bg-zinc-200  ">
           <button  class="text-black  text-sm flex flex-row   hover:text-black text-left  font-semibold p-3 w-full">
           
             Gerenciar testes</button>
        
        </li>
        


    </ul>
    </div>


<div class="flex flex-col w-full">
    <nav class="w-full p-2 h-1/6">
    <h2 class="font-bold text-xl text-black">Olá João</h2>
    <p class="text-sm text-black">Você está gerenciando o exercício: Exercicio</p>
  </nav>
    <div  class="w-full h-5/6 flex flex-col ">
        <ExerciceInfo v-if="content==2"></ExerciceInfo>
      <UsersInfo v-if="content==3"></UsersInfo>
      <TestsInfo v-if="content==4"></TestsInfo>

      </div>
    </div>
          
        </DialogContent>
      </Dialog>
    </div>
 
</template>

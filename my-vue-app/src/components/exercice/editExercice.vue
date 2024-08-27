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
        <slot></slot>
      </DialogTrigger>
      <DialogContent class="p-0 flex flex-row h-5/6 transition-all">
        <div class="h-full w-full p-1 flex flex-col">
          <ul class="w-full space-y-1 pr-1 border-r-2 border-accent h-full flex flex-col">
            <li class="w-full h-1/6 flex flex-row border-gray-200"></li>
            <li :class="content==1 ? 'bg-accent' : ''" @click="content=1" class="w-full h-10 rounded-sm flex flex-row hover:bg-accent">
              <button class="text-sm flex flex-row text-left p-3 w-full">Visão Geral</button>
            </li>
            <li :class="content==2 ? 'bg-accent' : ''" @click="content=2" class="w-full h-10 rounded-sm flex flex-row hover:bg-accent">
              <button class="text-sm flex flex-row text-left p-3 w-full">Edição</button>
            </li>
            <li :class="content==3 ? 'bg-accent' : ''" @click="content=3" class="w-full h-10 rounded-sm flex flex-row hover:bg-accent">
              <button class="text-sm flex flex-row text-left p-3 w-full">Gerenciar usúarios</button>
            </li>
            <li :class="content==4 ? 'bg-accent' : ''" @click="content=4" class="w-full h-10 rounded-sm flex flex-row hover:bg-accent">
              <button class="text-sm flex flex-row text-left p-3 w-full">Gerenciar testes</button>
            </li>
          </ul>
        </div>

        <div class="flex flex-col w-full ">
          <nav class="w-full p-2 h-1/6">
            <h2 class="text-xl">Olá João</h2>
            <p class="text-sm">Você está gerenciando o Tarefa: Exercicio</p>
          </nav>
          <div class="w-full h-5/6 flex flex-col">
            <ExerciceInfo v-if="content==2"></ExerciceInfo>
            <UsersInfo v-if="content==3"></UsersInfo>
            <TestsInfo v-if="content==4"></TestsInfo>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

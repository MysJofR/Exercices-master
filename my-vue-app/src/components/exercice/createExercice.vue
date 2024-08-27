
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

onMounted(async () => {
 
})

const router = useRouter();


const formSchema = toTypedSchema(z.object({
  name: z.string({ required_error: '' }),
  statement: z.string({ required_error: '' }),
  difficulty: z.string({ required_error: '' }),
  switch: z.string({ required_error: '' }),
}));

const formValues = reactive({
  name: '',
  statement: '',
  difficulty: '',
  switch: '',
  inputs: '',
  output: '',
  course: '',
  entries: '',
});

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: formValues,
});

const code = ref(null);
const handleCode = (value) => {
  code.value = value;
}
const emit = defineEmits(['getChange'])
const onSubmit = handleSubmit(async (values) => {
 

  try {

    const requestOptions: RequestInit = {
        method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "token": localStorage.getItem('token')
      },
      body: JSON.stringify({
        name: values.name,
        statement: values.statement,
        difficulty: Number(formValues.difficulty),
        genRandomData: values.switch == 'manual' ? false : true,
        code: values.switch == 'random' ? code.value : undefined,
        entries: formValues.entries? formValues.entries: undefined,
        ioData: values.switch == 'random' ?undefined:tests.value
      }),
      redirect: 'follow'
    };

    const response = await fetch("http://localhost:3000/exercice/add", requestOptions);
    const data = await response.json();




   
    


   

    if (response.status == 201) {
     emit('getChange', 'change')
     
    } else {
    
      toast({
        title: 'Erro ao criar Tarefa',
        description: data.message,
      });
    }
  } catch (err) {
    console.error(err);
    localStorage.removeItem("token");
  }
});

const step = ref(1);
const totalSteps = 2;

const nextStep = () => {
  if (step.value < totalSteps) {
    step.value++;
  }
};

const prevStep = () => {
  if (step.value > 1) {
    step.value--;
  }
};

const tests = ref([]);



const handleTests = () => {
  if (formValues.inputs && formValues.output) {
    tests.value.push({ inputs: formValues.inputs.split(','), output: formValues.output });
    formValues.inputs = '';
    formValues.output = '';
  }
};
</script>

<template>
  <Toaster />
  <div class="">
   
      <Dialog>
        <DialogTrigger as-child>
<slot></slot>
        </DialogTrigger>
        <DialogContent class=" h-4/6 transition-all">
          <DialogHeader class="flex flex-col">
            <DialogTitle>Criar Tarefa</DialogTitle>
            <DialogDescription>
              Crie a Tarefa da forma que desejar.
            </DialogDescription>
          </DialogHeader>
          <form @submit.prevent="onSubmit">
            <div class="">
              <div v-show="step === 1" class="space-y-2  flex flex-col transition-opacity duration-500">
                <div class="flex flex-row w-full space-x-4">
                  <FormField name="name" v-slot="{ field }">
                    <FormItem class="flex flex-col">
                      <FormLabel>Nome da Tarefa:</FormLabel>
                      <FormControl>
                        <Input v-model="formValues.name" autocomplete="" v-bind="field" placeholder="Nome" class="w-full bg-background  rounded-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>

                  <FormField name="difficulty" v-slot="{ field }">
                    <FormItem class="flex flex-col w-20">
                      <FormLabel>Dificuldade:</FormLabel>
                      <FormControl>
                        <Select v-model="formValues.difficulty" v-bind="field">
                          <SelectTrigger>
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="5">5</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>

                  <FormField name="switch" v-slot="{ field }">
                    <FormItem class="flex flex-col w-2/6">
                      <FormLabel>Testes da Tarefa:</FormLabel>
                      <FormControl>
                        <Select v-model="formValues.switch" v-bind="field">
                          <SelectTrigger>
                            <SelectValue placeholder="Testes" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="random">Aleatórios</SelectItem>
                              <SelectItem value="manual">Específicos</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                </div>
                <FormField name="statement" v-slot="{ field }">
                  <FormItem class="flex flex-col">
                    <FormLabel>Descrição da Tarefa:</FormLabel>
                    <FormControl>
                      <Textarea v-model="formValues.statement" style="resize: none" placeholder="Descrição" v-bind="field" class="p-2 bg-background  rounded-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>

              <div v-show="step === 2 && formValues.switch === 'random'" class="transition-opacity duration-500">
                <div class="flex flex-col space-y-3">
                  <MonacoExampleCode class="h-[180px]" @getChange="handleCode"></MonacoExampleCode>
                  <Input v-model="formValues.entries" placeholder="Entradas: inteiro,real

 " class="p-1 bg-background  rounded-sm" />
                </div>
              </div>
              <div v-show="step === 2 && formValues.switch === 'manual'" class="flex flex-col h-full items-start space-y-2 transition-opacity duration-500">

                <div class="flex space-x-3 flex-row">
                  <Input v-model="formValues.inputs" placeholder="5,5,10.2" class="p-1 bg-background  rounded-sm" />
                  <Input v-model="formValues.output" placeholder="10" class="p-1 bg-background  rounded-sm" />
                  <Button class="font-bold" @click.prevent="handleTests" variant="outline">+</Button>
                </div>
                <div v-if="tests.length > 0" class="overflow-y-auto max-h-20 w-full">
                  <div v-for="(test, index) in tests" class="space-x-2" :key="index">
                    <button @click.prevent="tests.splice(index, 1)" class="text-red-700 font-bold text-md">X</button>
                    <Label>{{index + 1}} - Inputs: {{ test.inputs.toString() }}</Label>
                    <Label>- Output: {{ test.output }}</Label>
                  </div>
                </div>
              </div>

             
            </div>
            <DialogFooter class="fixed flex flex-row py-2 items-end w-5/6">
              <Button v-if="step > 1" @click.prevent="prevStep" variant="outline">Anterior</Button>
              <Button v-if="step < totalSteps && formValues.switch && formValues.difficulty && formValues.name && formValues.statement" @click.prevent="nextStep" variant="outline">Próximo</Button>

              <DialogClose>
              <Button v-if="step == totalSteps && tests.length > 0" type="submit" variant="outline">Criar Tarefa</Button>
            </DialogClose>

            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
 
</template>

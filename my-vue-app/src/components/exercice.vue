<script setup lang="ts">

// Importações
import { onMounted, ref } from 'vue';
import { useColorMode } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from '@/components/ui/toast/use-toast';
import { Toaster } from '@/components/ui/toast';
import MonacoEditor from '@/components/monacoExampleCode.vue';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Button
} from '@/components/ui/button';
import {
  AspectRatio
} from '@/components/ui/aspect-ratio';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Switch
} from '@/components/ui/switch';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// Declarações de variáveis e referências
const users = ref();
const exercices = ref();
const selectedUser = ref(null);
const selectedUserMade = ref(false);
const isSwitchOn = ref(false);
const editor = ref(null);
const tests = ref([]);
const updateTests = ref([]);
const input = ref(null);
const output = ref(null);
const exerciceDifficulty = ref(null);
const exerciceName = ref(null);
const exerciceDescription = ref(null);
const exerciceEntries = ref(null);
const usersDidntMade = ref([]);
const toRemove = ref([]);
const toAdd = ref([]);
const inputUpdate = ref(null);
const outputUpdate = ref(null);
const usersThatMade = ref([]);
const exerciceToUpdate = ref(null);
const courses = ref([])
const router = useRouter();
const route = useRoute();
const mode = useColorMode();
const { toast } = useToast();
const coursesToAdd = ref([])
// Funções assíncronas
async function getExercices() {
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

  const response = await fetch("http://localhost:3000/exercice/list", requestOptions);
  const data = await response.json();

  if (response.status === 200) {
    if (data.length > 0) {
      exercices.value = data;
    } 
  } else {
    throw new Error(data.message || "Erro ao enviar exercício");
  }
}



async function getCourses() {
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

  const response = await fetch("http://localhost:3000/courses", requestOptions);
  const data = await response.json();

  if (response.status === 200) {
    if (data.courses.length > 0) {
      courses.value = data.courses
      console.log(courses.value)
    } 
  } else {
    throw new Error(data.message || "Erro ao enviar exercício");
  }
}

async function deleteExercice(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
      "token": localStorage.getItem("token")
    },
    redirect: 'follow',
    body: JSON.stringify({ id: id })
  };

  const response = await fetch("http://localhost:3000/exercice/delete", requestOptions);
  const data = await response.json();

  if (response.status === 200) {
    exercices.value = exercices.value.filter(e => e.id !== id);
  } else {
    throw new Error(data.message || "Erro ao enviar exercício");
  }
}

// Funções de manipulação de dados
const handleSelectedUser = (value: string, exercice) => {
  selectedUser.value = value;
  if (value) {
    selectedUserMade.value = value.exercisesDone.some(obj => obj.id === exercice.id);
  }
};

const updateSwitch = (newValue) => {
  isSwitchOn.value = newValue;
};

const handleEditorValue = (value: string) => {
  editor.value = value;
};

const handleNewTests = (input: string, output: string) => {
  if (!input || !output) {
    toast({
      title: 'Você precisa inserir pelo menos um input e um output.'
    });
    return;
  }
  tests.value.push({ inputs: input.split(","), output: output });
};

const handleUpdateTests = () => {
  if (!inputUpdate.value[0].value || !outputUpdate.value[0].value) {
    toast({
      title: 'Você precisa inserir pelo menos um input e um output.'
    });
    return;
  }
  updateTests.value.push({ input: inputUpdate.value[0].value.split(","), output: outputUpdate.value[0].value });
};

function newExercice() {
  if (!exerciceDifficulty.value.children[1].value || !exerciceName.value.value || !exerciceDescription.value.firstChild.value) {
    alert('Certifique-se de preencher todos os campos');
    return;
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
      "token": localStorage.getItem("token")
    },
    redirect: 'follow',
    body: JSON.stringify({
      name: exerciceName.value.value,
      statement: exerciceDescription.value.firstChild.value,
      difficulty: exerciceDifficulty.value.children[1].value,
      genRandomData: isSwitchOn.value,
      code: isSwitchOn.value ? editor.value : undefined,
      entries: isSwitchOn.value ? exerciceEntries.value.value.split(",") : undefined,
      ioData: !isSwitchOn.value ? tests.value : undefined
    })
  };

  fetch("http://localhost:3000/exercice/add", requestOptions)
    .then(async (response) => {
      const data = await response.json();

      if (response.status == 201) {
        await getExercices();
      } else {
        throw new Error(data.message || "Erro ao enviar exercício");
      }
    }).catch((err) => {
      alert(err);
      throw new Error(err);
    });
}

const formSchema = toTypedSchema(z.object({
  exerciceName: z.string().min(2).max(50).optional(),
  statement: z.string().min(4).max(50).optional(),
  difficulty: z.string().min(1).max(5).optional()
}));

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  const usersFormatted = usersThatMade.value.map(e => {
    if (toRemove.value.some(obj => obj.schoolId == e.schoolId)) { } else {
      return e.schoolId;
    }
  });

  let doneBy = usersFormatted[0] ? usersFormatted : [];
  if (toAdd.value.length > 0) {
    const toAddFormatted = toAdd.value.map(e => e.schoolId);
    doneBy = usersFormatted.concat(toAddFormatted);
  }

  const requestOptions = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
      "token": localStorage.getItem("token")
    },
    redirect: 'follow',
    body: JSON.stringify({
      exerciceId: exerciceToUpdate.value,
      name: values.exerciceName,
      statement: values.statement,
      tests: updateTests.value,
      doneBy: doneBy,
      difficulty: values.difficulty
    })
  };

  fetch("http://localhost:3000/exercice/update", requestOptions)
    .then(async (response) => {
      const data = await response.json();

      if (response.status === 200) {
        await getExercices();
      
      }
    }).catch(err => {
      console.log(err);
      localStorage.removeItem("token");
    });
});

const getUsersDidntMade = (id) => {
  coursesToAdd.value = []
  updateTests.value = [];
  exerciceToUpdate.value = id;
  toAdd.value = [];
  toRemove.value = [];
  usersDidntMade.value = [];
  usersThatMade.value = [];
  users.value.forEach(e => {
    if (e.exercisesDone.some(obj => obj.id == id)) {
      usersThatMade.value.push(e);
    } else {
      usersDidntMade.value.push(e);
    }
  });
};

const handleToRemove = (schoolId) => {
  usersThatMade.value = usersThatMade.value.filter(obj => obj.schoolId !== schoolId);
  toRemove.value.push({ schoolId });
  usersDidntMade.value.push({ schoolId });
};

const handleToAdd = (schoolId) => {
  usersDidntMade.value = usersDidntMade.value.filter(obj => obj.schoolId !== schoolId);
  toAdd.value.push({ schoolId });
  usersThatMade.value.push({ schoolId });
};

// Funções de montagem e inicialização
const handleCourses = (name: string) => {

  if(!coursesToAdd.value.includes(name)){
    coursesToAdd.value.push(name)
  }
}
const handleSelectedUsersToUpdate = (user) => {

if(usersDidntMade.value.includes(user)){
  if(toAdd.value.includes(user)) return
  toAdd.value.push(user)

}else{
  if(toRemove.value.includes(user)) return
  toRemove.value.push(user)
}

}
onMounted(async () => {
  await getExercices();
  await getCourses();
});

</script>


<template>
   <div style="visibility: hidden;" class="w-full h-full justify-end items-center flex absolute "><div style="visibility: visible;" class="bg-gray-100 w-8 justify-center ">

<button @click="$router.push('/dashboard')" class="p-2 w-8 hover:bg-slate-600 bg-black ">
<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
</svg>
</button>


<button @click="$router.push('/me')" class="p-2 hover:bg-slate-600 w-8 bg-black ">
<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
</button>

<button @click="$router.push('/help')" class="p-2 hover:bg-slate-600  w-8 bg-black ">
<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.877075 7.49972C0.877075 3.84204 3.84222 0.876892 7.49991 0.876892C11.1576 0.876892 14.1227 3.84204 14.1227 7.49972C14.1227 11.1574 11.1576 14.1226 7.49991 14.1226C3.84222 14.1226 0.877075 11.1574 0.877075 7.49972ZM7.49991 1.82689C4.36689 1.82689 1.82708 4.36671 1.82708 7.49972C1.82708 10.6327 4.36689 13.1726 7.49991 13.1726C10.6329 13.1726 13.1727 10.6327 13.1727 7.49972C13.1727 4.36671 10.6329 1.82689 7.49991 1.82689ZM8.24993 10.5C8.24993 10.9142 7.91414 11.25 7.49993 11.25C7.08571 11.25 6.74993 10.9142 6.74993 10.5C6.74993 10.0858 7.08571 9.75 7.49993 9.75C7.91414 9.75 8.24993 10.0858 8.24993 10.5ZM6.05003 6.25C6.05003 5.57211 6.63511 4.925 7.50003 4.925C8.36496 4.925 8.95003 5.57211 8.95003 6.25C8.95003 6.74118 8.68002 6.99212 8.21447 7.27494C8.16251 7.30651 8.10258 7.34131 8.03847 7.37854L8.03841 7.37858C7.85521 7.48497 7.63788 7.61119 7.47449 7.73849C7.23214 7.92732 6.95003 8.23198 6.95003 8.7C6.95004 9.00376 7.19628 9.25 7.50004 9.25C7.8024 9.25 8.04778 9.00601 8.05002 8.70417L8.05056 8.7033C8.05924 8.6896 8.08493 8.65735 8.15058 8.6062C8.25207 8.52712 8.36508 8.46163 8.51567 8.37436L8.51571 8.37433C8.59422 8.32883 8.68296 8.27741 8.78559 8.21506C9.32004 7.89038 10.05 7.35382 10.05 6.25C10.05 4.92789 8.93511 3.825 7.50003 3.825C6.06496 3.825 4.95003 4.92789 4.95003 6.25C4.95003 6.55376 5.19628 6.8 5.50003 6.8C5.80379 6.8 6.05003 6.55376 6.05003 6.25Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
</button>

</div></div>
  <div class="h-full w-full items-center flex flex-col justify-center">
  


    <div class="h-2/6 mt-5 items-center flex"> 
 <Dialog >
        <DialogTrigger as-child>
          <Button @click="coursesToAdd = []" variant="outline">Criar exercicio</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[700px] h-4/6 overflow-auto">
          <DialogHeader class="">
            <DialogTitle>Criar exercicio</DialogTitle>
            <DialogDescription>
              Crie o exercio da forma que desejar.
            </DialogDescription>
          </DialogHeader>
          <div class="h-full w-full">
            <div class="flex flex-col">
              <Label class="mt-2 mb-2">Nome do exercicio: </Label>
              <Input ref="exerciceName" class="ml-2 p-1 bg-background border-2 border-gray-100 text-gray-100 rounded-sm" />
            </div>

            <div class="mt-2 flex flex-col">
              <Label class="mt-2 mb-2">Descrição do exercicio: </Label>
              <div ref="exerciceDescription">
                <Textarea class="ml-2 p-1 w-96 border-2 border-gray-100 text-gray-100 rounded-sm" />
              </div>
            </div>

            <div class="mt-2 flex flex-col">
              <Label class="mt-2 mb-2">Dificuldade do exercicio: </Label>
              <div ref="exerciceDifficulty">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um nivel de dificuldade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">Nivel 1</SelectItem>
                      <SelectItem value="2">Nivel 2</SelectItem>
                      <SelectItem value="3">Nivel 3</SelectItem>
                      <SelectItem value="4">Nivel 4</SelectItem>
                      <SelectItem value="5">Nivel 5</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>




            <div class="flex-row flex space-x-10">
 <Command class="rounded-lg border shadow-md max-w-[450px]">
                            <CommandInput placeholder="Digite o nome do curso..." />
                            <CommandList>
                              <CommandEmpty>Nenhum curso encontrado.</CommandEmpty>
                              <CommandGroup heading="Cursos">
                                <CommandItem @click="handleCourses(course.name)"  v-for="(course, index) in courses" :key="index" :value="`${course.name}`">{{ course.name }}</CommandItem>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                       
                       


                       
                      
                       
</div>



                       <div class="flex  ml-2" v-if="coursesToAdd.length>0">
                        Adicionar: <p class="ml-2" v-for="(courseToUpdate) in coursesToAdd"> {{ courseToUpdate }}</p>
                          <Button v-if="coursesToAdd.length>0" @click.prevent="" @click="coursesToAdd = []" class="ml-2  h-6 text-lg">Limpar</Button>
                       
                      </div>



            <div class="mt-2 flex flex-row">
              <Label class="mt-2 mb-2">Deseja utilizar testes especificos? (input e output): </Label>
              <Switch class="mt-1 ml-3" :checked="isSwitchOn" @update:checked="updateSwitch" />
            </div>

            <div v-if="!isSwitchOn" class="mt-2 flex flex-row">
              <Input ref="input" placeholder="Input, Ex: 5,4,6.8" class="ml-2 p-1 bg-background border-2 border-gray-100 text-gray-100 rounded-sm" />
              <Input ref="output" placeholder="Output" class="ml-2 p-1 bg-background border-2 border-gray-100 text-gray-100 rounded-sm" />
              <Button @click="handleNewTests(input.value, output.value)" class="ml-2 mt-2 h-6 w-8 text-lg">+</Button>
            </div>

            <div v-for="(test, index) in tests" :key="index" v-if="!isSwitchOn">
              {{ 'Input(s): ' + test.inputs + ' -- Output: ' + test.output }}
            </div>

            <div v-if="isSwitchOn" class="mt-2 flex flex-col">
              <Label class="mt-2 mb-2">Entradas do exercicio: </Label>
              <Input ref="exerciceEntries" placeholder="Ex: inteiro,inteiro ou inteiro,real" class="ml-2 p-1 bg-background border-2 border-gray-100 text-gray-100 rounded-sm" />
              <Label class="mt-2 mb-2">Codigo de exemplo: </Label>
              <MonacoEditor class="p-2" @getChange="handleEditorValue" />
            </div>
          </div>

          <DialogFooter>
     
            <Button  @click="newExercice" type="submit">Criar exercicio</Button>
          
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    <div class="w-4/6 h-4/6">
      

      <Table class="mt-10">
     
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]">Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead class="text-right">Dificuldade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(item, index) in exercices" :key="index">
            <TableCell class="font-medium">{{ item.name }}</TableCell>
            <TableCell>{{ item.statement }}</TableCell>
            <TableCell class="text-right">{{ item.difficulty }}</TableCell>
            <TableCell class="text-right">
              <Drawer class="h-6/6">
                <DrawerTrigger ><Button @click="selectedUser=null; selectedUserMade=false" variant="outline">Mais Informações</Button></DrawerTrigger>
                <DrawerContent class="overflow-y-auto drawer-content">
                  <DrawerHeader>
                    <DrawerTitle>Informações do exercício:</DrawerTitle>
                    <DrawerDescription class=" flex flex-row space-x-10">
                      <div class="flex flex-col space-y-3">
                        <p>Id: {{ item.id }}</p>
                        <p>Nome: {{ item.name }}</p>
                        <p>Descrição: {{ item.statement }}</p>
                        <p>Data de criação: {{ item.createdAt }}</p>
                        <p>Ultima edição: {{ item.updatedAt }}</p>
                        <p>Dificuldade: {{ item.difficulty }}</p>
                        <p>Cursos: <p v-for="(course, index) in item.courses" :key="index" > {{course.name}} </p>  </p>
                        
                      </div>

                      <div class="grid grid-cols-2 gap-x-2 ">
                      <div class="" v-for="(test, index) in item.tests" :key="index">
                          <p   v-if="test.output !== ''">Inputs: {{ test.input.toString() }} / Output: {{ test.output }}</p>
                          <p v-else>Este exercicio não possui testes</p>
                        </div>
                      </div>


                      <div class="flex flex-col space-y-1">
                        <Label>Gerenciar usuários:</Label>
                        <div class="w-[600px] grid grid-cols-2 gap-2 mt-4">
                          <Command class="rounded-lg border shadow-md max-w-[450px]">
                            <CommandInput placeholder="Digite o nome ou matrícula do usuário..." />
                            <CommandList>
                              <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
                              <CommandGroup heading=""  v-for="(course, index) in item.courses" :key="index">
                                <CommandItem @click="handleSelectedUser(user, item)" v-for="(user, index) in course.members" :key="index" :value="`${user.user.schoolId} / ${user.user.fullname} / ${user.user.fullname.toLowerCase()}`">{{ user.user.fullname }}</CommandItem>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </div>
                        <div class="ml-2" v-if="selectedUser">
                          <p>{{ selectedUser.fullname }}</p>
                          <p v-if="selectedUserMade">- Concluiu o exercício</p>
                          <p v-else>- Não concluiu o exercício</p>
                        </div>
                      </div>
                      
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <DrawerClose></DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </TableCell>
            <TableCell> 
              <Dialog class="">
        <DialogTrigger as-child>
          <Button @click="getUsersDidntMade(item.id)" variant="outline">Editar</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[1000px] h-4/6 overflow-auto">
          <DialogHeader class="">
            <DialogTitle>Editar Exercicio</DialogTitle>
            <DialogDescription>
              Altere o exercicio como desejar, alterando somente os campos necessários
            </DialogDescription>
          </DialogHeader>
          <div class="h-full w-full">
            <div class="flex flex-col">
              <form class="w-2/3 space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="exerciceName">
      <FormItem class="flex flex-col">
        <FormLabel>Nome do exercicio: </FormLabel>
        <FormControl>
          <Input type="text" placeholder="Nome" v-bind="componentField"  class="ml-2 p-1 bg-background border-2 border-gray-100 text-gray-100 rounded-sm" />

        </FormControl>
        <FormDescription>
      
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>


    <FormField v-slot="{ componentField }" name="statement">
      <FormItem>
        <FormLabel>Descrição do exercicio: </FormLabel>
        <FormControl>
          <Textarea   v-bind="componentField" placeholder="Descrição" class="ml-2 p-1 w-96 border-2 border-gray-100 text-gray-100 rounded-sm" />
        
        </FormControl>
        <FormDescription>
  
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>


    <FormField v-slot="{ componentField }" name="difficulty">
      <FormItem>
        <FormLabel>Dificuldade do exercicio: </FormLabel>
        <FormControl>
          <Select  v-bind="componentField">
                  <SelectTrigger>
                    <SelectValue  placeholder="Selecione um nivel de dificuldade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">Nivel 1</SelectItem>
                      <SelectItem value="2">Nivel 2</SelectItem>
                      <SelectItem value="3">Nivel 3</SelectItem>
                      <SelectItem value="4">Nivel 4</SelectItem>
                      <SelectItem value="5">Nivel 5</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
        </FormControl>
        <FormDescription>
  
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField  name="input">
      <FormItem>
        <FormLabel>Adicionar Inputs: </FormLabel>
        <FormControl>
          <Input  ref="inputUpdate" placeholder="Input, Ex: 5,4,6.8" class="ml-2 p-1 bg-background border-2 border-gray-100 text-gray-100 rounded-sm" />
        </FormControl>
        <FormDescription>
      
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField  name="output">
      <FormItem>
        <FormLabel>Adicionar Outputs: </FormLabel>
        <FormControl>
          <Input  ref="outputUpdate" placeholder="Output, Ex: 4,6.8" class="ml-2 p-1 bg-background border-2 border-gray-100 text-gray-100 rounded-sm" />
        </FormControl>
        <FormDescription>
      
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>         


              
 <Button @click.prevent="handleUpdateTests" class="ml-2 mt-2 h-6 w-8 text-lg">+</Button>
  
 <div v-for="(test, index) in updateTests" :key="index" >
              {{ 'Input(s): ' + test.input + ' -- Output: ' + test.output }}
</div>



<div class="flex-row flex space-x-10">
 <Command class="rounded-lg border shadow-md max-w-[450px]">
                            <CommandInput placeholder="Digite o nome do curso..." />
                            <CommandList>
                              <CommandEmpty>Nenhum curso encontrado.</CommandEmpty>
                              <CommandGroup heading="Cursos">
                                <CommandItem @click="handleCourses(course.name)"   v-for="(course, index) in courses" :key="index" :value="`${course.name}`">{{ course.name }}</CommandItem>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                       
                       


                       
                      
                       
</div>



                       <div class="flex  ml-2" v-if="coursesToAdd.length>0">
                        Adicionar: <p class="ml-2" v-for="(courseToUpdate) in coursesToAdd"> {{ courseToUpdate }}</p>
                          <Button v-if="coursesToAdd.length>0" @click.prevent="" @click="coursesToAdd = []" class="ml-2  h-6 text-lg">Limpar</Button>
                       
                      </div>


 
<div class="flex-row flex space-x-10">
 <Command class="rounded-lg border shadow-md max-w-[450px]">
                            <CommandInput placeholder="Digite o nome ou matrícula do usuário..." />
                            <CommandList>
                              <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
                              <CommandGroup heading=""  v-for="(course, index) in item.courses" :key="index">
                                <CommandItem  @click="handleSelectedUsersToUpdate(user)" v-for="(user, index) in course.members" :key="index" :value="`${user.user.schoolId} / ${user.user.fullname} / ${user.user.fullname.toLowerCase()}`">{{ user.user.fullname }}</CommandItem>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                       
                       


                       
                      
                       
</div>

<div class="flex flex-row space-x-4 ml-2">
                        Remover:
                          <p  v-for="(userToUpdate) in toRemove">{{' ' + userToUpdate.fullname }} </p>
                          <Button v-if="toRemove.length>0" @click.prevent=""  @click="toRemove = []" class="ml-2 mt-2 h-6  text-lg">Limpar</Button>
                       
                      </div>

                       <div class="flex  ml-2" v-if="toAdd">
                        Adicionar: <p class="ml-2" v-for="(userToUpdate) in toAdd"> {{ userToUpdate.fullname }}</p>
                          <Button v-if="toAdd.length>0" @click.prevent="" @click="toAdd = []" class="ml-2  h-6 text-lg">Limpar</Button>
                       
                      </div>
    <Button class="justify-center" type="submit">
      Submit
    </Button>
  </form>
            </div>
          </div>

          <DialogFooter>
          
          </DialogFooter>
        </DialogContent>
      </Dialog>
            </TableCell>
            <TableCell> 
              <AlertDialog>
    <AlertDialogTrigger><Button variant="destructive">Excluir</Button></AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Tem certeza que deseja excluir o exercicio?</AlertDialogTitle>
        <AlertDialogDescription>
          Essa ação não pode ser desfeita.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction variant="destructive"   @click="deleteExercice(item.id)">Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<style>
.drawer-content {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  transform: none !important; /* Remove qualquer transformação que possa estar aplicando desfoque */
  filter: none !important;    /* Remove qualquer filtro que possa estar aplicando desfoque */
}

.command-item {
  transform: none !important;
  filter: none !important;
}

</style>
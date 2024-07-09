<script setup lang="ts">

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
     exercices.value = data
     console.log(data)
    }else{
      exercices.value = 'Não há nenhum exercicio á ser listado.'
    }
  } else {
    console.log(data, response)
    throw new Error(data.message || "Erro ao enviar exercício");
  }
}



async function getUsers() {
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
      "token": localStorage.getItem("token") ?? ''
    },
    redirect: 'follow'
  };

  const response = await fetch("http://localhost:3000/list/auth", requestOptions);
  const data = await response.json();

  if (response.status === 200) {
    if (data.users.length > 0) {
     users.value = data.users
    
    }else{
      users.value = 'Não há nenhum usuario á ser listado.'
      
    }
  } else {
    window.location.href = '/login';
    throw new Error(data.message || "Erro ao enviar exercício");
  }
}
const users = ref()
const exercices = ref()
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { useColorMode } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'

const router = useRouter()
const route = useRoute()
const mode = useColorMode()
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'

const { toast } = useToast()


import { onMounted, ref, onBeforeUnmount } from 'vue';

onMounted(async () => {
  await getExercices()
  await getUsers()
})

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Label } from '@/components/ui/label'
const selectedUser = ref(null)
const handleSelectedUser = (value: string, exercice) => {
  console.log('oi')
  selectedUser.value = value
  if(value){ 

    if(value.exercisesDone.some(obj => obj.id===exercice.id)) selectedUserMade.value = true
  }
}
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
const selectedUserMade = ref(false)
import { Switch } from '@/components/ui/switch'
const isSwitchOn = ref(false);

const updateSwitch = (newValue) => {
  isSwitchOn.value = newValue;
};
import MonacoEditor from '@/components/monacoExampleCode.vue';
const editor = ref(null)
const handleEditorValue = (value: string) => {
  editor.value = value
}
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
const tests = ref([])
const updateTests = ref([])
const handleUpdateTests = () => {
  if(!inputUpdate.value[0].value || !outputUpdate.value[0].value){

    toast({
    title: 'Você precisa inserir pelo menos um input e um output.'
    
  })
  return
  }
  updateTests.value.push({inputs:[inputUpdate.value[0].value], output: outputUpdate.value[0].value})
  console.log(updateTests)
}
const handleNewTests = (input: string, output: string) => {

  if(!input || !output){
    toast({
    title: 'Você precisa inserir pelo menos um input e um output.'
    
  })
  return
  }
  tests.value.push({inputs:[input], output: output})
  console.log(tests.value)
}
const input = ref(null)
const output = ref(null)
const exerciceDifficulty = ref(null)
const exerciceName = ref(null)
const exerciceDescription = ref(null)
const exerciceEntries = ref(null)

function newExercice(){
if(!exerciceDifficulty.value.children[1].value || !exerciceName.value.value || !exerciceDescription.value.firstChild.value ){
  console.log(exerciceDescription.value.firstChild.value, exerciceName, exerciceDifficulty.value.children[1].value)
   alert('Certifique-se de preencher todos os campos')
    

  return
}


if(!isSwitchOn.value){
 
 var requestOptions = {
     method: 'POST',
     headers: {
         "Content-Type": "application/json",
         "Accept": "application/json",
         "Access-Control-Allow-Origin": "*",
         "token": localStorage.getItem("token")
                 
     },
     redirect: 'follow',
     body:  JSON.stringify({
      name: exerciceName.value.value,
     statement: exerciceDescription.value.firstChild.value,
     difficulty:exerciceDifficulty.value.children[1].value,
     genRandomData: false,
     code:undefined,
     entries:undefined,
     ioData: tests.value
     })
 }
}else{ 
 
 var requestOptions = {
     method: 'POST',
     headers: {
         "Content-Type": "application/json",
         "Accept": "application/json",
         "Access-Control-Allow-Origin": "*",
         "token": localStorage.getItem("token")
                 
     },
     redirect: 'follow',
     body:  JSON.stringify({
      name: exerciceName.value.value,
      statement: exerciceDescription.value.firstChild.value,
      difficulty:exerciceDifficulty.value.children[1].value,
     genRandomData: true,
     code:editor.value,
     entries: [exerciceEntries.value.value],
     ioData: undefined
    
      
     }),
     
 }
}

 

     fetch("http://localhost:3000/exercice/add", requestOptions)
 .then(async (response) => {

     const data = await response.json();

if (response.status == 201) {

  await getExercices()
} else {

throw new Error(data.message || "Erro ao enviar exercício");

}

}).catch((err) => {
alert(err)
throw new Error(err)
})


}


const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(4).max(50)
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})


const onSubmit = handleSubmit((values) => {




toast({
  title: 'Estamos processando seu login.',
  
})
})
const usersDidntMade = ref()
const usersToUpdate = ref([]) 
const inputUpdate = ref(null)
const outputUpdate = ref(null)
const getUsersDidntMade = (id) => {
  
 usersDidntMade.value = users.value.map(e => {
    if(e.exercisesDone.some(obj => obj.id == id)){ alert('fez')}else{
      return e
    }
  })
}
const handleSelectedUsersToUpdate = (user) => {
  usersToUpdate.value.push(user)
}


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
} from '@/components/ui/alert-dialog'

const deleteExercice = async (id) => {


  var requestOptions = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
                "token": localStorage.getItem("token")
                        
            },
            redirect: 'follow',
            body:  JSON.stringify({id: id
            })      
                  
        };
         await fetch("http://localhost:3000/exercice/delete", requestOptions)
        .then(async (response) => {

            const data = await response.json();

if (response.status == 200){
  exercices.value.forEach( e =>{
      if(e.id==id){
        exercices.value.splice(exercices.value.indexOf(e), 1)
      }
  })
  console.log('deletei')
} else {
   console.log('Erro ao excluir')

   throw new Error(data.message || "Erro ao enviar exercício");
}

}).catch((err) => {
    
    console.log(err)    
    throw new Error(err)
})
}
</script>

<template>
  <div class="h-full w-full items-center flex flex-col justify-center">
    <div class="h-2/6 items-center flex"> 
    <Dialog class="">
        <DialogTrigger as-child>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[700px] h-4/6 overflow-auto">
          <DialogHeader class="">
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
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
            <Button @click="newExercice" type="submit">Criar exercicio</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    <div class="w-4/6 h-4/6">
      

      <Table class="mt-10">
        <TableCaption>A list of your recent invoices.</TableCaption>
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
              <Drawer class="h-5/6">
                <DrawerTrigger @click="selectedUser=null; selectedUserMade=false">Mais Informações</DrawerTrigger>
                <DrawerContent class="drawer-content">
                  <DrawerHeader>
                    <DrawerTitle>Informações do exercício:</DrawerTitle>
                    <DrawerDescription class="flex flex-row space-x-48">
                      <div class="flex flex-col space-y-3">
                        <p>Id: {{ item.id }}</p>
                        <p>Nome: {{ item.name }}</p>
                        <p>Descrição: {{ item.statement }}</p>
                        <p>Data de criação: {{ item.createdAt }}</p>
                        <p>Ultima edição: {{ item.updatedAt }}</p>
                        <p>Dificuldade: {{ item.difficulty }}</p>
                        <div v-for="(test, index) in item.tests" :key="index">
                          <p v-if="test.output !== ''">Inputs: {{ test.input.toString() }} / Output: {{ test.output }}</p>
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
                              <CommandGroup heading="Usuários">
                                <CommandItem @click="handleSelectedUser(user, item)" v-for="(user, index) in users" :key="index" :value="`${user.schoolId} / ${user.fullname} / ${user.fullname.toLowerCase()}`">{{ user.fullname }}</CommandItem>
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
          <Button @click="getUsersDidntMade(item.id)" variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[700px] h-4/6 overflow-auto">
          <DialogHeader class="">
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div class="h-full w-full">
            <div class="flex flex-col">
              <form class="w-2/3 space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="exerciceName">
      <FormItem>
        <FormLabel>Nome do exercicio: </FormLabel>
        <FormControl>
          <Input type="text" placeholder="Nome" v-bind="componentField" />
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
        <FormLabel>Nome do exercicio: </FormLabel>
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
        <FormLabel>Nome do exercicio: </FormLabel>
        <FormControl>
          <Input  ref="outputUpdate" placeholder="Input, Ex: 5,4,6.8" class="ml-2 p-1 bg-background border-2 border-gray-100 text-gray-100 rounded-sm" />
        </FormControl>
        <FormDescription>
      
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>         


              
 <Button @click="handleUpdateTests" class="ml-2 mt-2 h-6 w-8 text-lg">+</Button>
  
 <div v-for="(test, index) in updateTests" :key="index" >
              {{ 'Input(s): ' + test.inputs + ' -- Output: ' + test.output }}
</div>

 <Command class="rounded-lg border shadow-md max-w-[450px]">
                            <CommandInput placeholder="Digite o nome ou matrícula do usuário..." />
                            <CommandList>
                              <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
                              <CommandGroup heading="Usuários">
                                <CommandItem v-if="usersDidntMade" @click="handleSelectedUsersToUpdate(user)" v-for="(user, index) in usersDidntMade" :key="index" :value="`${user.schoolId} / ${user.fullname} / ${user.fullname.toLowerCase()}`">{{ user.fullname }}</CommandItem>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                       
                        <div class="ml-2" v-if="usersToUpdate">
                          <p  v-for="(userToUpdate) in usersToUpdate">{{ userToUpdate.fullname }}</p>
                         
                       
                      </div>



    <Button type="submit">
      Submit
    </Button>
  </form>
            </div>
          </div>

          <DialogFooter>
            <Button @click="editExercice" type="submit">Criar exercicio</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
            </TableCell>
            <TableCell> 
              <AlertDialog>
    <AlertDialogTrigger>Excluir</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Tem certeza que deseja excluir o exercicio?</AlertDialogTitle>
        <AlertDialogDescription>
          Essa ação não pode ser desfeita.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="deleteExercice(item.id)">Continue</AlertDialogAction>
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
</style>
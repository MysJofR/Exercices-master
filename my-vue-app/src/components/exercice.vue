<script setup lang="ts">
  const exercicesByUser = ref([])
async function getExercices() {
  
  try{
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

  const response = await fetch("http://localhost:3000/exercice/", requestOptions);
  const data = await response.json();

  if (response.status === 200) {

    if (data.length > 0) {
      exercices.value = data;
    
     
    } 
  } else {
  
    throw new Error(data.message || "Erro ao enviar Tarefa");
  }
  isLoading.value = false

}catch(err){
  console.log(err)
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
    throw new Error(data.message || "Erro ao enviar Tarefa");
  }
  
}
async function getRole(){
    if(!localStorage.getItem('token')) router.push('/login')
  
      try {
          
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      

      
          var requestOptions = {
              method: 'GET',
              headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
                "token": localStorage.getItem("token"),
              },
  
              redirect: 'follow'
          };
      
          const response = await fetch("http://localhost:3000/role", requestOptions)
        
          const data = await response.json();
          
          if(data.name=='Aluno') router.push('/dashboard')
          
      } catch (err) {
         console.log(err)
          localStorage.removeItem("token");
         
      }
      
      
   }
const setExercice = (exercice: string) => {
  localStorage.setItem('exercice', exercice.id) 

 selectedExercice.value = exercice

mode.value = 'info'}

onMounted(async () => {
  await getRole()
  await getExercices();
})
const exercices = ref([])
import {
  CircleUser,
  Copy,
  Edit,
  File,
  Home,
  LineChart,
  ListFilter,
  Menu,
  MoreHorizontal,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { onMounted, ref } from 'vue';
import EditExercice from './exercice/editExercice.vue';
import CreateExercice from './exercice/createExercice.vue';
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
import { Pagination, PaginationList } from './ui/pagination';
import PaginationPrev from './ui/pagination/PaginationPrev.vue';
import PaginationNext from './ui/pagination/PaginationNext.vue';

import Separator from './ui/separator/Separator.vue';
import ExerciceInfo from './exercice/exerciceInfo.vue';
import UsersInfo from './exercice/usersInfo.vue';
import TestsInfo from './exercice/testsInfo.vue';
const selectedExercice = ref(null)
const mode: any = ref('info')
const isLoading = ref(true)
const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>

  
  <div  class="flex min-h-screen w-full flex-col ">
    <header class=" top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-end md:gap-5 md:text-sm lg:gap-6">
        <button
          @click="$router.push('/')"
          class="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
        
          <h1 class="font-bold text-2xl">LogiC</h1>
      </button>
        <button
        @click="$router.push('/dashboard')"
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          Início
    </button>
        <button
         @click="$router.push('/code')"
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          Programar
</button>
        <!--   <button
         @click="$router.push('/tournaments')"
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          Competições
</button>--> 
        <button
         @click="$router.push('/exercice')"
          class="text-foreground transition-colors hover:text-foreground"
        >
          Tarefas
</button>
      
      </nav>
      <Sheet>
        <SheetTrigger as-child>
          <Button
            variant="outline"
            size="icon"
            class="shrink-0 md:hidden"
          >
            <Menu class="h-5 w-5" />
            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav class="grid gap-6 text-lg font-medium">
            <button
              @click="$router.push('/')"
              class="flex items-center gap-2 text-lg font-semibold"
            >
              <h1 class="font-bold">LogiC</h1>
              
            </button>
            <button @click="$router.push('/dashboard')" class="text-muted-foreground hover:text-foreground">
              Início
            </button>
            <button
              @click="$router.push('/code')"
              class="text-muted-foreground hover:text-foreground"
            >
             Programar
            </button>
     <!--<button
              @click="$router.push('/tournaments')"
              class="text-muted-foreground hover:text-foreground"
            >
              Competições
            </button>-->       
            <button
              @click="$router.push('/exercice')"
              class="text-foreground hover:text-foreground"
            >
              Tarefas
            </button>
         
          </nav>
        </SheetContent>
      </Sheet>
      <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div class="relative ml-auto flex-1 md:grow-0">
       
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="secondary" size="icon" class="rounded-full">
              <CircleUser class="h-5 w-5" />
              
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="$router.push('/settings')">Configurações</DropdownMenuItem>
         
            <DropdownMenuItem @click="logout">Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
      <main class="grid flex-1 items-start  gap-4 p-4 mt-4 sm:px-6 sm:py-0 ">
        <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
  </div>
        <Tabs default-value="all">
          <div class="flex space-x-2 items-center">
                  
          <Input
            type="search"
            placeholder="Buscar..."
            class="w-full h-9 rounded-lg bg-background  md:w-[200px] lg:w-[315px]"
          />
         
            <TabsList>
              <TabsTrigger value="all">
                Todos
              </TabsTrigger>
              
            
            </TabsList>
            <div class="relative ml-2 flex-1 md:grow-0">
              <CreateExercice @getChange="getExercices()">
              <Button size="sm" class="h-9 gap-1">
                <PlusCircle class="h-3.5 w-3.5" />


                
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                 Nova Tarefa
                </span>
              </Button></CreateExercice>



         
        </div>
          
          </div>
          <TabsContent class="h-full" value="all">
            <div class="grid gap-4 grid-cols-1  h-3/6  sm:grid-cols-1   lg:grid-cols-2 xl:grid-cols-2">
            <Card class="lg:max-h-full lg:min-h-full lg:h-5/6 md:h-full sm:h-full">
             
              <CardContent class="pt-4 max-h-[400px]  h-5/6 overflow-y-auto">
                <Table class="">
                  <TableHeader>
                    <TableRow>
                     
                      <TableHead>Nome</TableHead>
                     
                    
                     
                      <TableHead class="hidden md:table-cell">
                        Data de criação
                      </TableHead>
                      
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow class="hover:bg-muted"  v-for="(item,index) in exercices" :key="index" @click="setExercice(item)">
                     
                      <TableCell class="font-medium">
                   {{item.name}}
                      </TableCell>
                 
                
               
                      <TableCell class="hidden md:table-cell">
                      {{new Date(item.createdAt).toLocaleDateString()}}
                      </TableCell>
                    

                    </TableRow>
         
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div class="text-xs text-muted-foreground">
                  Showing <strong>{{ exercices?.length }}</strong> of <strong>{{ exercices?.length }}</strong>
                  products
                </div>
              </CardFooter>
            </Card>
            <Card class="lg:h-[450px] md:h-[400px] h-[400px] overflow-hidden sm:h-[400px]">

              
            <CardHeader v-if="selectedExercice" class="flex flex-row items-start bg-muted/50">
              <div class="grid gap-0.5">
                <CardTitle class="group flex items-center gap-2 text-lg">
                  {{ selectedExercice?.name? selectedExercice?.name : 'Selecione uma Tarefa' }}
                
                </CardTitle>
                <CardDescription> {{ selectedExercice?.id ? 'Id: ' + selectedExercice?.id : '' }}</CardDescription>
              </div>
              <div class="ml-auto flex items-center gap-1">
                <Button v-if="mode=='info'" @click="mode='edit'" size="sm" variant="outline" class="h-8 gap-1">
                  <Edit class="h-3.5 w-3.5" />
                  <span class="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                    Editar informações
                  </span>
                </Button>

                <Button v-else @click="mode='info'" size="sm" variant="outline" class="h-8 gap-1">
                  <Edit class="h-3.5 w-3.5" />
                  <span class="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                    Visualizar informações
                  </span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button size="icon" variant="outline" class="h-8 w-8">
                      <MoreVertical class="h-3.5 w-3.5" />
                      <span class="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem @click="mode='users'">Gerenciar Usúarios</DropdownMenuItem>
                    <DropdownMenuItem @click="mode='test'">Gerenciar Testes</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem @click="mode='info';deleteExercice(selectedExercice.id); selectedExercice=null; ">Deletar Tarefa</DropdownMenuItem>
                    <DropdownMenuItem @click="mode='info'; selectedExercice=null">Fechar Tarefa</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardHeader v-else class="flex flex-row items-start bg-muted/50">
              <div class="grid gap-0.5">
                <CardTitle class="group flex items-center gap-2 text-lg">
                Selecione uma Tarefa
             
                </CardTitle>
                <CardDescription> Selecione uma Tarefa para gerenciar!</CardDescription>
              </div>
           
            </CardHeader>

            <CardContent v-if="mode=='info' && selectedExercice" class="lg:pt-4 lg:h-full overflow-y-auto sm:h-3/6">
              <div class="grid gap-3">
                <div class="font-semibold">
                  Detalhes da Tarefa
                </div>
                <ul class="grid gap-3">
                  <li class="flex items-center justify-between">
                    <span class="text-muted-foreground">
                     Nível <span></span>
                    </span>
                    <span>{{selectedExercice?.difficulty}}</span>
                  </li>
                  <li class="flex items-center justify-between">
                    <span class="text-muted-foreground">
                      Criador <span></span>
                    </span>
                    <span> {{selectedExercice?.creator.fullname}} </span>
                  </li>
                  
                </ul>
                <Separator class="my-2" />
                <ul class="grid gap-3">
                  <li class="flex flex-col p-2 items-center justify-center">
                    <span class=" font-bold text-foreground">Enunciado da tarefa</span>
                    <span>{{selectedExercice?.statement}}</span>  
                  </li>
              
                </ul>
              </div>
          
          
        
            </CardContent>
            <CardContent v-if="mode=='edit'" class="lg:pt-4 lg:h-4/6 sm:h-3/6 p-4 overflow-y-auto ">
             <ExerciceInfo></ExerciceInfo>
          
          
        
            </CardContent>

            <CardContent v-if="mode=='users'" class="pt-4 h-full overflow-y-auto ">
            
              <UsersInfo></UsersInfo>
          
          
        
            </CardContent>


            <CardContent v-if="mode=='test'" class="pt-4 h-full overflow-y-auto ">
            
            <TestsInfo></TestsInfo>
        
        
      
          </CardContent>
          </Card></div>
          </TabsContent>
         
        </Tabs>

     

      </main>
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
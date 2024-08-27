<script setup lang="ts">
async function submitExercice(){
  submitResult.value = 'Enviando Tarefa...';
  if(!code.value){ submitResult.value = 'Você precisa digitar alguma coisa!'; return }

  try {
    const response = await fetch("http://localhost:3000/exercice/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "token": localStorage.getItem("token") ?? ''
      },
      body: JSON.stringify({
        exerciceId: selectedExercice.value.id,
        code: code.value,
        name: user.value.id
      })
    });

    const data = await response.json();

    if (response.status === 200) {
    

        submitResult.value = data.message
       
    } else {
      submitResult.value = data.message
      
    }
    await getUser()
    await updateExercice(selectedExercice.value.id)
    
  } catch (err) {

  }


}
async function getUser() {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("token", localStorage.getItem("token") ?? '');

    const requestOptions = {
      method: 'GET',
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "token": localStorage.getItem("token"),
      },
      redirect: 'follow'
    };

    const response = await fetch("http://localhost:3000/me", requestOptions);
    const data = await response.json();

    if (response.status === 200) {

      
      user.value = data;
     
    }
  } catch (err) {

    localStorage.removeItem("token");
  }
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
import {File,Activity, ArrowUpRight, CircleUser, CreditCard, DollarSign, Menu, Package2, Search, Users, RocketIcon, Text, Ruler, RulerIcon, CheckIcon, Check, CrossIcon, Cross } from 'lucide-vue-next'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { get } from 'request';
import { onMounted, ref } from 'vue'
import MonacoExampleCode from './monacoExampleCode.vue';
import ExerciceList from './code/exerciceList.vue';
import { NumberFieldInput, Separator } from 'radix-vue';

onMounted(async () => {
    await getUser()
    
})
const user = ref(null)
const code = ref(`programa {
  funcao inicio() {

  }
}`)
const submissions = ref([])
const selectedExercice = ref(null) 

async function updateExercice(id){


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

    const response = await fetch(`http://localhost:3000/exercice/${id}`, requestOptions);
    const data = await response.json();

    if (response.status === 200 && data) {
    
      toast({
        title: 'Tarefa carregado',
        duration: 2000
      })


     selectedExercice.value = data
     submissions.value = []

code.value = `programa {
  funcao inicio() {

  }
}`
  
 selectedExercice.value.submissions?.map(obj => {

        if(obj.userId == user.value.id){
            submissions.value = obj
        
            code.value = obj.code }
    })

    
     
    } else {
      throw new Error(data.message || "Erro ao buscar Tarefa");
    }
  } catch (err) {
    console.error(err);
  }



}
const isLoading = ref(false)
const handleSelect =  async (value: string) => {

isLoading.value = true


await updateExercice(value)

submissions.value = []

code.value = `programa {
  funcao inicio() {

  }
}`
  
 selectedExercice.value.submissions?.map(obj => {

        if(obj.userId == user.value.id){
            submissions.value = obj
          
            code.value = obj.code }
    })

    isLoading.value = false
};


const submitResult = ref(null)
const editorContent = ref(`programa {
  funcao inicio() {

  }
}`
)
const handleEditorValue = async (value: string) => {
 
 code.value = value;


};
const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
import { useRoute, useRouter } from 'vue-router'
import { toast } from './ui/toast';
const router = useRouter()
const route = useRoute()
</script>

<template>

  <div class="flex min-h-screen w-full flex-col">
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
          class="text-foreground transition-colors hover:text-foreground"
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
          v-if="user?.role.name === 'Professor'"
         @click="$router.push('/exercice')"
          class="text-muted-foreground transition-colors hover:text-foreground"
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
            <button @click="$router.push('/dashboard')" class="hover:text-foreground">
              Início
            </button>
            <button
              @click="$router.push('/code')"
              class="text-muted-foreground hover:text-foreground"
            >
             Programar
            </button>
            <!-- <button
              @click="$router.push('/tournaments')"
              class="text-muted-foreground hover:text-foreground"
            >
              Competições
            </button> -->
            <button
              v-if="user?.role.name === 'professor'"
              @click="$router.push('/exercice')"
              class="text-muted-foreground hover:text-foreground"
            >
              Tarefas
            </button>
         
          </nav>
        </SheetContent>
      </Sheet>
      <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form class="ml-auto flex-1 sm:flex-initial">
         
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="secondary" size="icon" class="rounded-full">
              <CircleUser class="h-5 w-5" />
              
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="$router.push('/settings')">Configurações</DropdownMenuItem>
           
        
            <DropdownMenuItem @click="logout">Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
  </div>
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-1  md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
      
        <Card class="xl:col-span-1 ">
          <CardHeader class="flex flex-row items-center">
            <div class="grid gap-2">
              <CardTitle>Resolução da tarefa</CardTitle>
              <CardDescription>
               Após o termino envie a resolução
              </CardDescription>
            </div>


            <AlertDialog>
    <AlertDialogTrigger > <Button v-if="selectedExercice && !user?.exercisesDone.some(obj => obj.id == selectedExercice?.id)"  @click="submitExercice" class="ml-56" as-child size="sm" >
              <a >
               Enviar resolução
                <ArrowUpRight class="h-4 w-4" />
              </a>
            </Button></AlertDialogTrigger>
    <AlertDialogContent v-if="submitResult" >
      <AlertDialogHeader class="max-h-[250px] overflow-auto">
        <AlertDialogTitle>{{ submitResult}}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ submitResult==='Enviando Tarefa...' ? 'Aguarde... Não saia desta página' : '' }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
      
        <AlertDialogAction v-if="submitResult!='Enviando Tarefa...'">Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

           


          </CardHeader>
          <CardContent class="h-[350px]">
          <MonacoExampleCode :code="code" @getChange="handleEditorValue" class="border-2 border-accent max-h-full rounded-sm h-full "></MonacoExampleCode>
          </CardContent>
        </Card>
        <Card class="xl:col-span-1">
          <CardHeader class="flex flex-row items-center">
            <div class="grid gap-2">
              <CardTitle>{{ selectedExercice? selectedExercice.name : 'Nenhuma Tarefa selecionada' }}</CardTitle>
              <CardDescription v-if="selectedExercice">
               {{'Criado em: ' + new Date(selectedExercice?.createdAt).toLocaleDateString()}} 
              </CardDescription>
            </div>
            <div as-child size="sm" class="ml-auto gap-1">
            <ExerciceList @select="handleSelect">      </ExerciceList>
            </div>
          </CardHeader>
          <CardContent class="h-[350px] border-t-2 p-8  shadow-sm ">
  <div v-if="selectedExercice" class="grid gap-6">
    <ul class="grid gap-4">
      <li class="flex flex-col">
        <div class="flex flex-row space-x-4 items-center max-w-full">
          <span class="text-foreground text-lg font-semibold">
            <Text />
          </span> 
          <span class="text-muted-foreground text-md">
            {{ selectedExercice?.statement }}
          </span>
        </div>
      </li>
      
      <li v-if="submissions.attempts" class="flex items-center justify-between">
        <span class="text-foreground space-x-2 flex items-center">
          <span class="text-foreground">
            Tentativas
          </span>
        </span>
        <span class="text-muted-foreground text-md font-medium">
          {{ submissions.attempts }}
        </span>
      </li>
      
      <li class="flex items-center justify-between">
        <span v-if="user?.exercisesDone.some(obj => obj.id == selectedExercice?.id)" class="text-green-500 flex items-center">
          <Check />
          <span class="ml-2">Concluído</span>
        </span>
        <span v-else class="text-red-500 flex items-center">
          <Cross />
          <span class="ml-2">Pendente</span>
        </span>
      </li>
    </ul>
    <Separator class="my-4" />
  </div>
</CardContent>

        </Card>
      </div>
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
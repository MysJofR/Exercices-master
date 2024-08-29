<script setup lang="ts">
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

}
}
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

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
      localStorage.setItem('role', data.role.name)
     
    }
  } catch (err) {
   
    localStorage.removeItem("token");
  }
}
import { Activity, ArrowUpRight, CircleUser, CreditCard, DollarSign, Menu, Package2, Search, Users, RocketIcon, TrophyIcon, Trophy } from 'lucide-vue-next'
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
import Ranking from './ranking.vue';
const isLoading = ref(false)
onMounted(async () => {
  isLoading.value = true;
    await getUser()
    await getExercices()
})
const user = ref(null)
const exercices = ref(null)
const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
const position = ref(0)
const getPosition = (users: object[]) => {
 
  for(let i = 0;i<users.length;i++) {
  
    if (users[i].schoolId === user.value?.schoolId){ position.value = i+1 }
  }

}
</script>

<template>
  
  <div class="flex min-h-screen w-full flex-col">
    <header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-end md:gap-5 md:text-sm lg:gap-6">
        <button
          @click="$router.push('/')"
          class="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
        
     <img src="/LogiC.svg" class="shadow-lg rounded-lg "  width="80">
      </button>
        <button
        @click="$router.push('/dashboard')"
          class="text-foreground transition-colors hover:text-foreground"
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
        :class="user?.role.name === 'Professor' ? 'visible' : 'invisible'"
    
         @click="$router.push('/exercice')"
          class="text-muted-foreground  transition-colors hover:text-foreground"
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
            <a
              href="#"
              class="flex items-center gap-2 text-lg font-semibold"
            >
              <h1 class="font-bold">LogiC</h1>
              
            </a>
            <a  class="hover:text-foreground">
              Início
            </a>
            <a
              @click="$router.push('/code')"
              class="text-muted-foreground hover:text-foreground"
            >
             Programar
            </a>
       <!--    <a
              href="#"
              class="text-muted-foreground hover:text-foreground"
            >
              Competições
            </a>--> 
            <a
              v-if="user?.role.name === 'professor'"
              @click="$router.push('/exercice')"
              class="text-muted-foreground hover:text-foreground"
            >
              Tarefas
            </a>
         
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
    <main  class="flex flex-1 flex-col  gap-4 p-4 md:gap-8 md:p-8">
      <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
  </div>
      <div v-else class="grid gap-4 md:gap-8 lg:grid-cols-1 xl:grid-cols-1 px-20   ">
        <h1 class="font-bold text-2xl">{{ user?.fullname ? 'Bem-vindo ' + user.fullname.split(' ')[0] + '!' : 'Bem-vindo!'}}</h1>
       <!-- <Card  class="xl:col-span-2 hidden">
          <CardHeader class="flex flex-row items-center">
            <div class="grid gap-2">
              <CardTitle>Torneios Ativos</CardTitle>
              <CardDescription>
                Torneios que você pode participar.
              </CardDescription>
            </div>
            <Button as-child size="sm" class="ml-auto gap-1">
              <a href="#">
                Ver todos
                <ArrowUpRight class="h-4 w-4" />
              </a>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Torneio</TableHead>
                  <TableHead class="hidden xl:table-column">
                    Type
                  </TableHead>
                  <TableHead class="hidden xl:table-column">
                    Status
                  </TableHead>
                  <TableHead class="hidden xl:table-column">
                    Date
                  </TableHead>
                  <TableHead class="text-right">
                   
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div class="font-medium">
                      Turmas de programação
                    </div>
                    <div class="hidden text-sm text-muted-foreground md:inline">
                      
                    </div>
                  </TableCell>
                  <TableCell class="hidden xl:table-column">
                    Sale
                  </TableCell>
                  <TableCell class="hidden xl:table-column">
                    <Badge class="text-xs" variant="outline">
                      Approved
                    </Badge>
                  </TableCell>
                  <TableCell class="hidden md:table-cell lg:hidden xl:table-column">
                    2023-06-23
                  </TableCell>
                  <TableCell class="text-right">
                    <a href="#">Saiba mais</a>
                  </TableCell>
                </TableRow>
     
             
              </TableBody>
            </Table>
          </CardContent>
        </Card> -->
       

        <div class="grid gap-4 md:grid-cols-1 md:gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
              Tarefas Pendentes
            </CardTitle>
           
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
            {{ user?.exercisesDone.length>0 ? exercices?.length - user?.exercisesDone.length : exercices?.length? exercices?.length : 0}} 
            </div>
            <p class="text-xs text-muted-foreground">
             +{{ exercices?.filter(exercise => {
  // Converter a data de criação para um objeto Date, caso ainda não seja um
  const exerciseDate = new Date(exercise.createdAt);

  // Calcular a data e hora de 24 horas atrás
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // Retornar apenas Tarefas criados nas últimas 24 horas
  return exerciseDate > twentyFourHoursAgo;
}).length }} tarefas criadas nas ultimas 24 horas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
             Total de tarefas concluídas
            </CardTitle>
            <Users class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
                {{ user?.exercisesDone.length}}
            </div>
            <p class="text-xs text-muted-foreground">
              +{{ user?.exercisesDone.filter(exercise => {
  // Se 'createdAt' for uma string, converta-a para um objeto Date
  const exerciseDate = new Date(exercise.createdAt);

  // Calcular a data de 24 horas atrás
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // Verificar se a data de criação do Tarefa é maior que a data de 24 horas atrás
  return exerciseDate > twentyFourHoursAgo;
}).length }} concluídas nas últimas 24h
            </p>
          </CardContent>
        </Card>
        <Card class="max-h-[120px]">
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
              Posição no ranking geral
            </CardTitle>
            <RocketIcon class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
             {{ position!=0? position + '°' : 'Sem classificação'}}
            </div>
            <p class="text-xs text-muted-foreground">

            </p>
          </CardContent>
        </Card>
        <Card class="">
          <CardHeader class="border-b-2 items-center flex ">
            <CardTitle class="flex flex-row items-center gap-4"><Trophy class="h-7 w-6 text-muted-foreground" /> Ranking Geral</CardTitle>
          </CardHeader>
          <CardContent class="grid gap-8 p-4 ">
            <Ranking @getUsers="getPosition">
              
            </Ranking>
          
       
          </CardContent>
        </Card>
        <!--     <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
              Grupo atual
            </CardTitle>
            <Activity class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
                DS2
            </div>
       
          </CardContent>
        </Card> -->
      </div>
      
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
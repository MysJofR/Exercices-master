<script setup lang="ts">
import { CircleUser, Menu, Package2, Search } from 'lucide-vue-next'
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
    console.log(err);
    localStorage.removeItem("token");
  }
}
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
const user = ref(null)
onMounted(async () => {
  await getUser()
})
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { onMounted, ref } from 'vue';
import { roundToStepPrecision } from 'node_modules/radix-vue/dist/shared';
import { routerKey } from 'vue-router';
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
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          Programar
</button>
        <!-- <button
         @click="$router.push('/tournaments')"
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          Competições
</button> -->
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
            <button @click="$router.push('/dashboard')" class="text-muted-foreground hover:text-foreground">
              Início
            </button>
            <button
              @click="$router.push('/code')"
              class="text-muted-foreground hover:text-foreground"
            >
             Programar
            </button>
        <!--    <button
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
  
           
           
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
    <main class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div class="mx-auto grid w-full max-w-6xl gap-2">
        <h1 class="text-3xl font-semibold">
          Configurações
        </h1>
      </div>
      <div class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav class="grid gap-4 text-sm text-muted-foreground">
          <a href="#" class="font-semibold text-primary">
            Meu perfil
          </a>
         <!-- <a href="#">
            Privacidade
          </a>
          <a href="#">
            Ajuda
          </a>
          <a href="#">
            Contato
          </a> -->
          <a  @click="logout" >
           Sair
          </a>
         
        </nav>
        <div  class="grid gap-6">
          <Card class="h-5/6" v-if="user">
            <CardHeader class="grid grid-cols-2 h-2/6  ">
             
              <CardTitle class="">
                Conta - {{ user?.role.name }}
              </CardTitle>
              <div class=" rounded-lg flex justify-end">
                <img :src=" `http://localhost:3000${user?.profilePicture} `" class=" rounded-lg border-2 p-1">

               </div>
           
             
             
              
            </CardHeader>
            <div class="flex flex-row">
            <CardContent class="w-5/6 flex items-center  h-full">
              <form>
                <div class="text-sm  flex flex-row space-x-2" ><p class="font-semibold text-foreground">{{ user?.fullname + " - " + user?.schoolId }} </p>
          </div>
                <div class="text-sm  flex flex-row space-x-2" ><p class="font-semibold text-foreground">{{"Data de entrada: " + new Date(user?.createdAt).toLocaleDateString() }}</p></div>
                <div class="text-sm  flex flex-row space-x-2" ><p class="font-semibold text-foreground">{{"Curso: " + user?.course }}</p></div>
              </form>
            </CardContent>
            <div class="flex items-end  w-full flex-col h-full">
              
              </div>
            </div>
              
          </Card>
          
        </div>
      </div>
    </main>
  </div>
</template>
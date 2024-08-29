<script setup lang="ts">
import { h, ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'

const { toast } = useToast()

import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()



const username = ref('')
const password = ref('')
const handleSubmit = async (values) => {
   
 if(values.username == '' || values.password == ''){
   toast({
     title: 'Erro ao logar-se:',
     description: 'Por favor, preencha todos os campos corretamente.'
   });
   return
 }
     try {
  

  
  var requestOptions: RequestInit = { 
      method: 'POST',
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
      body: JSON.stringify({
        username: values.username,
        password: values.password
      }),
      redirect: 'follow'
  };

  const response = await fetch("http://localhost:3000/auth/login", requestOptions)

  const data = await response.json();
  
  if (response.status == 200) {
    
      localStorage.setItem('token', data.token)
      
    router.push('/dashboard')
     
  }else{

    toast({
    title: 'Erro ao logar-se: ',
    description: data.message
   })
  }
} catch (err) {
    console.log(err)
  localStorage.removeItem("token");
 
}
 
}
</script> 

<template>



<Toaster />


<div  class="w-full lg:grid lg:min-h-screen lg:grid-cols-1 xl:min-h-screen">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">
           Logando-se
          </h1>
          <p class="text-balance text-muted-foreground">
           Faça login com sua conta Moodle IFRS Canoas
          </p>
        </div>
        <div class="grid gap-3 items-center ">
          <div class="grid gap-2">
           
            <Input
              v-model="username"
              id="Matricula"
              type="text"
              placeholder="Matrícula do Usuário"
              required
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
            
         
            </div>
            <Input id="Senha" type="password" v-model="password" placeholder="Senha do Usuário" required />
          </div>

          <div class="w-full justify-center flex">
          <Button type="submit" @click="handleSubmit({username: username, password: password})" class="w-4/6  ">
            Entrar
          </Button>
        </div>
          <!-- <Button variant="outline" class="w-full">
            Entrar com google
          </Button> -->
        </div>
       
      </div>
    </div>
  
    
  </div>
</template>
<script setup lang="ts">
import { h } from 'vue'
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



const formSchema = toTypedSchema(z.object({
  username: z.string({required_error: 'Você deve inserir seu username para logar-se'}),
  password: z.string({ required_error: 'Você deve inserir uma senha'}).min(4, 'A senha deve conter ao menos 4 caracteres'),
 
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit =  handleSubmit(async (values) => {
   
 
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
 
})
</script> 

<template>

     <div class="h-full mt-10 w-full justify-right items-center flex flex-col">
      <Toaster />
      <h1 class="mt-5 font-bold text-2xl">Logar-se</h1>
  <form class="w-3/6 p-10 space-y-2" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Matricula</FormLabel>
        <FormControl>
          <Input type="text" class="text-gray-100" placeholder="Matrícula" v-bind="componentField" />
        </FormControl>
        <FormDescription>

        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>


    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Senha</FormLabel>
        <FormControl>
          <Input type="password" class="text-gray-100" placeholder="Digite sua senha" v-bind="componentField" />
        </FormControl>
        <FormDescription>
      
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

   
    <Button class="" type="submit">
      Logar-se
    </Button>
  </form></div>
</template>
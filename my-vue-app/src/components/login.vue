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





  fetch("http://localhost:3000/auth/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
                        
            },
            body: JSON.stringify({
                username:values.username,
                password:values.password
            })
        }).then(async (response) => {

            const data = await response.json();

            if(response.status == 200){
      
             
              localStorage.setItem('token', data.token);
              router.push("/dashboard")

            }else{
               alert("Preencha os Campos Vazios");
            }

        }).catch((err) => {

            throw new Error(err);
        })

  return false;
      
})
</script>

<template>
     <Toaster />
  <form class="w-2/3 space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          This is your public display name.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>


    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input type="password" placeholder="password" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          Enter Your Password
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import { Ref, ref, onMounted } from 'vue';
import MonacoEditor from '@/components/MonacoEditor.vue';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
const exercices = ref(null)
const user = ref(null)
async function getUser() {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("token", localStorage.getItem("token") ?? '');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
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
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'

const { toast } = useToast()

async function getExercices() {
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

  const response = await fetch("http://localhost:3000/exercice", requestOptions);
  const data = await response.json();

  if (response.status === 200) {
    if (data.length > 0) {
        exercices.value = data
    }
  } else {
  
    throw new Error(data.message || "Erro ao enviar exercício");
  }
}



onMounted(async () => {
  await getUser();
  await getExercices();
});
</script>


<template>


<NavigationMenu class="border-2 rounded-lg p-1">
    <NavigationMenuList>
   
      <NavigationMenuItem>
        <NavigationMenuLink href="/docs" :class="navigationMenuTriggerStyle()">
          Documentation
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>



</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Avatar from './ui/avatar/Avatar.vue';
import AvatarFallback from './ui/avatar/AvatarFallback.vue';
import AvatarImage from './ui/avatar/AvatarImage.vue';
import { toast } from './ui/toast';

const users = ref(null);

async function getUsers() {
  try {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "token": localStorage.getItem('token')
      },
      redirect: 'follow'
    };

    const response = await fetch("http://localhost:3000/auth/list", requestOptions);
    const data = await response.json();

    if (response.status == 201) {
      if (data.length > 0) {
        // Filtra usuários que têm mais de 0 Tarefas feitos e os ordena em ordem decrescente
        data.forEach(user => {
  const totalAttempts = user.submissions.reduce((sum, submission) => sum + submission.attempts, 0);
  const numSubmissions = user.submissions.length;
  user.averageAttempts = numSubmissions > 0 ? totalAttempts / numSubmissions : 0;
});

// Passo 2: Filtrar e ordenar os usuários por média de tentativas e, em caso de empate, por exercícios feitos
users.value = data
  .filter(user => user.exercisesDone.length > 0)
  .sort((a, b) => {
    // Primeiro, ordenar pela média de tentativas (menor para maior)
    if (b.exercisesDone.length == a.exercisesDone.length) {
      return a.averageAttempts - b.averageAttempts;
    }
    // Em caso de empate, ordenar pela quantidade de exercícios feitos (maior para menor)
    return b.exercisesDone.length - a.exercisesDone.length;
  });
      }

      emit('getUsers', users.value)
    } else {
      
      toast({
        title: 'Erro ao listar usuários',
        description: data.message,
      });
    }
  } catch (err) {
    console.error(err);
    localStorage.removeItem("token");
  }
}
const emit = defineEmits(['getUsers'])
onMounted(async () => {
  await getUsers();
});
</script>

<template>
<ol class="space-y-2 max-h-[300px] overflow-auto">
  <li class="flex justify-between" v-if="users" v-for="(user, index) in users" :key="index">
    <div class=" flex items-center font-bold gap-4">
      {{ index + 1 }}°
      <Avatar class="hidden h-9 w-9 sm:flex">
        <img :src="`http://localhost:3000${user?.profilePicture}`"  />
        
      </Avatar>
      <div class="grid gap-1">
        <p class="text-sm font-medium leading-none">
          {{ user?.fullname }}
        </p>
        <p class="text-sm text-muted-foreground">
          {{ user?.exercisesDone.length }} tarefa(s) feita(s)
        </p>
      </div>
      
    </div>
    <div class="grid gap-1">
        <p class="text-sm font-medium leading-none">
          Média de tentativas
        </p>
        <p class="text-sm text-muted-foreground">
          {{ user?.averageAttempts.toFixed(2) }} tentativas p/ tarefa
        </p>
      </div>
  </li>
  
  <li v-else class="text-muted-foreground">O ranking está vazio! Faça tarefas e se torne o primeiro lugar!</li>
</ol>
</template>

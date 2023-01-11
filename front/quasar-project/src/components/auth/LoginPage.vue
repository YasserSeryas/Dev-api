<template>
    <div class="q-pa-xl">
      <div class="flex flex-center column">
        <h1 class="q-mb-lg">Connectez vous</h1>
        <q-card>
          <q-card-section>
            <q-input label="Email" type="email" outlined class="q-mb-md" v-model="form.email"/>
            <q-input label="Mot de passe" type="password" outlined class="q-mb-md" v-model="form.password" />
            <q-btn label="Se connecter" class="full-width" color="primary" @click="handleLogin"/>
            <p>Vous n'avez pas de compte ? <a href="#/register">Inscrivez vous</a></p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue'
  import { useUserStore } from 'stores/user-store'
  import { Notify } from 'quasar'
  import { useRouter } from 'vue-router'
  
  const userStore = useUserStore()
  const router = useRouter()
  
  const form = ref({
    email: '',
    password: '',
  })
  
  const handleLogin = () => {
    try {
      userStore.handleLogin(form.value)
      router.push({ name: 'dashboard' })
      console.log("Connected ")
    } catch (e) {
      Notify.create('Error during Login')
    }
  }
  </script>
  
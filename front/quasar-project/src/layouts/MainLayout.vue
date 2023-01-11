<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <q-btn outline  color="primary" no-caps class="q-mx-md"><router-link to="/login">
          Se connecter
        </router-link></q-btn>
        
        <q-btn outline  color="primary" no-caps class="q-mx-md">
          <router-link to="/register">
          S'inscrire
          </router-link>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
</script>

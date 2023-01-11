<template>
  <div class="q-pa-md">
    <h1>
      Hello 👋 {{ user }}
    </h1>
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { getActiveUser } from 'src/services/users'
const users = ref([])
const fakeData = ref([])
const loading = ref(false)
const asyncCall = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { user: "fake" }
      ])
    }, 3000)
  })
}
onMounted(async () => {
  loading.value = true
  const data = await asyncCall()

  try {
    const res = await getActiveUser()
    console.log(res)
    users.value = res.data
  } catch {
    console.log("error")
  }

  fakeData.value = data
  loading.value = false
})

</script>

<script setup lang="ts">
import SignUpForm from './signUp/SignUpForm.vue'
import { onMounted } from 'vue'
import { useSignupModel } from './signUp/useSignUpModel'
import Home from './list/Home.vue'

const { status, init } = useSignupModel()
onMounted(init)
</script>

<template>
  <template v-if="status === null">loading...</template>
  <template v-else-if="status === 'NotSet'">
    <SignUpForm />
  </template>
  <template v-else-if="status === 'SignedOut'"> SignInForm </template>
  <template v-else>
    <Home />
  </template>
</template>

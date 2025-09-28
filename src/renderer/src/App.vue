<script setup lang="ts">
import { onMounted } from 'vue'
import EntryListView from './list/EntryListView.vue'
import { useSessionModel } from './session/useSessionModel'
import SignInForm from './signIn/SignInForm.vue'
import SignUpForm from './signUp/SignUpForm.vue'

const { status, update } = useSessionModel()
onMounted(update)
</script>

<template>
  <template v-if="status === null">loading...</template>
  <template v-else-if="status === 'NotSet'">
    <SignUpForm />
  </template>
  <template v-else-if="status === 'SignedOut'">
    <SignInForm />
  </template>
  <template v-else>
    <entry-list-view />
  </template>
</template>


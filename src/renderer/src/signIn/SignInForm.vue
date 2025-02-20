<script setup lang="ts">
import { useSignInFormModel } from './useSignInFormModel'

const { password, submit, errorMessage } = useSignInFormModel()
</script>

<template>
  <v-sheet>
    <form @submit.stop.prevent="submit">
      <h1>パスワードを入力してください。</h1>
      <v-text-field
        v-model="password"
        label="パスワード"
        type="password"
        :error-messages="errorMessage"
      />
      <v-btn type="submit">送信</v-btn>
    </form>
  </v-sheet>
</template>

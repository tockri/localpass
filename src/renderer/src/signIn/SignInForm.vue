<script setup lang="ts">
import { useSignInFormModel } from './useSignInFormModel'

const { password, submit, errorMessage } = useSignInFormModel()
</script>

<template>
  <v-sheet>
    <form @submit.stop.prevent="submit">
      <p>パスワードを入力してください。</p>
      <v-text-field
        v-model="password"
        label="パスワード"
        type="password"
        autofocus
        :error-messages="errorMessage"
      />
      <v-btn type="submit">送信</v-btn>
    </form>
  </v-sheet>
</template>

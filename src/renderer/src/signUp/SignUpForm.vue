<script setup lang="ts">
import { useSignupModel } from './useSignUpModel'
import { useSignUpFormModel } from './useSignUpFormModel'

const { submit, errorMessage } = useSignupModel()
const { password, score } = useSignUpFormModel()
const onSubmit = (): Promise<void> => submit(password.value)
</script>

<template>
  <v-sheet>
    <form @submit.stop.prevent="onSubmit">
      <h1>パスワードを設定してください。</h1>
      <v-text-field
        v-model="password"
        label="パスワード"
        type="password"
        :error-messages="errorMessage"
      />

      <v-btn type="submit" :disabled="score < 4">登録</v-btn>
      Score: {{ score }}
    </form>
  </v-sheet>
</template>

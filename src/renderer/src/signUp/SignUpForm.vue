<script setup lang="ts">
import { useSignUpFormModel } from './useSignUpFormModel'

const { password, score, submit, errorMessage } = useSignUpFormModel()
</script>

<template>
  <v-sheet>
    <form @submit.stop.prevent="submit">
      <h1>パスワードを設定してください。</h1>
      <v-text-field
        v-model="password"
        label="パスワード"
        type="password"
        :error-messages="errorMessage"
      />
      <div v-if="password !== ''">
        <div v-if="score < 1">よわよわ</div>
        <div v-else-if="score < 2">よわ</div>
        <div v-else-if="score < 3">もう少し</div>
        <div v-else-if="score < 4">まあまあ</div>
        <div v-else>つよつよ</div>
      </div>

      <v-btn type="submit" :disabled="score < 3">登録</v-btn>
      Score: {{ score }}
    </form>
  </v-sheet>
</template>

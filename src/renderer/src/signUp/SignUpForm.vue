<script setup lang="ts">
import { useSignUpFormModel } from './useSignUpFormModel'

const {
  password,
  confirmation,
  score,
  submit,
  errorMessage,
  confirmationErrorMessage,
  isSubmittable
} = useSignUpFormModel()
</script>

<template>
  <v-sheet>
    <form @submit.stop.prevent="submit">
      <p>パスワードを設定してください。</p>
      <div>
        <v-text-field
          v-model="password"
          label="パスワード"
          type="password"
          required
          autofocus
          :error-messages="errorMessage"
        />
        <div v-if="password !== ''">
          <div v-if="score < 1">よわよわ</div>
          <div v-else-if="score < 2">よわ</div>
          <div v-else-if="score < 3">もう少し</div>
          <div v-else-if="score < 4">まあまあ</div>
          <div v-else>つよつよ</div>
        </div>
      </div>
      <div>
        <v-text-field
          v-model="confirmation"
          label="パスワード（確認）"
          type="password"
          required
          :error-messages="confirmationErrorMessage"
        />
      </div>

      <v-btn type="submit" :disabled="!isSubmittable">登録</v-btn>
    </form>
  </v-sheet>
</template>

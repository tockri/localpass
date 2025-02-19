<script setup lang="ts">
import { onMounted } from 'vue'
import { usePassEntryListModel } from './usePassEntryListModel'

const model = usePassEntryListModel()
const { list } = model
onMounted(model.init)
</script>

<template>
  <h1>パスワードマネージャー</h1>
  <div v-for="(entry, idx) in list" :key="idx">
    <PassEntryView :entry="entry" />
  </div>
  <v-btn @click="model.create">追加</v-btn>
</template>

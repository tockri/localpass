<script setup lang="ts">
import Toast from '@renderer/components/Toast.vue'
import { onMounted } from 'vue'
import PassEntryView from './PassEntryView.vue'
import { usePassEntryListModel } from './usePassEntryListModel'

const { passEntryList: list, ...lm } = usePassEntryListModel()
onMounted(lm.init)
</script>

<template>
  <div class="d-flex ga-2 flex-column">
    <div v-for="(entry, idx) in list" :key="idx">
      <PassEntryView :entry="entry" @remove="lm.remove" @updated="lm.update" />
    </div>
    <div>
      <v-btn @click="lm.create">追加</v-btn>
    </div>
  </div>
  <toast />
</template>

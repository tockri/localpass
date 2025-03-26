<script setup lang="ts">
import Toast from '@renderer/components/Toast.vue'
import { onMounted } from 'vue'
import { Container, Draggable } from 'vue-dndrop'
import PassEntryView from './PassEntryView.vue'
import { usePassEntryListModel } from './usePassEntryListModel'

const { passEntryList: list, ...lm } = usePassEntryListModel()
onMounted(lm.init)
</script>

<template>
  <div class="d-flex ga-2 flex-column">
    <Container orientation="vertical" behaviour="move" @drop="lm.arrange">
      <Draggable v-for="entry in list" :key="entry.id">
        <PassEntryView :entry="entry" @remove="lm.remove" @updated="lm.update" />
      </Draggable>
    </Container>
    <div>
      <v-btn @click="lm.create">追加</v-btn>
    </div>
  </div>
  <toast />
</template>

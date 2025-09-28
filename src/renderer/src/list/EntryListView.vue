<script setup lang="ts">
import Toast from '@renderer/components/Toast.vue'
import { computed, onMounted, ref } from 'vue'
import EntryView from './EntryView.vue'
import { usePassEntryListModel } from './usePassEntryListModel'

const searchTerm = ref('')
const { passEntryList: list, ...lm } = usePassEntryListModel()

onMounted(lm.init)

const filteredEntries = computed(() => {
  const keyword = searchTerm.value.trim().toLowerCase()
  if (!keyword) {
    return list.value
  }
  return list.value.filter((entry) => (entry.label ?? '').toLowerCase().includes(keyword))
})
</script>

<template>
  <div class="entry-list-view d-flex flex-column ga-4">
    <div class="d-flex align-end ga-2">
      <v-text-field
        v-model="searchTerm"
        label="Search entries"
        variant="outlined"
        hide-details
        density="comfortable"
        prepend-inner-icon="mdi:mdi-magnify"
        class="flex-grow-1"
      />
      <v-btn color="primary" @click="lm.create">
        <v-icon icon="mdi:mdi-plus" start />New entry
      </v-btn>
    </div>

    <div v-if="filteredEntries.length === 0" class="text-medium-emphasis text-body-2">
      No entries match your search.
    </div>

    <v-expansion-panels v-else multiple class="entry-panels" variant="accordion">
      <EntryView
        v-for="entry in filteredEntries"
        :key="entry.id"
        :entry="entry"
        @updated="lm.update"
        @remove="lm.remove"
      />
    </v-expansion-panels>
  </div>
  <toast />
</template>

<style scoped>
.entry-list-view {
  max-width: 720px;
  margin: 0 auto;
}

.entry-panels {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>

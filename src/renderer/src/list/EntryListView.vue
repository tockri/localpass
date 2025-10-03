<script setup lang="ts">
import Toast from '@renderer/components/Toast.vue'
import { computed, onMounted, ref, watch } from 'vue'
import EntryView from './EntryView.vue'
import { usePassEntryListModel } from './usePassEntryListModel'

const searchTerm = ref('')
const activeEntryId = ref<string | null>(null)
const { passEntryList: list, ...lm } = usePassEntryListModel()

onMounted(lm.init)

const createEntry = async (): Promise<void> => {
  const created = await lm.create()
  if (created) {
    activeEntryId.value = created.id
  }
}

const removeEntry = async (id: string): Promise<void> => {
  await lm.remove(id)
  if (activeEntryId.value === id) {
    activeEntryId.value = null
  }
}

watch(
  () => list.value.map((entry) => entry.id),
  () => {
    if (activeEntryId.value && !list.value.some((entry) => entry.id === activeEntryId.value)) {
      activeEntryId.value = null
    }
  }
)

const filteredEntries = computed(() => {
  const keyword = searchTerm.value.trim().toLowerCase()
  if (!keyword) {
    return list.value
  }
  return list.value.filter(
    (entry) =>
      (entry.label ?? '').toLowerCase().includes(keyword) || entry.id === activeEntryId.value
  )
})
</script>

<template>
  <div class="entry-list-view d-flex flex-column ga-4 my-2">
    <div class="d-flex align-center ga-2 entry-list-view__search">
      <v-text-field
        v-model="searchTerm"
        label="Search entries"
        variant="outlined"
        hide-details
        density="compact"
        prepend-inner-icon="mdi:mdi-magnify"
        class="flex-grow-1"
      />
      <v-btn color="primary" @click="createEntry">
        <v-icon icon="mdi:mdi-plus" start />New entry
      </v-btn>
    </div>

    <div v-if="filteredEntries.length === 0" class="text-medium-emphasis text-body-2">
      No entries match your search.
    </div>

    <v-expansion-panels v-else v-model="activeEntryId" class="entry-panels" variant="accordion">
      <EntryView
        v-for="entry in filteredEntries"
        :key="entry.id"
        :entry="entry"
        @updated="lm.update"
        @remove="removeEntry"
      />
    </v-expansion-panels>
  </div>
  <toast />
</template>

<style scoped lang="postcss">
.entry-list-view {
  @apply mx-auto max-w-[720px];
}

.entry-panels {
  @apply flex flex-col gap-3;
}

.entry-list-view__search {
  @apply sticky top-0 z-[2] py-2 bg-[rgb(var(--v-theme-surface))];
}
</style>

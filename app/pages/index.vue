<template>
  <AppShell :title="t('app.title')">
    <template #actions>
      <div class="flex items-center gap-2">
        <span class="text-xs text-(--ui-text-muted)">{{ t("app.localeLabel") }}</span>
        <USelectMenu
          v-model="selectedLocale"
          value-key="code"
          label-key="name"
          :items="availableLocales"
          class="w-44"
        />
      </div>
    </template>

    <div class="space-y-5">
      <p class="text-(--ui-text-muted)">
        {{ t("app.subtitle") }}
      </p>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between gap-3">
            <h2 class="text-base font-semibold">{{ t("app.users") }}</h2>
            <UInput v-model="request.search" icon="i-lucide-search" placeholder="Search user..." />
          </div>
        </template>

        <div class="mb-4 space-y-2">
          <div
            v-for="user in usersList"
            :key="user.id"
            class="flex items-center justify-between rounded-md border border-(--ui-border) px-3 py-2"
          >
            <div class="flex flex-col">
              <span class="font-medium">{{ user.name }}</span>
              <span class="text-xs text-(--ui-text-muted)">{{ user.email }}</span>
            </div>
            <UBadge color="neutral" variant="subtle">
              {{ user.role }}
            </UBadge>
          </div>
        </div>

        <UsersWorkbench :users="usersList" />
      </UCard>
    </div>
  </AppShell>
</template>

<script setup lang="ts">
import type { SupportedLocale } from "~/composables/use-locale-switcher.composable"

const { t } = useI18n()
const { locale, availableLocales, changeLocale } = useLocaleSwitcher()
const selectedLocale = ref<SupportedLocale>(locale.value as SupportedLocale)

const request = reactive({
  page: 1,
  pageSize: 10,
  search: "",
})

const { filteredItems } = useUsers(request)
const usersList = computed(() => filteredItems.value)

watch(selectedLocale, async (nextLocale) => {
  await changeLocale(nextLocale)
})

watch(locale, (nextLocale) => {
  selectedLocale.value = nextLocale as SupportedLocale
})

useSeoMeta({
  title: "SaaS Client Nuxt",
  description: "Nuxt modular architecture with Pinia, Vue Query and i18n support.",
})
</script>

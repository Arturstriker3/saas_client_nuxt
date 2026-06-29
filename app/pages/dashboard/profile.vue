<template>
  <div class="mx-auto max-w-3xl space-y-6 p-4 lg:p-6">
    <div v-if="isLoading" class="flex items-center justify-center py-20">
      <UIcon name="i-lucide-loader" class="h-8 w-8 animate-spin text-primary" />
    </div>

    <div v-else-if="!me" class="flex flex-col items-center justify-center py-20 text-center">
      <div class="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-500/10">
        <UIcon name="i-lucide-alert-circle" class="h-8 w-8 text-rose-500" />
      </div>
      <p class="mt-4 text-sm font-medium text-[#64748b] dark:text-slate-400">{{ t("app.profile.error") }}</p>
    </div>

    <template v-else>
      <ProfileHero
        :initials="initials"
        :name="me.name"
        :email="me.email"
        :role-icon="roleIcon"
        :role-badge-label="roleBadgeLabel"
      >
        <template #after>
          <ProfilePills
            class="mt-5"
            :plan="t('app.profile.planFree')"
            :language="languageLabel"
            :member-since-label="t('app.profile.memberSince')"
            :member-since="me.createdAt ? formatDate(me.createdAt) : '—'"
            :birth-date="me.birthDate ? formatDate(me.birthDate) : t('app.profile.notDefined')"
            @click-language="openLanguageModal"
            @click-birth-date="openBirthDateModal"
          />
        </template>
      </ProfileHero>
    </template>

    <!-- Language Modal -->
    <AppModal :open="isLanguageModalOpen" @close="isLanguageModalOpen = false">
      <template #title>{{ t("app.profile.changeLanguage") }}</template>
      <div class="space-y-2">
        <button
          v-for="lang in languageOptions"
          :key="lang.value"
          type="button"
          class="flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors"
          :class="me?.language === lang.value
            ? 'border-emerald-500/50 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300'
            : 'border-black/10 hover:bg-slate-50 dark:border-white/10 dark:hover:bg-slate-800'"
          @click="handleLanguageChange(lang.value)"
        >
          <UIcon :name="lang.icon" class="h-5 w-5" />
          {{ lang.label }}
          <UIcon v-if="me?.language === lang.value" name="i-lucide-check" class="ml-auto h-4 w-4 text-emerald-500" />
        </button>
      </div>
      <template #footer>
        <UButton color="neutral" variant="ghost" @click="isLanguageModalOpen = false">{{ t("app.profile.cancel") }}</UButton>
      </template>
    </AppModal>

    <!-- Birth Date Modal -->
    <AppModal :open="isBirthDateModalOpen" @close="isBirthDateModalOpen = false">
      <template #title>{{ t("app.profile.changeBirthDate") }}</template>
      <div class="space-y-3">
        <UInput
          v-model="birthDateInput"
          type="date"
          size="xl"
          color="primary"
          variant="outline"
          class="w-full"
        />
      </div>
      <template #footer>
        <UButton color="neutral" variant="ghost" @click="isBirthDateModalOpen = false">{{ t("app.profile.cancel") }}</UButton>
        <UButton color="primary" :loading="isBirthDateSaving" @click="handleBirthDateSave">{{ t("app.profile.save") }}</UButton>
      </template>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from "~/core/utils/date.util"
import { useMeQuery } from "~/modules/auth/queries/use-me.query"
import { useUpdateLanguageMutation } from "~/modules/auth/mutations/use-update-language.mutation"
import { useUpdateBirthDateMutation } from "~/modules/auth/mutations/use-update-birth-date.mutation"

definePageMeta({
  layout: "dashboard",
  name: "dashboard-profile",
})

const { t } = useI18n()
const { data: me, isLoading } = useMeQuery()
const { initials, languageLabel, roleBadgeLabel, roleIcon } = useProfileDisplay()
const updateLanguageMutation = useUpdateLanguageMutation()
const updateBirthDateMutation = useUpdateBirthDateMutation()

const isLanguageModalOpen = ref(false)
const isBirthDateModalOpen = ref(false)
const birthDateInput = ref("")

const languageOptions = [
  { value: "portuguese", label: "Português", icon: "i-circle-flags-br" },
  { value: "english", label: "English", icon: "i-circle-flags-us" },
  { value: "spanish", label: "Español", icon: "i-circle-flags-es" },
]

const openLanguageModal = () => { isLanguageModalOpen.value = true }
const openBirthDateModal = () => {
  if (me.value?.birthDate) {
    const d = new Date(me.value.birthDate)
    birthDateInput.value = d.toISOString().slice(0, 10)
  } else {
    birthDateInput.value = ""
  }
  isBirthDateModalOpen.value = true
}

const handleLanguageChange = async (language: string) => {
  await updateLanguageMutation.mutateAsync(language)
  isLanguageModalOpen.value = false
}

const isBirthDateSaving = computed(() => updateBirthDateMutation.isPending.value)
const handleBirthDateSave = async () => {
  if (!birthDateInput.value) return
  await updateBirthDateMutation.mutateAsync(birthDateInput.value)
  isBirthDateModalOpen.value = false
}
</script>

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
          />
        </template>
      </ProfileHero>
    </template>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from "~/core/utils/date.util"
import { useMeQuery } from "~/modules/auth/queries/use-me.query"

definePageMeta({
  layout: "dashboard",
  name: "dashboard-profile",
})

const { t } = useI18n()
const { data: me, isLoading } = useMeQuery()

const { initials, languageLabel, roleBadgeLabel, roleIcon } = useProfileDisplay()
</script>

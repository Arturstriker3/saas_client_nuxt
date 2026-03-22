<template>
  <div class="relative min-h-screen overflow-hidden bg-white text-[#0f172a] transition-colors dark:bg-slate-950 dark:text-slate-100">
    <div class="pointer-events-none absolute inset-0 opacity-80 dark:opacity-70" :style="backgroundStyle" />
    <div class="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-8 px-5 py-10 lg:grid-cols-2 lg:px-8">
      <section
        class="hidden p-2 transition-all duration-700 ease-out lg:block"
        :class="isContentVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'"
      >
        <div>
          <img
            src="/marcato.logo.png"
            alt="Logo Marcato"
            class="h-auto w-full max-w-[24rem] object-contain transition-all duration-700 ease-out"
            :class="isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'"
            :style="{ transitionDelay: isContentVisible ? '220ms' : '0ms' }"
          >
          <div class="mt-10 space-y-3">
            <article
              v-for="item in heroHighlights"
              :key="item.title"
              class="rounded-2xl border border-black/10 bg-white/80 p-4 transition-all duration-700 ease-out dark:border-white/10 dark:bg-slate-900/70"
              :class="isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'"
              :style="{ transitionDelay: isContentVisible ? `${item.delay}ms` : '0ms' }"
            >
              <div class="flex items-start gap-3">
                <span class="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                  <UIcon :name="item.icon" class="h-4 w-4" />
                </span>
                <div>
                  <p class="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">{{ item.title }}</p>
                  <p class="mt-1.5 text-sm text-slate-700 dark:text-slate-300">{{ item.description }}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        class="mx-auto w-full max-w-md rounded-[2rem] border border-black/10 bg-white/95 p-7 shadow-[0_24px_64px_rgba(15,23,42,0.14)] backdrop-blur-sm transition-all duration-700 ease-out md:p-8 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_24px_64px_rgba(2,6,23,0.45)]"
        :class="isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        :style="{ transitionDelay: isContentVisible ? '120ms' : '0ms' }"
      >
        <div class="mb-6 flex items-center justify-between">
          <NuxtLink
            to="/"
            :aria-label="t('auth.common.backToHome')"
            class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-[#334155] transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:text-slate-300"
          >
            <UIcon name="i-lucide-arrow-left" class="h-4 w-4" />
          </NuxtLink>
          <NuxtLink :to="{ name: 'auth-login' }" class="text-sm font-semibold text-primary hover:underline">
            {{ t("auth.register.switchToLogin") }}
          </NuxtLink>
        </div>
        <div class="text-center">
          <h2 class="text-3xl font-extrabold tracking-tight">{{ t("auth.register.title") }}</h2>
          <p class="mt-2 text-sm text-[#64748b] dark:text-slate-300">{{ t("auth.register.subtitle") }}</p>
        </div>
        <form class="mt-8 space-y-4" @submit.prevent="handleRegisterSubmit">
          <div class="space-y-2">
            <label for="name" class="text-sm font-semibold text-[#334155] dark:text-slate-200">{{ t("auth.register.nameLabel") }}</label>
            <UInput
              id="name"
              v-model="registerName"
              type="text"
              maxlength="120"
              required
              size="xl"
              color="primary"
              variant="outline"
              :placeholder="t('auth.register.namePlaceholder')"
              class="w-full"
            />
          </div>
          <div class="space-y-2">
            <label for="email" class="text-sm font-semibold text-[#334155] dark:text-slate-200">{{ t("auth.register.emailLabel") }}</label>
            <UInput
              id="email"
              v-model="registerEmail"
              type="email"
              maxlength="254"
              required
              size="xl"
              color="primary"
              variant="outline"
              class="w-full"
              :placeholder="t('auth.register.emailPlaceholder')"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-semibold text-[#334155] dark:text-slate-200">{{ t("auth.register.phoneLabel") }}</label>
            <div class="grid gap-2 sm:grid-cols-5">
              <USelect
                id="phoneCode"
                v-model="selectedPhoneCountry"
                :items="phoneCountryCodes"
                value-key="value"
                label-key="label"
                required
                size="xl"
                color="primary"
                variant="outline"
                class="w-full sm:col-span-2"
                :placeholder="t('auth.register.phoneCodePlaceholder')"
                @pointerdown="ensurePhoneCountryCodesLoaded"
                @focus="ensurePhoneCountryCodesLoaded"
              >
                <template #leading>
                  <UIcon :name="selectedPhoneCountryOption?.icon ?? 'i-lucide-flag'" class="h-4 w-4" />
                </template>
              </USelect>
              <UInput
                id="phone"
                :model-value="registerPhone"
                type="tel"
                maxlength="22"
                required
                size="xl"
                color="primary"
                variant="outline"
                class="w-full sm:col-span-3"
                :placeholder="t('auth.register.phonePlaceholder')"
                @update:model-value="handleRegisterPhoneInput"
              />
            </div>
            <p v-if="registerPhoneError" class="text-xs font-semibold text-rose-600 dark:text-rose-400">
              {{ registerPhoneError }}
            </p>
          </div>
          <div class="space-y-2">
            <label for="birthDate" class="text-sm font-semibold text-[#334155] dark:text-slate-200">{{ t("auth.register.birthDateLabel") }}</label>
            <UInput
              id="birthDate"
              v-model="birthDate"
              type="date"
              required
              size="xl"
              color="primary"
              variant="outline"
              class="w-full"
            />
          </div>
          <div class="space-y-2">
            <label for="language" class="text-sm font-semibold text-[#334155] dark:text-slate-200">{{ t("auth.register.languageLabel") }}</label>
            <USelect
              id="language"
              v-model="selectedLanguage"
              :items="languageOptions"
              value-key="code"
              label-key="label"
              required
              size="xl"
              color="primary"
              variant="outline"
              class="w-full"
              :placeholder="t('auth.register.languagePlaceholder')"
            >
              <template #leading>
                <UIcon :name="selectedLanguageOption?.icon ?? 'i-lucide-globe'" class="h-4 w-4" />
              </template>
            </USelect>
          </div>
          <div class="space-y-2">
            <label for="password" class="text-sm font-semibold text-[#334155] dark:text-slate-200">{{ t("auth.register.passwordLabel") }}</label>
            <UInput
              id="password"
              v-model="registerPassword"
              :type="showRegisterPassword ? 'text' : 'password'"
              maxlength="72"
              required
              size="xl"
              color="primary"
              variant="outline"
              class="w-full"
              :placeholder="t('auth.register.passwordPlaceholder')"
            >
              <template #trailing>
                <UButton
                  type="button"
                  color="neutral"
                  variant="ghost"
                  size="sm"
                  square
                  @click="showRegisterPassword = !showRegisterPassword"
                >
                  <UIcon :name="showRegisterPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'" class="h-5 w-5" />
                </UButton>
              </template>
            </UInput>
          </div>
          <div class="space-y-2">
            <label for="confirmPassword" class="text-sm font-semibold text-[#334155] dark:text-slate-200">{{ t("auth.register.confirmPasswordLabel") }}</label>
            <UInput
              id="confirmPassword"
              v-model="registerConfirmPassword"
              :type="showRegisterConfirmPassword ? 'text' : 'password'"
              maxlength="72"
              required
              size="xl"
              :color="confirmPasswordFieldColor"
              variant="outline"
              class="w-full"
              :placeholder="t('auth.register.confirmPasswordPlaceholder')"
            >
              <template #trailing>
                <div class="flex items-center gap-1">
                  <UIcon
                    v-if="isConfirmPasswordDirty"
                    :name="areRegisterPasswordsMatching ? 'i-lucide-check-circle-2' : 'i-lucide-circle-alert'"
                    :class="areRegisterPasswordsMatching ? 'text-emerald-500' : 'text-rose-500'"
                    class="h-4 w-4"
                  />
                  <UButton
                    type="button"
                    color="neutral"
                    variant="ghost"
                    size="sm"
                    square
                    @click="showRegisterConfirmPassword = !showRegisterConfirmPassword"
                  >
                    <UIcon :name="showRegisterConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'" class="h-5 w-5" />
                  </UButton>
                </div>
              </template>
            </UInput>
            <p
              v-if="isConfirmPasswordDirty"
              class="text-xs font-semibold"
              :class="areRegisterPasswordsMatching ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'"
            >
              {{ areRegisterPasswordsMatching ? t("auth.register.passwordMatch.match") : t("auth.register.passwordMatch.mismatch") }}
            </p>
          </div>
          <UButton
            type="submit"
            color="primary"
            size="xl"
            class="mt-1 w-full justify-center rounded-xl"
            :loading="isRegisterLoading"
            :disabled="isRegisterLoading"
          >
            {{ t("auth.register.submit") }}
          </UButton>
          <div class="relative py-1">
            <div class="h-px bg-black/10 dark:bg-white/10" />
            <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs font-semibold text-[#64748b] dark:bg-slate-900 dark:text-slate-300">{{ t("auth.common.or") }}</span>
          </div>
          <UButton
            type="button"
            color="neutral"
            variant="outline"
            size="xl"
            class="w-full justify-center gap-3 rounded-xl border-[#d0d7e2] bg-white text-[#0f172a] hover:bg-slate-50 dark:border-white/20 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
            :loading="isGoogleOAuthLoading"
            :disabled="isGoogleOAuthLoading"
            @click="handleGoogleOAuthStart"
          >
            <UIcon name="i-logos-google-icon" class="h-4 w-4" />
            {{ t("auth.common.continueWithGoogle") }}
          </UButton>
        </form>
      </section>
    </div>
    <p class="relative pb-6 text-center text-xs font-semibold text-[#64748b] dark:text-slate-400">© {{ currentYear }} {{ appName }}. {{ t("auth.common.allRightsReserved") }}</p>
  </div>
</template>

<script setup lang="ts">
import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  validatePhoneNumberLength,
  type CountryCode,
} from "libphonenumber-js"
import { useAuthOAuth } from "~/modules/auth/composables/use-auth-oauth.composable"
import { useAuthSession } from "~/modules/auth/composables/use-auth-session.composable"
import type { SupportedLocale } from "~/composables/use-locale-switcher.composable"

definePageMeta({
  name: "auth-register",
})

type PhoneCountryCode = {
  value: string
  code: string
  iso2: string
  icon: string
  label: string
}

type LanguageOption = {
  code: SupportedLocale
  label: string
  icon: string
}

type HeroHighlight = {
  icon: string
  title: string
  description: string
  delay: number
}

const { t } = useI18n()
const { public: { appName } } = useRuntimeConfig()
const { startGoogleOAuth } = useAuthOAuth()
const { registerAndSignIn } = useAuthSession()
const isContentVisible = ref(false)
const currentYear = new Date().getFullYear()
const { locale, changeLocale } = useLocaleSwitcher()
const showRegisterPassword = ref(false)
const showRegisterConfirmPassword = ref(false)
const registerName = ref("")
const registerEmail = ref("")
const registerPassword = ref("")
const registerConfirmPassword = ref("")
const birthDate = ref("")
const heroHighlights = computed<HeroHighlight[]>(() => [
  {
    icon: "i-lucide-zap",
    title: t("auth.register.hero.item1.title"),
    description: t("auth.register.hero.item1.description"),
    delay: 320,
  },
  {
    icon: "i-lucide-rocket",
    title: t("auth.register.hero.item2.title"),
    description: t("auth.register.hero.item2.description"),
    delay: 420,
  },
])
const registerPhone = ref("")
const registerPhoneUnmasked = ref("")
const registerPhoneError = ref("")
const isRegisterLoading = ref(false)
const isGoogleOAuthLoading = ref(false)
const preferredPhoneCountryIso2: CountryCode[] = ["BR", "US", "PT", "ES", "AR", "MX"]
const buildPhoneCountryCodeItem = (country: CountryCode): PhoneCountryCode => {
  const code = `+${getCountryCallingCode(country)}`
  return {
    value: `${country}-${code}`,
    code,
    iso2: country,
    icon: `i-circle-flags-${country.toLowerCase()}`,
    label: `${country} ${code}`,
  }
}

const buildPhoneCountryCodeList = (countries: CountryCode[]) =>
  countries.map(buildPhoneCountryCodeItem)

const initialPhoneCountryCodes = buildPhoneCountryCodeList(preferredPhoneCountryIso2)
const phoneCountryCodes = ref<PhoneCountryCode[]>(initialPhoneCountryCodes)
const phoneCountryCodesLoaded = ref(false)

const ensurePhoneCountryCodesLoaded = () => {
  if (phoneCountryCodesLoaded.value) {
    return
  }

  phoneCountryCodesLoaded.value = true

  setTimeout(() => {
    phoneCountryCodes.value = buildPhoneCountryCodeList(getCountries())
  }, 0)
}

const selectedPhoneCountry = ref("BR-+55")
const selectedPhoneCountryOption = computed(() =>
  phoneCountryCodes.value.find(country => country.value === selectedPhoneCountry.value),
)
const getDigitsOnly = (value: string) => value.replace(/\D/g, "")
const clampPhoneDigitsByCountry = (digits: string, country: CountryCode) => {
  let nextDigits = digits

  while (nextDigits.length && validatePhoneNumberLength(nextDigits, country) === "TOO_LONG") {
    nextDigits = nextDigits.slice(0, -1)
  }

  return nextDigits
}

const handleRegisterPhoneInput = (nextValue: string | number) => {
  const inputValue = String(nextValue ?? "")
  const selectedIso2 = selectedPhoneCountryOption.value?.iso2 as CountryCode | undefined
  const country = selectedIso2 ?? "BR"
  const formatter = new AsYouType(country)
  const normalizedDigits = clampPhoneDigitsByCountry(getDigitsOnly(inputValue), country)
  const formattedValue = formatter.input(normalizedDigits)

  registerPhone.value = formattedValue
  registerPhoneUnmasked.value = getDigitsOnly(formatter.getChars())
  registerPhoneError.value = ""
}
const isConfirmPasswordDirty = computed(() =>
  registerConfirmPassword.value.length > 0,
)
const areRegisterPasswordsMatching = computed(() =>
  registerPassword.value.length > 0
  && registerPassword.value === registerConfirmPassword.value,
)
const confirmPasswordFieldColor = computed(() => {
  if (!isConfirmPasswordDirty.value) {
    return "primary"
  }

  return areRegisterPasswordsMatching.value ? "success" : "error"
})
const languageOptions = computed<LanguageOption[]>(() => [
  { code: "pt", label: t("auth.languages.pt"), icon: "i-circle-flags-br" },
  { code: "en", label: t("auth.languages.en"), icon: "i-circle-flags-us" },
  { code: "es", label: t("auth.languages.es"), icon: "i-circle-flags-es" },
])
const selectedLanguage = ref<SupportedLocale>(locale.value as SupportedLocale)
const selectedLanguageOption = computed(() =>
  languageOptions.value.find(language => language.code === selectedLanguage.value),
)

watch(selectedLanguage, async (nextLanguage) => {
  await changeLocale(nextLanguage)
})

watch(locale, (nextLocale) => {
  selectedLanguage.value = nextLocale as SupportedLocale
})

watch(selectedPhoneCountry, () => {
  registerPhone.value = ""
  registerPhoneUnmasked.value = ""
  registerPhoneError.value = ""
})

const validateRegisterPhone = () => {
  if (!registerPhoneUnmasked.value) {
    registerPhoneError.value = t("auth.register.phoneErrors.required")
    return false
  }

  const selectedIso2 = selectedPhoneCountryOption.value?.iso2 as CountryCode | undefined
  if (!selectedIso2) {
    registerPhoneError.value = t("auth.register.phoneErrors.selectCountry")
    return false
  }

  const phoneNumber = parsePhoneNumberFromString(registerPhoneUnmasked.value, selectedIso2)
  if (!phoneNumber?.isValid()) {
    registerPhoneError.value = t("auth.register.phoneErrors.invalidForCountry")
    return false
  }

  registerPhoneError.value = ""
  return true
}

const mapLocaleCodeToBackendLanguage = (localeCode: SupportedLocale) => {
  const languageMap: Record<SupportedLocale, "portuguese" | "english" | "spanish"> = {
    pt: "portuguese",
    en: "english",
    es: "spanish",
  }

  return languageMap[localeCode]
}

const handleRegisterSubmit = async () => {
  const isPhoneValid = validateRegisterPhone()
  if (!isPhoneValid || !areRegisterPasswordsMatching.value) {
    return
  }

  const normalizedEmail = registerEmail.value.trim().toLowerCase()
  if (!registerName.value.trim() || !normalizedEmail || !birthDate.value) {
    return
  }

  isRegisterLoading.value = true

  try {
    await registerAndSignIn({
      name: registerName.value.trim(),
      email: normalizedEmail,
      password: registerPassword.value,
      birthDate: birthDate.value,
      language: mapLocaleCodeToBackendLanguage(selectedLanguage.value),
    })
  }
  catch {
    return
  }
  finally {
    isRegisterLoading.value = false
  }
}

const handleGoogleOAuthStart = async () => {
  isGoogleOAuthLoading.value = true

  try {
    await startGoogleOAuth("dashboard")
  }
  catch {
    return
  }
  finally {
    isGoogleOAuthLoading.value = false
  }
}

const backgroundStyle = {
  background: `
    radial-gradient(circle at 8% 10%, rgba(16,185,129,0.12), transparent 36%),
    radial-gradient(circle at 88% 8%, rgba(14,165,233,0.1), transparent 34%),
    repeating-linear-gradient(
      170deg,
      rgba(16,185,129,0.08) 0px,
      rgba(16,185,129,0.08) 1px,
      transparent 1px,
      transparent 34px
    )
  `,
}

onMounted(() => {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    window.requestIdleCallback(() => {
      ensurePhoneCountryCodesLoaded()
    }, { timeout: 1200 })
  }
  else {
    setTimeout(() => {
      ensurePhoneCountryCodesLoaded()
    }, 450)
  }

  requestAnimationFrame(() => {
    isContentVisible.value = true
  })
})
</script>

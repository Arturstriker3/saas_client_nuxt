import { useMeQuery } from "~/modules/auth/queries/use-me.query";

export const useProfileDisplay = () => {
  const { t } = useI18n();
  const { data: me } = useMeQuery();

  const initials = computed(() => {
    const name = me.value?.name ?? "";
    return name
      ? name
          .split(" ")
          .map((p) => p.charAt(0).toUpperCase())
          .slice(0, 2)
          .join("")
      : "?";
  });

  const languageDisplay: Record<string, string> = {
    portuguese: "Português",
    english: "English",
    spanish: "Español",
  };
  const languageLabel = computed(() => {
    const lang = me.value?.language;
    return lang ? (languageDisplay[lang] ?? lang) : "-";
  });

  const roleDisplay: Record<string, string> = {
    admin: "admin",
    member: "member",
    user: "user",
    USER: "user",
    ADMIN: "admin",
  };
  const roleKey = computed(() => {
    const role = me.value?.role;
    return role ? (roleDisplay[role] ?? null) : null;
  });

  const roleBadgeLabel = computed(() =>
    roleKey.value === "admin"
      ? t("app.profile.roleAdmin")
      : t("app.profile.roleUser"),
  );

  const roleIcon = computed(() =>
    roleKey.value === "admin" ? "i-lucide-crown" : "i-lucide-user",
  );

  return { me, initials, languageLabel, roleKey, roleBadgeLabel, roleIcon };
};

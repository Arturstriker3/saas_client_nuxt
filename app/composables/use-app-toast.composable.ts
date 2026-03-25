import { useAppRuntimeConfig } from "~/core/config/runtime.config";

type ToastPayload = {
  title: string;
  description?: string;
};

export const useAppToast = () => {
  const toast = useToast();
  const { t } = useI18n();
  const runtimeConfig = useAppRuntimeConfig();

  const success = (payload: ToastPayload) => {
    toast.add({
      color: "success",
      icon: "i-lucide-circle-check",
      title: payload.title,
      description: payload.description,
    });
  };

  const error = (payload: ToastPayload) => {
    toast.add({
      color: "error",
      icon: "i-lucide-circle-alert",
      title: payload.title,
      description: payload.description,
    });
  };

  const warning = (payload: ToastPayload) => {
    toast.add({
      color: "warning",
      icon: "i-lucide-triangle-alert",
      title: payload.title,
      description: payload.description,
    });
  };

  const apiError = (
    input: unknown,
    options?: {
      title?: string;
    },
  ) => {
    const parsedError = parseApiError(input);
    const detailsText =
      parsedError.details && parsedError.details.length > 0
      && parsedError.messageKey !== "auth.errors.validation"
        ? parsedError.details.join("\n")
        : undefined;
    const baseDescription =
      runtimeConfig.showTechnicalApiErrors && parsedError.technicalMessage
        ? `${t(parsedError.messageKey)}\n${parsedError.technicalMessage}`
        : t(parsedError.messageKey);
    const description = detailsText
      ? `${baseDescription}\n${detailsText}`
      : baseDescription;

    error({
      title: options?.title ?? t("auth.toasts.error.defaultTitle"),
      description,
    });
    return parsedError;
  };

  return {
    success,
    error,
    warning,
    apiError,
  };
};

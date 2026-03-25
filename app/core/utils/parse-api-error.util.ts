export type AppError = {
  messageKey: string;
  details?: string[];
  technicalMessage?: string;
  statusCode?: number;
  code?: string;
  raw: unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const readResponseData = (
  value: unknown,
): Record<string, unknown> | undefined => {
  if (!isRecord(value)) {
    return;
  }

  const response = value.response;
  if (!isRecord(response)) {
    return;
  }

  const responseData = response._data;
  if (isRecord(responseData)) {
    return responseData;
  }
};

const readMessage = (value: unknown): string | undefined => {
  if (!isRecord(value)) {
    return;
  }

  const directMessage =
    typeof value.message === "string" && value.message.trim().length > 0
      ? value.message
      : undefined;

  const nestedData = value.data;
  if (isRecord(nestedData)) {
    const nestedMessage = nestedData.message;
    if (typeof nestedMessage === "string" && nestedMessage.trim().length > 0) {
      return nestedMessage;
    }

    const nestedError = nestedData.error;
    if (typeof nestedError === "string" && nestedError.trim().length > 0) {
      return nestedError;
    }
  }

  const responseData = readResponseData(value);
  if (isRecord(responseData)) {
    const responseMessage = responseData.message;
    if (
      typeof responseMessage === "string" &&
      responseMessage.trim().length > 0
    ) {
      return responseMessage;
    }

    const responseError = responseData.error;
    if (typeof responseError === "string" && responseError.trim().length > 0) {
      return responseError;
    }
  }

  return directMessage;
};

const readMessageDetails = (value: unknown): string[] | undefined => {
  if (!isRecord(value)) {
    return;
  }

  const normalize = (messages: string[]): string[] => {
    const normalizedMessages = messages
      .map((message) => message.trim())
      .filter((message) => message.length > 0);

    return normalizedMessages.length > 0 ? normalizedMessages : [];
  };

  const directMessage = value.message;
  if (Array.isArray(directMessage)) {
    const normalizedMessages = normalize(
      directMessage.filter(
        (message): message is string => typeof message === "string",
      ),
    );
    if (normalizedMessages.length > 0) {
      return normalizedMessages;
    }
  }

  const nestedData = value.data;
  if (isRecord(nestedData) && Array.isArray(nestedData.message)) {
    const normalizedMessages = normalize(
      nestedData.message.filter(
        (message): message is string => typeof message === "string",
      ),
    );
    if (normalizedMessages.length > 0) {
      return normalizedMessages;
    }
  }

  const responseData = readResponseData(value);
  if (isRecord(responseData) && Array.isArray(responseData.message)) {
    const normalizedMessages = normalize(
      responseData.message.filter(
        (message): message is string => typeof message === "string",
      ),
    );
    if (normalizedMessages.length > 0) {
      return normalizedMessages;
    }
  }
};

const isTechnicalMessage = (message: string): boolean => {
  const normalizedMessage = message.trim();
  if (!normalizedMessage) {
    return false;
  }

  if (
    normalizedMessage.includes("http://") ||
    normalizedMessage.includes("https://")
  ) {
    return true;
  }

  return /^\[[A-Z]+\]\s*".*":\s*\d+/u.test(normalizedMessage);
};

const readStatusCode = (value: unknown): number | undefined => {
  if (!isRecord(value)) {
    return;
  }

  const statusCode = value.statusCode;
  if (typeof statusCode === "number") {
    return statusCode;
  }

  const status = value.status;
  if (typeof status === "number") {
    return status;
  }

  const nestedData = value.data;
  if (isRecord(nestedData) && typeof nestedData.statusCode === "number") {
    return nestedData.statusCode;
  }

  const response = value.response;
  if (isRecord(response)) {
    if (typeof response.status === "number") {
      return response.status;
    }

    if (typeof response.statusCode === "number") {
      return response.statusCode;
    }

    const responseData = response._data;
    if (isRecord(responseData) && typeof responseData.statusCode === "number") {
      return responseData.statusCode;
    }
  }
};

const readCode = (value: unknown): string | undefined => {
  if (!isRecord(value)) {
    return;
  }

  const code = value.code;
  if (typeof code === "string" && code.trim().length > 0) {
    return code;
  }

  const nestedData = value.data;
  if (isRecord(nestedData)) {
    const nestedCode = nestedData.code;
    if (typeof nestedCode === "string" && nestedCode.trim().length > 0) {
      return nestedCode;
    }
  }

  const responseData = readResponseData(value);
  if (isRecord(responseData)) {
    const responseCode = responseData.code;
    if (typeof responseCode === "string" && responseCode.trim().length > 0) {
      return responseCode;
    }
  }
};

const resolveMessageKey = (input: {
  statusCode?: number;
  message?: string;
  code?: string;
  hasDetails?: boolean;
}): string => {
  const normalizedMessage = input.message?.trim().toLowerCase();
  const normalizedCode = input.code?.trim().toLowerCase();

  if (
    normalizedCode === "invalid_credentials" ||
    normalizedMessage === "invalid credentials"
  ) {
    return "auth.errors.invalidCredentials";
  }

  if (input.statusCode === 401 && normalizedMessage?.includes("unauthorized")) {
    return "auth.errors.invalidCredentials";
  }

  if (
    normalizedMessage?.includes("/auth/login") &&
    normalizedMessage.includes("401")
  ) {
    return "auth.errors.invalidCredentials";
  }

  if (input.statusCode === 400 && input.hasDetails) {
    return "auth.errors.validation";
  }

  if (input.statusCode === 401) {
    return "auth.errors.sessionExpired";
  }

  if (input.statusCode === 403) {
    return "auth.errors.forbidden";
  }

  if (input.statusCode === 404) {
    return "auth.errors.notFound";
  }

  if (input.statusCode && input.statusCode >= 500) {
    return "auth.errors.server";
  }

  return "auth.errors.generic";
};

export const parseApiError = (error: unknown): AppError => {
  const statusCode = readStatusCode(error);
  const code = readCode(error);
  const message = readMessage(error);
  const details = readMessageDetails(error);
  const technicalMessage =
    message && isTechnicalMessage(message) ? message : undefined;
  const messageKey = resolveMessageKey({
    statusCode,
    message: message ?? details?.[0],
    code,
    hasDetails: Boolean(details && details.length > 0),
  });

  return {
    messageKey,
    details,
    technicalMessage,
    statusCode,
    code,
    raw: error,
  };
};

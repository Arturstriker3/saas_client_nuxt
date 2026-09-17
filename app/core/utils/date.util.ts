import dayjs from "dayjs";

export const MINIMUM_AGE_YEARS = 16;

const CALENDAR_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

type CalendarDateParts = {
  year: number;
  month: number;
  day: number;
};

export const formatDate = (
  value: string | Date,
  pattern = "DD/MM/YYYY",
): string => {
  return dayjs(value).format(pattern);
};

/**
 * Converte uma data civil (sem fuso) em partes, validando se o dia existe.
 * @param value - Data no formato `YYYY-MM-DD`.
 * @returns Partes da data ou `null` quando o valor é inválido.
 */
export const parseCalendarDate = (value: string): CalendarDateParts | null => {
  const match = CALENDAR_DATE_PATTERN.exec(value);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(year, month - 1, day);

  const isRealDate =
    parsed.getFullYear() === year
    && parsed.getMonth() === month - 1
    && parsed.getDate() === day;

  return isRealDate ? { year, month, day } : null;
};

/**
 * Formata uma data civil no idioma informado, sem deslocar o dia.
 * @param value - Data no formato `YYYY-MM-DD`.
 * @param locale - Idioma do app (pt, en, es).
 * @param fallback - Texto retornado quando a data é inválida ou ausente.
 * @returns Data formatada (pt: 15/06/1995, en: 06/15/1995).
 */
export const formatCalendarDate = (
  value: string | null | undefined,
  locale: string,
  fallback = "—",
): string => {
  if (!value) {
    return fallback;
  }

  const parts = parseCalendarDate(value);
  if (!parts) {
    return fallback;
  }

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(parts.year, parts.month - 1, parts.day));
};

/**
 * Data limite de nascimento para uma idade mínima, no formato `YYYY-MM-DD`.
 * @param minimumAgeYears - Idade mínima exigida.
 * @param today - Data de referência.
 * @returns Data limite como texto.
 */
const getMinimumAgeBoundaryDate = (
  minimumAgeYears: number,
  today: Date,
): string => {
  const year = today.getFullYear() - minimumAgeYears;
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * Indica se a data civil atende a idade mínima.
 * @param birthDate - Data de nascimento no formato `YYYY-MM-DD`.
 * @param minimumAgeYears - Idade mínima exigida.
 * @param today - Data de referência.
 * @returns `true` quando a data é válida e atende a idade mínima.
 */
export const isAtLeastMinimumAge = (
  birthDate: string,
  minimumAgeYears: number = MINIMUM_AGE_YEARS,
  today: Date = new Date(),
): boolean => {
  if (!parseCalendarDate(birthDate)) {
    return false;
  }

  return birthDate <= getMinimumAgeBoundaryDate(minimumAgeYears, today);
};

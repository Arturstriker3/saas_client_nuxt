import dayjs from "dayjs";

export const formatDate = (
  value: string | Date,
  pattern = "DD/MM/YYYY",
): string => {
  return dayjs(value).format(pattern);
};

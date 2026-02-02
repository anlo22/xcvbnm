import { Locale } from '@/i18n';

const getLocaleTag = (locale: Locale) =>
  locale === 'ar' ? 'ar-SY-u-nu-latn' : 'en-US';

export const formatCurrency = (value: number, locale: Locale) => {
  const formatter = new Intl.NumberFormat(getLocaleTag(locale), {
    style: 'currency',
    currency: 'SYP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
};

const toLocalDate = (value: string) => new Date(`${value}T00:00:00`);

export const normalizeCycleDays = (cycleDays: string[] = []) =>
  [...cycleDays].filter(Boolean).sort();

export const formatCycleDate = (value: string, locale: Locale) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return formatter.format(toLocalDate(value));
};

export const formatCycleDateShort = (value: string) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return formatter.format(toLocalDate(value));
};

export const formatCycleDatesListShort = (cycleDays: string[] | undefined) => {
  const normalized = normalizeCycleDays(cycleDays ?? []);
  return normalized.map((day) => formatCycleDateShort(day)).join(', ');
};

export const formatCycleSummary = (
  cycleDays: string[] | undefined,
  locale: Locale,
  fallback = ''
) => {
  const normalized = normalizeCycleDays(cycleDays ?? []);
  if (normalized.length === 0) {
    return fallback;
  }

  const firstDay = normalized[0];
  const lastDay = normalized[normalized.length - 1];
  const dayLabel = locale === 'ar' ? 'يوم' : 'days';

  return `${normalized.length} ${dayLabel} • ${formatCycleDate(
    firstDay,
    locale
  )} - ${formatCycleDate(lastDay, locale)}`;
};

export const formatCycleSummaryShort = (
  cycleDays: string[] | undefined,
  locale: Locale,
  fallback = ''
) => {
  const normalized = normalizeCycleDays(cycleDays ?? []);
  if (normalized.length === 0) {
    return fallback;
  }

  const firstDay = normalized[0];
  const lastDay = normalized[normalized.length - 1];
  const dayLabel = locale === 'ar' ? 'يوم' : 'days';

  return `${normalized.length} ${dayLabel} • ${formatCycleDateShort(
    firstDay
  )} - ${formatCycleDateShort(lastDay)}`;
};


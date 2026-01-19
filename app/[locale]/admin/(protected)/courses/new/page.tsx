import { getTranslations } from 'next-intl/server';
import CourseForm from '@/components/admin/CourseForm';
import { Locale } from '@/i18n';

export default async function NewCoursePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const t = await getTranslations('admin');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary-700">{t('addCourse')}</h1>
      <CourseForm locale={locale} />
    </div>
  );
}


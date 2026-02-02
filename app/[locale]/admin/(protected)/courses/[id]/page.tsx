import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';
import CourseForm from '@/components/admin/CourseForm';
import { Locale } from '@/i18n';

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('admin');

  await connectDB();
  const course = await Course.findById(id).lean();

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary-700">{t('editCourse')}</h1>
      <CourseForm course={course} locale={locale} />
    </div>
  );
}


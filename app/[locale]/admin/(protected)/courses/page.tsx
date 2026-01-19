import { getTranslations } from 'next-intl/server';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';
import Link from 'next/link';
import AdminCourseList from '@/components/admin/AdminCourseList';
import { Locale } from '@/i18n';

export default async function AdminCoursesPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const t = await getTranslations('admin');

  await connectDB();
  const courses = await Course.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary-700">{t('manageCourses')}</h1>
        <Link
          href={`/${locale}/admin/courses/new`}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          {t('addCourse')}
        </Link>
      </div>

      <AdminCourseList courses={courses} locale={locale} />
    </div>
  );
}


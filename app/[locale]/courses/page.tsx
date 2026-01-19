import { getTranslations } from 'next-intl/server';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';
import CourseCard from '@/components/CourseCard';
import { Locale } from '@/i18n';

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('courses');

  await connectDB();
  const courses = await Course.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-700 mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course: any) => (
          <CourseCard key={course._id} course={course} locale={locale} />
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No courses available yet.</p>
        </div>
      )}
    </div>
  );
}


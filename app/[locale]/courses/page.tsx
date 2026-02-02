import { getTranslations, setRequestLocale } from 'next-intl/server';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';
import CourseCard from '@/components/CourseCard';
import { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('courses');

  let courses: any[] = [];

  try {
    await connectDB();
    courses = await Course.find().sort({ createdAt: -1 }).lean();
  } catch (error) {
    console.error('Database connection error:', error);
    // Continue with empty array if database is unavailable
  }

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary-700 mb-4">{t('title')}</h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">{t('description')}</p>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {courses.map((course: any) => (
            <CourseCard key={course._id} course={course} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg font-medium">No courses available yet.</p>
          <p className="text-gray-400 text-sm mt-2">New courses coming soon!</p>
        </div>
      )}
    </div>
  );
}


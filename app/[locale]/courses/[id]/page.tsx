import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';
import Image from 'next/image';
import { Locale } from '@/i18n';
import {
  formatCurrency,
  formatCycleDateShort,
  formatCycleDatesListShort,
  formatCycleSummaryShort,
  normalizeCycleDays,
} from '@/lib/format';

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;
  const t = await getTranslations('common');
  const tCourses = await getTranslations('courses');

  await connectDB();
  const course = await Course.findById(id).lean();

  if (!course) {
    notFound();
  }

  const title = locale === 'ar' ? course.titleAr : course.titleEn;
  const description =
    locale === 'ar' ? course.descriptionAr : course.descriptionEn;
  const cycleDays = normalizeCycleDays(course.cycleDays ?? []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-96 w-full rounded-lg overflow-hidden">
          <Image
            src={course.image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
            <p className="text-3xl font-bold text-primary-600 mb-6">
              {formatCurrency(course.price, locale)}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <span className="font-semibold">{tCourses('duration')}: </span>
              <span className="text-gray-600">
                {cycleDays.length > 0
                  ? `${formatCycleSummaryShort(
                      cycleDays,
                      locale,
                      course.duration
                    )} • ${formatCycleDatesListShort(cycleDays)}`
                  : course.duration}
              </span>
            </div>
            <div>
              <span className="font-semibold">{tCourses('lessons')}: </span>
              <span className="text-gray-600">{course.lessons}</span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">{t('description')}</h2>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>

          {cycleDays.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">{t('cycleDetails')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cycleDays.map((day, index) => (
                  <div
                    key={day}
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-md px-3 py-2"
                  >
                    <div className="text-sm text-gray-700">
                      {t('cycleDay')} {index + 1} • {formatCycleDateShort(day)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
            {tCourses('enroll')}
          </button>
        </div>
      </div>
    </div>
  );
}


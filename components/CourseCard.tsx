'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n';

interface CourseCardProps {
  course: {
    _id: string;
    titleEn: string;
    titleAr: string;
    descriptionEn: string;
    descriptionAr: string;
    price: number;
    image: string;
    duration: string;
    lessons: number;
  };
  locale: Locale;
}

export default function CourseCard({ course, locale }: CourseCardProps) {
  const t = useTranslations('common');
  const tCourses = useTranslations('courses');

  const title = locale === 'ar' ? course.titleAr : course.titleEn;
  const description =
    locale === 'ar' ? course.descriptionAr : course.descriptionEn;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <Link href={`/${locale}/courses/${course._id}`}>
        <div className="relative h-64 w-full">
          <Image
            src={course.image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">
              {tCourses('duration')}: {course.duration}
            </span>
            <span className="text-sm text-gray-500">
              {course.lessons} {tCourses('lessons')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-primary-600">
              ${course.price}
            </span>
            <button className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors">
              {tCourses('enroll')}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}


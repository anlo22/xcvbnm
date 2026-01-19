'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Locale } from '@/i18n';

interface AdminCourseListProps {
  courses: any[];
  locale: Locale;
}

export default function AdminCourseList({ courses, locale }: AdminCourseListProps) {
  const t = useTranslations('common');
  const tAdmin = useTranslations('admin');
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) {
      return;
    }

    setDeleting(id);
    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert('Failed to delete course');
      }
    } catch (error) {
      alert('Error deleting course');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {tAdmin('name')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {tAdmin('duration')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {tAdmin('lessons')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {tAdmin('price')}
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((course) => (
            <tr key={course._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {locale === 'ar' ? course.titleAr : course.titleEn}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{course.duration}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{course.lessons}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">${course.price}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  href={`/${locale}/admin/courses/${course._id}`}
                  className="text-primary-600 hover:text-primary-900 mr-4"
                >
                  {t('edit')}
                </Link>
                <button
                  onClick={() => handleDelete(course._id)}
                  disabled={deleting === course._id}
                  className="text-red-600 hover:text-red-900 disabled:opacity-50"
                >
                  {deleting === course._id ? t('loading') : t('delete')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">{t('noItems')}</p>
        </div>
      )}
    </div>
  );
}


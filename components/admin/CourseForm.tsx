'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Locale } from '@/i18n';

const courseSchema = z.object({
  titleEn: z.string().min(1, 'English title is required'),
  titleAr: z.string().min(1, 'Arabic title is required'),
  descriptionEn: z.string().min(1, 'English description is required'),
  descriptionAr: z.string().min(1, 'Arabic description is required'),
  price: z.number().min(0, 'Price must be positive'),
  image: z.string().url('Valid image URL is required'),
  duration: z.string().min(1, 'Duration is required'),
  lessons: z.number().min(1, 'Must have at least 1 lesson'),
});

type CourseFormData = z.infer<typeof courseSchema>;

interface CourseFormProps {
  course?: any;
  locale: Locale;
}

export default function CourseForm({ course, locale }: CourseFormProps) {
  const t = useTranslations('admin');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: course
      ? {
          titleEn: course.titleEn,
          titleAr: course.titleAr,
          descriptionEn: course.descriptionEn,
          descriptionAr: course.descriptionAr,
          price: course.price,
          image: course.image,
          duration: course.duration,
          lessons: course.lessons,
        }
      : undefined,
  });

  const onSubmit = async (data: CourseFormData) => {
    setLoading(true);
    setError('');

    try {
      const url = course ? `/api/courses/${course._id}` : '/api/courses';
      const method = course ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push(`/${locale}/admin/courses`);
        router.refresh();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to save course');
      }
    } catch (err) {
      setError('An error occurred while saving the course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('nameEn')} (Title)
          </label>
          <input
            {...register('titleEn')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.titleEn && (
            <p className="text-red-500 text-sm mt-1">{errors.titleEn.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('nameAr')} (Title)
          </label>
          <input
            {...register('titleAr')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.titleAr && (
            <p className="text-red-500 text-sm mt-1">{errors.titleAr.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('descriptionEn')}
          </label>
          <textarea
            {...register('descriptionEn')}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.descriptionEn && (
            <p className="text-red-500 text-sm mt-1">{errors.descriptionEn.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('descriptionAr')}
          </label>
          <textarea
            {...register('descriptionAr')}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.descriptionAr && (
            <p className="text-red-500 text-sm mt-1">{errors.descriptionAr.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('price')}
          </label>
          <input
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('duration')}
          </label>
          <input
            {...register('duration')}
            placeholder="e.g., 4 weeks, 2 months"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('lessons')}
          </label>
          <input
            type="number"
            {...register('lessons', { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.lessons && (
            <p className="text-red-500 text-sm mt-1">{errors.lessons.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('image')}
          </label>
          <input
            {...register('image')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {loading ? tCommon('loading') : tCommon('save')}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          {tCommon('cancel')}
        </button>
      </div>
    </form>
  );
}


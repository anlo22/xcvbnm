'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Locale } from '@/i18n';
import { formatCycleDate, formatCycleSummary, normalizeCycleDays } from '@/lib/format';

const courseSchema = z.object({
  titleEn: z.string().min(1, 'English title is required'),
  titleAr: z.string().min(1, 'Arabic title is required'),
  descriptionEn: z.string().min(1, 'English description is required'),
  descriptionAr: z.string().min(1, 'Arabic description is required'),
  price: z.number().min(0, 'Price must be positive'),
  image: z
    .string()
    .min(1, 'Image is required')
    .refine((value) => value.startsWith('data:image/'), 'Please upload an image file'),
  duration: z.string().min(1, 'Duration is required'),
  cycleDays: z.array(z.string()),
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
  const [initialDuration] = useState(course?.duration ?? '');
  const [imagePreview, setImagePreview] = useState<string>(course?.image || '');
  const [selectedDate, setSelectedDate] = useState('');
  const [cycleDays, setCycleDays] = useState<string[]>(
    normalizeCycleDays(course?.cycleDays ?? [])
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
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
          cycleDays: normalizeCycleDays(course.cycleDays ?? []),
          lessons: course.lessons,
        }
      : undefined,
  });

  useEffect(() => {
    register('cycleDays');
    register('duration');
  }, [register]);

  useEffect(() => {
    const normalized = normalizeCycleDays(cycleDays);
    setValue('cycleDays', normalized, { shouldValidate: true });
    setValue('duration', formatCycleSummary(normalized, locale, initialDuration), {
      shouldValidate: true,
    });
  }, [cycleDays, initialDuration, locale, setValue]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setValue('image', result, { shouldValidate: true });
      setImagePreview(result);
      clearErrors('image');
    };
    reader.readAsDataURL(file);
  };

  const handleAddCycleDay = () => {
    if (!selectedDate) {
      return;
    }

    if (cycleDays.includes(selectedDate)) {
      setSelectedDate('');
      return;
    }

    setCycleDays((prev) => normalizeCycleDays([...prev, selectedDate]));
    setSelectedDate('');
    clearErrors('cycleDays');
  };

  const handleRemoveCycleDay = (day: string) => {
    setCycleDays((prev) => prev.filter((value) => value !== day));
  };

  const onSubmit = async (data: CourseFormData) => {
    setLoading(true);
    setError('');

    try {
      const url = course ? `/api/courses/${course._id}` : '/api/courses';
      const method = course ? 'PUT' : 'POST';
      const payload = {
        ...data,
        duration: data.duration?.trim() || initialDuration,
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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
          <input type="hidden" {...register('duration')} />
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleAddCycleDay}
            className="mt-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            {tCommon('addCycleDay')}
          </button>
          {errors.cycleDays && (
            <p className="text-red-500 text-sm mt-1">{errors.cycleDays.message}</p>
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
          <input type="hidden" {...register('image')} />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {imagePreview && (
            <div className="mt-3">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-40 w-auto rounded-lg border border-gray-200 object-cover"
              />
            </div>
          )}
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
        <div className="text-sm text-gray-700 font-medium">
          {tCommon('cycleDetails')}
        </div>
        {cycleDays.length === 0 ? (
          <p className="text-sm text-gray-500">{tCommon('noCycleDays')}</p>
        ) : (
          <>
            <div className="text-sm text-gray-600">
              {formatCycleSummary(cycleDays, locale)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cycleDays.map((day, index) => (
                <div
                  key={day}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-md px-3 py-2"
                >
                  <div className="text-sm text-gray-700">
                    {tCommon('cycleDay')} {index + 1} • {formatCycleDate(day, locale)}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveCycleDay(day)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    {tCommon('remove')}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
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


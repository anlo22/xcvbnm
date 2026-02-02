import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Course from '@/models/Course';
import Link from 'next/link';
import { Locale } from '@/i18n';

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await getSession();

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const t = await getTranslations('admin');

  await connectDB();
  const productCount = await Product.countDocuments();
  const courseCount = await Course.countDocuments();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-primary-700">{t('title')}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">{t('manageProducts')}</h2>
          <p className="text-gray-600 mb-4">Total Products: {productCount}</p>
          <Link
            href={`/${locale}/admin/products`}
            className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            {t('manageProducts')}
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">{t('manageCourses')}</h2>
          <p className="text-gray-600 mb-4">Total Courses: {courseCount}</p>
          <Link
            href={`/${locale}/admin/courses`}
            className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            {t('manageCourses')}
          </Link>
        </div>
      </div>
    </div>
  );
}


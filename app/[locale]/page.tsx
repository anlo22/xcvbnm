import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Course from '@/models/Course';
import ProductCard from '@/components/ProductCard';
import CourseCard from '@/components/CourseCard';
import { Locale } from '@/i18n';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('home');

  await connectDB();
  const products = await Product.find({ inStock: true })
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();
  const courses = await Course.find()
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold text-primary-700 mb-4">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-600 mb-6">{t('subtitle')}</p>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          {t('heroDescription')}
        </p>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-primary-700">
            {t('featuredProducts')}
          </h2>
          <a
            href={`/${locale}/products`}
            className="text-primary-600 hover:text-primary-800 font-semibold"
          >
            {t('viewAll')} →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} locale={locale} />
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-primary-700">
            {t('featuredCourses')}
          </h2>
          <a
            href={`/${locale}/courses`}
            className="text-primary-600 hover:text-primary-800 font-semibold"
          >
            {t('viewAll')} →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course: any) => (
            <CourseCard key={course._id} course={course} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}


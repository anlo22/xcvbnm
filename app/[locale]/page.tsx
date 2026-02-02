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
    <div className="space-y-16 sm:space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-50 via-white to-pink-50 px-6 py-12 sm:px-10 sm:py-14 text-center shadow-sm ring-1 ring-rose-100">
        <div className="pointer-events-none absolute -top-24 right-6 h-48 w-48 rounded-full bg-rose-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-pink-200/40 blur-3xl" />
        <h1 className="text-3xl sm:text-5xl font-bold text-primary-700 mb-4">
          {t('title')}
        </h1>
        <p className="text-base sm:text-xl text-gray-600 mb-6">{t('subtitle')}</p>
        <p className="text-sm sm:text-lg text-gray-500 max-w-2xl mx-auto">
          {t('heroDescription')}
        </p>
      </section>

      {/* Featured Products */}
      <section className="rounded-3xl bg-white/80 p-6 sm:p-8 shadow-sm ring-1 ring-rose-100">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-700 mb-2">
              {t('featuredProducts')}
            </h2>
            <p className="text-base sm:text-lg font-semibold bg-gradient-to-r from-[#c69480] via-[#d4a690] to-[#c69480] bg-clip-text text-transparent leading-relaxed drop-shadow-sm">
              {t('featuredProductsSubtitle')}
            </p>
          </div>
          <a
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 font-semibold transition-colors group"
          >
            {t('viewAll')}
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} locale={locale} />
          ))}
        </div>
      </section>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
        <span className="text-xs uppercase tracking-[0.3em] text-rose-400">
          {t('skinCareLabel')}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
      </div>

      {/* Featured Courses */}
      <section className="rounded-3xl bg-gradient-to-br from-white via-rose-50/70 to-pink-50/60 p-6 sm:p-8 shadow-sm ring-1 ring-rose-100">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-700 mb-2">
              {t('featuredCourses')}
            </h2>
            <p className="text-base sm:text-lg font-semibold bg-gradient-to-r from-[#c69480] via-[#d4a690] to-[#c69480] bg-clip-text text-transparent leading-relaxed drop-shadow-sm">
              {t('featuredCoursesSubtitle')}
            </p>
          </div>
          <a
            href={`/${locale}/courses`}
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 font-semibold transition-colors group"
          >
            {t('viewAll')}
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
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


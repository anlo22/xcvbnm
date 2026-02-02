import { getTranslations, setRequestLocale } from 'next-intl/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductCard from '@/components/ProductCard';
import { Locale } from '@/i18n';

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('products');

  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary-700 mb-4">{t('title')}</h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">{t('description')}</p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg font-medium">No products available yet.</p>
          <p className="text-gray-400 text-sm mt-2">Check back soon for new arrivals!</p>
        </div>
      )}
    </div>
  );
}


import { getTranslations } from 'next-intl/server';
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
  const t = await getTranslations('products');

  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-700 mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <ProductCard key={product._id} product={product} locale={locale} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products available yet.</p>
        </div>
      )}
    </div>
  );
}


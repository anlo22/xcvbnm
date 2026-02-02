import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Image from 'next/image';
import { Locale } from '@/i18n';
import { formatCurrency } from '@/lib/format';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;
  const t = await getTranslations('common');
  const tProducts = await getTranslations('products');

  await connectDB();
  const product = await Product.findById(id).lean();

  if (!product) {
    notFound();
  }

  const name = locale === 'ar' ? product.nameAr : product.nameEn;
  const description =
    locale === 'ar' ? product.descriptionAr : product.descriptionEn;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-96 w-full rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{name}</h1>
            <p className="text-3xl font-bold text-primary-600 mb-6">
              {formatCurrency(product.price, locale)}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">{t('description')}</h2>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`px-4 py-2 rounded ${
                product.inStock
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {product.inStock ? tProducts('inStock') : tProducts('outOfStock')}
            </span>
          </div>

          <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
            {t('addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
}


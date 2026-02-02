import { getTranslations } from 'next-intl/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Link from 'next/link';
import AdminProductList from '@/components/admin/AdminProductList';
import { Locale } from '@/i18n';

export default async function AdminProductsPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const t = await getTranslations('admin');
  const tCommon = await getTranslations('common');

  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-primary-700">{t('manageProducts')}</h1>
          <Link
            href={`/${locale}/admin`}
            className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-primary-600"
          >
            {tCommon('backToPrevious')}
          </Link>
        </div>
        <Link
          href={`/${locale}/admin/products/new`}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          {t('addProduct')}
        </Link>
      </div>

      <AdminProductList products={products} locale={locale} />
    </div>
  );
}


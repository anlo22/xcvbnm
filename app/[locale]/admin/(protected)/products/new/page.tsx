import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import ProductForm from '@/components/admin/ProductForm';
import { Locale } from '@/i18n';

export default async function NewProductPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const t = await getTranslations('admin');
  const tCommon = await getTranslations('common');

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-primary-700">{t('addProduct')}</h1>
        <Link
          href={`/${locale}/admin/products`}
          className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          {tCommon('backToPrevious')}
        </Link>
      </div>
      <ProductForm locale={locale} />
    </div>
  );
}


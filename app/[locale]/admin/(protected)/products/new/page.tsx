import { getTranslations } from 'next-intl/server';
import ProductForm from '@/components/admin/ProductForm';
import { Locale } from '@/i18n';

export default async function NewProductPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const t = await getTranslations('admin');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary-700">{t('addProduct')}</h1>
      <ProductForm locale={locale} />
    </div>
  );
}


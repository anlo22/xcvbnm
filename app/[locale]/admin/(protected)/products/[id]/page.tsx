import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductForm from '@/components/admin/ProductForm';
import { Locale } from '@/i18n';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('admin');

  await connectDB();
  const product = await Product.findById(id).lean();

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary-700">{t('editProduct')}</h1>
      <ProductForm product={product} locale={locale} />
    </div>
  );
}


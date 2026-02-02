'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n';
import { formatCurrency } from '@/lib/format';

interface ProductCardProps {
  product: {
    _id: string;
    nameEn: string;
    nameAr: string;
    descriptionEn: string;
    descriptionAr: string;
    price: number;
    image: string;
    inStock: boolean;
  };
  locale: Locale;
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  const tProducts = useTranslations('products');

  const name = locale === 'ar' ? product.nameAr : product.nameEn;
  const description =
    locale === 'ar' ? product.descriptionAr : product.descriptionEn;

  return (
    <div className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <Link href={`/${locale}/products/${product._id}`}>
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={product.image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                product.inStock
                  ? 'bg-green-500/90 text-white'
                  : 'bg-red-500/90 text-white'
              }`}
            >
              {product.inStock ? tProducts('inStock') : tProducts('outOfStock')}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
            {name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <span className="text-2xl font-bold text-primary-600">
              {formatCurrency(product.price, locale)}
            </span>
            <span className="text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}


'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n';

interface ProductCardProps {
  product: {
    _id: string;
    nameEn: string;
    nameAr: string;
    descriptionEn: string;
    descriptionAr: string;
    price: number;
    image: string;
    category: string;
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <Link href={`/${locale}/products/${product._id}`}>
        <div className="relative h-64 w-full">
          <Image
            src={product.image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-primary-600">
              ${product.price}
            </span>
            <span
              className={`text-sm ${
                product.inStock ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {product.inStock ? tProducts('inStock') : tProducts('outOfStock')}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}


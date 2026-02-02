'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const languageAlignClass =
    locale === 'ar' ? 'sm:justify-start' : 'sm:justify-end';

  return (
    <header className="bg-white/40 backdrop-blur-lg shadow-sm border-b border-white/60 sticky top-0 z-50 transition-all duration-500">
      <nav className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-2 items-center sm:grid-cols-3">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="inline-flex items-center group">
              <Image
                src="/images/raneem1.png"
                alt="Dr. Raneem"
                width={200}
                height={70}
                className="h-14 w-auto sm:h-16 md:h-20 lg:h-24 max-h-28 object-contain transition-all duration-500 group-hover:scale-110 logo-animated"
                priority
                sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, 200px"
              />
            </Link>
          </div>

          <div className="hidden items-center justify-center gap-6 text-base sm:flex">
            <Link
              href={`/${locale}`}
              className={`hover:text-primary-600 transition-colors ${pathname === `/${locale}` ? 'text-primary-600 font-semibold' : ''
                }`}
            >
              {t('home')}
            </Link>
            <Link
              href={`/${locale}/products`}
              className={`hover:text-primary-600 transition-colors ${pathname.includes('/products') ? 'text-primary-600 font-semibold' : ''
                }`}
            >
              {t('products')}
            </Link>
            <Link
              href={`/${locale}/courses`}
              className={`hover:text-primary-600 transition-colors ${pathname.includes('/courses') ? 'text-primary-600 font-semibold' : ''
                }`}
            >
              {t('courses')}
            </Link>
          </div>

          <div className="flex items-center justify-end gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-600 shadow-sm transition hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:hidden"
              aria-label="Toggle navigation"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div className={`hidden sm:flex ${languageAlignClass}`}>
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden fixed inset-0 z-[60]">
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute inset-0 flex min-h-[100svh] items-center justify-center p-4">
              <div
                className="relative w-full max-w-sm max-h-[85svh] overflow-auto rounded-3xl bg-white/95 backdrop-blur-md p-6 text-center shadow-2xl ring-1 ring-rose-100 animate-fade-in"
                onClick={(event) => event.stopPropagation()}
              >

                <div className="flex flex-col gap-3">
                  <Link
                    href={`/${locale}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-base font-semibold text-gray-700 transition hover:border-primary-200 hover:text-primary-600 active:scale-95 ${pathname === `/${locale}` ? 'text-primary-600 border-primary-200' : ''
                      }`}
                  >
                    {t('home')}
                  </Link>
                  <Link
                    href={`/${locale}/products`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-base font-semibold text-gray-700 transition hover:border-primary-200 hover:text-primary-600 active:scale-95 ${pathname.includes('/products')
                      ? 'text-primary-600 border-primary-200'
                      : ''
                      }`}
                  >
                    {t('products')}
                  </Link>
                  <Link
                    href={`/${locale}/courses`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-base font-semibold text-gray-700 transition hover:border-primary-200 hover:text-primary-600 active:scale-95 ${pathname.includes('/courses')
                      ? 'text-primary-600 border-primary-200'
                      : ''
                      }`}
                  >
                    {t('courses')}
                  </Link>
                </div>

                <div className="mt-4 flex justify-center">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}


'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push(`/${locale}`);
    router.refresh();
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={`/${locale}`} className="text-2xl font-bold text-primary-600">
            Dr. Raneem
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href={`/${locale}`}
              className={`hover:text-primary-600 transition-colors ${
                pathname === `/${locale}` ? 'text-primary-600 font-semibold' : ''
              }`}
            >
              {t('home')}
            </Link>
            <Link
              href={`/${locale}/products`}
              className={`hover:text-primary-600 transition-colors ${
                pathname.includes('/products') ? 'text-primary-600 font-semibold' : ''
              }`}
            >
              {t('products')}
            </Link>
            <Link
              href={`/${locale}/courses`}
              className={`hover:text-primary-600 transition-colors ${
                pathname.includes('/courses') ? 'text-primary-600 font-semibold' : ''
              }`}
            >
              {t('courses')}
            </Link>
            {session ? (
              <>
                <Link
                  href={`/${locale}/admin`}
                  className="text-secondary-600 hover:text-secondary-800 font-semibold"
                >
                  {t('admin')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <Link
                href={`/${locale}/admin/login`}
                className="text-secondary-600 hover:text-secondary-800 font-semibold"
              >
                {t('admin')}
              </Link>
            )}
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
}


'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Locale } from '@/i18n';

interface AdminLogoutButtonProps {
  locale: Locale;
}

export default function AdminLogoutButton({ locale }: AdminLogoutButtonProps) {
  const t = useTranslations('common');
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push(`/${locale}/admin/login`);
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
    >
      {t('logout')}
    </button>
  );
}


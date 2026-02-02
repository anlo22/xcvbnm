import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { Locale } from '@/i18n';
import AdminLogoutButton from '@/components/admin/AdminLogoutButton';

export default async function AdminProtectedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const { locale } = params;
  const session = await getSession();

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <AdminLogoutButton locale={locale} />
      </div>
      {children}
    </div>
  );
}


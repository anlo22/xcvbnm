import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { Locale } from '@/i18n';

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

  return <>{children}</>;
}


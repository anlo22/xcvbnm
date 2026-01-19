import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import Providers from '@/components/Providers';
import ConditionalLayout from '@/components/ConditionalLayout';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <ConditionalLayout>{children}</ConditionalLayout>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}


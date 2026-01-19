'use client';

import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('common');
  const locale = useLocale();

  return (
    <footer className="bg-primary-800 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Dr. Raneem</h3>
            <p className="text-primary-200">
              Premium cosmetics and professional skin care courses
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('contact')}</h4>
            <p className="text-primary-200">Email: info@drraneem.com</p>
            <p className="text-primary-200">Phone: +1234567890</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('language')}</h4>
            <p className="text-primary-200">
              {locale === 'en' ? 'English' : 'العربية'}
            </p>
          </div>
        </div>
        <div className="border-t border-primary-700 mt-8 pt-8 text-center text-primary-200">
          <p>&copy; {new Date().getFullYear()} Dr. Raneem. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}


import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async () => {
  // const locale = store.get('locale')?.value || 'en';
  const locale = 'en';
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
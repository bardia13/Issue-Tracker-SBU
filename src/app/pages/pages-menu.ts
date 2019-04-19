import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'داشبور کاربر  ',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'احراز هویت',
    icon: 'nb-locked',
    children: [
      {
        title: 'ورود',
        link: '/auth/login',
      },
      {
        title: 'ثبت نام',
        link: '/auth/register',
      },
      {
        title: 'بازیابی رمز عبور',
        link: '/auth/request-password',
      },
      {
        title: 'تغییر رمز عبور',
        link: '/auth/reset-password',
      },
    ],
  },
];

import {
  IconLogin,
  IconUserPlus,
  IconHome,
  IconAccessible,
  IconSchoolBell,
  IconPaperclip,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Home',
    icon: IconHome,
    href: '/student/home',
  },
  {
    id: uniqueId(),
    title: 'Classroom',
    icon: IconSchoolBell,
    href: '/student/classroom',
  },
  {
    id: uniqueId(),
    title: 'Paper',
    icon: IconPaperclip,
    href: '/student/paper',
  },
  {
    id: uniqueId(),
    title: 'About us',
    icon: IconAccessible,
    href: '/student/aboutus',
  },

  {
    navlabel: true,
    subheader: 'Auth',
  },
  {
    id: uniqueId(),
    title: 'Login',
    icon: IconLogin,
    href: '/auth/teacherLogin',
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: IconUserPlus,
    href: '/auth/register',
  },
];

export default Menuitems;

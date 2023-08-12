import React from 'react';

export type Theme = {
  RouterLink?: React.ReactElement | null;
} & Record<string, any>;

/**
 * All `type:number` values assume `rem` unit. Relative to `html { font-size: ... }`.
 */
const theme: Theme = {
  RouterLink: null,
  header: {
    height: '50px',
  },
  colors: {
    primary: {
      main: '#ffac12',
    },
    secondary: {
      main: '#7B58BD',
    },
  },
  mq: {
    // Custom mobile
    smartWatch: '@media (max-width: 359px)', // Watches are 240-320px wide
    iPhone6: '@media (max-width: 374px)', // iPhone 5/6 is 360px wide
    iPhoneX: '@media (max-width: 389px)', // iPhone X is 375px wide

    // Standard styled-system breakpoints
    phone: '', // default, no media query // styled-system sx[0] (base)
    phoneLg: '@media (min-width: 400px)',
    tablet: '@media (min-width: 768px)', // styled-system sx[1] (sm)
    tabletLg: '@media (min-width: 960px)', // styled-system sx[2] (md)
    desktop: '@media (min-width: 1080px)', // styled-system sx[3] (lg)
    desktopLg: '@media (min-width: 1280px)', // styled-system sx[4] (xl)
    desktopXl: '@media (min-width: 1500px)',

    // Custom desktop
    fullHd: '@media (min-width: 1920px)', // full hd
  },
  sizes: {
    card: {
      borderRadius: 0.4,
    },
    buttonsAndInputs: {
      borderRadius: 0.4,
      height: {
        xs: 1.5,
        sm: 1.95,
        md: 2.33,
        lg: 2.55,
        xl: 3,
      },
      paddingX: {
        xs: 0.67,
        sm: 0.75,
        md: 1,
        lg: 1,
        xl: 1.5,
      },
      fontSize: {
        xs: 0.75,
        sm: 0.85,
        md: 1,
        lg: 1.125,
        xl: 1.5,
      },
    },
  },
};

export default theme;

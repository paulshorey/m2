import Box, { BoxProps } from '@mui/material/Box';
import NextLink from 'next/link';
import React from 'react';

export type LinkProps = BoxProps & {
  children: React.ReactNode;
  className?: string;
  download?: boolean;
  from?: string;
  href: string;
  hrefLang?: string;
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  rel?: string;
  target?: string;
  variant?: string;
  variants?: string[];
};

const Link = function (
  {
    children,
    className,
    from,
    href,
    hrefLang = 'en-us',
    onClick,
    rel,
    target,
    variant,
    variants,
    ...props
  }: LinkProps,
  ref: any
) {
  // const contextPage = useContext(PageContext) as PageContextType;
  // fix attributes
  if (/@[\w]+\./.test(href)) {
    if (!href.includes('mailto:')) {
      href = 'mailto:' + href;
    }
  } else if (
    href.substring(0, 4) === 'http' 
    // all other domains, including the current hostname
    // && !href.substring(0, 22).includes('//example.com') &&
    // !href.substring(0, 22).includes('www.example.com')
  ) {
    target = target || '_blank';
    rel = rel || 'noopener noreferrer';
  } else if (href.includes('/#') || href[0] === '#') {
    target = target || '';
  } else {
    target = target || '';
    rel = '';
  }
  // variants
  const styleProps = {} as Record<string, any>;
  if (variant === 'black' || variants?.includes('black')) {
    styleProps['color'] = '#000';
  }
  if (variant === 'underline' || variants?.includes('underline')) {
    styleProps['textDecoration'] = 'underline';
    styleProps['_hover'] = { textDecoration: 'none' };
  }
  // render children
  const A = (
    <Box
      {...styleProps}
      {...props}
      component="a"
      className={'Link' + (className ? ' ' + className : '')}
      // @ts-ignore
      href={href}
      hrefLang={hrefLang}
      // onClick={trackOnClick}
      ref={ref}
      rel={rel}
      style={{ cursor: 'pointer' }}
      target={target}
    >
      {children}
    </Box>
  );
  // render parent
  if (href[0] === '#') {
    return A;
  }
  return (
    <NextLink href={href} passHref={true}>
      {A}
    </NextLink>
  );
};

export default React.forwardRef(Link);

'use client';
import React from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';
interface Props {
  href: string;
  className?: string;
  children: React.ReactNode;
}
const NavLink = ({ href, className = '', children, ...props }: Props) => {
  const segment = useSelectedLayoutSegment();

  const isActive = segment === href.replace(/^\//, '');
  const isActiveClass = isActive
    ? `${className} underline decoration-2 decoration-wavy decoration-brand-blue-500   underline-offset-8`
    : className;

  return (
    <Link prefetch={false} href={href} className={isActiveClass} {...props}>
      {children}
    </Link>
  );
};

export default NavLink;

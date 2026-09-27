import { ReactNode } from 'react';

export default function FullBleedSection({
  children,
  className,
  bgColor: bgColorClassName = 'bg-brand-canvas',
}: {
  children: ReactNode;
  className?: string;
  bgColor?: string;
}) {
  return (
    <div
      className={`relative left-1/2 mx-[-50vw] w-screen ${bgColorClassName}`}
    >
      <div
        className={`mx-auto max-w-120 px-4 py-8 sm:px-6 md:max-w-240 lg:px-8 ${className || ''}`}
      >
        {children}
      </div>
    </div>
  );
}

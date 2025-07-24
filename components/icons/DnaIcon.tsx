
import React from 'react';

export const DnaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 20s3-3 3-5-3-3-3-5" />
    <path d="M20 4s-3 3-3 5 3 3 3 5" />
    <path d="M7 5c-1.5 2-1.5 5 0 7" />
    <path d="M17 12c1.5-2 1.5-5 0-7" />
    <path d="M10.5 2.5s-1 2-1 3.5 1 2.5 1 3.5" />
    <path d="M13.5 14.5s1-2 1-3.5-1-2.5-1-3.5" />
  </svg>
);

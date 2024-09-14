import { forwardRef } from 'react';

import type { SVGRProps } from './Icon';
export const TwitterIcon = forwardRef(({ title, titleId, ...props }: SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 25 24"
    className="icon"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath="url(#twitterIcon_svg__a)">
      <path
        fill="#03A9F4"
        d="M24.5 4.559c-.892.391-1.843.65-2.835.776a4.9 4.9 0 0 0 2.165-2.719 9.8 9.8 0 0 1-3.12 1.191 4.919 4.919 0 0 0-8.511 3.365c0 .39.033.764.114 1.121-4.091-.199-7.71-2.16-10.142-5.146a4.95 4.95 0 0 0-.673 2.487c0 1.704.877 3.214 2.185 4.089a4.86 4.86 0 0 1-2.223-.606v.054a4.94 4.94 0 0 0 3.942 4.835c-.4.109-.837.162-1.29.162a4.4 4.4 0 0 1-.932-.084c.638 1.948 2.447 3.38 4.598 3.427a9.9 9.9 0 0 1-6.1 2.099c-.404 0-.791-.018-1.178-.068a13.85 13.85 0 0 0 7.548 2.208c9.054 0 14.004-7.5 14.004-14.001q-.001-.324-.018-.636A9.8 9.8 0 0 0 24.5 4.559"
      />
    </g>
    <defs>
      <clipPath id="twitterIcon_svg__a">
        <path fill="currentColor" d="M.5 0h24v24H.5z" />
      </clipPath>
    </defs>
  </svg>
));
TwitterIcon.displayName = 'TwitterIcon';

import type { SVGProps } from 'react'

const HamburgerIcon = ({ pathFill, ...props }: SVGProps<SVGSVGElement> & { pathFill?: string }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      role='img'
      {...props}
    >
      <path
        d='M20 17a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2h16zm0-6a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2h16zm0-6a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2h16z'
        fill={pathFill || '#222'}
      ></path>
    </svg>
  )
}
export default HamburgerIcon

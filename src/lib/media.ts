export const breakpoints = {
  mobile: 500,
  tablet: 769,
  desktop: 1024,
  wide: 1200,
  xwide: 1500,
} as const

export type BreakpointName = keyof typeof breakpoints

export const mediaQuery = (width: number) => `@media (min-width: ${width}px)`
type Media = Record<BreakpointName, string>

export const media = Object.entries(breakpoints).reduce((acc, [name, width]) => {
  acc[name as BreakpointName] = mediaQuery(width)
  return acc
}, {} as Media)

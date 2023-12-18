import { breakpoints, type BreakpointName } from './media'

export const isMatchingBreakpoint = (breakpointName: BreakpointName) =>
  window.innerWidth < breakpoints[breakpointName]

// Hook that always returns 'split' variant, ignoring localStorage
export function useFooterVariant() {
  // Always return 'split' variant, no state management needed
  return { variant: 'split' as const };
}

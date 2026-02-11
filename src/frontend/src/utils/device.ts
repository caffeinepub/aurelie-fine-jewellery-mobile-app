/**
 * Device detection utilities for mobile vs desktop.
 */

// Type declaration for experimental navigator.userAgentData API
interface NavigatorUAData {
  mobile: boolean;
  platform: string;
  brands: Array<{ brand: string; version: string }>;
}

interface NavigatorWithUserAgentData extends Navigator {
  userAgentData?: NavigatorUAData;
}

/**
 * Detect if the user is on a mobile device
 * Uses modern navigator.userAgentData API with fallback to user agent string
 */
export function isMobileDevice(): boolean {
  const nav = navigator as NavigatorWithUserAgentData;
  
  // Modern API (Chromium-based browsers)
  if (nav.userAgentData) {
    return nav.userAgentData.mobile;
  }
  
  // Fallback: User agent string detection
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

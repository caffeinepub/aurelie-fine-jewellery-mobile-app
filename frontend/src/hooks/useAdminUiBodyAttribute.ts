import { useEffect } from 'react';

/**
 * Hook that toggles data-admin-ui="true" attribute on document.body
 * while the admin route is active, ensuring Radix portals (dialogs/popovers/select dropdowns)
 * inherit admin-only scoped styling.
 */
export function useAdminUiBodyAttribute() {
  useEffect(() => {
    document.body.setAttribute('data-admin-ui', 'true');
    
    return () => {
      document.body.removeAttribute('data-admin-ui');
    };
  }, []);
}

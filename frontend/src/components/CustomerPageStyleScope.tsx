import React from 'react';

interface CustomerPageStyleScopeProps {
  children: React.ReactNode;
}

export default function CustomerPageStyleScope({ children }: CustomerPageStyleScopeProps) {
  return (
    <div data-customer-page="true">
      {children}
    </div>
  );
}

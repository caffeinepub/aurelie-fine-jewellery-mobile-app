import { useGetSiteContent } from '../hooks/useQueries';
import CustomerPageStyleScope from '../components/CustomerPageStyleScope';
import { Loader2 } from 'lucide-react';

export default function TermsConditionsPage() {
  const { data: siteContent, isLoading } = useGetSiteContent();

  if (isLoading) {
    return (
      <CustomerPageStyleScope>
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      </CustomerPageStyleScope>
    );
  }

  return (
    <CustomerPageStyleScope>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-bottle-green-dark mb-8">
            Terms & Conditions
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-wrap text-bottle-green-dark leading-relaxed">
              {siteContent?.termsOfService || 'Terms and conditions content not available.'}
            </p>
          </div>
        </div>
      </div>
    </CustomerPageStyleScope>
  );
}

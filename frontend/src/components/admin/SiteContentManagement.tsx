import { useState, useEffect } from 'react';
import { useGetSiteContent, useUpdateSiteContent } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { SiteContent } from '../../backend';

export default function SiteContentManagement() {
  const { data: siteContent, isLoading } = useGetSiteContent();
  const updateSiteContent = useUpdateSiteContent();

  const [formData, setFormData] = useState<SiteContent>({
    contactEmail: '',
    phoneNumber: '',
    address: '',
    officialName: '',
    aboutUs: '',
    generalInfo: '',
    termsOfService: '',
    privacyPolicy: '',
    shippingPolicy: '',
    billingPolicy: '',
    generalDisclaimer: '',
    footerContent: '',
    facebookUrl: '',
    instagramUrl: '',
    xUrl: '',
  });

  useEffect(() => {
    if (siteContent) {
      setFormData(siteContent);
    }
  }, [siteContent]);

  const handleChange = (field: keyof SiteContent, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateSiteContent.mutateAsync(formData);
      toast.success('Site content updated successfully!');
    } catch (error: any) {
      console.error('Failed to update site content:', error);
      toast.error(error.message || 'Failed to update site content');
    }
  };

  if (isLoading) {
    return (
      <Card className="gold-border admin-surface backdrop-blur">
        <CardContent className="py-8">
          <div className="flex items-center justify-center gap-2 text-bottle-green-dark">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading site content...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="gold-border admin-surface backdrop-blur">
      <CardHeader>
        <CardTitle className="text-bottle-green-dark">Edit Site Content</CardTitle>
        <CardDescription className="text-bottle-green-medium">
          Manage contact details, footer information, social media links, and static text content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-bottle-green-dark border-b border-gold-medium/30 pb-2">
              Contact Information
            </h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="admin-label-text">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleChange('contactEmail', e.target.value)}
                  className="border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="admin-label-text">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  className="border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="admin-label-text">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="officialName" className="admin-label-text">Official Business Name</Label>
              <Input
                id="officialName"
                value={formData.officialName}
                onChange={(e) => handleChange('officialName', e.target.value)}
                className="border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
              />
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-bottle-green-dark border-b border-gold-medium/30 pb-2">
              Social Media Links
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="instagramUrl" className="admin-label-text">Instagram URL</Label>
              <Input
                id="instagramUrl"
                type="url"
                value={formData.instagramUrl}
                onChange={(e) => handleChange('instagramUrl', e.target.value)}
                placeholder="https://instagram.com/yourprofile"
                className="border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="facebookUrl" className="admin-label-text">Facebook URL</Label>
              <Input
                id="facebookUrl"
                type="url"
                value={formData.facebookUrl}
                onChange={(e) => handleChange('facebookUrl', e.target.value)}
                placeholder="https://facebook.com/yourpage"
                className="border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="xUrl" className="admin-label-text">X (Twitter) URL</Label>
              <Input
                id="xUrl"
                type="url"
                value={formData.xUrl}
                onChange={(e) => handleChange('xUrl', e.target.value)}
                placeholder="https://x.com/yourprofile"
                className="border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
              />
            </div>
          </div>

          {/* About & General Info Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-bottle-green-dark border-b border-gold-medium/30 pb-2">
              About & General Information
            </h3>

            <div className="space-y-2">
              <Label htmlFor="aboutUs" className="admin-label-text">About Us</Label>
              <Textarea
                id="aboutUs"
                value={formData.aboutUs}
                onChange={(e) => handleChange('aboutUs', e.target.value)}
                rows={3}
                className="border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="generalInfo" className="admin-label-text">General Information</Label>
              <Textarea
                id="generalInfo"
                value={formData.generalInfo}
                onChange={(e) => handleChange('generalInfo', e.target.value)}
                rows={4}
                className="border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
              />
            </div>
          </div>

          {/* Policies Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-bottle-green-dark border-b border-gold-medium/30 pb-2">
              Policies & Legal
            </h3>

            <div className="space-y-2">
              <Label htmlFor="termsOfService" className="admin-label-text">Terms of Service</Label>
              <Textarea
                id="termsOfService"
                value={formData.termsOfService}
                onChange={(e) => handleChange('termsOfService', e.target.value)}
                rows={4}
                className="border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="privacyPolicy" className="admin-label-text">Privacy Policy</Label>
              <Textarea
                id="privacyPolicy"
                value={formData.privacyPolicy}
                onChange={(e) => handleChange('privacyPolicy', e.target.value)}
                rows={4}
                className="border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shippingPolicy" className="admin-label-text">Shipping Policy</Label>
              <Textarea
                id="shippingPolicy"
                value={formData.shippingPolicy}
                onChange={(e) => handleChange('shippingPolicy', e.target.value)}
                rows={3}
                className="border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingPolicy" className="admin-label-text">Billing Policy</Label>
              <Textarea
                id="billingPolicy"
                value={formData.billingPolicy}
                onChange={(e) => handleChange('billingPolicy', e.target.value)}
                rows={3}
                className="border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="generalDisclaimer" className="admin-label-text">General Disclaimer</Label>
              <Textarea
                id="generalDisclaimer"
                value={formData.generalDisclaimer}
                onChange={(e) => handleChange('generalDisclaimer', e.target.value)}
                rows={3}
                className="border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
              />
            </div>
          </div>

          {/* Footer Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-bottle-green-dark border-b border-gold-medium/30 pb-2">
              Footer Content
            </h3>

            <div className="space-y-2">
              <Label htmlFor="footerContent" className="admin-label-text">Footer Text</Label>
              <Textarea
                id="footerContent"
                value={formData.footerContent}
                onChange={(e) => handleChange('footerContent', e.target.value)}
                rows={2}
                placeholder="e.g., Follow us on social media | LinkedIn | Facebook"
                className="border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full gap-2 gold-gradient text-secondary shadow-gold"
            disabled={updateSiteContent.isPending}
          >
            {updateSiteContent.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

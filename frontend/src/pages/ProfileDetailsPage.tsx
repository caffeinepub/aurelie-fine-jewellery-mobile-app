import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import CustomerPageStyleScope from '../components/CustomerPageStyleScope';

export default function ProfileDetailsPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
  });

  const [hasChanges, setHasChanges] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!identity && !profileLoading) {
      navigate({ to: '/' });
    }
  }, [identity, profileLoading, navigate]);

  // Load profile data when available
  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        address: userProfile.address || '',
        dob: userProfile.dob || '',
      });
    }
  }, [userProfile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    // Validation
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return;
    }
    if (!formData.phone.trim()) {
      toast.error('Phone number is required');
      return;
    }
    if (!formData.address.trim()) {
      toast.error('Address is required');
      return;
    }

    try {
      await saveProfile.mutateAsync(formData);
      toast.success('Profile updated successfully');
      setHasChanges(false);
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast.error(error.message || 'Failed to save profile');
    }
  };

  if (!identity) {
    return null;
  }

  if (profileLoading) {
    return (
      <CustomerPageStyleScope>
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-gold-medium" />
        </div>
      </CustomerPageStyleScope>
    );
  }

  return (
    <CustomerPageStyleScope>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/dashboard' })}
          className="mb-6 text-bottle-green-dark hover:text-bottle-green-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="border-gold-medium/30 shadow-elegant">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-bottle-green-dark">
              Profile Details
            </CardTitle>
            <CardDescription className="text-bottle-green-medium">
              View and edit your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-bottle-green-dark font-medium">
                Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className="border-gold-medium/30 focus:border-gold-medium"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-bottle-green-dark font-medium">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                className="border-gold-medium/30 focus:border-gold-medium"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-bottle-green-dark font-medium">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
                className="border-gold-medium/30 focus:border-gold-medium"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-bottle-green-dark font-medium">
                Shipping Address *
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your full address"
                className="border-gold-medium/30 focus:border-gold-medium"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob" className="text-bottle-green-dark font-medium">
                Date of Birth
              </Label>
              <Input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) => handleInputChange('dob', e.target.value)}
                className="border-gold-medium/30 focus:border-gold-medium"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleSave}
                disabled={!hasChanges || saveProfile.isPending}
                className="flex-1 bg-gold-medium hover:bg-gold-dark text-silver-oxidized"
              >
                {saveProfile.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate({ to: '/dashboard' })}
                className="border-gold-medium/30 text-bottle-green-dark hover:bg-gold-medium/10"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerPageStyleScope>
  );
}

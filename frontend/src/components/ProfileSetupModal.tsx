import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useActor } from '../hooks/useActor';
import { useQueryClient } from '@tanstack/react-query';
import type { UserProfile } from '../backend';

interface ProfileSetupModalProps {
  open: boolean;
  onComplete: () => void;
}

export default function ProfileSetupModal({ open, onComplete }: ProfileSetupModalProps) {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!actor) {
      toast.error('Actor not available');
      return;
    }

    setIsSubmitting(true);

    try {
      const profile: UserProfile = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        dob: '', // Default empty DOB for initial profile setup
      };

      await actor.saveCallerUserProfile(profile);
      
      // Invalidate both profile and admin status queries
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      queryClient.invalidateQueries({ queryKey: ['isAdmin'] });
      
      // Show special message if admin email is used
      if (email.trim() === 'aureliefinejewellery06@gmail.com') {
        toast.success('Profile created successfully! Admin access granted.');
      } else {
        toast.success('Profile created successfully!');
      }
      
      onComplete();
    } catch (error: any) {
      console.error('Failed to save profile:', error);
      toast.error(error.message || 'Failed to save profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md gold-border bg-beige-light/95 backdrop-blur" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl gold-text">Welcome to Aurelie</DialogTitle>
          <DialogDescription className="gold-text opacity-70">
            Please complete your profile to continue
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="gold-text">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="border-gold-medium/30 gold-text"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="gold-text">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="border-gold-medium/30 gold-text"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="gold-text">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 1234567890"
              className="border-gold-medium/30 gold-text"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="gold-text">Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Your delivery address"
              className="border-gold-medium/30 gold-text"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full gold-gradient text-secondary shadow-gold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Creating Profile...
              </>
            ) : (
              'Complete Profile'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

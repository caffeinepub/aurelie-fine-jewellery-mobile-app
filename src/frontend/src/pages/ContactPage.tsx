import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useSubmitInquiry } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Mail, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { CustomerInquiry } from '../backend';

export default function ContactPage() {
  const { identity } = useInternetIdentity();
  const submitInquiry = useSubmitInquiry();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const isAuthenticated = !!identity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!identity) {
      toast.error('Please login to submit an inquiry');
      return;
    }

    try {
      const inquiry: CustomerInquiry = {
        id: `inquiry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        customer: identity.getPrincipal(),
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        response: undefined,
      };

      await submitInquiry.mutateAsync(inquiry);
      toast.success('Inquiry submitted successfully! We will respond soon.');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error: any) {
      console.error('Failed to submit inquiry:', error);
      toast.error(error.message || 'Failed to submit inquiry');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container px-4 py-8">
        <div className="text-center py-12">
          <Mail className="h-16 w-16 mx-auto mb-4 text-gold-medium" />
          <h2 className="text-2xl font-semibold mb-2 gold-text">Login Required</h2>
          <p className="text-muted-foreground">Please login to contact us.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold tracking-tight mb-2">Contact Us</h1>
        <p className="text-muted-foreground">Have a question? We're here to help.</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="gold-border bg-beige-light/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="gold-text flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Send us a message
            </CardTitle>
            <CardDescription className="gold-text opacity-70">
              Fill out the form below and we'll get back to you as soon as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="gold-text">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="border-gold-medium/30 gold-text"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="gold-text">Email</Label>
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
                <Label htmlFor="message" className="gold-text">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can help you..."
                  rows={6}
                  className="border-gold-medium/30 gold-text"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full gold-gradient text-secondary shadow-gold"
                disabled={submitInquiry.isPending}
              >
                {submitInquiry.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

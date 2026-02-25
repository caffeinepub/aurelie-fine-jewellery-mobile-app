/**
 * UPI QR Code component for checkout payment.
 * Renders a scannable QR code using QR code generation API and provides a copy link action.
 */

import { Button } from '../ui/button';
import { Copy, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface UpiQrCodeProps {
  upiUri: string;
  size?: number;
}

export default function UpiQrCode({ upiUri, size = 256 }: UpiQrCodeProps) {
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    // Generate QR code URL using a free QR code API
    // Using qrserver.com API which is free and doesn't require authentication
    const encodedUri = encodeURIComponent(upiUri);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedUri}&format=svg`;
    setQrCodeUrl(url);
  }, [upiUri, size]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(upiUri);
      setCopied(true);
      toast.success('UPI link copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center p-6 bg-white rounded-xl border-2 border-gold-medium/20">
        {qrCodeUrl ? (
          <img
            src={qrCodeUrl}
            alt="UPI Payment QR Code"
            width={size}
            height={size}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        ) : (
          <div
            className="flex items-center justify-center bg-gray-100"
            style={{ width: size, height: size }}
          >
            <span className="text-sm text-gray-500">Loading QR Code...</span>
          </div>
        )}
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-sm font-medium gold-text">
          Scan QR code with any UPI app
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="w-full border-gold-medium/30 hover:border-gold-medium hover:bg-gold-medium/5"
        >
          {copied ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2 text-gold-medium" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy UPI Link
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

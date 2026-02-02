import { useState } from 'react';
import { useGetInquiries, useRespondToInquiry } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { MessageSquare, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function InquiryManagement() {
  const { data: inquiries, isLoading } = useGetInquiries();
  const respondToInquiry = useRespondToInquiry();
  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const [response, setResponse] = useState('');

  const handleRespond = async (inquiryId: string) => {
    if (!response.trim()) {
      toast.error('Please enter a response');
      return;
    }

    try {
      await respondToInquiry.mutateAsync({ inquiryId, response: response.trim() });
      toast.success('Response sent successfully');
      setRespondingTo(null);
      setResponse('');
    } catch (error: any) {
      console.error('Failed to send response:', error);
      toast.error(error.message || 'Failed to send response');
    }
  };

  return (
    <Card className="gold-border bg-card/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="gold-text flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Customer Inquiries
        </CardTitle>
        <CardDescription className="gold-text opacity-70">
          View and respond to customer inquiries
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">
            <p className="gold-text opacity-70">Loading inquiries...</p>
          </div>
        ) : inquiries && inquiries.length > 0 ? (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="p-4 border border-gold-medium/30 rounded-lg hover:bg-emerald-light/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold gold-text">{inquiry.name}</h3>
                    <p className="text-sm gold-text opacity-70">{inquiry.email}</p>
                  </div>
                  <Badge variant={inquiry.response ? 'outline' : 'default'} className={!inquiry.response ? 'bg-gold-medium text-secondary' : ''}>
                    {inquiry.response ? 'Answered' : 'Pending'}
                  </Badge>
                </div>

                <div className="mb-3">
                  <p className="text-sm font-medium gold-text mb-1">Message:</p>
                  <p className="text-sm gold-text opacity-80">{inquiry.message}</p>
                </div>

                {inquiry.response ? (
                  <div className="bg-bottle-green-light/10 p-3 rounded border border-gold-medium/30">
                    <p className="text-sm font-medium gold-text mb-1">Your Response:</p>
                    <p className="text-sm gold-text opacity-80">{inquiry.response}</p>
                  </div>
                ) : respondingTo === inquiry.id ? (
                  <div className="space-y-2">
                    <Textarea
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      placeholder="Type your response..."
                      rows={4}
                      className="border-gold-medium/30 gold-text"
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setRespondingTo(null);
                          setResponse('');
                        }}
                        className="border-gold-medium gold-text"
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleRespond(inquiry.id)}
                        disabled={respondToInquiry.isPending}
                        className="gap-2 gold-gradient text-secondary shadow-gold"
                      >
                        <Send className="h-4 w-4" />
                        {respondToInquiry.isPending ? 'Sending...' : 'Send Response'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRespondingTo(inquiry.id)}
                    className="gap-2 border-gold-medium gold-text hover:bg-gold-medium/20"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Respond
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gold-medium opacity-50" />
            <p className="gold-text opacity-70">No inquiries yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

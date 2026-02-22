import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Trash2, Plus, GripVertical, Save } from 'lucide-react';
import { useGetAllBannerMessages, useAddBannerMessage, useUpdateBannerMessage, useDeleteBannerMessage } from '../../hooks/useBannerQueries';
import { Skeleton } from '../ui/skeleton';
import { toast } from 'sonner';
import type { BannerMessage } from '../../backend';

export default function BannerManagement() {
  const { data: messages, isLoading } = useGetAllBannerMessages();
  const addMessage = useAddBannerMessage();
  const updateMessage = useUpdateBannerMessage();
  const deleteMessage = useDeleteBannerMessage();

  const [newMessage, setNewMessage] = useState('');
  const [editingMessages, setEditingMessages] = useState<Record<number, string>>({});

  const sortedMessages = messages
    ? [...messages].sort((a, b) => Number(a.order) - Number(b.order))
    : [];

  const handleAddMessage = async () => {
    if (!newMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }

    try {
      const nextOrder = sortedMessages.length > 0 
        ? Math.max(...sortedMessages.map(m => Number(m.order))) + 1 
        : 0;
      
      await addMessage.mutateAsync({
        message: newMessage.trim(),
        order: BigInt(nextOrder),
        enabled: true,
      });
      
      setNewMessage('');
      toast.success('Banner message added successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to add banner message');
    }
  };

  const handleUpdateMessage = async (order: bigint, message: string, enabled: boolean) => {
    try {
      await updateMessage.mutateAsync({ order, message, enabled });
      toast.success('Banner message updated');
      
      // Clear editing state for this message
      const orderNum = Number(order);
      setEditingMessages(prev => {
        const newState = { ...prev };
        delete newState[orderNum];
        return newState;
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to update banner message');
    }
  };

  const handleToggleEnabled = async (msg: BannerMessage) => {
    try {
      await updateMessage.mutateAsync({
        order: msg.order,
        message: msg.message,
        enabled: !msg.enabled,
      });
      toast.success(`Banner message ${!msg.enabled ? 'enabled' : 'disabled'}`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to toggle banner message');
    }
  };

  const handleDeleteMessage = async (order: bigint) => {
    if (!confirm('Are you sure you want to delete this banner message?')) {
      return;
    }

    try {
      await deleteMessage.mutateAsync(order);
      toast.success('Banner message deleted');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete banner message');
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    
    const current = sortedMessages[index];
    const previous = sortedMessages[index - 1];
    
    try {
      // Swap orders
      await updateMessage.mutateAsync({
        order: current.order,
        message: current.message,
        enabled: current.enabled,
      });
      await updateMessage.mutateAsync({
        order: previous.order,
        message: previous.message,
        enabled: previous.enabled,
      });
      toast.success('Message order updated');
    } catch (error: any) {
      toast.error(error.message || 'Failed to reorder messages');
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index === sortedMessages.length - 1) return;
    
    const current = sortedMessages[index];
    const next = sortedMessages[index + 1];
    
    try {
      // Swap orders
      await updateMessage.mutateAsync({
        order: current.order,
        message: current.message,
        enabled: current.enabled,
      });
      await updateMessage.mutateAsync({
        order: next.order,
        message: next.message,
        enabled: next.enabled,
      });
      toast.success('Message order updated');
    } catch (error: any) {
      toast.error(error.message || 'Failed to reorder messages');
    }
  };

  if (isLoading) {
    return (
      <Card className="gold-border admin-surface">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="gold-border admin-surface">
      <CardHeader>
        <CardTitle className="text-bottle-green-dark">Marquee Banner Messages</CardTitle>
        <p className="text-sm text-bottle-green-medium mt-2">
          Manage scrolling banner messages that appear below the header. Messages scroll continuously in the order shown below.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Message */}
        <div className="space-y-3 p-4 rounded-lg border border-gold-medium/30 bg-beige-champagne/50">
          <Label htmlFor="new-message" className="text-bottle-green-dark font-semibold">
            Add New Message
          </Label>
          <div className="flex gap-2">
            <Input
              id="new-message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Enter banner message..."
              className="flex-1 border-gold-medium/30"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddMessage();
                }
              }}
            />
            <Button
              onClick={handleAddMessage}
              disabled={addMessage.isPending || !newMessage.trim()}
              className="bg-gold-medium hover:bg-gold-dark text-navy-dark"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        {/* Existing Messages */}
        <div className="space-y-3">
          <Label className="text-bottle-green-dark font-semibold">
            Current Messages ({sortedMessages.length})
          </Label>
          
          {sortedMessages.length === 0 ? (
            <div className="text-center py-8 text-bottle-green-medium">
              No banner messages yet. Add your first message above.
            </div>
          ) : (
            <div className="space-y-2">
              {sortedMessages.map((msg, index) => {
                const orderNum = Number(msg.order);
                const isEditing = orderNum in editingMessages;
                const editValue = isEditing ? editingMessages[orderNum] : msg.message;

                return (
                  <div
                    key={orderNum}
                    className={`p-4 rounded-lg border ${
                      msg.enabled
                        ? 'border-gold-medium/50 bg-beige-light/80'
                        : 'border-gray-300 bg-gray-100/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Reorder Controls */}
                      <div className="flex flex-col gap-1 pt-1">
                        <button
                          onClick={() => handleMoveUp(index)}
                          disabled={index === 0 || updateMessage.isPending}
                          className="text-bottle-green-medium hover:text-bottle-green-dark disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Move up"
                        >
                          <GripVertical className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleMoveDown(index)}
                          disabled={index === sortedMessages.length - 1 || updateMessage.isPending}
                          className="text-bottle-green-medium hover:text-bottle-green-dark disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Move down"
                        >
                          <GripVertical className="h-4 w-4 rotate-180" />
                        </button>
                      </div>

                      {/* Message Content */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-bottle-green-medium">
                            #{index + 1}
                          </span>
                          <Switch
                            checked={msg.enabled}
                            onCheckedChange={() => handleToggleEnabled(msg)}
                            disabled={updateMessage.isPending}
                          />
                          <span className="text-xs text-bottle-green-medium">
                            {msg.enabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>

                        <Input
                          value={editValue}
                          onChange={(e) => {
                            setEditingMessages(prev => ({
                              ...prev,
                              [orderNum]: e.target.value,
                            }));
                          }}
                          className="border-gold-medium/30"
                          placeholder="Banner message..."
                        />

                        {isEditing && editValue !== msg.message && (
                          <Button
                            size="sm"
                            onClick={() => handleUpdateMessage(msg.order, editValue, msg.enabled)}
                            disabled={updateMessage.isPending || !editValue.trim()}
                            className="bg-gold-medium hover:bg-gold-dark text-navy-dark"
                          >
                            <Save className="h-3 w-3 mr-1" />
                            Save Changes
                          </Button>
                        )}
                      </div>

                      {/* Delete Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteMessage(msg.order)}
                        disabled={deleteMessage.isPending}
                        className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Preview */}
        {sortedMessages.filter(m => m.enabled).length > 0 && (
          <div className="space-y-2">
            <Label className="text-bottle-green-dark font-semibold">Preview</Label>
            <div className="rounded-lg overflow-hidden border border-gold-medium/30">
              <div className="w-full bg-gradient-to-r from-gold-dark via-gold-medium to-gold-dark overflow-hidden relative">
                <div className="marquee-container-preview">
                  <div className="marquee-content-preview">
                    <span className="marquee-text-preview">
                      {sortedMessages
                        .filter(m => m.enabled)
                        .map(m => m.message)
                        .join(' ✨ ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <style>{`
          .marquee-container-preview {
            display: flex;
            overflow: hidden;
            user-select: none;
            gap: 0;
            padding: 0.75rem 0;
          }
          
          .marquee-content-preview {
            flex-shrink: 0;
            display: flex;
            justify-content: space-around;
            gap: 0;
            min-width: 100%;
            animation: scroll-left-preview 30s linear infinite;
          }
          
          .marquee-text-preview {
            font-size: 0.95rem;
            font-weight: 600;
            letter-spacing: 0.05em;
            color: oklch(var(--beige-light));
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            white-space: nowrap;
            padding: 0 2rem;
          }
          
          @keyframes scroll-left-preview {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </CardContent>
    </Card>
  );
}

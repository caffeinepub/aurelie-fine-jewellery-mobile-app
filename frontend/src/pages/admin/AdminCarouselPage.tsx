import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQuery } from '@tanstack/react-query';
import { useActor } from '../../hooks/useActor';
import CarouselManagement from '../../components/admin/CarouselManagement';
import { ArrowLeft, Shield } from 'lucide-react';

export default function AdminCarouselPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();

  const { data: isAdmin, isLoading: adminLoading } = useQuery({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
  });

  if (!identity || (!adminLoading && !isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Shield className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-foreground mb-2">Access Denied</h2>
          <p className="text-muted-foreground">You do not have admin privileges.</p>
        </div>
      </div>
    );
  }

  if (adminLoading || actorFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-gold/20 bg-card px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate({ to: '/admin' })}
            className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Dashboard</span>
          </button>
          <div className="h-4 w-px bg-border" />
          <h1 className="text-xl font-serif text-foreground">Carousel Management</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <CarouselManagement />
      </div>
    </div>
  );
}

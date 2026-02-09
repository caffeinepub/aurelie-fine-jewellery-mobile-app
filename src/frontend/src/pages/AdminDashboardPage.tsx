import { useIsCallerAdmin, useGetProducts, useGetOrders, useGetInquiries } from '../hooks/useQueries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { ScrollArea } from '../components/ui/scroll-area';
import { LayoutDashboard, Package, ShoppingBag, MessageSquare, Settings, Image } from 'lucide-react';
import ProductManagement from '../components/admin/ProductManagement';
import OrderManagement from '../components/admin/OrderManagement';
import InquiryManagement from '../components/admin/InquiryManagement';
import SiteContentManagement from '../components/admin/SiteContentManagement';
import CarouselManagement from '../components/admin/CarouselManagement';
import CategoryCarouselManagement from '../components/admin/CategoryCarouselManagement';
import { useAdminUiBodyAttribute } from '../hooks/useAdminUiBodyAttribute';

export default function AdminDashboardPage() {
  useAdminUiBodyAttribute();
  
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: products } = useGetProducts();
  const { data: orders } = useGetOrders();
  const { data: inquiries } = useGetInquiries();

  if (adminLoading) {
    return (
      <div className="container px-4 py-8">
        <Skeleton className="h-12 w-64 mb-8" />
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container px-4 py-8">
        <div className="text-center py-12">
          <LayoutDashboard className="h-16 w-16 mx-auto mb-4 text-gold-medium" />
          <h2 className="text-2xl font-semibold mb-2 gold-text">Access Denied</h2>
          <p className="gold-text opacity-80">You don't have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  const pendingOrders = orders?.filter((o) => o.status.__kind__ === 'pending').length || 0;
  const unansweredInquiries = inquiries?.filter((i) => !i.response).length || 0;
  const inStockProducts = products?.filter((p) => p.inStock).length || 0;

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold tracking-tight mb-2 text-bottle-green-dark">Admin Dashboard</h1>
        <p className="text-bottle-green-medium">Manage your jewellery business</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="gold-border admin-surface backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium admin-label-text">Total Products</CardTitle>
            <Package className="h-4 w-4 text-gold-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bottle-green-dark">{products?.length || 0}</div>
            <p className="text-xs text-bottle-green-medium mt-1">
              {inStockProducts} in stock
            </p>
          </CardContent>
        </Card>

        <Card className="gold-border admin-surface backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium admin-label-text">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-gold-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bottle-green-dark">{orders?.length || 0}</div>
            {pendingOrders > 0 && (
              <p className="text-xs text-bottle-green-medium mt-1">
                {pendingOrders} pending
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="gold-border admin-surface backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium admin-label-text">Inquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-gold-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bottle-green-dark">{inquiries?.length || 0}</div>
            {unansweredInquiries > 0 && (
              <p className="text-xs text-bottle-green-medium mt-1">
                {unansweredInquiries} unanswered
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Tabs defaultValue="products" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 admin-surface border border-gold-medium/30">
          <TabsTrigger value="products" className="text-bottle-green-dark data-[state=active]:bg-gold-medium data-[state=active]:text-secondary">
            <Package className="h-4 w-4 mr-2" />
            Products
          </TabsTrigger>
          <TabsTrigger value="orders" className="text-bottle-green-dark data-[state=active]:bg-gold-medium data-[state=active]:text-secondary">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="inquiries" className="text-bottle-green-dark data-[state=active]:bg-gold-medium data-[state=active]:text-secondary">
            <MessageSquare className="h-4 w-4 mr-2" />
            Inquiries
          </TabsTrigger>
          <TabsTrigger value="carousel" className="text-bottle-green-dark data-[state=active]:bg-gold-medium data-[state=active]:text-secondary">
            <Image className="h-4 w-4 mr-2" />
            Carousel
          </TabsTrigger>
          <TabsTrigger value="edit" className="text-bottle-green-dark data-[state=active]:bg-gold-medium data-[state=active]:text-secondary">
            <Settings className="h-4 w-4 mr-2" />
            Edit
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <ProductManagement />
        </TabsContent>

        <TabsContent value="orders">
          <OrderManagement />
        </TabsContent>

        <TabsContent value="inquiries">
          <InquiryManagement />
        </TabsContent>

        <TabsContent value="carousel">
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="pr-4">
              <div className="mb-6">
                <h2 className="font-serif text-2xl font-semibold tracking-tight mb-2 text-bottle-green-dark">Carousel Management</h2>
                <p className="text-sm text-bottle-green-medium">
                  Manage homepage and category carousels. Each carousel supports up to 5 slides with automatic optimization.
                </p>
              </div>
              
              <CarouselManagement />
              
              <div className="mt-8 mb-4">
                <h3 className="font-serif text-xl font-semibold tracking-tight text-bottle-green-dark">Category Carousels</h3>
              </div>
              
              <CategoryCarouselManagement category="bridal" title="Bridal Jewellery Carousel" />
              <CategoryCarouselManagement category="rings" title="Rings Carousel" />
              <CategoryCarouselManagement category="essentials" title="Anti Tarnish Jewellery Carousel" />
              <CategoryCarouselManagement category="everydaywear" title="Necklace Carousel" />
              <CategoryCarouselManagement category="birthstone" title="Anklets Carousel" />
              <CategoryCarouselManagement category="engagement" title="Earrings Carousel" />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="edit">
          <SiteContentManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}

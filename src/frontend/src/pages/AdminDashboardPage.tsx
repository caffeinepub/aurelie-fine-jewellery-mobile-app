import { useIsCallerAdmin, useGetProducts, useGetOrders, useGetInquiries } from '../hooks/useQueries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { LayoutDashboard, Package, ShoppingBag, MessageSquare, Settings } from 'lucide-react';
import ProductManagement from '../components/admin/ProductManagement';
import OrderManagement from '../components/admin/OrderManagement';
import InquiryManagement from '../components/admin/InquiryManagement';
import SiteContentManagement from '../components/admin/SiteContentManagement';

export default function AdminDashboardPage() {
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
        <h1 className="font-serif text-3xl font-semibold tracking-tight mb-2 gold-text">Admin Dashboard</h1>
        <p className="gold-text opacity-80">Manage your jewellery business</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="gold-border bg-beige-light/80 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium gold-text">Total Products</CardTitle>
            <Package className="h-4 w-4 text-gold-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold gold-text">{products?.length || 0}</div>
            <p className="text-xs gold-text opacity-70 mt-1">
              {inStockProducts} in stock
            </p>
          </CardContent>
        </Card>

        <Card className="gold-border bg-beige-light/80 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium gold-text">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-gold-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold gold-text">{orders?.length || 0}</div>
            {pendingOrders > 0 && (
              <p className="text-xs gold-text opacity-70 mt-1">
                {pendingOrders} pending
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="gold-border bg-beige-light/80 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium gold-text">Inquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-gold-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold gold-text">{inquiries?.length || 0}</div>
            {unansweredInquiries > 0 && (
              <p className="text-xs gold-text opacity-70 mt-1">
                {unansweredInquiries} unanswered
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Tabs defaultValue="products" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-bottle-green-medium/20 border border-gold-medium/30">
          <TabsTrigger value="products" className="gold-text data-[state=active]:bg-gold-medium data-[state=active]:text-secondary">
            <Package className="h-4 w-4 mr-2" />
            Products
          </TabsTrigger>
          <TabsTrigger value="orders" className="gold-text data-[state=active]:bg-gold-medium data-[state=active]:text-secondary">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="inquiries" className="gold-text data-[state=active]:bg-gold-medium data-[state=active]:text-secondary">
            <MessageSquare className="h-4 w-4 mr-2" />
            Inquiries
          </TabsTrigger>
          <TabsTrigger value="edit" className="gold-text data-[state=active]:bg-gold-medium data-[state=active]:text-secondary">
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

        <TabsContent value="edit">
          <SiteContentManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}

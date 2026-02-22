import { useIsCallerAdmin, useGetProducts, useGetOrders, useGetInquiries, useGetAllCategories } from '../hooks/useQueries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { ScrollArea } from '../components/ui/scroll-area';
import { LayoutDashboard, Package, ShoppingBag, MessageSquare, Settings, Image, Edit, MessageCircle } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import ProductManagement from '../components/admin/ProductManagement';
import OrderManagement from '../components/admin/OrderManagement';
import InquiryManagement from '../components/admin/InquiryManagement';
import SiteContentManagement from '../components/admin/SiteContentManagement';
import CarouselManagement from '../components/admin/CarouselManagement';
import CategoryCarouselManagement from '../components/admin/CategoryCarouselManagement';
import HeaderCategoryNavManagement from '../components/admin/HeaderCategoryNavManagement';
import BannerManagement from '../components/admin/BannerManagement';
import { useAdminUiBodyAttribute } from '../hooks/useAdminUiBodyAttribute';
import { PRODUCT_CATEGORIES } from '../utils/productCategories';

export default function AdminDashboardPage() {
  useAdminUiBodyAttribute();
  const navigate = useNavigate();
  
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: products } = useGetProducts();
  const { data: orders } = useGetOrders();
  const { data: inquiries } = useGetInquiries();
  const { data: categories } = useGetAllCategories();

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
        <TabsList className="grid w-full grid-cols-6 admin-surface border border-gold-medium/30">
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
          <TabsTrigger value="banner" className="text-bottle-green-dark data-[state=active]:bg-gold-medium data-[state=active]:text-secondary">
            <MessageCircle className="h-4 w-4 mr-2" />
            Banner
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
          <div className="mb-4">
            <Button
              onClick={() => navigate({ to: '/admin/orders' })}
              className="bg-gold-medium hover:bg-gold-dark text-navy-dark"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Open Full Orders Management
            </Button>
          </div>
          <OrderManagement />
        </TabsContent>

        <TabsContent value="inquiries">
          <InquiryManagement />
        </TabsContent>

        <TabsContent value="banner">
          <BannerManagement />
        </TabsContent>

        <TabsContent value="carousel">
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="pr-4">
              <div className="mb-6">
                <h2 className="font-serif text-2xl font-semibold tracking-tight mb-2 text-bottle-green-dark">Carousel Management</h2>
                <p className="text-sm text-bottle-green-medium">
                  Manage homepage and category carousels. Each carousel supports up to 5 images with automatic optimization.
                </p>
              </div>
              
              <CarouselManagement />
              
              <div className="mt-8 mb-4">
                <h3 className="font-serif text-xl font-semibold tracking-tight text-bottle-green-dark">Category Carousels</h3>
                <p className="text-sm text-bottle-green-medium mt-1">
                  Each category has two independent carousels that display at the top of the category page.
                </p>
              </div>
              
              {PRODUCT_CATEGORIES.map((category) => (
                <div key={category.slug} className="mb-8">
                  <h4 className="font-serif text-lg font-semibold tracking-tight text-bottle-green-dark mb-4">
                    {category.title}
                  </h4>
                  <CategoryCarouselManagement 
                    categorySlug={category.slug} 
                    carouselIndex={1} 
                    title={`${category.title} - Carousel 1`} 
                  />
                  <CategoryCarouselManagement 
                    categorySlug={category.slug} 
                    carouselIndex={2} 
                    title={`${category.title} - Carousel 2`} 
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="edit">
          <div className="space-y-6">
            {/* Header Category Navigation Management */}
            <HeaderCategoryNavManagement />

            {/* Category Management Section */}
            <Card className="gold-border admin-surface">
              <CardHeader>
                <CardTitle className="text-bottle-green-dark flex items-center gap-2">
                  <Edit className="h-5 w-5" />
                  Category Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-bottle-green-medium mb-4">
                  Edit category details, descriptions, and manage category images
                </p>
                <div className="grid gap-2">
                  {PRODUCT_CATEGORIES.map((category) => (
                    <Button
                      key={category.slug}
                      variant="outline"
                      onClick={() => navigate({ to: `/admin/categories/${category.slug}/edit` })}
                      className="justify-start border-gold-medium/30 hover:bg-gold-medium/10"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit {category.title}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Site Content Management */}
            <SiteContentManagement />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

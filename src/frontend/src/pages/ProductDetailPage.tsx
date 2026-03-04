import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CustomerPageStyleScope from "../components/CustomerPageStyleScope";
import ProductMediaCarousel from "../components/ProductMediaCarousel";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useCart } from "../hooks/useCart";
import { useGetProduct } from "../hooks/useQueries";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";

function formatINR(priceInCents: bigint): string {
  const amount = Number(priceInCents) / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProductDetailPage() {
  const { productId } = useParams({ from: "/product/$productId" });
  const navigate = useNavigate();
  const { data: product, isLoading } = useGetProduct(productId);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { addProduct } = useRecentlyViewed();

  // Track this product as recently viewed
  useEffect(() => {
    if (productId) {
      addProduct(productId);
    }
  }, [productId, addProduct]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
    toast.success(`${quantity} × ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate({ to: "/cart" });
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  if (isLoading) {
    return (
      <CustomerPageStyleScope>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-square bg-muted rounded" />
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-24 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </CustomerPageStyleScope>
    );
  }

  if (!product) {
    return (
      <CustomerPageStyleScope>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">
            Product not found
          </h1>
          <Button onClick={() => navigate({ to: "/" })}>Return to Home</Button>
        </div>
      </CustomerPageStyleScope>
    );
  }

  return (
    <CustomerPageStyleScope>
      <div className="min-h-screen">
        {/* Product Details */}
        <div className="container mx-auto px-4 py-12">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: "/" })}
            className="mb-6 text-bottle-green-dark hover:text-bottle-green-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Media Carousel */}
            <div>
              <ProductMediaCarousel
                media={product.media}
                productName={product.name}
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-serif font-bold text-bottle-green-dark mb-2">
                  {product.name}
                </h1>
                <p className="text-3xl font-bold text-gold-dark">
                  {formatINR(product.priceInCents)}
                </p>
              </div>

              <div
                className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                  product.inStock
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </div>

              <Card className="border-gold-medium/30 bg-off-white">
                <CardContent className="p-6">
                  <h2 className="text-lg font-serif font-semibold mb-3 text-bottle-green-dark">
                    Description
                  </h2>
                  <p className="text-bottle-green-medium leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="font-medium text-bottle-green-dark">
                  Quantity:
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={!product.inStock}
                    className="border-gold-medium/30"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold text-bottle-green-dark">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={!product.inStock}
                    className="border-gold-medium/30"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-gold-medium hover:bg-gold-dark text-white customer-cta-btn"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  variant="outline"
                  className="w-full border-gold-medium text-white hover:bg-gold-medium/10 customer-cta-btn"
                  size="lg"
                >
                  Buy Now
                </Button>
                <Button
                  onClick={() => {
                    const url = `https://wa.me/?text=${encodeURIComponent(`Check out this product from Aurelie Fine Jewellery: ${window.location.href}`)}`;
                    window.open(url, "_blank");
                  }}
                  variant="outline"
                  className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]"
                  size="lg"
                  data-ocid="product.whatsapp_share_button"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 mr-2 shrink-0"
                    role="img"
                    aria-label="WhatsApp"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.1.546 4.07 1.5 5.785L0 24l6.395-1.68A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.924 0-3.72-.503-5.272-1.385L2 22l1.417-4.608A9.954 9.954 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  Share on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerPageStyleScope>
  );
}

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem.jsx";
import {
  selectCartWithSubtotals,
  selectCartItemCount,
  selectCartTotal,
} from "../features/cart/cartSelectors.js";
import { selectCurrentUser } from "../features/auth/authSelectors";
import AccessDenied from "../components/AccessDenied";
import { CiLock } from "react-icons/ci";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";

function CartPage() {
  const items = useSelector(selectCartWithSubtotals);
  const itemCount = useSelector(selectCartItemCount);
  const total = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);

  const isGuest = !currentUser || currentUser.role === "guest";

  if (isGuest) {
    return (
      <AccessDenied
        message="Guests cannot have a shopping cart. Please log in to shop."
        icon={<CiLock className="h-10 w-10 text-muted-foreground" />}
      />
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center p-4 min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Your Cart is Empty
          </h2>
          <Button asChild size="lg" className="mt-4">
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-8 min-h-[calc(100vh-140px)]">
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <Card className="shadow-sm border-0 bg-transparent sm:bg-card sm:border">
            <div className="hidden sm:flex items-center px-6 py-4 border-b text-sm font-medium text-muted-foreground">
              <span className="flex-1">Product</span>
              <span className="w-24">Price</span>
              <span className="w-48 text-center">Quantity</span>
              <span className="w-24 text-right">Subtotal</span>
              <span className="w-20 ml-4"></span>
            </div>

            <div className="flex flex-col sm:px-6">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="px-6 py-6 border-t mt-4 sm:mt-0 flex justify-between items-center bg-card rounded-b-xl">
              <Button
                asChild
                variant="outline"
                className="hidden sm:inline-flex"
              >
                <Link to="/">Return To Shop</Link>
              </Button>
            </div>
          </Card>
        </div>

        <div className="w-full lg:w-80 xl:w-96 shrink-0">
          <Card className="sticky top-24 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle>Cart Total</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">${total}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Shipping:</span>
                <span className="font-medium text-success">Free</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">${total}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-2 pb-6">
              <Button asChild className="w-full h-12 text-base font-semibold">
                <Link to="/checkout">Proceed to checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CartPage;

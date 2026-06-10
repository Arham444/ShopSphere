import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  selectCartItemCount,
  selectCartWithSubtotals,
  selectCartTotal,
} from "../features/cart/cartSelectors";
import { selectCurrentUser } from "../features/auth/authSelectors";
import { TiTick } from "react-icons/ti";
import { clearCart } from "../features/cart/cartSlice";
import { checkoutProducts } from "../features/products/productSlice";
import AccessDenied from "../components/AccessDenied";
import { CiLock } from "react-icons/ci";
import { RiVisaLine, RiMastercardLine } from "react-icons/ri";
import { FaRegCreditCard } from "react-icons/fa6";
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
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { loadState } from "../utils/localStorage";

const TAX_RATE = 0.08;

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string(),
  city: Yup.string(),
  zipCode: Yup.string(),
  cardName: Yup.string().required("Cardholder name is required"),
  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Card number must be 16 digits"),
  cardExpiry: Yup.string()
    .required("Expiration date is required")
    .matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, "Expiry must be MM/YY"),
  cardCvv: Yup.string()
    .required("CVC / CVV is required")
    .matches(/^\d{3}$/, "CVV must be 3 digits"),
});

function CheckoutPage() {
  const items = useSelector(selectCartWithSubtotals);
  const total = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);
  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const isGuest = !currentUser || currentUser.role === "guest";

  const taxAmount = total * TAX_RATE;
  const grandTotal = total + taxAmount;

  const handlePlaceOrder = () => {
    dispatch(
      checkoutProducts(
        items.map((item) => ({ id: item.id, quantity: item.quantity })),
      ),
    );
    dispatch(clearCart());
    setOrderPlaced(true);
  };

  const savedDetails = currentUser?.username
    ? loadState(`billingDetails_${currentUser.username}`, {})
    : {};

  const formik = useFormik({
    initialValues: {
      fullName: savedDetails.fullName || "",
      email: savedDetails.email || "",
      address: savedDetails.address || "",
      city: savedDetails.city || "",
      zipCode: savedDetails.zipCode || "",
      cardName: savedDetails.fullName || "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
    },
    validationSchema,
    onSubmit: () => {
      handlePlaceOrder();
    },
  });

  if (isGuest) {
    return (
      <AccessDenied
        message={
          <>
            Guests cannot checkout.
            <br />
            Please log in to complete your purchase.
          </>
        }
        icon={<CiLock className="h-10 w-10 text-muted-foreground" />}
      />
    );
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center p-4 min-h-[50vh]">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Your Cart Is Empty.
          </h2>
          <p className="text-muted-foreground">
            Add some products before checking out.
          </p>
          <Button asChild size="lg" className="mt-4">
            <Link to="/">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center p-4 min-h-[60vh]">
        <Card className="w-full max-w-md shadow-sm border-muted">
          <CardContent className="flex flex-col items-center text-center pt-10 pb-10 gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-success/20 text-success">
              <TiTick className="h-16 w-16" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Order Placed!</h2>
            <p className="text-base text-muted-foreground">
              Thank you for your order. Your items will be delivered soon.
            </p>
            <Button asChild size="lg" className="mt-4 w-full sm:w-auto">
              <Link to="/">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(" ") || "";
    formik.setFieldValue("cardNumber", formatted);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    let formatted = value;
    if (value.length > 2) {
      formatted = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    formik.setFieldValue("cardExpiry", formatted);
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) value = value.slice(0, 3);
    formik.setFieldValue("cardCvv", value);
  };

  const getInputProps = (field) => ({
    id: field,
    name: field,
    value: formik.values[field],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    className: `h-11 ${formik.touched[field] && formik.errors[field] ? "border-destructive focus-visible:ring-destructive" : ""}`,
  });

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
              <BreadcrumbLink href="/cart">Cart</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          {/* Order Items */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle>Order Items ({itemCount})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col divide-y">
                {items.map((item) => (
                  <div key={item.id} className="flex py-4 gap-4 items-center">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-base line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                    <div className="font-semibold text-base shrink-0">
                      ${item.subtotal}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Checkout Form */}
          <form id="checkout-form" onSubmit={formik.handleSubmit} noValidate>
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle>Billing Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      type="text"
                      placeholder={savedDetails.fullName || "John Doe"}
                      {...getInputProps("fullName")}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                      <p className="text-xs text-destructive font-medium">
                        {formik.errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      type="email"
                      placeholder={savedDetails.email || "john@example.com"}
                      {...getInputProps("email")}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-xs text-destructive font-medium">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Street Address (Optional)</Label>
                    <Input
                      type="text"
                      placeholder={savedDetails.address || "123 Main St"}
                      {...getInputProps("address")}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <p className="text-xs text-destructive font-medium">
                        {formik.errors.address}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">Town / City (Optional)</Label>
                    <Input
                      type="text"
                      placeholder={savedDetails.city || "New York"}
                      {...getInputProps("city")}
                    />
                    {formik.touched.city && formik.errors.city && (
                      <p className="text-xs text-destructive font-medium">
                        {formik.errors.city}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode">
                      Postal Code / ZIP (Optional)
                    </Label>
                    <Input
                      type="text"
                      placeholder={savedDetails.zipCode || "10001"}
                      {...getInputProps("zipCode")}
                    />
                    {formik.touched.zipCode && formik.errors.zipCode && (
                      <p className="text-xs text-destructive font-medium">
                        {formik.errors.zipCode}
                      </p>
                    )}
                  </div>
                </div>

                <div className="py-2">
                  <Separator />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold tracking-tight">
                    Payment Method
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <RiVisaLine className="h-8 w-8" />
                    <RiMastercardLine className="h-8 w-8" />
                    <FaRegCreditCard className="h-6 w-6 ml-1" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="cardName">Cardholder Name *</Label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      {...getInputProps("cardName")}
                    />
                    {formik.touched.cardName && formik.errors.cardName && (
                      <p className="text-xs text-destructive font-medium">
                        {formik.errors.cardName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      type="text"
                      placeholder="4111 2222 3333 4444"
                      id="cardNumber"
                      name="cardNumber"
                      value={formik.values.cardNumber}
                      onChange={handleCardNumberChange}
                      onBlur={formik.handleBlur}
                      className={`h-11 ${formik.touched.cardNumber && formik.errors.cardNumber ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    />
                    {formik.touched.cardNumber && formik.errors.cardNumber && (
                      <p className="text-xs text-destructive font-medium">
                        {formik.errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Expiration Date *</Label>
                    <Input
                      type="text"
                      placeholder="MM/YY"
                      id="cardExpiry"
                      name="cardExpiry"
                      value={formik.values.cardExpiry}
                      onChange={handleExpiryChange}
                      onBlur={formik.handleBlur}
                      className={`h-11 ${formik.touched.cardExpiry && formik.errors.cardExpiry ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    />
                    {formik.touched.cardExpiry && formik.errors.cardExpiry && (
                      <p className="text-xs text-destructive font-medium">
                        {formik.errors.cardExpiry}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardCvv">CVC / CVV *</Label>
                    <Input
                      type="password"
                      placeholder="123"
                      id="cardCvv"
                      name="cardCvv"
                      value={formik.values.cardCvv}
                      onChange={handleCvvChange}
                      onBlur={formik.handleBlur}
                      className={`h-11 ${formik.touched.cardCvv && formik.errors.cardCvv ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    />
                    {formik.touched.cardCvv && formik.errors.cardCvv && (
                      <p className="text-xs text-destructive font-medium">
                        {formik.errors.cardCvv}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>

        <div className="w-full lg:w-80 xl:w-96 shrink-0">
          <Card className="sticky top-24 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle>Price Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">
                  Subtotal ({itemCount} items):
                </span>
                <span className="font-medium">${total}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Shipping:</span>
                <span className="font-medium text-success">Free</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">
                  Tax ({(TAX_RATE * 100).toFixed(0)}%):
                </span>
                <span className="font-medium">${taxAmount.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Grand Total:</span>
                <span className="text-primary">${grandTotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-2 pb-6 flex-col gap-4">
              <Button
                type="submit"
                form="checkout-form"
                className="w-full h-12 text-base font-semibold"
                disabled={formik.isSubmitting}
              >
                Place Order
              </Button>
              <Button asChild variant="ghost" className="w-full">
                <Link to="/cart">Back to Cart</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

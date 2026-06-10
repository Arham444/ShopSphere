import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../features/auth/authSlice";
import authData from "../features/auth/authData.json";
import { loadState, saveState } from "../utils/localStorage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  fullName: Yup.string().required("Full name is required"),
  address: Yup.string().required("Street address is required"),
  city: Yup.string().required("Town/City is required"),
  zipCode: Yup.string().required("Postal Code / ZIP is required"),
});

function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      address: "",
      city: "",
      zipCode: "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus(null);

      const localUsers = loadState("registeredUsers", []);
      const trimmedUsername = values.username.trim();
      const trimmedEmail = values.email.trim();

      const existsStatic = authData.users.some(
        (u) => u.username.toLowerCase() === trimmedUsername.toLowerCase(),
      );
      const existsLocal = localUsers.some(
        (u) =>
          u.username.toLowerCase() === trimmedUsername.toLowerCase() ||
          u.email?.toLowerCase() === trimmedEmail.toLowerCase(),
      );

      if (existsStatic || existsLocal) {
        setStatus("Username or email is already registered.");
        setSubmitting(false);
        return;
      }

      const newUser = {
        username: trimmedUsername,
        email: trimmedEmail,
        password: values.password,
        role: "user",
      };

      saveState("registeredUsers", [...localUsers, newUser]);

      const billingDetails = {
        fullName: values.fullName.trim(),
        email: trimmedEmail,
        address: values.address.trim(),
        city: values.city.trim(),
        zipCode: values.zipCode.trim(),
      };

      saveState(`billingDetails_${trimmedUsername}`, billingDetails);

      dispatch(
        login({
          user: { username: newUser.username, role: newUser.role },
          cartItems: [],
          wishListItems: [],
        }),
      );
      navigate("/");
    },
  });

  const getInputProps = (field) => ({
    id: field,
    name: field,
    value: formik.values[field],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    className: `h-11 ${formik.touched[field] && formik.errors[field] ? "border-destructive focus-visible:ring-destructive" : ""}`,
  });

  return (
    <div className="flex flex-1 items-center justify-center p-4 py-12 bg-muted/40 min-h-[calc(100vh-140px)]">
      <Card className="w-full max-w-2xl shadow-lg border-0">
        <CardHeader className="p-8 pb-6 border-b">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Create your account
          </CardTitle>
          <CardDescription className="text-base">
            Join ShopSphere to start shopping
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8 pt-6">
          {formik.status && (
            <div className="p-3 mb-6 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20 font-medium">
              {formik.status}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} noValidate className="space-y-8">
            {/* ─── Account Details ─── */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold tracking-tight">
                Account Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    type="text"
                    placeholder="johndoe"
                    {...getInputProps("username")}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <p className="text-xs text-destructive font-medium">
                      {formik.errors.username}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...getInputProps("email")}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-xs text-destructive font-medium">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    type="password"
                    placeholder="Min. 6 characters"
                    {...getInputProps("password")}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-xs text-destructive font-medium">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    type="password"
                    placeholder="Re-enter password"
                    {...getInputProps("confirmPassword")}
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <p className="text-xs text-destructive font-medium">
                        {formik.errors.confirmPassword}
                      </p>
                    )}
                </div>
              </div>
            </div>

            {/* ─── Billing Details ─── */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold tracking-tight">
                  Billing Details
                </h3>
                <p className="text-sm text-muted-foreground">
                  This will be used to pre-fill your checkout information
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    {...getInputProps("fullName")}
                  />
                  {formik.touched.fullName && formik.errors.fullName && (
                    <p className="text-xs text-destructive font-medium">
                      {formik.errors.fullName}
                    </p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    type="text"
                    placeholder="123 Main St"
                    {...getInputProps("address")}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <p className="text-xs text-destructive font-medium">
                      {formik.errors.address}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Town / City *</Label>
                  <Input
                    type="text"
                    placeholder="New York"
                    {...getInputProps("city")}
                  />
                  {formik.touched.city && formik.errors.city && (
                    <p className="text-xs text-destructive font-medium">
                      {formik.errors.city}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">Postal Code / ZIP *</Label>
                  <Input
                    type="text"
                    placeholder="10001"
                    {...getInputProps("zipCode")}
                  />
                  {formik.touched.zipCode && formik.errors.zipCode && (
                    <p className="text-xs text-destructive font-medium">
                      {formik.errors.zipCode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignupPage;

import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../features/auth/authSlice";
import authData from "../features/auth/authData.json";
import { loadState, saveState } from "../utils/localStorage";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { IoCartOutline } from "react-icons/io5";

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
  address: Yup.string(),
  city: Yup.string(),
  zipCode: Yup.string(),
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
    className:
      formik.touched[field] && formik.errors[field]
        ? "border-destructive focus-visible:ring-destructive"
        : "",
  });

  return (
    <div className="grid flex-1 w-full lg:grid-cols-[1fr_1.2fr]">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center lg:justify-start lg:pl-[5%] xl:pl-[10%]">
          <div className="w-full max-w-xl">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-1 text-center mb-2">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-sm text-muted-foreground">
                  Join ShopSphere to start shopping
                </p>
              </div>

              {formik.status && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20 font-medium">
                  {formik.status}
                </div>
              )}

              <form
                onSubmit={formik.handleSubmit}
                noValidate
                className="flex flex-col gap-8"
              >
                {/* Account Details Section */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-semibold tracking-tight border-b pb-2">
                    Account Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
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

                    <div className="flex flex-col gap-2">
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

                    <div className="flex flex-col gap-2">
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

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="confirmPassword">
                        Confirm Password *
                      </Label>
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

                {/* Billing Details Section */}
                <div className="flex flex-col gap-4">
                  <div className="border-b pb-2">
                    <h3 className="text-lg font-semibold tracking-tight">
                      Billing Details
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      This will be used to pre-fill your checkout information
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2 md:col-span-2">
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

                    <div className="flex flex-col gap-2 md:col-span-2">
                      <Label htmlFor="address">Street Address (Optional)</Label>
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

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="city">Town / City (Optional)</Label>
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

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="zipCode">
                        Postal Code / ZIP (Optional)
                      </Label>
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
                  className="w-full h-11"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting
                    ? "Creating Account..."
                    : "Create Account"}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-2">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden lg:block p-6 lg:p-10 xl:p-12 bg-background">
        <div className="h-full w-full relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border/50 bg-muted">
          <img
            src="https://res.cloudinary.com/dnwohqbqt/image/upload/v1780936259/login_illustration_usvffb.jpg"
            alt="ShopSphere shopping illustration"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.7]"
          />
        </div>
      </div>
    </div>
  );
}

export default SignupPage;

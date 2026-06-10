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
import AuthLayout from "../components/AuthLayout";
import BillingForm, { billingValidationSchema } from "../components/BillingForm";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  ...billingValidationSchema,
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
    <AuthLayout maxWidth="max-w-xl" pl="lg:pl-[5%] xl:pl-[10%]">
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

                  <BillingForm formik={formik} getInputProps={getInputProps} />
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
    </AuthLayout>
  );
}

export default SignupPage;

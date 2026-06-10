import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../features/auth/authSlice";
import authData from "../features/auth/authData.json";
import { loadState, saveState } from "../utils/localStorage";
import styles from "./SignupPage.module.css";

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

  const getInputClass = (field) =>
    `${styles.input} ${formik.touched[field] && formik.errors[field] ? styles.inputError : ""}`;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Create your account</h1>
          <p className={styles.subtitle}>
            Join ShopSphere to start shopping
          </p>
        </div>

        {formik.status && (
          <div className={styles.errorAlert}>{formik.status}</div>
        )}

        <form onSubmit={formik.handleSubmit} className={styles.form} noValidate>
          {/* ─── Account Details ─── */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Account Details</h3>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Username *</label>
                <input
                  type="text"
                  name="username"
                  placeholder="johndoe"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={getInputClass("username")}
                />
                {formik.touched.username && formik.errors.username && (
                  <span className={styles.errorText}>
                    {formik.errors.username}
                  </span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={getInputClass("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <span className={styles.errorText}>
                    {formik.errors.email}
                  </span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Password *</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Min. 6 characters"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={getInputClass("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <span className={styles.errorText}>
                    {formik.errors.password}
                  </span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={getInputClass("confirmPassword")}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <span className={styles.errorText}>
                      {formik.errors.confirmPassword}
                    </span>
                  )}
              </div>
            </div>
          </div>

          {/* ─── Billing Details ─── */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Billing Details</h3>
            <p className={styles.sectionSubtitle}>
              This will be used to pre-fill your checkout information
            </p>
            <div className={styles.formGrid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={getInputClass("fullName")}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <span className={styles.errorText}>
                    {formik.errors.fullName}
                  </span>
                )}
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Street Address *</label>
                <input
                  type="text"
                  name="address"
                  placeholder="123 Main St"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={getInputClass("address")}
                />
                {formik.touched.address && formik.errors.address && (
                  <span className={styles.errorText}>
                    {formik.errors.address}
                  </span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Town / City *</label>
                <input
                  type="text"
                  name="city"
                  placeholder="New York"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={getInputClass("city")}
                />
                {formik.touched.city && formik.errors.city && (
                  <span className={styles.errorText}>
                    {formik.errors.city}
                  </span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Postal Code / ZIP *</label>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="10001"
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={getInputClass("zipCode")}
                />
                {formik.touched.zipCode && formik.errors.zipCode && (
                  <span className={styles.errorText}>
                    {formik.errors.zipCode}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className={styles.loginPrompt}>
          Already have an account?{" "}
          <Link to="/login" className={styles.loginLink}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import PropTypes from "prop-types";
import * as Yup from "yup";

export const billingValidationSchema = {
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string(),
  city: Yup.string(),
  zipCode: Yup.string(),
};

function BillingForm({ formik, getInputProps }) {
  return (
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
        <Label htmlFor="zipCode">Postal Code / ZIP (Optional)</Label>
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
  );
}

BillingForm.propTypes = {
  formik: PropTypes.object.isRequired,
  getInputProps: PropTypes.func.isRequired,
};

export default BillingForm;

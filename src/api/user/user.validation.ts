import * as yup from "yup";

export const UserSignUpSchema = yup.object({
  name: yup.string().min(3).max(100).required("Name is required"),
  username: yup.string().min(3).max(50).required("Username is required"),
  email: yup.string().email().required("Email is required"),
  mobilenumber: yup
    .string()
    .matches(/^[0-9]{10,15}$/, "Mobile number must be 10-15 digits")
    .required("Mobile number is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  pincode: yup
    .string()
    .matches(/^[0-9]{4,10}$/, "Pincode must be 4-10 digits")
    .required("Pincode is required"),
  address: yup.string().required("Address is required"),
  role: yup
    .string()
    .oneOf(["admin", "teacher", "student", "staff", "finance"])
    .required("Role is required"),
});

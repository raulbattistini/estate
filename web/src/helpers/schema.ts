import * as yup from "yup";

export const newsletterSchema = yup.object().shape({
  emailNotification: yup.string().email("Insert a valid email.").required("Type your email to get informed."),
});

export const registerUserFirst = yup.object().shape({
  name: yup
    .string()
    .required("Please insert your name...")
    .min(8, "Must be above 8 letters")
    .max(90, "Must have less than 90 letters."),
  email: yup.string().email("Insert a valid email.").required("Fill in with your email."),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref("email"), null], "Emails must be equal.")
    .required("You must confirm your email."),
  password: yup.string().required("You must create a password."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "The passwords don't match.")
    .required("You must confirm your password."),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Type a valid email.").required("You must fill this field"),
  password: yup.string().required("You must fill this field.")
});

import { emailPasswordSignUp } from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { doesEmailExist } from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { emailPasswordSignIn } from "supertokens-web-js/recipe/thirdpartyemailpassword";

async function signInClicked(email: string, password: string) {
  try {
    let response = await emailPasswordSignIn({
      formFields: [
        {
          id: "email",
          value: email,
        },
        {
          id: "password",
          value: password,
        },
      ],
    });

    if (response.status === "FIELD_ERROR") {
      response.formFields.forEach((formField) => {
        if (formField.id === "email") {
          window.alert(formField.error);
        }
      });
    } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
      window.alert("Email password combination is incorrect.");
    } else {
      window.location.href = "/welcome";
    }
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      window.alert(err.message);
    } else {
      window.alert("Oops! Something went wrong.");
    }
  }
}
async function checkEmail(email: string) {
  try {
    let response = await doesEmailExist({
      email,
    });

    if (response.doesExist) {
      window.alert("Email already exists. Please sign in instead");
    }
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      window.alert(err.message);
    } else {
      window.alert("Oops! Something went wrong.");
    }
  }
}

async function signUpClicked(email: string, password: string) {
  try {
    let response = await emailPasswordSignUp({
      formFields: [
        {
          id: "email",
          value: email,
        },
        {
          id: "password",
          value: password,
        },
      ],
    });

    if (response.status === "FIELD_ERROR") {
      response.formFields.forEach((formField) => {
        if (formField.id === "email") {
          window.alert(formField.error);
        } else if (formField.id === "password") {
          window.alert(formField.error);
        }
      });
    } else {
      window.location.href = "/welcome";
    }
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      window.alert(err.message);
    } else {
      window.alert("Oops! Something went wrong.");
    }
  }
}

export { checkEmail, doesEmailExist, emailPasswordSignIn, emailPasswordSignUp, signInClicked, signUpClicked };

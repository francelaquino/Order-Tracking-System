import { POST, request } from "../../api/ApiAdapter";

export const ClientResetPassword = async (formValue) => {
  try {
    const result = await request("authorization/clientforgotpassword", POST, {
      Email: formValue.Email,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
};

export const ClientResetPasswordRequest = async (formValue) => {
  try {
    const result = await request("authorization/clientresetpassword", POST, {
      Newpassword: formValue.Newpassword,
      Customerid: formValue.Customerid,
      Id: formValue.Id,
      Token: formValue.Token,
      Currentpassword: "",
    });

    return result;
  } catch (e) {
    console.log(e);
  }
};

export const ClientCheckPassworResetRequest = async (formValue) => {
  try {
    const result = await request(
      "authorization/clientcheckresetrequest",
      POST,
      {
        Newpassword: formValue.Newpassword,
        Customerid: formValue.Customerid,
        Id: formValue.Id,
        Token: formValue.Token,
        Currentpassword: "",
      }
    );

    return result;
  } catch (e) {
    console.log(e);
  }
};

export const AuthenticateClient = async (formValue) => {
  try {
    const result = await request("auth/client", POST, {
      Username: formValue.Username,
      Password: formValue.Password,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
};

export const AuthenticateAdmim = async (formValue) => {
  try {
    const result = await request("auth/admin", POST, {
      Username: formValue.Username,
      Password: formValue.Password,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
};

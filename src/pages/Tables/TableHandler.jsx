import { POST, request } from "../../api/ApiAdapter";
import moment from "moment";

export const CreateNewTable = async (formValue, user) => {
  try {
    const currentDate = moment().format();
    const result = await request("table/add", POST, {
      Id: "",
      Tablename: formValue.Tablename,
      Tag: formValue.Tag,
      Description: formValue.Description,
      Active: formValue.Active,
      Datecreated: currentDate,
      Password: formValue.Password,
      Createdby: user.Userid,
      Dateupdated: currentDate,
      Updatedby: user.Userid,
      Customerid: user.Customerid,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
};

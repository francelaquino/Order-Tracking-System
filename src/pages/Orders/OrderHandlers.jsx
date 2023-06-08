import { GET, POST, request } from "../../api/ApiAdapter";

export const UpdateOrder = async (Orderno, Deviceid, Customerid) => {
  try {
    const result = await request("reader/updateorderno", POST, {
      Orderno: Orderno,
      Deviceid: Deviceid,
      Customerid: Customerid,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
};

export const LoadOrders = async (Customerid, Offset, Pagesize) => {
  try {
    const result = await request(
      `reader/getorders/` + Customerid + `/` + Offset + `/` + Pagesize,
      GET
    );

    return result;
  } catch (e) {
    console.log(e);
  }
};

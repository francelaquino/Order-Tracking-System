import { GET, POST, request } from "../../api/ApiAdapter";

export const GetDeviceUtilization = async (customerId, dateFrom, dateTo) => {
  try {
    const result = await request("reader/deviceutilization", POST, {
      Customerid: customerId,
      Datefrom: dateFrom,
      Dateto: dateTo,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
};

export const GetDeviceUtilizationDetails = async (
  customerId,
  dateFrom,
  dateTo,
  deviceId
) => {
  try {
    const result = await request("reader/deviceutilizationdetails", POST, {
      Customerid: customerId,
      Datefrom: dateFrom,
      Dateto: dateTo,
      Deviceid: deviceId,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
};

export const GetTableUtilization = async (customerId, dateFrom, dateTo) => {
  try {
    const result = await request("reader/tableutilization", POST, {
      Customerid: customerId,
      Datefrom: dateFrom,
      Dateto: dateTo,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
};

export const FetchDeviceHeartbit = async (customerId) => {
  try {
    const result = await request("reader/getdeviceheartbit/" + customerId, GET);

    return result;
  } catch (e) {
    console.log(e);
  }
};

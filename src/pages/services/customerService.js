import _ from 'lodash'
import axios from "axios";
const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Yzg4ZjAwZi0wYWI4LTExZWUtOGZjOC0wYTU0NDNmNmE5NzgiLCJlbnRpdHlUeXBlIjoidXNlciIsInYiOiIwLjEiLCJpYXQiOjE3MDY1MDcxNjMsImV4cCI6MTczODA2NDc2M30.DLWxMAdaupi_559pwGdQyVH_rmQWS1zr_FZUJWp_w9U'

const getCustomers = async (filters) => {
  try {
    console.log('filters',filters)
    const customers = await axios.get(`https://cgv2.creativegalileo.com/api/V1/customer/filter?paginated=true&pageNo=1&pageSize=50`, {
      //Adding token to the request
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const results =  _.get(customers,'data.data')
    return results;
  } catch (e) {
    const msg = e?.response?.error.message ?? e?.message ?? "Unknown Error";
    console.error(msg);
    return false;
  }
};

export default getCustomers;

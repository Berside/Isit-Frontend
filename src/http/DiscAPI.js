import {$authHost, $host} from "./index";
export const GetAllDisc = async () => {
    const {data} = await $host.get('v1/discipline/getMany')
    console.log(data);
    return data;
}
export const GetDiscByID= async (id) => {
    const {data} = await $host.get('v1/discipline/getOne', {
      params: {
          id: id  
          }
      })
    console.log(data);
    return data;
}
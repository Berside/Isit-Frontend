import {$authHost, $host} from "./index";
export const GetAllDisc = async () => {
    const {data} = await $host.get('v1/discipline/getMany')
    return data;
}
export const GetDiscByID= async (id) => {
    const {data} = await $host.get('v1/discipline/getOne', {
      params: {
          id: id  
          }
      })
    return data;
}
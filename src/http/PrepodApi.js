import {$authHost, $host} from "./index";
export const GetAllProf = async () => {
    const {data} = await $host.get('v1/professor/getMany')
    console.log(data);
    return data;
}
export const GetProfById = async (id) => {
    const {data} = await $host.get('v1/professor/getOne', {
      params: {
          id: id  
          }
      })
    console.log(data);
    return data;
}
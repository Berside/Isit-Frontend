import {$authHost, $host} from "./index";
export const GetAllGrade = async (userID) => {
    const {data} = await $host.get('v1/grade/getMany', {
      params: {
          user_id: userID  
          }
      })
    console.log(data);
    return data;
}

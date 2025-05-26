import {$authHost, $host} from "./index";
export const GetAllDisc = async () => {
    const {data} = await $host.get('v1/discipline/getMany')
    console.log(data);
    return data;
}

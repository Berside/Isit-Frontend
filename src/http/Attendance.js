import {$authHost, $host} from "./index";
export const GetAttendByID= async (id) => {
    const {data} = await $host.get('v1/attendance/getMany', {
      params: {
          student_id: id  
          }
      })
    return data;
}
export const GetAttendByProfid= async (id) => {
    const {data} = await $host.get('v1/attendance/getMany')
    return data;
}
export const CreateAttend = async (student_id, discipline_id, date, visited) => {
    const {data} = await $authHost.post('v1/attendance/create', {student_id, discipline_id, date, visited})
    return data
}

export const UpdateAttend = async (id, visited) => {
    const {data} = await $authHost.patch('v1/attendance/update', {id, visited})
    return data
}
export const DeleteAttend = async (id) => {
    const {data} = await $authHost.delete('v1/attendance/delete', {
      params: {
        id: id
      }
    })
    return data
}

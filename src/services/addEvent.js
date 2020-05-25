// import request from 'umi-request';
import request from '@/utils/request';
export async function addEvent(event) {
    return request.post("/v1/event/addEvent", { data:event })
}

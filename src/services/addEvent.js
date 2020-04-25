import request from 'umi-request';
export async function addEvent(event) {
    return request.post("http://localhost:8080/addEvent", { data:event })
}

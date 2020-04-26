import request from 'umi-request';
export function getWordCloudData(params) {
  return request("/api/wordCloud")
}


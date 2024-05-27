import axios from 'axios';

export function getRootTags() {
  return axios.get<string>('/api/user/tags/rootTags');
}

export interface childTagData {
  title: string;
}
export function getChildTags(data: childTagData) {
  return axios.post<string>('/api/user/tags/childTags', data);
}

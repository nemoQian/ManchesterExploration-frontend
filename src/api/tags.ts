import axios from 'axios';

export function getRootTags() {
  return axios.get<string>('/api/tags/rootTags');
}

export interface childTagData {
  title: string;
}
export function getChildTags(data: childTagData) {
  return axios.post<string>('/api/tags/childTags', data);
}

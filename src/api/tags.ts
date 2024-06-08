import axios from 'axios';

export function getRootTags() {
  return axios.get<string>('/api/user/tags/rootTags');
}

export interface childTagData {
  title: string;
}

export interface tagWaitingList {
  placeName: string;
  osmId: number;
}
export function getChildTags(data: childTagData) {
  return axios.post<string>('/api/user/tags/childTags', data);
}

export function addTagWaitingList(data: tagWaitingList) {
  return axios.post('/api/user/placeTags/addWaitingList', data);
}

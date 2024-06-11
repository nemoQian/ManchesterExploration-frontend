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

export interface placeTagWaitingList {
  id: string;
  osmId: number;
  tagName: string;
  placeName: string;
  tagVisibility: number;
  parentTags: [] | string;
  tagBelongs: [] | string
  createDate: string;
}

export interface placeTagInsertRequest {
  id: string;
  osmId: number;
  tagName: string;
  tagParentId: number;
  tagVisibility: number;
  tagBelongs: number;
}

export interface ListParams extends Partial<placeTagWaitingList> {
  current: number;
  pageSize: number;
}

export interface placeTagGroupOptionRequest {
  tagBelongs: number,
  tagShownState: number,
}

export interface deleteRequest {
  id: number,
}
export function getChildTags(data: childTagData) {
  return axios.post<string>('/api/user/tags/childTags', data);
}

export function addTagWaitingList(data: tagWaitingList) {
  return axios.post('/api/user/placeTags/addWaitingList', data);
}

export function queryWaitingList(params: ListParams) {
  return axios.post('/api/user/placeTags/queryWaitingList', params);
}

export function queryPlaceTagGroupOption(data: placeTagGroupOptionRequest){
  return axios.post('/api/user/placeTags/queryGroupTagsOption', data);
}

export function insertNewPlaceTag(data: placeTagInsertRequest){
  return axios.post('/api/user/placeTags/insertNewPlaceTag', data);
}

export function deleteNewPlaceTag(data: number){
  return axios.get<number>('/api/user/placeTags/deleteNewPlaceTag', {
    params: data,
  });
}

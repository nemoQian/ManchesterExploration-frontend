import axios from 'axios';


export interface placeInfo {
  buildingName: string;
  lnglat: [];
  description: [];
}

export interface searchData {
  searchName: string;
  searchCategories: string;
  searchTag: string;
}

export interface selectTree {
  label: string;
  value: string;
}
export function searchPlace(data: searchData) {
  return axios.post<placeInfo[]>('/api/map/place/search', data);
}

export function getSelectTree() {
  return axios.get<selectTree[]>('/api/map/place/categoriesList');
}

export function getPlaceTagTree() {
  return axios.get<string>('/api/user/placeTags/list');
}

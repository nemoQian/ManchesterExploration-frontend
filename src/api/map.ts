import axios from 'axios';


export interface placeInfo {
  buildingName: string;
  lnglat: [];
}

export interface searchData {
  searchName: string;
  searchTag: string;
}
export function searchPlace(data: searchData) {
  return axios.post<placeInfo[]>('/api/map/place/search', data);
}

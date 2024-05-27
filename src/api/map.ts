import axios from 'axios';


export interface buildingInfo {
  buildingName: string;
  lnglat: [];
}

export interface buildingName {
  title: string;
}
export function searchBuilding(data: buildingName) {
  return axios.post<buildingInfo[]>('/api/map/building/search', data);
}

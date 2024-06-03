import axios from 'axios';
import qs from "query-string";
import { TagUserListRes } from "@/api/tagUserList";

export interface BasicGroupModel {
  groupName: string | undefined;
  groupDescription: string | undefined;
  groupVisibility: string | number | undefined;
}

export interface groupList {
  id: string;
  groupName: string;
  groupVisibility: number;
  groupCreateDate: string;
  groupDescription: [] | string;
}

export interface ListParams extends Partial<groupList> {
  current: number;
  pageSize: number;
}

export function createGroup(data: BasicGroupModel) {
  return axios.post('/api/user/group/addGroup', data);
}

export function queryGroupList(params: ListParams) {
  return axios.post('/api/user/group/groupList', params);
}

export function joinTheGroup(data: groupList) {
  return axios.post('/api/user/group/join', data);
}

export function searchGroupList(params: ListParams) {
  return axios.get<groupList>('/api/user/group/searchGroupList', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

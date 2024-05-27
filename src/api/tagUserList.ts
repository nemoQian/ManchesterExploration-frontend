import axios from 'axios';
import qs from 'query-string';

export interface TagUserList {
  id: string;
  nickname: string;
  gender: number;
  updateDate: string;
  tags: [] | string;
  userId: number;
}

export interface ListParams extends Partial<TagUserList> {
  current: number;
  pageSize: number;
}

export interface TagUserListRes {
  list: TagUserList[];
  total: number;
}

export function queryTagUserList(params: ListParams) {
  return axios.get<TagUserListRes>('/api/user/tagUserList', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

import axios from 'axios';

export interface MyProjectRecord {
  id: number;
  name: string;
  description: string;
  peopleNumber: number;
  contributors: {
    name: string;
    email: string;
    avatar: string;
  }[];
}
export function queryMyProjectList() {
  return axios.post('/api/user/my-project/list');
}

export interface MyTeamRecord {
  id: number;
  avatar: string;
  name: string;
  peopleNumber: number;
}
export function queryMyTeamList() {
  return axios.post('/api/user/my-team/list');
}

export interface LatestActivity {
  id: number;
  title: string;
  description: string;
  avatar: string;
}
export function queryLatestActivity() {
  return axios.post<LatestActivity[]>('/api/user/latest-activity');
}

export function saveUserInfo() {
  return axios.post('/api/user/save-info');
}

export interface BasicInfoModel {
  email: string | undefined;
  nickname: string | undefined;
  gender: string | number | undefined;
  phone: string | undefined;
}

export function updateUserInfo(data: BasicInfoModel) {
  return axios.post('/api/user/updateUserInfo', data);
}

export function userUploadApi(
  avatar: FormData,
  config: {
    controller: AbortController;
    onUploadProgress?: (progressEvent: any) => void;
  }
) {
  console.log(avatar.get('avatar'));
  return axios.post('/api/user/updateAvatar', avatar);
}

export function updateUserTags(tags: string[]){
  return axios.post('/api/user/updateUserTags', tags);
}
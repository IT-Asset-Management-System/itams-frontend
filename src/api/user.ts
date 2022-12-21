import axios from './axios';
import FormData from 'form-data';

export const updateProfile = async (
  fieldName: string,
  value: string | null,
) => {
  const data = await axios.put('/user/update-profile', { [fieldName]: value });
  return data;
};

export const saveAvatar = async (file: any) => {
  const formData = new FormData();
  formData.append('file', file, file.name);
  const data = await axios.post('/user/save-avatar', formData, {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data`,
    },
  });
  return data;
};

export const getAvatar40 = async () => {
  const data = await axios.get('/user/get-avatar-40x40', {
    responseType: 'arraybuffer',
  });
  return data;
};

export const getAvatar70 = async () => {
  const data = await axios.get('/user/get-avatar-70x70', {
    responseType: 'arraybuffer',
  });
  return data;
};

import { useState } from 'react';
import { auth } from '../api/auth';
import { getAvatar40, getAvatar70 } from '../api/user';
import { blobToImageUrl } from '../helpers/blobToImageUrl';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authContext, setAuthContext] = useState(null);
  const [avatar40, setAvatar40] = useState('');
  const [avatar70, setAvatar70] = useState('');

  const getAuth = async () => {
    setIsLoading(true);
    try {
      const data = await auth();
      setAuthContext(data.data);
      setIsAuthenticated(true);

      const dataImage40 = await getAvatar40();
      const url40 = blobToImageUrl(dataImage40.data);
      setAvatar40(url40);

      const dataImage70 = await getAvatar70();
      const url70 = blobToImageUrl(dataImage70.data);
      setAvatar70(url70);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      const data = await auth();
      setAuthContext(data.data);

      const dataImage40 = await getAvatar40();
      const url40 = blobToImageUrl(dataImage40.data);
      setAvatar40(url40);

      const dataImage70 = await getAvatar70();
      const url70 = blobToImageUrl(dataImage70.data);
      setAvatar70(url70);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    isLoading,
    authContext,
    isAuthenticated,
    avatar40,
    avatar70,
    getAuth,
    updateProfile,
  };
};

import { createContext, useContext, useEffect } from 'react';
import Loading from '../components/Loading';
import { useAuth } from '../hooks/useAuth';

const AuthContext = createContext<any>(null);

function AuthProvider({ children }: any) {
  const {
    isLoading,
    authContext,
    isAuthenticated,
    avatar40,
    avatar70,
    getAuth,
    updateProfile,
  } = useAuth();

  useEffect(() => {
    getAuth();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <AuthContext.Provider
      value={{
        authContext,
        isAuthenticated,
        avatar40,
        avatar70,
        getAuth,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;

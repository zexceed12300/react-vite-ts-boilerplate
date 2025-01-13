import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface AuthorizationProps {
  children: ReactNode;
}

const Authorization = ({ children }: AuthorizationProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const isAuthenticated = () => {
    return user
  };

  return isAuthenticated() ? (
    <>{children}</>
  ) : (
    <div className="w-full bg-white h-full min-h-screen absolute top-0 left-0 flex items-center justify-center text-2xl font-semibold z-[100]">
      401   |   Error Unauthenticated/Unauthorized
    </div>
  );
};

export default Authorization;
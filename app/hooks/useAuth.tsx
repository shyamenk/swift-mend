'use client';

import { account } from '../lib/appWriteConfig';
import { AppwriteException, ID, Models } from 'appwrite';
import { useRouter } from 'next/navigation';
import {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { toast } from 'react-hot-toast';

export interface AuthState {
  user: Models.Preferences | null;
  loading: boolean;
  error: string | null;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  sendMagicLink: (email: string) => Promise<void>;
  updateMagicVerification: (userId: string, secret: string) => Promise<void>;
  updateUserVerification: (userId: string, secret: string) => Promise<void>;
  googleSignIn: () => Promise<void>;
}

const defaultState: AuthState = {
  user: null,
  loading: true,
  error: null,
  logout: async () => {},
  signup: async () => {},
  login: async () => {},
  sendMagicLink: async () => {},
  updateMagicVerification: async () => {},
  updateUserVerification: async () => {},
  googleSignIn: async () => {},
};

const authContext = createContext<AuthState>(defaultState);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Models.Preferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const router = useRouter();

  const loadAccount = async () => {
    try {
      const loadedAccount = await account.get();
      setUser(loadedAccount);
    } catch (error) {
      console.error(error);
      setError('failed to load user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailSession(email, password);
      await loadAccount();
      router.push('/');
    } catch (error: any) {
      const appwriteException = error as AppwriteException;
      toast.error(appwriteException.message);
    }
  };
  const googleSignIn = async () => {
    try {
      const session = await account.createOAuth2Session(
        'google',
        'http://localhost:3000/',
        'http://localhost:3000/login',
      );
      console.log('from UseAuth', { session });
    } catch (error: any) {
      const appwriteException = error as AppwriteException;
      console.error(appwriteException.message);
    }
  };

  const sendMagicLink = async (email: string) => {
    try {
      await account.createMagicURLSession(
        ID.unique(),
        email,
        `${window.location.origin}/login`,
      );

      toast.success('Please check your Inbox🚀');
    } catch (error: any) {
      const appwriteException = error as AppwriteException;
      console.error(appwriteException.message);
      toast.error(appwriteException.message);
    }
  };

  const updateMagicVerification = async (userId: string, secret: string) => {
    try {
      await account.updateMagicURLSession(userId, secret);
      toast.success('Successfully Verified');
      router.push('/');
    } catch (error: any) {
      const appwriteException = error as AppwriteException;
      console.error(appwriteException.message);
      toast.error(appwriteException.message);
    }
  };

  const updateUserVerification = async (userId: string, secret: string) => {
    try {
      await account.updateVerification(userId, secret);
      toast.success('Successfully Verified');
      router.push('/');
    } catch (error: any) {
      const appwriteException = error as AppwriteException;
      console.error(appwriteException.message);
      toast.error(appwriteException.message);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const session = await account.create('unique()', email, password, name);
      setUser(session);
      await account.createEmailSession(email, password);
      toast.success('SignUp Completed!. Login to continue..');
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
    toast.success('Logout Succesfull');
    router.push('/login');
  };

  useEffect(() => {
    loadAccount();
  }, []);

  return (
    <authContext.Provider
      value={{
        user,
        loading,
        error,
        logout,
        login,
        signup,
        sendMagicLink,
        updateMagicVerification,
        updateUserVerification,
        googleSignIn,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext<AuthState>(authContext);
  return context;
};

/* eslint-disable @typescript-eslint/no-empty-function */
'use client'

import { account, database, storage } from '../lib/appWriteConfig'
import { AppwriteException, ID, Models, Query } from 'appwrite'
import { useRouter } from 'next/navigation'
import {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { toast } from 'react-hot-toast'

export interface AuthState {
  user: Models.Preferences | null
  loading: boolean
  error: string | null
  logout: () => Promise<void>
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  sendMagicLink: (email: string) => Promise<void>
  updateMagicVerification: (userId: string, secret: string) => Promise<void>
  createProfile: (
    userId: string,
    name: string,
    phone: string,
    file?: File | undefined,
    email?: string
  ) => Promise<void>
  updateUserVerification: (userId: string, secret: string) => Promise<void>
  googleSignIn: () => Promise<void>
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
  createProfile: async () => {},
}

const authContext = createContext<AuthState>(defaultState)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Models.Preferences | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const router = useRouter()

  const loadAccount = async () => {
    try {
      setLoading(true)
      const loadedAccount = await account.get()
      setUser(loadedAccount)
    } catch (error) {
      console.error(error)
      setError('failed to load user')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      await account.createEmailSession(email, password)
      await loadAccount()
      router.push('https://swift-mend.vercel.app/')
    } catch (error) {
      const appwriteException = error as AppwriteException
      toast.error(appwriteException.message)
    } finally {
      setLoading(false)
    }
  }

  const googleSignIn = async () => {
    try {
      setLoading(true)
      account.createOAuth2Session(
        'google',
        `https://swift-mend.vercel.app/`,
        'https://swift-mend.vercel.app//login'
      )
    } catch (error) {
      const appwriteException = error as AppwriteException
      console.error(appwriteException.message)
    } finally {
      setLoading(false)
    }
  }

  const sendMagicLink = async (email: string) => {
    try {
      setLoading(true)
      await account.createMagicURLSession(
        ID.unique(),
        email,
        `${window.location.origin}/verify`
      )
      toast.success('Please check your Inbox🚀')
    } catch (error) {
      const appwriteException = error as AppwriteException
      console.error(appwriteException.message)
      toast.error(appwriteException.message)
    } finally {
      setLoading(false)
    }
  }

  const createProfile = async (
    userId: string,
    name: string,
    phone: string,
    file?: File | undefined,
    email?: string
  ) => {
    try {
      setLoading(true)

      if (file) {
        const uploadFileResponse = await storage.createFile(
          '6480b5b17507dd43eb4d',
          userId,
          file
        )
        const imageUrl = storage.getFilePreview(
          '6480b5b17507dd43eb4d',
          uploadFileResponse.$id
        )

        const userData = await database.createDocument(
          '647e2a8404871d451728',
          '64804c178c72b22d2799',
          'unique()',
          {
            userId,
            name,
            phone,
            email,
            imageUrl,
          }
        )
        setUser(userData)
      } else {
        const userData = await database.createDocument(
          '647e2a8404871d451728',
          '64804c178c72b22d2799',
          'unique()',
          {
            userId,
            name,
            phone,
          }
        )
        setUser(userData)
      }
      toast.success(`Profile Created for ${name}`)
      router.push('/')
    } catch (error) {
      toast.error('Profile Creation Failed')
    } finally {
      setLoading(false)
    }
  }

  const updateMagicVerification = async (userId: string, secret: string) => {
    try {
      setLoading(true)
      await account.updateMagicURLSession(userId, secret)

      const profile = await database.listDocuments(
        '647e2a8404871d451728',
        '64804c178c72b22d2799',
        [Query.equal('userId', userId)]
      )

      if (profile.total > 0 && profile.documents.length > 0) {
        profile.documents[0]
        router.push('/')
      } else {
        router.push(`/create-profile?userId=${userId}`)
      }
    } catch (error) {
      const appwriteException = error as AppwriteException
      console.error(appwriteException.message)
      toast.error(appwriteException.message)
    } finally {
      setLoading(false)
    }
  }

  const updateUserVerification = async (userId: string, secret: string) => {
    try {
      setLoading(true)
      await account.updateVerification(userId, secret)
      toast.success('Successfully Verified')
      router.push('/')
    } catch (error) {
      const appwriteException = error as AppwriteException
      console.error(appwriteException.message)
      toast.error(appwriteException.message)
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email: string, password: string, name: string) => {
    try {
      setLoading(true)
      const session = await account.create('unique()', email, password, name)
      setUser(session)
      await account.createEmailSession(email, password)
      toast.success('SignUp Completed!. Login to continue..')
      router.push('/')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await account.deleteSession('current')
      setUser(null)
      toast.success('Logout Succesfull')
      router.push('/login')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAccount()
  }, [])

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
        createProfile,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext<AuthState>(authContext)
  return context
}

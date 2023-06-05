import {Client, Account, ID} from 'appwrite'

export const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)

export const account = new Account(client)

export const getUserData = async () => {
  const response = account.get()
  response.then(
    function (user) {
      return user
    },
    function (error) {
      return error
    },
  )
}

export const logout = async () => {
  try {
    return account.deleteSession('current')
  } catch (error) {
    console.log(error)
  }
}

export const register = async (email: string, password: string) => {
  try {
    const account = new Account(client)
    return account.create('unique()', email, password)
  } catch (error) {
    console.log(error)
  }
}

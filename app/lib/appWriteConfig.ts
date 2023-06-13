import { Client, Account, Avatars, Databases, Storage } from 'appwrite';

export const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

export const account = new Account(client);
export const avatars = new Avatars(client);
export const database = new Databases(client);
export const storage = new Storage(client);

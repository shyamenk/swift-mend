'use client';
import React, { useEffect, useState } from 'react';

import { FaUser } from 'react-icons/fa';
import UserProfieUpdateModal from '../ui/modal';
import { columns } from './complaints/columns';
import { account, database } from '@lib/appWriteConfig';
import { DataTable } from './complaints/data-table';
import { Query } from 'appwrite';
import Image from 'next/image';

export type Complaint = {
  $id: string;
  category: string;
  description: string;
  imageURL: string;
  sub_category: string;
  status: string;
  title: string;
  userId: string;
};

type User = {
  name?: string;
  phone?: string;
  userId?: string | undefined;
  complaints?: any[] | undefined;
  imageUrl?: string | undefined;
  email?: string | undefined;
};

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const UserProfileUpdate = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const fetchComplaints = async () => {
    try {
      const user = await account.get();

      const response = await database.listDocuments(
        '647e2a8404871d451728',
        '647e2af1b52050feb1a8',
        [Query.equal('userId', user?.$id)],
      );

      const convertedComplaints: Complaint[] = response.documents.map(
        (document: any) => {
          const {
            $id,
            category,
            description,
            imageURL,
            sub_category,
            title,
            status,
            userId,
          } = document;
          return {
            $id,
            category,
            description,
            imageURL,
            sub_category,
            title,
            status,
            userId,
          };
        },
      );
      setComplaints(convertedComplaints);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUser = async () => {
    try {
      const user = await account.get();
      const profile = await database.listDocuments(
        '647e2a8404871d451728',
        '64804c178c72b22d2799',
        [Query.equal('userId', user.$id)],
      );
      if (profile.total > 0 && profile.documents.length > 0) {
        const userData = profile.documents[0] as User;
        setUser(userData);
      } else {
        const { name, email, $id } = user;
        const newUserProfile: User = {
          name,
          email,
          userId: $id,
        };
        await database.createDocument(
          '647e2a8404871d451728',
          '64804c178c72b22d2799',
          'unique()',
          newUserProfile,
        );
        setUser(newUserProfile);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchComplaints();
    fetchUser();
  }, []);

  const handleUpdateName = (updatedName: string, phone: string) => {
    if (user) {
      const updatedUser = { ...user, name: updatedName, phone: phone };
      setUser(updatedUser);
    }
  };

  return (
    <section className="w-full sm:p-6 pb-18  ">
      <h2 className="font-medium text-2xl p-8">Personal Information</h2>
      <div className="container mx-auto flex flex-col space-y-28 overflow-hidden grow px-10">
        <fieldset className="grid grid-cols-5 gap-2 rounded-md p-6   bg-brand-blue-50">
          <div className="flex gap-4 col-span-full sm:col-span-2">
            {user?.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt="User Profile"
                className="w-12 h-14 rounded-full"
                width={100}
                height={100}
              />
            ) : (
              <FaUser className="w-12 h-14 text-brand-blue-400" />
            )}
            <div className="col-span-full sm:col-span-2">
              <h2 className="text-2xl font-semibold text-brand-gray-700">
                {user?.name}
              </h2>
              <h4 className="text-brand-gray-400">{user?.email}</h4>
            </div>
          </div>

          <div className="col-span-full sm:col-span-1">
            <h1 className="text-lg font-semibold text-brand-gray-700">Phone</h1>
            <h1 className="text-brand-gray-400">
              {user?.phone ? user.phone : 'N/A'}
            </h1>
          </div>

          <div className="col-span-4 sm:col-span-1 ">
            <button
              onClick={UserProfileUpdate}
              className="block py-2 px-4 text-center text-white font-medium bg-brand-blue-500 duration-150 hover:bg-brand-blue-600 active:bg-brand-blue-700 rounded-lg shadow-lg hover:shadow-none"
            >
              Edit Profile
            </button>
          </div>
          {isModalOpen && (
            <UserProfieUpdateModal
              open={isModalOpen}
              setOpen={setIsModalOpen}
              handleUpdateName={handleUpdateName}
            />
          )}
        </fieldset>
      </div>
      <h2 className="font-medium text-2xl p-8">Complaint Summary</h2>
      <div className="container mx-auto py-6 px-10">
        <DataTable<Complaint, string> columns={columns} data={complaints} />
      </div>
    </section>
  );
};

export default UserProfile;

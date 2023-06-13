'use client';

import { Input } from '@components/ui/input';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@hooks/useAuth';
import { useSearchParams } from 'next/navigation';
import AvatarUpload from '@components/users/AvatarUpload';
import Loading from 'app/complaints/loading';

const formSchema = z.object({
  name: z.string().nonempty({ message: 'Name Required' }),
  phone: z.string().length(10, { message: 'Phone number must be 10 digits' }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const CreateProfile = () => {
  const { createProfile, loading, user } = useAuth();

  const searchParams = useSearchParams();
  const userId = searchParams.get('userId') || '';
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const handleFileUpload = (file: File | undefined) => {
    setUploadedFile(file ?? null);
  };

  const onSubmit = async (data: FormSchemaType) => {
    if (uploadedFile) {
      await createProfile(
        userId,
        data.name,
        data.phone,
        uploadedFile,
        user?.email,
      );
    } else {
      await createProfile(userId, data.name, data.phone, user?.email);
    }
  };

  return (
    <div className="divide-y mx-auto md:px-20 px-6 bg-slate-50 h-screen  divide-gray-200 overflow-hidden rounded-lg shadow">
      {loading && <Loading />}
      {!loading && (
        <>
          <div className=" py-5 md:px-0 px-6 font-semibold text-2xl">
            Create Profile
          </div>
          <div className="rounded-md border border-gray-300 px-3 py-2 shadow-sm  max-w-96">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AvatarUpload onFileUpload={handleFileUpload} />

              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <Input
                type="text"
                id="name"
                {...register('name')}
                placeholder="John Doe"
                className="block w-1/2 flex-1 mb-4  rounded-md border-gray-300 focus:border-brand-blue-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.name && (
                <span className="text-red-500 block mt-2">
                  {errors.name?.message}
                </span>
              )}
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone
              </label>
              <Input
                type="text"
                id="phone"
                {...register('phone')}
                placeholder="+91-000000000"
                className="block w-1/2 flex-1 mb-4  rounded-md px-2 py-3 border-gray-300 focus:border-brand-blue-500 focus:ring-brand-blue-500 sm:text-sm"
              />
              {errors.phone && (
                <span className="text-red-500 block mt-2">
                  {errors.phone?.message}
                </span>
              )}
              <div className="bg-gray-50 mb-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center rounded-md border border-transparent bg-brand-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-blue-600 "
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateProfile;

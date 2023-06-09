'use client';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { Input } from './input';
import { z, ZodError } from 'zod';
import clsx from 'clsx';
import { toast } from 'react-hot-toast';
import { database, storage } from '@lib/appWriteConfig';
import AvatarUpload from '@components/users/AvatarUpload';
import { useAuth } from '@hooks/useAuth';
import { Query } from 'appwrite';

const profileShema = z.object({
  name: z.string().nonempty('Name is required'),
  phone: z.string().nonempty('Phone is required'),
});

interface UserProfieUpdateModalProps {
  setOpen: (isOpen: boolean) => void;
  open: boolean;
  handleUpdateName: (name: string, phone: string) => void;
}

type FormData = z.infer<typeof profileShema>;

export default function UserProfieUpdateModal({
  setOpen,
  open,
  handleUpdateName,
}: UserProfieUpdateModalProps) {
  const [errors, setErrors] = useState<ZodError<FormData> | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const { user } = useAuth();

  const createProfile = async (
    userId: string,
    name: string,
    phone: string,
    imageUrl: string,
  ) => {
    const newProfile = await database.createDocument(
      '647e2a8404871d451728',
      '64804c178c72b22d2799',
      'unique()',
      {
        userId,
        name,
        phone,
        imageUrl,
      },
    );
    handleUpdateName(newProfile?.name, newProfile?.phone);
    toast.success(`Profile Created: ${newProfile?.name}`);
  };

  const updateProfile = async (
    profileId: string,
    name: string,
    phone: string,
    imageUrl: string | null,
  ) => {
    const profileData = { name, phone, imageUrl };
    if (imageUrl) {
      profileData.imageUrl = imageUrl;
    }

    const updatedProfile = await database.updateDocument(
      '647e2a8404871d451728',
      '64804c178c72b22d2799',
      profileId,
      profileData,
    );

    handleUpdateName(updatedProfile?.name, updatedProfile?.phone);
    toast.success(`Profile Updated: ${updatedProfile?.name}`);
  };
  const handleClose = () => {
    setOpen(false);
    setErrors(null);
    setFormData({ name: '', phone: '' });
  };

  const handleFileUpload = (file: File | undefined) => {
    setUploadedFile(file ?? null);
  };

  const handleSubmit = async () => {
    try {
      const validatedData = profileShema.parse(formData);
      const profileQuery = [Query.equal('userId', user?.$id)];
      const { documents } = await database.listDocuments(
        '647e2a8404871d451728',
        '64804c178c72b22d2799',
        profileQuery,
      );

      if (documents.length > 0) {
        const profileId = documents[0].$id;
        if (uploadedFile) {
          const existingFiles = await storage.getFile(
            '6480b5b17507dd43eb4d',
            user?.$id,
          );

          const existingImage = existingFiles.name === uploadedFile.name;

          if (existingImage) {
            return null;
          } else {
            const uploadFileResponse = await storage.createFile(
              '6480b5b17507dd43eb4d',
              user?.$id,
              uploadedFile,
            );
            const imageUrl = storage
              .getFilePreview('6480b5b17507dd43eb4d', uploadFileResponse.$id)
              .toString();
            await updateProfile(
              profileId,
              validatedData.name,
              validatedData.phone,
              imageUrl,
            );
          }
        } else {
          await updateProfile(
            profileId,
            validatedData.name,
            validatedData.phone,
            null,
          );
        }
      } else {
        if (uploadedFile) {
          const existingFiles = await storage.getFile(
            '6480b5b17507dd43eb4d',
            user?.$id,
          );

          const existingImage = existingFiles.name === uploadedFile.name;

          if (existingImage) {
            return null;
          } else {
            const uploadFileResponse = await storage.createFile(
              '6480b5b17507dd43eb4d',
              user?.$id,
              uploadedFile,
            );
            const imageUrl = storage
              .getFilePreview('6480b5b17507dd43eb4d', uploadFileResponse.$id)
              .toString();
            await createProfile(
              user?.$id,
              validatedData.name,
              validatedData.phone,
              imageUrl,
            );
          }
        } else {
          await createProfile(
            user?.$id,
            validatedData.name,
            validatedData.phone,
            '',
          );
        }
      }
      handleClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error);
        toast.error(
          'Unable to update. Something went wrong! Please retry after some time.',
        );
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-700 bg-opacity-80 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-ribbon-200">
                    <BsFillCheckCircleFill
                      className="h-6 w-6 text-brand-ribbon-500"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-brand-gray-900"
                    >
                      Please Update your Profile
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Please take a moment to review and update your profile
                        details to ensure they are accurate and up to date.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <AvatarUpload onFileUpload={handleFileUpload} />
                  <Input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className={clsx(
                      'w-full border-brand-blue-500 focus:border-brand-blue-500 focus:ring-brand-blue-500 rounded-md shadow-sm py-2 px-3',
                      {
                        'border-red-500 ring-red-500': errors?.issues?.find(
                          (issue) => issue.path[0] === 'name',
                        ),
                      },
                    )}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors?.issues?.find(
                    (issue) => issue.path[0] === 'name',
                  ) && (
                    <p className="mt-2 text-sm text-red-500">
                      {
                        errors.issues.find((issue) => issue.path[0] === 'name')
                          ?.message
                      }
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  <Input
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    className={clsx(
                      'w-full border-brand-blue-500 focus:border-brand-blue-500 focus:ring-brand-blue-500 rounded-md shadow-sm py-2 px-3',
                      {
                        'border-red-500 ring-red-500': errors?.issues?.find(
                          (issue) => issue.path[0] === 'phone',
                        ),
                      },
                    )}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors?.issues?.find(
                    (issue) => issue.path[0] === 'phone',
                  ) && (
                    <p className="mt-2 text-sm text-red-500">
                      {
                        errors.issues.find((issue) => issue.path[0] === 'phone')
                          ?.message
                      }
                    </p>
                  )}
                </div>

                <div className="mt-5 sm:mt-6 flex gap-4">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-brand-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:ring-offset-2 sm:text-sm"
                    onClick={handleSubmit}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-brand-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-brand-red-700 focus:outline-none focus:ring-2 focus:ring-brand-red-500 focus:ring-offset-2 sm:text-sm"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

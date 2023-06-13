'use client';

import { Input } from '@components/ui/input';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { database, storage } from '@lib/appWriteConfig';
import { ID, Models, Query } from 'appwrite';
import Loading from 'app/complaints/loading';
import { toast } from 'react-hot-toast';
import { useAuth } from '@hooks/useAuth';

const formSchema = z.object({
  title: z.string().nonempty({ message: 'Title is required' }),
  description: z.string().nonempty({ message: 'Description is required' }),
  category: z.string().nonempty({ message: 'Category is required' }),
  subCategory: z.string().nonempty({ message: 'Sub Category is required' }),
  file: z.any(),
});

type FormSchemaType = z.infer<typeof formSchema>;
const ComplaintForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Models.Document[]>([]);
  const [subcategories, setSubcategories] = useState<Models.Document[]>([]);

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await database.listDocuments(
          '647e2a8404871d451728',
          '647e2a8b7ebef5305d56',
        );

        setCategories(response.documents);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedCategoryId = event.target.value;

    try {
      const response = await database.listDocuments(
        '647e2a8404871d451728',
        '64882001bc60f7795f52',
        [Query.equal('categoryId', selectedCategoryId)],
      );

      setSubcategories(
        response.documents.filter(
          (subcategory) => subcategory.categoryId === selectedCategoryId,
        ),
      );
    } catch (error) {
      console.error('Failed to fetch subcategories:', error);
    }
  };

  const onSubmit = async (data: FormSchemaType) => {
    setIsLoading(true);
    try {
      let imageUrl = '';

      if (data.file && data.file.length > 0) {
        const file = await storage.createFile(
          '64856c3ddafff5bbe66f',
          ID.unique(),
          data.file[0],
        );

        imageUrl = storage
          .getFilePreview('64856c3ddafff5bbe66f', file.$id)
          .toString();
      }

      await database.createDocument(
        '647e2a8404871d451728',
        '647e2af1b52050feb1a8',
        ID.unique(),
        {
          title: data.title,
          description: data.description,
          category: data.category,
          sub_category: data.subCategory,
          userId: user?.$id,
          imageURL: imageUrl || null,
        },
      );
      toast.success('Complaint Successfully Registered..');
    } catch (error: any) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className=" min-h-screen overflow-auto">
        <div className="md:grid md:grid-cols-3 md:gap-6 md:py-20 md:px-20 py-6 px-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-2xl font-medium leading-6 text-brand-blue-700 mb-6">
                Basic Information
              </h3>
              <p className="mt-1 text-base text-gray-600">
                Register your complaint using the form below. Our team will
                review your complaint and take appropriate action.
              </p>
            </div>
          </div>

          {isLoading ? (
            <Loading />
          ) : (
            <div className="mt-5 md:col-span-2 md:mt-0 ">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6  px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Title
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <Input
                            type="text"
                            id="title"
                            {...register('title')}
                            className="block w-full flex-1  rounded-md border-gray-300 focus:border-brand-blue-500 focus:ring-brand-blue-500 sm:text-sm"
                          />
                          {errors.title && (
                            <span className="text-red-500 block mt-2">
                              {errors.title?.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          rows={3}
                          {...register('description')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue-500 focus:ring-brand-blue-500 sm:text-sm"
                        />
                        {errors.description && (
                          <span className="text-red-500 block mt-2">
                            {errors.description?.message}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description about your complaint.
                      </p>
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category
                        </label>

                        <select
                          id="category"
                          {...register('category')}
                          onChange={handleCategoryChange}
                          autoComplete="Complaints"
                          className="mt-1 block w-full rounded-md border border-gray-300  py-2 px-3 shadow-sm focus:border-brand-blue-500 focus:outline-none focus:ring-brand-blue-500 sm:text-sm"
                        >
                          <option value="">--Please choose an option--</option>

                          {categories.map((category) => (
                            <option key={category.$id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        {errors.category && (
                          <span className="text-red-500 block mt-2">
                            {errors.category?.message}
                          </span>
                        )}
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Sub Category
                        </label>
                        <select
                          id="subCategory"
                          {...register('subCategory')}
                          className="mt-1 block w-full rounded-md border border-gray-300  py-2 px-3 shadow-sm focus:border-brand-blue-500 focus:outline-none focus:ring-brand-blue-500 sm:text-sm"
                        >
                          {subcategories.map((subcategory) => (
                            <option
                              key={subcategory.$id}
                              value={subcategory.name}
                            >
                              {subcategory.name}
                            </option>
                          ))}
                        </select>
                        {errors.subCategory && (
                          <span className="text-red-500 block mt-2">
                            {errors.subCategory?.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Add Photos (Optional)
                      </label>
                      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file"
                              className="relative cursor-pointer rounded-md bg-white font-medium text-brand-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-blue-500 focus-within:ring-offset-2 hover:text-brand-blue-500"
                            >
                              <span>Upload a file</span>
                              <input
                                type="file"
                                id="file"
                                accept=".png,.jpg,.jpeg,.gif"
                                multiple={false}
                                {...register('file')}
                                className="sr-only"
                              />
                            </label>
                            {errors.file && (
                              <span className="text-red-500 block mt-2">
                                {String(errors.file?.message)}
                              </span>
                            )}
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 text-right sm:px-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex justify-center rounded-md border border-transparent bg-brand-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:ring-offset-2"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ComplaintForm;

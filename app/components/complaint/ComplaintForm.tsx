'use client';

import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().nonempty({ message: 'Title is required' }),
  description: z.string().nonempty({ message: 'Description is required' }),
  category: z.string().nonempty({ message: 'Category is required' }),
  subCategory: z.string().nonempty({ message: 'Sub Category is required' }),
  file: z.any().refine((value) => value.length > 0, {
    message: 'File is required',
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;
const ComplaintForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchemaType) => {
    console.log(data);
  };

  return (
    <>
      <div className="bg-brand-blue-50">
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
          <div className="mt-5 md:col-span-2 md:mt-0 bg-brand-gray-50">
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
                          className="block w-full flex-1  rounded-md border-gray-300 focus:border-brand-blue-500 focus:ring-indigo-500 sm:text-sm"
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
                      <Textarea
                        id="description"
                        rows={3}
                        {...register('description')}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                        autoComplete="country-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
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
                        autoComplete="country-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
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
                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
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
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Raise and Issue
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplaintForm;

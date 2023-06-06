'use client'

import {Fragment} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/react/24/outline'
import Link from 'next/link'
import {IoHome} from 'react-icons/io5'
import {BiUser} from 'react-icons/bi'
import {useAuth} from '@/app/hooks/useAuth'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function SiteHeader() {
  const {user, logout} = useAuth()

  // TODO:  Make the Necessary Changes to update the userState Magic Link

  const logOutHandler = async () => {
    logout()
  }

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({open}) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 justify-between">
              <div className="flex">
                <Link href="/" className="flex flex-shrink-0 items-center">
                  <IoHome className="block h-8 w-auto lg:hidden text-brand-blue-500" />
                  <IoHome className="hidden h-8 w-auto lg:block  text-brand-blue-500" />
                  <h2 className="pl-2 text-2xl   text-brand-blue-500 font-bruno">
                    Swift Mend
                  </h2>
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8 md:pl-14">
                  <Link
                    href="#"
                    className="  decoration-2 decoration-wavy decoration-brand-blue-500 underline-offset-4 underline inline-flex items-center px-1 pt-1 text-lg font-medium  text-brand-gray-500 hover:text-brand-blue-600"
                  >
                    Home
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex items-center px-1 pt-1 text-lg font-medium text-brand-gray-500 hover:border-brand-gray-300 hover:text-brand-gray-700"
                  >
                    Report
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex items-center  px-1 pt-1 text-lg font-medium text-brand-gray-500 hover:border-brand-gray-300 hover:text-brand-gray-700"
                  >
                    Track
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex items-center  px-1 pt-1 text-lg font-medium text-brand-gray-500 hover:border-brand-gray-300 hover:text-brand-gray-700"
                  >
                    Contact
                  </Link>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-brand-gray-400 hover:text-brand-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon
                    className="h-6 w-6 text-brand-gray-500"
                    aria-hidden="true"
                  />
                </button>

                {user ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-600 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <BiUser className="w-6 h-6 text-brand-gray-500" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({active}) => (
                            <Link
                              href="/user-profile"
                              className={classNames(
                                active ? 'bg-brand-gray-100' : '',
                                'block px-4 py-2 text-sm text-brand-gray-700',
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({active}) => (
                            <Link
                              href="#"
                              className={classNames(
                                active ? 'bg-brand-gray-100' : '',
                                'block px-4 w-full py-2 text-sm text-brand-gray-700',
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({active}) => (
                            <a
                              onClick={logOutHandler}
                              className={classNames(
                                active ? 'bg-brand-gray-100' : '',
                                'block px-4  py-2 text-sm text-brand-gray-700 cursor-pointer',
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link href="/login">Login</Link>
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-brand-gray-400 hover:bg-brand-gray-100 hover:text-brand-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-blue-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-brand-blue-500 bg-brand-blue-50 py-2 pl-3 pr-4 text-base font-medium text-brand-blue-700"
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-brand-gray-500 hover:border-brand-gray-300 hover:bg-brand-gray-50 hover:text-brand-gray-700"
              >
                Report
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-brand-gray-500 hover:border-brand-gray-300 hover:bg-brand-gray-50 hover:text-brand-gray-700"
              >
                Track
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-brand-gray-500 hover:border-brand-gray-300 hover:bg-brand-gray-50 hover:text-brand-gray-700"
              >
                Contact
              </Disclosure.Button>
            </div>
            <div className="border-t border-brand-gray-200 pt-4 pb-3">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <BiUser className="w-6 h-6 text-brand-gray-400" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-brand-gray-800">
                    {user?.name}
                  </div>
                  <div className="text-sm font-medium text-brand-gray-500">
                    {user?.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-brand-gray-400 hover:text-brand-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as="a"
                  href="/user-profile"
                  className="block px-4 py-2 text-base font-medium text-brand-gray-500 hover:bg-brand-gray-100 hover:text-brand-gray-800"
                >
                  Your Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/settings"
                  className="block px-4 py-2 text-base font-medium text-brand-gray-500 hover:bg-brand-gray-100 hover:text-brand-gray-800"
                >
                  Settings
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  onClick={logOutHandler}
                  className="block px-4 py-2 text-base font-medium text-brand-gray-500 hover:bg-brand-gray-100 hover:text-brand-gray-800"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
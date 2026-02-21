// front-endvite/src/pages/Home.jsx 

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from "react-redux";
import { fetchColorsAsync, fetchProductAsync, selectColors, selectProducts, selectCategory, selectSize, fetchCategoryAsync, fetchSizeAsync } from '../features/product/ProductSlice'
import ProductsList from '../components/ProductsList'

const sortOptions = [
  { name: 'Best Rating', order: "desc", sort: "rating" },
  { name: 'Newest', order: "desc", sort: "createdAt" },
  { name: 'Price: Low to High', order: "asc", sort: "discountPrice" },
  { name: 'Price: High to Low', order: "desc", sort: "discountPrice" },
]
const subCategories = [
  { name: 'Footwear', id: "category" },
  { name: 'Nike Plus', id: "category" },
  { name: 'Jordan Brand', id: "category" },
  { name: 'Sports Bras', id: "category" },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filterSet,setFilterSet] = useState({});
  const [optionValues,setOptionValues] = useState([]);
  const [sort,setSort] = useState({});
  const dispatch = useDispatch();

  const colors = useSelector(selectColors);
  const category = useSelector(selectCategory);
  const sizes = useSelector(selectSize);

  function convertNameTOLabel(arr) {
    let newArray = arr.map((item) => {
      return {
        label: item.name,
        value: item.name,
      }
    })
    return newArray;
  }
  const newColors = convertNameTOLabel(colors)
  
  useEffect(()=>{
    dispatch(fetchProductAsync({sort,filters:filterSet}));

  },[dispatch,sort,filterSet])

  useEffect(() => {
    dispatch(fetchColorsAsync());
    dispatch(fetchCategoryAsync());
    dispatch(fetchSizeAsync())
  }, [dispatch]);
  
  function handelFilter(e,section,option){
    const newFilter = {...filterSet};
    if(e.target.checked){
    if(newFilter[section.id]){ 
      newFilter[section.id].push(option.value) ;
    }else{
      newFilter[section.id] =[option.value ]; 
    } 
    setOptionValues([...optionValues,option.value])
  }else{
    const idx = newFilter[section.id].findIndex((el)=>el === option.value) 
     newFilter[section.id].splice(idx,1);//remove one object at index idx 

     let data = optionValues
     const OptValIdx = data.findIndex(el=>el === option.value)
     data.splice(OptValIdx,1)
     setOptionValues(data)
  }
    setFilterSet(newFilter);   
  }
  
  function handelSort(e,option){ 
  const sort = {_sort:option.sort,_order:option.order}
   setSort(sort)
  } 

  const filters = [

    {
      id: 'gender',
      name: 'Gender',
      options: [
        { label: 'Men', value: 'Men' },
        { label: 'Women', value: 'Women' },
        { label: 'UniSex', value: 'UniSex' },

      ]
    },
    {
      id: 'kids',
      name: 'kids',
      options: [
        { label: 'Boys', value: 'Boys' },
        { label: 'Girls', value: 'Girls' }, 
      ]
    },
    {
      id: 'colors',
      name: 'Colors',
      options: newColors
    },
    {
      id: 'category',
      name: 'Category',
      options: category
    },
    {
      id: 'size',
      name: 'Size',
      options: sizes
    },
  ]



  return (
    <div className="bg-white"> 
        <Navbar />

      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pb-6 pt-4 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href} className="block px-2 py-3">
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
                  {/* Mobile filter */}
                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-[:not([data-open])]:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  value={option.value}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                 onChange={(e)=>handelFilter(e,section,option)} 
                                 checked = {optionValues.includes(option.value)}
                               /> 
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:checked]:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:max-w-full">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6  ">
            <h1 className="text-3xl  font-bold tracking-tight text-gray-900">Gear Up</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <p 
                        onClick={(e)=>handelSort(e,option)}
                          className={classNames(
                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                            'block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none',
                          )}
                        >
                          {option.name}
                        </p>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
 
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 ">
              <div className="hidden lg:block  overflow-y-auto h-[100vh]">

                {/* Filters */}
                <form className="h-full overflow-y-auto scrollbar-hide">


                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900 ">
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href}>{category.name}</a>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                            <MinusIcon aria-hidden="true" className="size-5 group-[:not([data-open])]:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {/* Desktop filter */}
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex gap-3">
                              <div className="flex h-5 shrink-0 items-center">
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                    defaultValue={option.value}
                                    defaultChecked={option.checked}
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                    onChange={(e)=>handelFilter(e,section,option)} 
                                    checked = {optionValues.includes(option.value)}
                               />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                  >
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-[:checked]:opacity-100"
                                    />
                                    <path
                                      d="M3 7H11"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </div>
              {/* Product grid */}
              <div className="lg:col-span-3 md:overflow-y-auto md:h-[100vh]">
                <ProductsList  />
              </div>

            </div>
          </section>
        </main>
      </div>
    </div>
  )
}











/* import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from "react-redux";
import {
  fetchColorsAsync,
  fetchProductAsync,
  selectColors,
  selectCategory,
  selectSize,
  fetchCategoryAsync,
  fetchSizeAsync
} from '../features/product/ProductSlice'
import ProductsList from '../components/ProductsList'

const sortOptions = [
  { name: 'Best Rating', order: "desc", sort: "rating" },
  { name: 'Newest', order: "desc", sort: "createdAt" },
  { name: 'Price: Low to High', order: "asc", sort: "disCountPrice" },
  { name: 'Price: High to Low', order: "desc", sort: "disCountPrice" },
]

const subCategories = [
  { name: 'Footwear', id: "category" },
  { name: 'Nike Plus', id: "category" },
  { name: 'Jordan Brand', id: "category" },
  { name: 'Sports Bras', id: "category" },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filterSet, setFilterSet] = useState({});
  const [optionValues, setOptionValues] = useState([]);

  const dispatch = useDispatch();
  const colors = useSelector(selectColors);
  const category = useSelector(selectCategory);
  const sizes = useSelector(selectSize);

  function convertNameTOLabel(arr) {
    return arr.map(item => ({
      label: item.name,
      value: item.name,
    }))
  }

  const newColors = convertNameTOLabel(colors);

  useEffect(() => {
    dispatch(fetchProductAsync());
    dispatch(fetchColorsAsync());
    dispatch(fetchCategoryAsync());
    dispatch(fetchSizeAsync());
  }, [dispatch]);

  function handelFilter(e, section, option) {
    const checked = e.target.checked;

    setFilterSet(prev => {
      const updated = { ...prev };
      const existing = updated[section.id] || [];

      updated[section.id] = checked
        ? [...existing, option.value]
        : existing.filter(v => v !== option.value);

      return updated;
    });

    setOptionValues(prev =>
      checked
        ? [...prev, option.value]
        : prev.filter(v => v !== option.value)
    );
  }

  const filters = [
    {
      id: 'gender',
      name: 'Gender',
      options: [
        { label: 'Mens', value: 'Mens' },
        { label: 'Womens', value: 'Womens' },
        { label: 'UniSex', value: 'UniSex' },
      ]
    },
    {
      id: 'kids',
      name: 'kids',
      options: [
        { label: 'Boys', value: 'Boys' },
        { label: 'Girls', value: 'Girls' },
      ]
    },
    {
      id: 'colors',
      name: 'Colors',
      options: newColors
    },
    {
      id: 'category',
      name: 'Category',
      options: category
    },
    {
      id: 'size',
      name: 'Size',
      options: sizes
    },
  ]

  return (
    <div className="bg-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:max-w-full">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Gear Up</h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Sort
                <ChevronDownIcon className="-mr-1 ml-1 size-5 text-gray-400" />
              </MenuButton>

              <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5">
                <div className="py-1">
                  {sortOptions.map(option => (
                    <MenuItem key={option.name}>
                      <span className="block px-4 py-2 text-sm text-gray-500">
                        {option.name}
                      </span>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>

            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 lg:hidden"
            >
              <FunnelIcon className="size-5" />
            </button>
          </div>
        </div>

        <section className="pb-24 pt-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <div className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)]">
              <form className="h-full overflow-y-auto scrollbar-hide">
                {filters.map(section => (
                  <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                    <DisclosureButton className="flex w-full justify-between text-sm">
                      <span className="font-medium text-gray-900">{section.name}</span>
                      <PlusIcon className="size-5" />
                    </DisclosureButton>

                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, idx) => (
                          <div key={option.value} className="flex gap-3">
                            <input
                              type="checkbox"
                              id={`${section.id}-${idx}`}
                              checked={optionValues.includes(option.value)}
                              onChange={(e) => handelFilter(e, section, option)}
                            />
                            <label htmlFor={`${section.id}-${idx}`} className="text-sm text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </div>

            <div className="lg:col-span-3">
              <ProductsList />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
 */
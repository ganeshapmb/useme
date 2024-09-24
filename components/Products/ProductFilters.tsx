'use client'
import React, { useEffect, useState } from 'react'
import { Filters } from '@/types/filters'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FilterProps {
  filters: Filters;
  toggleModal: any;
}
interface Category {
  _id: string;
  name: string;
  slug: string;
  parentCategory: string;
  IsFeatured: boolean;
  ImageUrl: string;
  Description: string;
}

const ProductFilters: React.FC<FilterProps> = ({ filters, toggleModal }) => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([])
  const [colors, setColors]:any = useState([])
  const [sizes, setSizes]:any = useState([])
  const [selectedcategories, setSelectedcategories] = useState<any>(filters.categories)
  const [selectedcolors, setSelectedcolors]:any = useState(filters.color)
  const [selectedsizes, setSelectedsizes]:any = useState(filters.size)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    //get categories
    const getCategories = async () => {
      let res = await fetch(`${process.env.HOST}/api/dashboard/categories/getcategories`);
      setLoading(true)
      let data = await res.json();
      if (data.success) {
        setCategories(data.categories)
        setLoading(false)
      }

    }
    //get colors
    const getColors = async () => {
      let res = await fetch(`${process.env.HOST}/api/shopfilters/colors/getcolors`);
      setLoading(true)
      let data = await res.json();
      if (data.success) {
        setColors(data.colors)
        setLoading(false)
      }

    }
    //get sizes
    const getSizes = async () => {
      let res = await fetch(`${process.env.HOST}/api/shopfilters/sizes/getsizes`);
      setLoading(true)
      let data = await res.json();
      if (data.success) {
        setSizes(data.sizes)
        setLoading(false)
      }

    }
    getCategories();
    getColors();
    getSizes();

  }, [])

  // Handle Category checkbox
  const handleCategoryClick = (name: string, checked: boolean) => {
    const formattedname = name.replace(/ /g, '_')
    if (checked) {
      setSelectedcategories((prev:any) => [...prev, formattedname]);
    } else {
      setSelectedcategories((prev:any) => prev.filter((category:any) => category !== formattedname));
    }
  };

  // Handle Color checkbox
  const handleColorClick = (color: string, checked: boolean) => {
    if (checked) {
      setSelectedcolors((prev:any) => [...prev, color]);
    } else {
      setSelectedcolors((prev:any) => prev.filter((c:any) => c !== color));
    }
  };

  // Handle Size checkbox
  const handleSizeClick = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedsizes((prev:any) => [...prev, size]);
    } else {
      setSelectedsizes((prev:any) => prev.filter((s:any) => s !== size));
    }
  };

  // Handle Apply Button
  const handleApply = () => {
    debugger
    // Navigate to a page and pass the selected filters
    const query = [];

  if (selectedcategories.length > 0) {
    const uniqueCategories = Array.from(new Set(selectedcategories)); 
    query.push(`categories=${uniqueCategories.join(',')}`);
  }

  if (selectedcolors.length > 0) {
    const uniqueColors = Array.from(new Set(selectedcolors)); 
    query.push(`color=${uniqueColors.join(',')}`);
  }

  if (selectedsizes.length > 0) {
    const uniqueSizes = Array.from(new Set(selectedsizes)); 
    query.push(`size=${uniqueSizes.join(',')}`);
  }
  query.push(`page=1`);
  toggleModal();

  router.push(`/shop?${query.join('&')}`);

    // router.push(`/products?categories=${selectedcategories.join(',')}&colors=${selectedcolors.join(',')}&sizes=${selectedsizes.join(',')}`);
  };

  // Handle Discard Selection (revert to initial values from props)
  const handleDiscard = () => {
    // Reset the state to the initial values passed via props
    setSelectedcategories(filters.categories);
    setSelectedcolors(filters.color);
    setSelectedsizes(filters.size);
    toggleModal();
  };


  return (
    <>
      <div className='relative z-50' aria-labelledby='modal-title' role='dialog' aria-modal="true">
  <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>
  <div className='fixed inset-0 z-10 overflow-y-auto'>
    <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
      <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl'>
        <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
          <div className='sm:flex sm:items-start'>
            <div
              className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 cursor-pointer"
              onClick={handleDiscard}
            >
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full'>
              <h3 className='text-base font-semibold leading-6 text-gray-900 text-center' id='modal-title'>Filters</h3>
              <div className='mt-2'>
                <p className='mb-2'>Categories</p>
                <ul className='flex flex-row flex-wrap'>
                  {/* Loop through categories */}
                  {categories && categories.map((k) => (
                    <li key={k._id} className=' flex flex-row items-center space-x-3 py-2 mx-2'>
                      <input onChange={(e) => handleCategoryClick(k.name, e.target.checked)}
                        className="accent-blue-700 h-3 w-4"
                        type="checkbox"
                        id={k._id}
                        checked={selectedcategories.includes(k.name.replace(/ /g, '_'))}
                      />
                      {/* k.name.replace(/ /g, '_') */}
                      <label htmlFor={k._id} className="text-gray-700">{k.name}</label>
                    </li>
                  ))}
                  {/* End of loop */}
                </ul>
              </div>
              {/* colors */}
              <div className='mt-2'>
                <p className='mb-2'>Colors</p>
                <ul className='flex flex-row flex-wrap'>
                  {/* Loop through colors */}
                  {colors && colors.map((k:any) => (
                    <li key={k} className=' flex flex-row items-center space-x-3 py-2 mx-2'>
                      <input onChange={(e) => handleColorClick(k, e.target.checked)}
                        className="accent-blue-700 h-3 w-4"
                        type="checkbox"
                        id={k}
                        checked={selectedcolors.includes(k)}
                      />
                      <label htmlFor={k} className="text-gray-700">{k}</label>
                    </li>
                  ))}
                  {/* End of loop */}
                </ul>
              </div>
              {/* sizes */}
              <div className='mt-2'>
                <p className='mb-2'>Sizes</p>
                <ul className='flex flex-row flex-wrap'>
                  {/* Loop through sizes */}
                  {sizes && sizes.map((k:any) => (
                    <li key={k} className=' flex flex-row items-center space-x-3 py-2 mx-2'>
                      <input onChange={(e) => handleSizeClick(k, e.target.checked)}
                        className="accent-blue-700 h-3 w-4"
                        type="checkbox"
                        id={k}
                        checked={selectedsizes.includes(k)}
                      />
                      <label htmlFor={k} className="text-gray-700">{k}</label>
                    </li>
                  ))}
                  {/* End of loop */}
                </ul>
              </div>

            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          {/* <div className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Total - </div>
          <Link href='/' onClick={toggleModal} className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Checkout</Link> */}
          <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={handleApply}>Apply</button>
        </div>
      </div>
    </div>
  </div>
</div>


    </>
  )
}

export default ProductFilters
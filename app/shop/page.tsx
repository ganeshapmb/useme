'use client'
import { useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { Filters } from '@/types/filters'
import Link from 'next/link'
import Image from 'next/image'
import ProductFilters from '@/components/Products/ProductFilters'
import InfiniteScroll from "react-infinite-scroll-component";

// interface FilterProps {
//     filters: Filters;
//   }

const Shop = () => {
    const searchParams = useSearchParams();
    const [filters, setFilters] = useState<Filters>({});
    const [products, setProducts]:any = useState([])
    const [totalResults, setTotalResults] = useState(0)
    const [loading, setLoading] = useState(true)
    //for filters
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = ()=>{
      setIsModalOpen(!isModalOpen);
    };
    // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
      debugger
      const categoriesParam = searchParams.get('categories'); // Get categories as a comma-separated string

      let parsedCategories: React.SetStateAction<string[]>=[]
    if (categoriesParam) {
      parsedCategories = categoriesParam.split(',').map(category => category.trim()); // Split and trim
      // setSelectedCategories(parsedCategories); // Set the state with the parsed categories
    }
  
        const queryFilters: Filters = {
          
          categories: parsedCategories,
          brand: searchParams.getAll('brand'),
          gender: searchParams.get('gender') || undefined,
          discount: searchParams.get('discount') ? Number(searchParams.get('discount')) : undefined,
          size: searchParams.getAll('size'),
          color: searchParams.getAll('color'),
          price: searchParams.get('price')
            ? (searchParams.get('price')?.split(',').map(Number) as [number, number])
            : undefined,
          page: searchParams.get('page') ? Number(searchParams.get('page')) : undefined,
          pageSize: searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : undefined,
        };
        setFilters(queryFilters);

        //get data

      }, [searchParams]);

      // console.warn("filters",filters)

      // useEffect(() => {
      //   debugger
      //   const getProducts =async()=>{
      //       const response = await fetch(`/api/products/getproducts?${new URLSearchParams(filters as any)}`);
      //       debugger
      //       const products = await response.json();
      //       console.warn(products,"products")
      //       setProducts(products)
      //   }
      //   getProducts();
      // }, [filters])


      // Fetch products based on filters
  useEffect(() => {
    // debugger
    const getProducts = async () => {
      setLoading(true)
      if (Object.keys(filters).length > 0) {
        // Construct query string with correct serialization for array parameters
        const params = new URLSearchParams();

        if (filters.categories?.length) {
          debugger
          filters.categories.forEach(category => params.append('categories', category));
        }

        if (filters.brand?.length) {
          filters.brand.forEach(brand => params.append('brand', brand));
        }

        if (filters.size?.length) {
          filters.size.forEach(size => params.append('size', size));
        }

        if (filters.color?.length) {
          filters.color.forEach(color => params.append('color', color));
        }

        if (filters.gender) {
          params.append('gender', filters.gender);
        }

        if (filters.discount !== undefined) {
          params.append('discount', filters.discount.toString());
        }

        if (filters.price) {
          params.append('price', `${filters.price[0]},${filters.price[1]}`);
        }

        // Fetch products using the serialized query string
        const response = await fetch(`/api/products/getproducts?${params.toString()}`);
        const xproducts = await response.json();
        console.warn(xproducts, 'products');
        setProducts(xproducts.products);
        console.warn(xproducts.products, 'productsmi');
      }
      setLoading(false)
    };

    getProducts();
  }, [filters]);


  const fetchMoreData = async () => {
    setLoading(true)
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(async () => {
    

    if (Object.keys(filters).length > 0) {
      // Construct query string with correct serialization for array parameters
      const params = new URLSearchParams();
      debugger

      if (filters.categories?.length) {
        filters.categories.forEach(category => params.append('categories', category));
      }

      if (filters.brand?.length) {
        filters.brand.forEach(brand => params.append('brand', brand));
      }

      if (filters.size?.length) {
        filters.size.forEach(size => params.append('size', size));
      }

      if (filters.color?.length) {
        filters.color.forEach(color => params.append('color', color));
      }

      if (filters.gender) {
        params.append('gender', filters.gender);
      }

      if (filters.discount !== undefined) {
        params.append('discount', filters.discount.toString());
      }

      if (filters.price) {
        params.append('price', `${filters.price[0]},${filters.price[1]}`);
      }
      
      // let page = filters.page !== undefined ? filters.page : 1; // Set to 1 if undefined
      // page += 1; // Increment by 1
      // params.append('page', page.toString());

      // Handling pagination
      let page = filters.page !== undefined ? filters.page : 1; // Set to 1 if undefined
      params.append('page', (page + 1).toString()); // Increment the page by 1
      filters.page = page + 1; // Ensure filters page is updated for subsequent calls


      if (filters.pageSize !== undefined) {
        params.append('pageSize', filters.pageSize.toString());
      }

      // Fetch products using the serialized query string
      const response = await fetch(`/api/products/getproducts?${params.toString()}`);
      const xproducts = await response.json();
      console.warn(xproducts, 'products');
      // setProducts(products.concat(xproducts.products));
      setProducts((prevProducts:any) => {
        const uniqueProducts = xproducts.products.filter(
          (newProduct:any) =>
            !prevProducts.some((existingProduct:any) => existingProduct._id === newProduct._id)
        );
        
        return prevProducts.concat(uniqueProducts);
      });
      
      setTotalResults(xproducts.totalCount)
      // console.warn(xproducts.products, 'productsmi');
      setLoading(false)
    }





    }, 500);
  };
      
  // const newproducts = products.products;
  // const productArray = Object.values(newproducts);

  return (
    <>
      <section className="py-5">
      


<div className="flex items-center justify-between p-6">
    <div>
      <h2 className="font-semibold text-gray-700">Shop Page</h2>
      <span className="text-xs text-gray-500"></span>
    </div>
    <div className="flex items-center justify-between">
      <div className="ml-10 space-x-8 lg:ml-40"  onClick={toggleModal}>
        <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700">
        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"/>
    </svg>

          Filters
        </button>
      </div>
    </div>
  </div>

{isModalOpen && (<ProductFilters filters={filters} toggleModal={toggleModal} />)}



<InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={products.length !== totalResults}
          loader={<div>Loading</div>}
        >
  <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">

    {Object.keys(products).map((item:any,i)=>{
      return(
        <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl" key={products[item]._id}>
      <Link href={`${process.env.HOST}/product/${products[item].slug}`}>
        <div className="relative flex items-end overflow-hidden rounded-xl">
          {/* <img src="/images/YOdoXaKlb65MrX1N9Oh3G.png" alt="Hotel Photo" /> */}
          <Image className='rounded-2xl shadow-lg' src={products[item].CoverImageUrl} width={2250} height={1390} alt={products[item].name}/>
          <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-slate-400 ml-1 text-sm">4.9</span>
          </div>
        </div>

        <div className="mt-1 p-2">
          <h2 className="text-slate-700">{products[item].name}</h2>
          <p className="text-slate-400 mt-1 text-sm">Lisbon, Portugal</p>
          {products[item].size && products[item].size.length > 0 && (
              <div className='flex items-center my-2 w-1/3 md:w-1/4'>
                  {products[item].size.map((s: string, idx: number) => (
                    <p className='mx-2 dark:border-white rounded-lg border px-2 border-slate-400' key={idx}>{s}</p>
                  ))}
                </div>
            )}

          {products[item].color && products[item].color.length > 0 && (
              <div className='flex items-center'>
                  {products[item].color.map((s: string, idx: number) => (
                    <p className={`border-2 ml-1 rounded-full w-6 h-6 focus:outline-none 'border-gray-300 ${s === 'black' ? 'bg-slate-500' : `bg-${s}-500`} `} key={idx}></p>
                  ))}
                </div>
            )}

          <div className="mt-3 flex items-end justify-between">
            <p>
              <span className="text-lg font-bold text-blue-500 line-through">${products[item].Price}</span>
              <span className="text-slate-400 text-sm">/night</span>
            </p>

            <div className="group inline-flex rounded-xl bg-blue-100 p-2 hover:bg-blue-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:text-blue-500 h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
      )
    })}
    

    
  </div>
  </InfiniteScroll>
</section>

    </>
  )
}

export default Shop
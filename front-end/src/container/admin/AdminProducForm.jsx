import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useForm } from "react-hook-form"
import { createProductAsync, selectCategory, selectColors, selectSize } from '../../features/product/ProductSlice'
import { useDispatch, useSelector } from 'react-redux';
export default function AdminProducForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm();
  const dispatch = useDispatch()
  const sizes = useSelector(selectSize);
  const colors = useSelector(selectColors);
  const category = useSelector(selectCategory);
  // console.log(colors)
  return (
    <div className='mx-5 md:mx-12'>

      <form onSubmit={handleSubmit((data)=>{
        if(Array.isArray(data.colors) && data.colors.length && Array.isArray(data.sizes) && data.sizes.length){
        data.images=[
          data.coverPhoto,
          data.image1,
          data.image2,
          data.image3,
          data.image4
        ]
        data.highlights=[
          data.highlight1,
          data.highlight2,
          data.highlight3,
          data.highlight4,
        ]
        delete(data.coverPhoto)
        delete(data.image1)
        delete(data.image2)
        delete(data.image3)
        delete(data.image4)
        delete(data.highlight1)
        delete(data.highlight2)
        delete(data.highlight3)
        delete(data.highlight4) 
 
        
         const colorSet = new Set(data.colors.map(c=>c))

         data.colors = colors.filter(clr=>colorSet.has(clr.name))
   
        data.stock=+data.stock
        data.price=+data.price
        data.discount=+data.discount
        dispatch(createProductAsync(data));
        reset()
        }else{
           alert("Choose a color or choose a size");
        }
        console.log(data)
      })}>

        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Upload new Item
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              This details filled will be saved in dataBase
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                  Product Title *
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      
                      type="text"
                      placeholder="Nike Jordan X"
                      className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-gray-100  sm:text-sm/6 border"
                      {...register('title',{required:"Title is required"})}
                    />
                  </div>
                  {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                  Product Details*
                </label>
                <div className="mt-2">
                  <textarea
                    rows={3}
                    className="block w-full rounded-md bg-white px-3 py-1.5   text-gray-900   placeholder:text-gray-400   focus:outline-gray-300  sm:text-sm/6 border "
                     
                    placeholder='Smooth,inside and out Crafted from our premium fleece,this classic Nike Windrunner design hooks you with laid-black style while delivering the fleece goods'
                    {...register('details',{required:'details Required'})}
                  />
                </div>
                {errors.details && <p className='text-red-500'>{errors.details.message}</p>}
                <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about Product.</p>
              </div>



            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                  Price*
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    name="first-name"
                    type="number"
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder='1200'
                    {...register('price',{required:'price is required',min:{value:100,message:'Price should be atleast 100'}})}
                  />
                  
                </div>
                {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                  Discount Percetage
                </label>
                <div className="mt-2">
                  <input
                    placeholder='10'
                    name="last-name"
                    type="number"
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
                    {...register('discount',{required:'discount is required',min:{value:0,message:'discount cannot less than 0%'},max:{value:95,message:'discount cannot exceed 95%'}})}
                  />
                </div>
                {errors.discount && <p className='text-red-500'>{errors.discount.message}</p>}

              </div>

              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Select Size
                </label>
                <div className="mt-2 flex space-x-2 flex-wrap">
                  {Array.isArray(sizes)  && sizes.map((item, idx) => (
                    <label key={item.value}  >
                      <input
                        type="checkbox"
                        value={item.value}
                      // {...register("sizes") 
                      {...register('sizes',{ })}
                      />
                      {item.value}
                    </label>
                  ))}

                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="Color" className="block text-sm/6 font-medium text-gray-900">
                  Select Color
                </label>
                <div className="mt-2 space-x-2">
                  {Array.isArray(colors)  && colors.map((color, idx) => (
                    <label key={color.name}>
                      
                      <input type="checkbox" name="" id="" value={color.name} {...register('colors',{ })} />{color.name}
                    </label>
                  ))}

                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="Category" className="block text-sm/6 font-medium text-gray-900">
                  Select Category
                </label>
                <div className="mt-2  ">
                  <select
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    {...register('category',{required:'category is required' })}
                  >
                    <option value=""  >Select category</option>

                    {Array.isArray(category) &&
                      category.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                  </select>
       {errors.category && <p className='text-red-500'>{errors.category.message}</p>}
                 
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="Category" className="block text-sm/6 font-medium text-gray-900">
                  Gender
                </label>
                <div className="mt-2  ">
                  <select
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    {...register('gender',{required:"gender is required"})}

                  >
                    <option value=""   >Select Gender</option>

                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Unisex">Unisex</option>
                   
                  </select>
       {errors.gender && <p className='text-red-500'>{errors.gender.message}</p>}
                 
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="Category" className="block text-sm/6 font-medium text-gray-900">
                  Kids
                </label>
                <div className="mt-2  ">
                  <select
                    {...register('kids',{required:'kids is required' })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  >
                    <option value=""   >Select Kids</option>

                     <option value="Boys">Boys</option>
                    <option value="Girls">Girls</option>
                  </select>
       {errors.kids && <p className='text-red-500'>{errors.kids.message}</p>}
                 
                </div>
              </div>


          <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm/6 font-medium ">
                Stocks*
              </label>
              <div className="mt-2">
                <input
             
                  type="number"
                  autoComplete="street-address"
                  placeholder='6000' 
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base   outline-1 -outline-offset-1 outline-gray-100 placeholder:text-gray-500  border"
                  {...register('stock',{required:'stock is required',min:{value:1,message:'stocks should be atleast 1'}})}
                />
              </div>
                {errors.stock && <p className='text-red-500'>{errors.stock.message}</p>}
            </div>
          <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm/6 font-medium ">
                Country of Origin
              </label>
              <div className="mt-2">
                <input
               
                  type="text"
                 
                  placeholder='Eg:India'
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base   outline-1 -outline-offset-1 outline-gray-100 placeholder:text-gray-500  border"
                  {...register('origin',{required:'Country of Origin required' })}
                />
              </div>
                {errors.origin && <p className='text-red-500'>{errors.origin.message}</p>}
            </div>
          <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm/6 font-medium ">
               Declaration of Importer
              </label>
              <div className="mt-2">
                <input
                 
                  type="text"
                
                  placeholder='Direct import by the individual customer'
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base   outline-1 -outline-offset-1 outline-gray-100 placeholder:text-gray-500  border"
                 value="Direct import by individual customer"

                />
              </div>
               
            </div>
          <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm/6 font-medium ">
              Marketed By
              </label>
              <div className="mt-2">
                <input
                 
                  type="text"
                
                  placeholder='Nike Global Trading B.V Singapore Branch,30 Pasir Panjang Road'
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base   outline-1 -outline-offset-1 outline-gray-100 placeholder:text-gray-500  border"
                {...register('marketedBy',{ required:'Marketed by required'})}
                  value='Nike Global Trading B.V Singapore Branch,30 Pasir Panjang Road'
                  /> 
              </div>
                  {errors.marketedBy && <p className='text-red-500'>{errors.marketedBy.message}</p>}
            </div>
            <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cover photo
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("coverPhoto", {
                        required: "Cover photo is required",
                      })}
                      placeholder="https://assets.nike.com/medias/sys_master/root/20211224/1tuJ/61c4c229aeb26901101a29d1/-1117Wx1400H-469034008-black-MODEL.jpg"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.coverPhoto && (
                      <p className="text-red-500">
                        {errors.coverPhoto.message}
                      </p>
                    )}
                  </div>
                </div>
            <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image 1
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("image1", {
                        required: "image 1 is required",
                      })}
                      type="text"
                      placeholder="https://assets.nike.com/medias/sys_master/root/20211224/1tuJ/61c4c229aeb26901101a29d1/-1117Wx1400H-469034008-black-MODEL.jpg"
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.image1 && (
                      <p className="text-red-500">{errors.image1.message}</p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image 2
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("image2", {
                        required: "image 2 is required",
                      })}
                      type="text"
                      placeholder="https://assets.nike.com/medias/sys_master/root/20211224/1tuJ/61c4c229aeb26901101a29d1/-1117Wx1400H-469034008-black-MODEL.jpg"
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.image2 && (
                      <p className="text-red-500">{errors.image2.message}</p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image 3
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("image3", {
                        required: "image 3 is required",
                      })}
                      type="text"
                      placeholder="https://assets.nike.com/medias/sys_master/root/20211224/1tuJ/61c4c229aeb26901101a29d1/-1117Wx1400H-469034008-black-MODEL.jpg"
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.image3 && (
                      <p className="text-red-500">{errors.image3.message}</p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image 4
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("image4", {
                        required: "image 4 is required",
                      })}
                      type="text"
                      placeholder="https://assets.nike.com/medias/sys_master/root/20211224/1tuJ/61c4c229aeb26901101a29d1/-1117Wx1400H-469034008-black-MODEL.jpg"
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.image4 && (
                      <p className="text-red-500">{errors.image4.message}</p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Highlight 1
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("highlight1", {
                        required: "highlight 1 is required",
                      })}
                      type="text"
                      placeholder="10-Year Milestone: Celebrating a decade of excellence, Tech Fleece marks a significant milestone in innovative activewear. This enduring line has consistently delivered high-quality sportswear for a decade."
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.highlight1 && (
                      <p className="text-red-500">
                        {errors.highlight1.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Highlight 2
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("highlight2", {
                        required: "highlight 2 is required",
                      })}
                      type="text"
                      placeholder="New Color Palette: The introduction of a new color palette inspired by natural minerals adds a fresh and contemporary touch to the classic Tech Fleece design. This update ensures that the product remains on-trend and visually appealing."
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.highlight2 && (
                      <p className="text-red-500">
                        {errors.highlight2.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Highlight 3
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("highlight3", {
                        required: "highlight 3 is required",
                      })}
                      type="text"
                      placeholder="Enhanced Comfort: Tech Fleece continues to prioritize comfort with premium, smooth-on-both-sides fleece that feels warmer and softer than ever. This improved material ensures a cozy and luxurious wearing experience."
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.highlight3 && (
                      <p className="text-red-500">
                        {errors.highlight3.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Highlight 4
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("highlight4", {
                        required: "highlight 4 is required",
                      })}
                      placeholder="Timeless Design, Lightweight Build: While celebrating its history, Tech Fleece maintains the timeless, tailored design loved by customers. It also retains its lightweight build, providing the same level of comfort and flexibility that customers have come to expect over the years.Overall, Tech Fleece's 10-year anniversary release combines tradition and innovation, offering a product that remains true to its roots while embracing modern style and comfort."
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.highlight4 && (
                      <p className="text-red-500">
                        {errors.highlight4.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Notifications
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Click save to save the product <br /> Click cancel to cancel the
                modification <br /> Click delete to delete the product
              </p>
            </div>
          </div>


        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" 
          
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Delete
          </button>
          <button type="button" className="text-sm/6 font-semibold text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}


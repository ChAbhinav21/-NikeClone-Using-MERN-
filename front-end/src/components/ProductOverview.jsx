import { useDispatch, useSelector } from "react-redux"
import { fetchProductByIdAsync, selectProducts, selectSelectedProduct, selectStatus } from "../features/product/ProductSlice"
import { useEffect, useState } from "react"
import { FaHeart } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa"; 
import { FaChevronDown } from "react-icons/fa";
function ProductOverview({ id }) {
  const dispatch = useDispatch()
  const selectedProduct = useSelector(selectSelectedProduct)
  const status = useSelector(selectStatus)
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showDelivery,setShowDelivery] = useState(false);
  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdAsync(id))
    }
  }, [dispatch, id])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!selectedProduct) {
    return <div>Product not found</div>
  }

  return (
    <div className="container w-full px-5 md:px-12 mt-4">

      <div className="content w-full  md:flex md:pl-4">

        <div className="viewImage md:flex md:w-5/6 hidden md:items-center  md:justify-around h-fit ">

          <div className="wide-first  h-fit ">
            {selectedProduct.images.map((image, idx) => (

              <div key={idx} className=" mt-1 rounded-lg  border-2 hover:border-gray-400 my-2 cursor-pointer p-2 md:w-fit transition-all duration-700  " onMouseOver={() => setCurrentImage(idx)} >
                <img src={image} className='w-[3vw]' />
              </div>

            ))}
          </div>

          <div className="wide-second h-fit ">
            <img src={currentImage == null ? selectedProduct.images[0] : selectedProduct.images[currentImage]} alt="" className="w-[35vw] h-[80vh]" />
          </div>

        </div>
        <div className="wide-third md:overflow-y-auto md:w-2/6 flex flex-col  ">
          <h1 className="text-lg font-Oswald">{selectedProduct.title}</h1>
          {console.log(selectedProduct)}
          {selectedProduct.gender && <p>Gender : {selectedProduct.gender}</p>}
          {selectedProduct.kids && <p>Kids : {selectedProduct.kids}</p>}
          {<p className="mt-2 text-sm text-gray-700 font-semibold">MRP:₹{selectedProduct.discountPrice}</p>}
          <p className="cursor-pointer opacity-50">incl. of all taxes <br /> (Also includes all applicable duties)</p>

          <div className="phone-images md:hidden m-4 flex flex-row scroll-container w-full scroll-smooth overflow-x-auto">
            {selectedProduct.images.map((image, idx) => (
              <div key={idx} className="mx-2  text-center min-w-[80vw] min-h-[80vw]"  >
                <img src={image} className=' w-full h-full
 object-cover'/>
              </div>
            ))}
          </div>

          {/* Color */}
          <p className="text-lg mb-1 font-Oswald">Colors</p>
          <div className="colors flex  ">
            {selectedProduct.colors && selectedProduct.colors.map((color, idx) => (

              <button key={idx} type="button" className={` h-5 w-5 m-1 rounded-full border-2 cursor-pointer hover:border-4  ${selectedColor === color.name ? "border-4 border-gray-300" : "hover:border-4"} `} style={{ backgroundColor: color.name }} onClick={() => { setSelectedColor(color.name); }}>
             
              </button>

            ))}
          </div>

          {/* Sizes */}
            <span className="flex justify-between"> 
             <p className="text-lg mb-1 font-Oswald  ">Sizes</p>
            <p className="text-lg mb-1    ">size guide</p>      </span>
            <div className="sizes my-4 grid grid-cols-4">
            {selectedProduct.sizes && selectedProduct.sizes.map((size,idx)=>(
              <button key={idx} type="button" className="  text-sm rounded border-2 cursor-pointer m-1  flex items-center justify-center py-4 px-2 hover:border-2 hover:border-black transition-all duration-700 shadow-md " >{size}
                    
              </button>
            ))}
            </div>
            {/* buttons */}
            <div className="buttons space-y-4 m-4">
              <button className="w-full shop-btn ">Add to Bag</button>
            <button className="w-full shop-btn-white border-2 group flex items-center justify-center   ">
 Favourite  <FaHeart  className="pt-1 text-white  text-xl group-hover:text-black transition-colors duration-300" />
</button>

            </div>

            <div className="detail-highlights w-full">
              <p>{selectedProduct.detail}</p>
              <p className="my-4 text-xl">Highlights</p>
              <ul className="list-disc pl-6 space-y-1">
                {selectedProduct.highlights
 && selectedProduct.highlights
.map((highlight,idx)=>(
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>

              <div className="delivery-return flex items-center justify-between" onClick={()=>setShowDelivery(prev=>!prev)}> Delivery-Return
                  {showDelivery?<FaChevronDown />:<FaChevronUp/>
                  }
              </div>
            </div>

        </div> 
      </div>
    </div>
  )
}

export default ProductOverview
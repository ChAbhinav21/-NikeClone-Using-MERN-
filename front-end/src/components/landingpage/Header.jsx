import { useEffect, useRef, useState } from 'react'
import image1 from '../../assets/1e8674ca-9bad-49b2-9c92-9618d9d73bff.webp'
import image2 from '../../assets/fullscreen/branding.jpg'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import shoe1 from '../../assets/shoe1.jpg'
import shoe2 from '../../assets/shoe2.jpg'
import shoe3 from '../../assets/shoe3.jpg'
import shoe4 from '../../assets/shoe4.jpg'
import shoe5 from '../../assets/shoe5.jpg'
import TeamCollection from '../../assets/TeamCollection.jpg'
import dressToImpress from '../../assets/dressToImpress.jpg'
import womens from '../../assets/womens.jpg'
import mens from '../../assets/mens.jpg'
import kids from '../../assets/kids.jpg'
// import ReactPlayer from 'react-player'
import ReactPlayer from "react-player";


// import ReactPlayer from "react-player/youtube";
function Header() {
  const [windowDimension, setWindowDimension] = useState({ winWidth: window.innerWidth, winHeight: window.innerHeight });
  const ScrollRef = useRef(null)
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
      });
    };






    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // useEffect(()=>{    
  //   window.addEventListener('resize',detectSize);
  //   return ()=>{
  //     window.removeEventListener('resize',detectSize);
  //   }
  // },[windowDimension]) this runs every time so this is inefficient


  const shopShoeScroll = [
    {
      image: shoe4,
      title: 'Air Max 90'
    },
    {
      image: shoe5,
      title: 'Air Max Special'
    },
    {
      image: shoe1,
      title: 'Air Max 1'
    },
    {
      image: shoe2,
      title: 'Air Max 2'
    },
    {
      image: shoe3,
      title: 'Air Max 220'
    },
  ]

  /* Handle left rigth buttons */
  function handleScrollBtns(direction) {
    //  const container = document.querySelector('.scroll-container');
    if (!ScrollRef.current) return;
    const scrollAmount = 300;
    console.log(ScrollRef.current.scrollLeft)
    if (direction === 'left') {
      ScrollRef.current.scrollLeft -= scrollAmount;
    } else {
      ScrollRef.current.scrollLeft += scrollAmount;
    }
  }



  return (
    <header className="px-5 w-full md:px-12 ">
      <div className="first mb-32 md:mb-14">
        {windowDimension.winWidth <= 782 ? (<img src={image1} alt='mobilebrandimg' />) : (<img className='w-full' src={image2} alt='fullbrandimg' />)}

        {/* First Part */}
        <div className="first-text  text-left md:text-center">
          <p className='mt-7'>Air Max 1</p>
          <h1 className="text-bolder md:text-bolder-md">No Genres</h1>
          <h1 className="text-bolder md:text-bolder-md">All soul</h1> 
          <button className="shop-btn mt-12">Shop All</button>
        </div>

        {/* Second Part */}
        <div className='second mb-10'>
          <div className="text-left flex justify-between items-center">
            <p className='text-lg px-2 py-7 '>Air Max Collections</p>
            <div className="slide-buttons md:flex  hidden">
              <div className="border-black w-9 rounded-full 
        flex justify-center items-center h-9 m-1 bg-gray-300 hover:bg-gray-200 ">
                <FaAngleLeft onClick={() => handleScrollBtns('left')} />
              </div>
              <div className="border-black w-9 rounded-full 
        flex justify-center items-center h-9 m-1 bg-gray-300  hover:bg-gray-200 ">
                <FaAngleRight onClick={() => handleScrollBtns('right')} />
              </div>
            </div>
          </div>

          {/* Scrolling the Shoes Area */}
          <div ref={ScrollRef} className="scroll-container scroll-smooth flex flex-row overflow-x-auto">
            {shopShoeScroll.map((shoe, idx) => (
              <div className='mx-2' key={idx}>
                <img className='max-w-[70vw] md:max-w-[30vw]' src={shoe.image} alt="" />
                <p className='text-xl px-2 py-7'>{shoe.title}</p>
              </div>
            ))}


          </div>

        </div>

        {/* Third Part */}
        <div className="third mt-5 mb-16">
          <div className='text-left'>
            <p className='text-lg md:text-[2vw] md:mb-7 mb-4 text-left'>Just In</p>
          </div>
          {windowDimension.winWidth > 768 ? (


            <ReactPlayer
              url="https://youtu.be/VnE7m8JI7MY"
              loop
              playing
              muted
              style={{ pointerEvents: "none" }}
              width="100%"
              controls={true}
              className="mb-12 "
              height="100vh"
            />
          ) : (
            // <video
            //   src={nikeVideo}
            //   autoPlay
            //   muted
            //   loop
            //   className="mb-12"
            // ></video>
            <ReactPlayer
              url="https://youtube.com/shorts/YD0wQxl48ZI"
              loop
              playing
              muted
              controls={true}
              style={{ pointerEvents: "none" }}
              width="100%"
              className="mb-12 "
              height="65vh"
            />
          )}
          <div className="first-text md:text-center">
            <h1 className='text-bolder mb-5  md:text-bolder-md'>Nike Tech</h1>
            <p>Engineeried to the Exact  specilization  of ChampionShip Athletes </p>
            <button className='shop-btn my-5'>Shop Air Jorden 1 Mid</button>
          </div>
        </div>

        {/* Fourth,Fifth Part */}
        <div className='mb-10 md:flex justify-center'>
          <div className="fouth md:relative space-y-3 text-left">
            <h1 className='text-lg mb-4 md:text-[3vw] md:mb-8'>Trending</h1>
            <div>
              <img src={TeamCollection} alt="" />
              <div className='first-text my-5 mx-4 space-y-3 md:absolute bottom-10 left-10 '>
                <h1 className='text-lg'>National Team Collections</h1>
                <button className='shop-btn  '>Shop </button>
              </div>
            </div>
          </div>

          <div className='fifth relative'>
            <img className='opacity-90' src={dressToImpress} alt="" />
            <div className="first-text space-y-3 absolute bottom-10 left-12  md:bottom-48 left-8  ">
              <h1 className="text-lg text-white text-oswald">Dress To Impress</h1>
              <button className='shop-btn-white'>Shop</button>
            </div>
          </div>
        </div>

        {/* Sixth Part */}
        <div className="sixth mb-10 md:text-center">
          <h1 className="text-lg md:text-[2vw] md:mb-7 mb-4 text-left">The Latest</h1>
          {windowDimension.winWidth <= 782 ? (

            <ReactPlayer
              url="https://youtube.com/shorts/V5Vfjd1am4E"
              loop
              playing
              muted
              style={{ pointerEvents: "none" }}
              width="100%"
              className="mb-12 "
              controls={true}
              height="65vh"
            />

          ) : (
            <ReactPlayer
              url="https://youtu.be/O-JXUhhIRHU"
              loop
              playing
              muted
              style={{ pointerEvents: "none" }}
              width="100%"
              controls={true}
              className="mb-12 "
              height="80vh"
            />
          )}
          <p>Nike App Early Access</p>
          <h1 className="text-bolder mb-2 text-[6vw] md:text-bolder-md ">Air  Jordon  XXXVIII </h1>
          <h1 className="text-bolder text-[6vw] md:text-bolder-md">"FUNDAMENTAL"</h1>
          <div className='md:flex justify-center'>
            <p className=" w-full md:max-w-[50%] mb-5">Enter the next chapter of The Air Jordon Legacy .Build to learn .Find to Learn Our Fundematals white,black and red colors ways   keep the newest AJ true to our Jordon Brand DNA  </p>
          </div>
          <button className="shop-btn">Shop</button>
        </div>

        {/* Seventh Part */}
        <div className="seventh mb-10 md:text-center">
          <h1 className="text-lg md:text-[2vw] md:mb-7 mb-4 text-left">Don't Miss</h1>
          {windowDimension.winWidth <= 782 ? (

            <ReactPlayer
              url="https://youtube.com/shorts/V5Vfjd1am4E"
              loop
              playing
              muted
              style={{ pointerEvents: "none" }}
              width="100%"
              className="mb-12 "
              controls={true}
              height="65vh"
            />

          ) : (
            <ReactPlayer
              url="https://youtu.be/O-JXUhhIRHU"
              loop
              playing
              muted
              style={{ pointerEvents: "none" }}
              width="100%"
              controls={true}
              className="mb-12 "
              height="80vh"
            />
          )}
          <p>Jorden Apperal</p>
          <h1 className="text-bolder mb-2 text-[6vw] md:text-bolder-md "> SHADES OF <br className='md:hidden' />  BLUE</h1>
          <div className='md:flex justify-center'>
            <p className=" w-full md:max-w-[50%] my-5"> keep your looks cool in wover pants , warm up jackets and fleece pieces  </p>
          </div>
          <button className="shop-btn">Shop</button>
        </div>

        {/* Eighth part */}
        <div className="eighth mb-16">
          <h1 className="text-lg md:text-[2vw] md:mb-7 mb-4 text-left">
            The Essentials
          </h1>

          <div className="eight-images w-full grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="relative">
              <img src={mens} alt="" className="w-full object-cover" />
              <button className="absolute shop-btn-white bottom-10 left-8">
                Mens
              </button>
            </div>

            <div className="relative">
              <img src={womens} alt="" className="w-full object-cover" />
              <button className="absolute shop-btn-white bottom-10 left-8">
                Womens
              </button>
            </div>

            <div className="relative">
              <img src={kids} alt="" className="w-full object-cover" />
              <button className="absolute shop-btn-white bottom-10 left-8">
                Kids
              </button>
            </div>

          </div>
        </div>

        {/* Ninth Part */}
        <div className="ninth md:flex md:justify-center md:space-x-36 ">
          <div className="row1 ">
            <button className='text-lg  text-[4vw] font-Oswald mb-4 cursor-pointer inline-block  md:mb-10 md:pointer-events-none md:text-[2vw]' onClick={() => setOpenSection(openSection => (openSection == 'icons' ? null : 'icons'))} >Icons</button>
            <ul className={`${openSection == 'icons' ? 'block' : 'hidden'} mx-8 mb-4   md:block md:mx-0   space-y-2 [&_a]:hover:text-gray-500  `}>
              <li> <a href=''>Air Jordon 7 Retro</a>        </li>
              <li> <a href=''>Air Jordon 1 Mild</a> </li>
              <li> <a href=''>Air Max 90</a>                </li>
              <li> <a href=''>Air Max 95</a>                </li>
              <li> <a href=''>Air Max 97</a>                </li>
              <li> <a href=''>Air Max 270</a>               </li>
              <li> <a href=''>Air Max 365</a>               </li>
              <li> <a href=''>Air Max Plus</a>              </li>
              <li> <a href=''>Air Max SC</a>                </li>

            </ul>
          </div>
          <div className="row2 ">
            <button className='text-lg  text-[4vw] font-Oswald mb-4 cursor-pointer inline-block  md:mb-10 md:pointer-events-none md:text-[2vw]' onClick={() => setOpenSection(openSection => (openSection == 'shoes' ? null : 'shoes'))} >Shoes</button>
            <ul className={`${openSection == 'shoes' ? 'block' : 'hidden'} mx-8 mb-4   md:block md:mx-0   space-y-2 [&_a]:hover:text-gray-500`}>

              <li>   <a href=''>All Shoes</a ></li>
              <li>   <a href=''>Custom Shoes</a ></li>
              <li>   <a href=''>Jordan Shoes</a ></li>
              <li>   <a href=''>Running Shoes</a ></li>
              <li>   <a href=''>Basketball Shoes</a ></li>
              <li>   <a href=''>Football Shoes</a ></li>
              <li>   <a href=''>Gym and Training Shoes</a> </li>
              <li>   <a href=''>Lifestyle Shoes</a> </li>
            </ul>
          </div>
          <div className="row3 ">
            <button className='text-lg  text-[4vw] font-Oswald mb-4 cursor-pointer inline-block  md:mb-10 md:pointer-events-none md:text-[2vw]' onClick={() => setOpenSection(openSection => (openSection == 'clothing' ? null : 'clothing'))} >Clothing</button>
            <ul className={`${openSection == 'clothing' ? 'block' : 'hidden'} mx-8 mb-4   md:block md:mx-0   space-y-2 [&_a]:hover:text-gray-500`}>
              <li>  <a href='' >All Clothing</a>       </li>
              <li>  <a href='' >Modest Wear</a>            </li>
              <li>  <a href='' >Hoodies & Pullovers</a>     </li>
              <li>  <a href='' >Shirts & Tops</a>           </li>
              <li>  <a href='' >Jackets</a>                 </li>
              <li>  <a href='' >Compression & Nike Pro</a>  </li>
              <li>  <a href='' >Trousers & Leggings</a>     </li>
              <li>  <a href='' >Shorts</a>                  </li>
            </ul>
          </div>

          <div className="row4   ">
            <button className='text-lg  text-[4vw] font-Oswald mb-4 cursor-pointer inline-block  md:mb-10 md:pointer-events-none md:text-[2vw]' onClick={() => setOpenSection(openSection => (openSection == 'kids' ? null : 'kids'))} >Kids</button>
            <ul className={`${openSection == 'kids' ? 'block' : 'hidden'} mx-8 mb-4   md:block md:mx-0   space-y-2 [&_a]:hover:text-gray-500`}>

              <li> <a href=''>Infant & Toddler Shoes     </a> </li>
              <li> <a href=''>Kids' Shoes                 </a>   </li>
              <li> <a href=''>Kids' Basketball Shoes   </a>   </li>
              <li> <a href=''>Kids' Running Shoes  </a>    </li>
              <li> <a href=''>Kids' Clothing         </a>  </li>
              <li> <a href=''>Kids' Backpacks     </a>   </li>
              <li> <a href=''>Kids' Socks         </a>  </li>
            </ul>
          </div>


        </div>
      </div>
    </header>
  )
}

export default Header

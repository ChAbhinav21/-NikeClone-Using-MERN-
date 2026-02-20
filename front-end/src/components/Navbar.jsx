import React, { useState } from "react";
import userImg from '../assets/user.png'
import nikeLogo from '../assets/favicon.ico'
import searchIcon from '../assets/search.png'
import bagIcon from '../assets/bag.png'
import heartIcon from '../assets/outline-heart.png'
import hamburger from '../assets/hamburger.png'
import Slidebar from "./Slidebar";
import FeaturesDropdown from "./FeaturesDropdown";
import {Link} from 'react-router-dom'
function Navbar() {
  const [isUser, setIsUser] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [openSlidebar ,setOpenSlidebar ] = useState(false)
  const [openFeatures,setOpenFeatures] = useState(-1)
  const helpOptions = [
    "Order Status",
    "Dispatch & Delivery",
    "Returns",
    "Contact Us",
    "Privacy Policy",
    "Terms of Sale",
    "Terms of Use",
    "Send Us Feedback",
  ];

  const profileOptions = [
    { label: "Profile", link: "/profile" },
    { label: "Orders", link: "/orders" },
    { label: "Favourites", link: "/favourites" },
    { label: "Inbox", link: "/inbox" },
    { label: "Experiences", link: "/experiences" },
    { label: "Account Settings", link: "/account-settings" },
    { label: "Log Out", link: "/logout" },
  ];

  const navItems = [
    { label: "Find a Store" },
    { label: "Help", id: "help", dropdown: helpOptions },
    { label: "Join Us", hideWhenLoggedIn: true },
    {
      label: isUser ? `Hi, ${'Usercomes from backend'}` : "Login",
      id: "account",
      dropdown: isUser ? profileOptions : null,
    },
  ];

  const features = [
    { label: 'News & Featured',dropdown:[{heading:'Featured',items:['New & Upcoming Drops','New Arrivals','Bestsellers','SNKRS Launch Calendar','Customise with Nike By You','Jordan','LeBron James','All Conditions Gear',]},
  {heading:'Trending',items:['Ready for the Cold','More Colours, More Running','Vomero Premium',"What's Trending",'24.7 Collection','Colours of the Season','Retro Running',"Running Shoe Finder",]},
  {heading:'Shop Icons',items:["Lifestyle","Air Force 1","Air Jordan 1","Air Max","Dunk","Cortez","Blazer","Pegasus","Vomero",,]},
  {heading:'Shop By Sport',items:["Running","Basketball","Football","Golf","Tennis & Pickleball","Gym & Training","Yoga","Skateboarding","Trail Running ",]},
]},
    { label: 'Mens' ,dropdown:[ {heading:"Featured",items:["New Arrivals","Bestsellers","Shop All Sale","All Conditions Gear",]},
  {heading:"Shoes",items:["All Shoes","Lifestyle","Jordan","Running","Football","Basketball","Gym & Training","Tennis","Skateboarding","Sandals & Slides","Nike By You",]},
  {heading:"Clothing",items:["All Clothing","Tops & T-Shirts","Shorts","Pants & Leggings","Hoodies & Sweatshirts","Jackets & Gilets","Jerseys & Kits","Jordan",]},
  {heading:"Shop By Sport",items:["Running","Basketball","Football","Golf","Tennis & Pickleball","Gym & Training","Yoga","Skateboarding","Trail Running",]},
  {heading:"Accessories & Equipment",items:["All Accessories & Equipment","Bags & Backpacks","Socks","Hats & Headwear",]},
]},

  { label: 'Women',dropdown:[{heading:"Featured",items:["New Arrivals","Bestsellers","Shop All Sale","All Conditions Gear",]},
  {heading:"Shoes",items:["All Shoes","Lifestyle","Jordan","Running","Football","Basketball","Gym & Training","Tennis","Skateboarding","Sandals & Slides","Nike By You",]},
  {heading:"Clothing",items:["All Clothing","Performance Essentials","Tops & T-Shirts","Sports Bras","Pants & Leggings","Shorts","Hoodies & Sweatshirts","Jackets & Gilets","Skirts & Dresses","Modest Wear","Nike Maternity","Plus Size",]},
  {heading:"Shop By Sport",items:["Yoga","Running","Gym & Training","Basketball","Tennis & Pickleball","Golf","Football","Skateboarding","Trail Running",]},
  {heading:"Accessories & Equipment",items:["All Accessories & Equipment","Bags & Backpacks","Socks","Hats & Headwear",]},
]},

    { label: 'Kids' ,dropdown:[ {heading:"Featured",items:["New Arrivals","Bestsellers","Back to School","Sport Gear","Lifestyle Looks","Nike x LEGO®","All Conditions Gear",]},
  {heading:"Shoes",items:["All Shoes","Lifestyle","Jordan","Football","Running","Basketball",]},
  {heading:"Clothing",items:["All Clothing","Tops & T-Shirts","Sport Bras","Hoodies & Sweatshirts","Pants & Leggings","Shorts","Jackets & Gilets",  ]},
 { heading:"Kids By Age",items:["Older Kids (7 - 14 years)","Younger Kids (4 - 7 years)","Babies & Toddlers (0 - 4 years)"]},
  {heading:"Shop By Sport",items:["Football","Running","Basketball","Gym & Training","Trail Running",]},
  {heading:"Accessories & Equipment",items:["All Accessories & Equipment","Bags & Backpacks","Socks","Hats & Headwear",]},
]},

    { label: 'SNKRS',  },
    { label: 'ADMIN', },
  ]

 
 
  return (  
      <> 
      {/* first Part */} 
      <div className="svgdiv z-50 hidden md:flex w-full  justify-between  bg-gray-100 px-5 py-1 md:px-12 align-center">
        <div className=''>
          <a href=''>
            <svg height="24px" width="24px" fill="#111" viewBox="0 0 26 32">
              <path d="M14.4 5.52v-.08q0-.56.36-1t.92-.44 1 .36.48.96-.36 1-.96.4l-.24.08.08.12-.08.44-.16 1.28q.08.08.08.16l-.16.8q-.08.16-.16.24l-.08.32q-.16.64-.28 1.04t-.2.64V12q-.08.4-.12.64t-.28.8q-.16.32 0 1.04l.08.08q0 .24.2.56t.2.56q.08 1.6-.24 2.72l.16.48q.96.48.56 1.04l.4.16q.96.48 1.36.84t.8.76q.32.08.48.24l.24.08q1.68 1.12 3.36 2.72l.32.24v.08l-.08.16.24.16h.08q.24.16.32.16h.08q.08 0 .16-.08l.16-.08q.16-.16.32-.24h.32q.08 0 0 .08l-.32.16-.4.48h.56l.56.08q.24-.08.4-.16l.4-.24q.24-.08.48.16h.08q.08.08-.08.24l-.96.88q-.4.32-.72.4l-1.04.72q-.08.08-.16 0l-.24-.32-.16-.32-.2-.28-.24-.32-.2-.24-.16-.2-.32-.24q-.16 0-.32-.08l-1.04-.8q-.24 0-.56-.24-1.2-1.04-1.6-1.28l-.48-.32-.96-.16q-.48-.08-1.28-.48l-.64-.32q-.64-.32-.88-.32l-.32-.16q-.32-.08-.48-.16l-.16-.16q-.16 0-.32.08l-1.6.8-2 .88q-.8.64-1.52 1.04l-.88.4-1.36.96q-.16.16-.32 0l-.16.16q-.24.08-.32.08l-.32.16v.16h-.16l-.16.24q-.16.32-.32.36t-.2.12-.08.12l-.16.16-.24.16-.36-.04-.48.08-.32.08q-.4.08-.64-.12t-.4-.6q-.16-.24.16-.4l.08-.08q.08-.08.24-.08h.48L1.6 26l.32-.08q0-.16.08-.24.08-.08.24-.08v-.08q-.08-.16-.08-.32-.08-.16-.04-.24t.08-.08h.04l.08.24q.08.4.24.24l.08-.16q.08-.16.24-.16l.16.16.16-.16-.08-.08q0-.08.08-.08l.32-.32q.4-.48.96-.88 1.12-.88 2.4-1.36.4-.4.88-.4.32-.56.96-1.2.56-.4.8-.56.16-.32.4-.32H10l.16-.16q.16-.08.24-.16v-.4q0-.4.08-.64t.4-.24l.32-.32q-.16-.32-.16-.72h-.08q-.16-.24-.16-.48-.24-.4-.32-.64h-.24q-.08.24-.4.32l-.08.16q-.32.56-.56.84t-.88.68q-.4.4-.56.88-.08.24 0 .48l-.08.16h.08q0 .16.08.16h.08q.16.08.16.2t-.24.08-.36-.16-.2-.12l-.24.24q-.16.24-.32.2t-.08-.12l.08-.08q.08-.16 0-.16l-.64.16q-.08.08-.2 0t.04-.16l.4-.16q0-.08-.08-.08-.32.16-.64.08l-.4-.08-.08-.08q0-.08.08-.08.32.08.8-.08l.56-.24.64-.72.08-.16q.32-.64.68-1.16t.76-.84l.08-.32q.16-.32.32-.56t.4-.64l.24-.32q.32-.48.72-.48l.24-.24q.08-.08.08-.24l.16-.16-.08-.08q-.48-.4-.48-.72-.08-.56.36-.96t.88-.36.68.28l.16.16q.08 0 .08.08l.32.16v.24q.16.16.16.24.16-.24.48-.56l.4-1.28q0-.32.16-.64l.16-.24v-.16l.24-.96h.16l.24-.96q.08-.24 0-.56l-.32-.8z"></path>
            </svg>
          </a>
        </div>
        {/* NAV ITEMS */}
        <ul className="flex ">
          {navItems.map((item, idx) => {
            if (item.hideWhenLoggedIn && isUser) return null;

            return (
              <li
                key={idx}
                className="relative flex items-center  justify-center space-x-2 mx-1"
                onMouseEnter={() => item.id && setActiveMenu(item.id)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-gray-500 text-sm"
                >
                  {item.label}
                </a>

                {/* DROPDOWN */}
                {item.dropdown && activeMenu === item.id && (
                  <div className="absolute right-0 top-3  z-50 pt-3">
                    <div className="w-52 bg-white rounded-md shadow-lg">
                      <ul className="flex flex-col px-4 py-4 space-y-2">
                        <h1 className="text-sm font-semibold mb-1 capitalize">
                          {item.id}
                        </h1>

                        {item.dropdown.map((opt, i) => (
                          <li className="cursor-pointer" key={i}>
                            <a
                              href={opt.link || "#"}
                              className="block text-xs text-gray-600 hover:text-black transition-colors"
                            >
                              {opt.label || opt}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                {idx !== navItems.length - 1 && <span className="mx-1">|</span>}

              </li>
            );
          })}
          <div>
            <img src={userImg} className="w-7" alt="" />
          </div>
        </ul>
      </div>


 <nav className="sticky top-0   z-40   w-full    bg-white    shadow-sm">
      {/* Second Part */} 
        <div className="second bg-white px-5 md:px-12 flex justify-between items-center py-2">
        <Link to={`/home`}>
        <div className="nikelogo">
            <img src={nikeLogo} alt=""  className="bg-transparent w-10" /> 
        </div>
         </Link>
        <div className="desktop-features my-4 ">
          <ul className="hidden md:flex space-x-5 relative ">
            {
              features && features.map((item, idx) => (
                <li className={` `} key={idx} 
                 onMouseEnter={() => item.dropdown && setOpenFeatures(idx)}
                onMouseLeave={() => setOpenFeatures(-1)} 
                >
                  
                
                  <a href="" className="
                   relative
                   
                     hover:border-none
                   after:absolute
                   after:left-0 
                   after:-bottom-2
                   after:h-[2px]
                   after:w-0
                   after:bg-black
                   after:transition-all
                   after:duration-300
                   hover:after:w-full
                 ">
                    {item.label}
                  </a>
                </li>
              ))
            }
          </ul>
        </div>
           {/* { openFeatures !=-1 && features[openFeatures].dropdown!=undefined && <FeaturesDropdown openFeatures={openFeatures} setOpenFeatures={setOpenFeatures} FeaturesAbsolute={features[openFeatures].dropdown}  /> 
              } */}
               { 
                <FeaturesDropdown
  openFeatures={openFeatures}
  setOpenFeatures={setOpenFeatures}
  FeaturesAbsolute={
    openFeatures !== -1 ? features[openFeatures]?.dropdown : []
  }
/>
}   
          <div className="user-icons flex items-center space-x-3">
            <div className="search-space  bg-neutral-100   flex items-center rounded-full     hover:bg-neutral-200">
            
              <img className="w-8  bg-neutral-100 rounded-full py-1 px-1 cursor-pointer"  src={searchIcon}></img> 
           
              <input type="text" placeholder="Search" className="hidden md:inline  bg-transparent py-1 px-1 outline-none w-28" />
            </div>
    

            <button className="w-7"><img src={heartIcon} alt="" /></button>
            <button className="w-7 relative"><img src={bagIcon} alt="" className="relative"/>  </button>
            <button className="md:hidden w-7"><img src={userImg} alt="" /></button>
            <button className="md:hidden w-7" onClick={()=>setOpenSlidebar(true)}><img src={hamburger} alt="" /></button>
            <Slidebar openSlidebar={openSlidebar} seOpenSlidebar={setOpenSlidebar} features={features} />
          </div>
      </div>
      </nav> 
</>
  );
}

export default Navbar;
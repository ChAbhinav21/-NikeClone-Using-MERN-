import { useState } from "react";
import {
  CiInstagram,
  CiFacebook,
  CiTwitter,
  CiYoutube,
  CiLocationOn,
} from "react-icons/ci";

function Footer() {
  const [openHelp, setOpenHelp] = useState(false);
  const [openAboutNike, setOpenAboutNike] = useState(false);

  const nikeShop = [
    "FIND A STORE",
    "BECOME A MEMBER",
    "SEND US FEEDBACK",
    "STUDENT DISCOUNT",
  ];

  const getHelp = [
    "Order Status",
    "Delivery",
    "Returns",
    "Contact Us on Nike.com Inquiries",
    "Contact Us on Other Inquiries",
  ];

  const aboutNike = [
    "News",
    "Careers",
    "Investors",
    "Sustainability",
  ];

  const socialLinks = [
    { icon: CiTwitter, link: "#" },
    { icon: CiFacebook, link: "#" },
    { icon: CiYoutube, link: "#" },
    { icon: CiInstagram, link: "#" },
  ];

  const lastLinks = [
    "Guides",
    "Terms and Conditions",
    "Terms of Use",
    "Nike Privacy Policy",
  ];

  return (
    <footer className="bg-black   text-white px-5 md:px-12">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8">

        {/* Nike Shop */}
        <ul className="space-y-2">
          {nikeShop.map((item, idx) => (
            <li key={idx} className="font-Oswald text-lg uppercase">
              <a href="#" className="hover:underline">{item}</a>
            </li>
          ))}
        </ul>

       {/* Get Help */}
<div>
  <button
    onClick={() => setOpenHelp(prev => !prev)}
    className="font-Oswald mb-2 w-full flex justify-between items-center md:cursor-default"
    aria-expanded={openHelp}
  >
    <span>GET HELP</span>
    <span className="md:hidden">{openHelp ? "−" : "+"}</span>
  </button>

  <ul className={`space-y-1 ${openHelp ? "block" : "hidden"} md:block`}>
    {getHelp.map((item, idx) => (
      <li key={idx} className="text-gray-400 ">
        <a href="#" className="hover:text-white">{item}</a>
      </li>
    ))}
  </ul>
</div> 

{/* About Nike */}
<div>
  <button
    onClick={() => setOpenAboutNike(prev => !prev)}
    className="font-Oswald mb-2 w-full flex justify-between items-center md:cursor-default"
    aria-expanded={openAboutNike}
  >
    <span>ABOUT NIKE</span>
    <span className="md:hidden">{openAboutNike ? "−" : "+"}</span>
  </button>

  <ul className={`space-y-1 ${openAboutNike ? "block" : "hidden"} md:block`}>
    {aboutNike.map((item, idx) => (
      <li key={idx} className="text-gray-400 "> 
        <a href="#"  className="hover:text-white">{item}</a>
      </li>
    ))}
  </ul>
</div>


        {/* Social Icons */}
        <div className="flex space-x-4 text-2xl">
          {socialLinks.map(({ icon: Icon, link }, idx) => (
            <a key={idx} href={link} className="text-gray-400 inline-block">
              <Icon className="hover:text-white"/>
            </a>
          ))}
        </div>

      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm py-4 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <CiLocationOn />
          <span>India</span>
          <span>© 2025 Nike, Inc. All Rights Reserved</span>
        </div>

        <div className="flex space-x-4 mt-2 md:mt-0">
          {lastLinks.map((item, idx) => (
            <a key={idx} href="#" className="hover:text-white">
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer;

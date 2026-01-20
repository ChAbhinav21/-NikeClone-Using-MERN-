import React from 'react'

function FeaturesDropdown({ openFeatures, setOpenFeatures, FeaturesAbsolute }) {
  return (
    
   <div
  className={`
    absolute left-0 top-12   w-screen
    ${openFeatures !== -1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}
     
    transition-opacity  duration-700 ease-out
    flex justify-center
  `}
  onMouseEnter={() => setOpenFeatures(openFeatures)}
  onMouseLeave={() => setOpenFeatures(-1)}
>
  <div className=" my-2   w-full px-12 py-8 flex justify-center  bg-white">
  <ul className="m-3 flex   space-x-12">
    {FeaturesAbsolute.map((section, idx) => (
      <li key={idx} className="list-none">
        <h2 className="font-semibold mb-4">{section.heading}</h2>
        <ul className="space-y-2">
          {section.items.map((item, i) => (
            <li
              key={i}
              className="text-gray-500 hover:text-black"
            >
              <a href="">{item}</a>
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
</div>
 </div>
  );
}


export default FeaturesDropdown
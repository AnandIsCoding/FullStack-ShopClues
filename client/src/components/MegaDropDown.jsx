import React from 'react';

const MegaDropDown = ({ categoryId, categoryName }) => {
  return (
    <div
      className="mega-dropdown "
      id={`dropdown-${categoryId}`}
    >
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 text-sm text-gray-700">
        <div>
          <h3 className="font-semibold text-black mb-2">{categoryName}</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-blue-600">Subitem 1</a></li>
            <li><a href="#" className="hover:text-blue-600">Subitem 2</a></li>
            <li><a href="#" className="hover:text-blue-600">Subitem 3</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-black mb-2">Popular Brands</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-blue-600">Brand A</a></li>
            <li><a href="#" className="hover:text-blue-600">Brand B</a></li>
            <li><a href="#" className="hover:text-blue-600">Brand C</a></li>
          </ul>
        </div>
        {/* Add more columns as needed */}
      </div>
    </div>
  );
};

export default MegaDropDown;

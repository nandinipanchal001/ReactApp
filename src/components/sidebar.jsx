import React, { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import IconImg from '../assets/creative-galileo.png'

const SideBar = () => {

  const menuItems = [
    { icon: <IoPersonOutline size={20} className="mr-4" />, text: "Manage Customers" },
  ];

  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4 shadow-sm">
      <div
        className={
          "sidebar fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        {/* <h2 className="text-2xl p-4">Creative Galelio</h2> */}
        <img src={IconImg}/>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            {menuItems.map(({ icon, text }, index) => {
              return (
                <div key={index} className=" py-4">
                  <li className="flex cursor-pointer rounded-full mx-auto p-2">
                    {icon} {text}
                  </li>
                </div>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;

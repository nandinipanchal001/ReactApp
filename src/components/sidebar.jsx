import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import IconImg from '../assets/creative-galileo.png'

const SideBar = () => {
  const navigateTo = useNavigate();

  const menuItems = [
    { icon: <MdDashboard size={20} className="mr-4" />, text: "Dashboard", linkTo:'/#' },
    { icon: <IoPersonOutline size={20} className="mr-4" />, text: "Manage Customers", linkTo:'/customer' },
  ];

  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4 shadow-sm">
      <div
        className={
          "sidebar fixed top-0 left-0 w-[300px] h-screen z-10 duration-300"
        }
      >
        {/* <h2 className="text-2xl p-4">Creative Galelio</h2> */}
        <img src={IconImg}/>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            {menuItems.map(({ icon, text,linkTo }, index) => {
              return (
                <div key={index} className=" py-4">
                  <li className="flex cursor-pointer rounded-full mx-auto p-2" onClick={()=> navigateTo(linkTo)}>
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

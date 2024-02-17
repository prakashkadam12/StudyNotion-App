import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { ImCart } from "react-icons/im";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";

import { IoMdArrowDropdownCircle } from "react-icons/io";

import Dropdown from "react-bootstrap/Dropdown";
import NavbarDarkExample from "./MoreItem";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItem } = useSelector((state) => state.cart);

  const location = useLocation();
  function matchRoute(route) {
    console.log("path=>", route);
    console.log("location=>", location);
    return (
      // this matchPath is the predefined funtion of react router lib
      matchPath({ path: route }, location.pathname)
    );
  }

  const [subLinks, setSubLinks] = useState([]);

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("💚 printing res=>", result);
      setSubLinks(result.data.data);
    } catch (error) {
      console.log("error- cannot fetch categoires list =>", error);
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  return (
    <div className="flex h-14 items-center justify-center border-b-richblack-700 border-b-[1px]">
      <div className="flex  w-11/12 max-w-maxContent items-center justify-between ">
        {/* logo */}
        <Link to="/">
          <img className="w-[100px] md:w-full" src={logo} alt="" />
        </Link>

        {/* nav links */}
        <nav className="hidden md:block ">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => {
              return (
                <>
                    {link.title !== "Catalog" && (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </>
              );
            })}
          </ul>
        </nav>

        {/* more items for mobile device */}
        <div className="visible  md:hidden">
            <NavbarDarkExample/>
        </div>

        {/* catalog btn */}
        <div className="text-white  visible ">
          
          <Dropdown>
            <Dropdown.Toggle className="p-2" variant="success" id="dropdown-basic">
              Catalog
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                    {
                        subLinks.length ? (
                          subLinks.map((subLink, index) => {
                            return (
                            //   <Link
                            //     className="text-black p-2 hover:bg-richblack-500 transition-all duration-200 "
                            //     to={`/catalog/${subLink.name
                            //       .split(" ")
                            //       .join("-")
                            //       .toLowerCase()}`}
                            //     key={index}
                            //   >
                            //     <p>{subLink?.name}</p>
                            //   </Link>
                            <Dropdown.Item  href={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}>{subLink?.name}</Dropdown.Item>
                            );
                          })
                        ) : (
                          <p className="text-black p-2 border-richblack-900 rounded-md border-[1px] ">
                            Nothing found
                          </p>
                        )
                    }
            </Dropdown.Menu>
          </Dropdown>
        </div>



        {/* login signup dashboard */}
        <div className="flex gap-x-4 items-center">
          {/* cart */}
          {user && user?.accountType != "Instructor" && (
            <Link to="/dashboard/cart" className="relative text-white">
              <ImCart />
              {totalItem && (
                <div className="absolute top-[-8px] right-[-4px] flex items-center justify-center h-4 w-4 rounded-full bg-yellow-100">
                  {totalItem && (
                    <span className="text-[10px] ">{totalItem}</span>
                  )}
                </div>
              )}
            </Link>
          )}

          {/* login btn */}
          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblue-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Login
              </button>
            </Link>
          )}

          {/* signup btn */}
          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblue-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Signup
              </button>
            </Link>
          )}

          {/* user profile icon */}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

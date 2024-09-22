import Link from "next/link";
import React from "react";

const Navbar = () => {
  const menus = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Category",
      href: "/",
      submenus: [
        {
          title: "Dhaka 1",
          href: "/",
        },
        {
          title: "Bangladesh 1",
          href: "/",
        },
      ],
    },

    {
      title: "Cricket",
      href: "/Cricket",
    },
    {
      title: "Football",
      href: "/Football",
    },
  ];
  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {menus?.map((menu, i) => {
              return !menu?.submenus ? (
                <li>
                  <Link href={menu?.href}>{menu?.title}</Link>
                </li>
              ) : (
                <li>
                  <a>{menu?.title}</a>
                  <ul className="p-2">
                    {menu?.submenus.map((itm, i) => {
                      return (
                        <li key={i}>
                          <Link href={itm?.href}> {itm?.title}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">BlogW</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menus?.map((menu, i) => {
            return !menu?.submenus ? (
              <li>
                <Link href={menu?.href}>{menu?.title}</Link>
              </li>
            ) : (
              <li>
                <details>
                  <summary>{menu?.title}</summary>
                  <ul className="p-2">
                    {menu?.submenus.map((itm, i) => {
                      return (
                        <li key={i}>
                          <Link href={itm?.href}> {itm?.title}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;

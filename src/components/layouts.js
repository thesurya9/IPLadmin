import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useRef, createRef, useEffect } from "react";
import { IoList, IoChevronBack } from "react-icons/io5";
import dynamic from "next/dynamic";
// import {
//   BrowserView,
//   MobileView,
//   isBrowser,
//   isMobile,
// } from "react-device-detect";
import * as rdd from "react-device-detect";

const menuItems = [
  {
    href: "/topTreding",
    title: "Top Treding Series",
    icon: "/home1.png",
    activeIcon: "/home.png",
  },
  {
    href: "/matches",
    title: "Matches",
    icon: "/home1.png",
    activeIcon: "/home.png",
  },
  {
    href: "/team",
    title: "Team",
    icon: "/security.png",
    activeIcon: "/security1.png",
  },
  {
    href: "/predictions",
    title: "Predictions",
    icon: "/home1.png",
    activeIcon: "/home.png",
  },

  {
    href: "/news",
    title: "News",
    icon: "/home1.png",
    activeIcon: "/home.png",
  },
  {
    href: "/PrivacyPolicy",
    title: "Privacy Policy",
    icon: "/security.png",
    activeIcon: "/security1.png",
  },
  // {
  //   href: "/team",
  //   title: "Team",
  //   icon: "/security.png",
  //   activeIcon: "/security1.png",
  // },
  // {
  //   href: "/termsConditions",
  //   title: "Terms Conditions",
  //   icon: "/security.png",
  //   activeIcon: "/security1.png",
  // },
];

const Layout = ({ children }) => {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [mobile, setMobile] = useState(false);
  const router = useRouter();
  const myRef = createRef();
  console.log("mobile--->", rdd.isMobile);
  console.log("browser--->", rdd.isBrowser);
  useEffect(() => {
    setMobile(rdd.isMobile);
    if (rdd.isBrowser) {
      setToggleDrawer(true);
    }
  }, [mobile]);

  return (
    <div className="md:min-h-screen flex sm:flex-1 flex-col" ref={myRef}>
      {router.route !== "/" && (
        <header
          className={`bg-black fixed top-0 w-full h-16 flex  font-semibold uppercase border-b-2 border-stone-800 ${
            toggleDrawer ? "ml-60" : "ml-0"
          }`}
        >
          <div className="flex justify-center items-center  ">
            {mobile && (
              <IoList
                className="text-red-700 h-8 w-8 mx-5"
                onClick={() => {
                  setToggleDrawer(!toggleDrawer);
                }}
              />
            )}
            <div
              className={`flex-1  justify-center items-center ${
                toggleDrawer ? "hidden md:flex" : "flex"
              }`}
            >
              <div className="h-8 w-8 relative ml-0 md:ml-10  ">
                <Image
                  src="/images.png"
                  alt="icon"
                  layout="fill" // required
                  objectFit="cover"
                  className="rounded-full"
                ></Image>
              </div>
              <h2 className="text-xs text-white font-semibold ml-2 capitalize ">
                Admin
              </h2>
            </div>

            <div
              className={`flex-1  fixed right-5 justify-end ${
                toggleDrawer ? "hidden md:flex" : "flex"
              }`}
            >
              {/* <div className="mx-2 cursor-pointer ">
                <Image
                  src="/notification1.png"
                  width="15"
                  height="15"
                  alt="icon"
                  layout="fixed"
                ></Image>
              </div> */}
              <div className="flex-1 flex justify-center item-center cursor-pointer ">
                <div className="mx-2 border-r-2 border-red-900 px-2">
                  <Image
                    src="/signout.png"
                    width="15"
                    height="15"
                    alt="icon"
                    layout="fixed"
                  ></Image>
                </div>
                <p className="text-xs text-white font-semibold mt-0.5 capitalize">
                  Sign out
                </p>
              </div>
            </div>
          </div>
        </header>
      )}
      {router.route !== "/" && toggleDrawer && (
        <aside className={`bg-stone-800 w-60 fixed z-100 min-h-screen `}>
          <div className="py-3 w-full justify-center text-center border-b-2 border-black">
            <Image
              src="/logo1.png"
              width="100"
              height="130"
              alt="icon"
              layout="fixed"
              className="my-2"
            ></Image>
          </div>

          <nav>
            <ul>
              {menuItems.map(({ href, title, icon, activeIcon }) => (
                <li
                  className="py-2  flex pl-3 border-b-2 border-black align-middle "
                  key={title}
                  onClick={() => {
                    router.push(href);
                    if (mobile) {
                      setToggleDrawer(!toggleDrawer);
                    }
                  }}
                >
                  <div className="justify-center align-middle">
                    <Image
                      src={router.asPath === href ? activeIcon : icon}
                      width="15"
                      height="15"
                      alt="icon"
                      layout="fixed"
                    ></Image>
                  </div>
                  <Link href={href}>
                    <a
                      className={`flex ml-2 font-bold  hover:text-white cursor-pointer  text-sm ${
                        router.asPath === href ? "text-white" : "text-red-900"
                      }`}
                    >
                      {title}
                    </a>
                  </Link>
                  <div className="text-right flex-1 mr-3">
                    <Image
                      src={
                        router.asPath === href
                          ? "/fwd-white.png"
                          : "/fwd-red.png"
                      }
                      width="8"
                      height="15"
                      alt="icon"
                      layout="fixed"
                    ></Image>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
      <div className="flex flex-col md:flex-row">
        <main
          className={
            router.route !== "/" && toggleDrawer
              ? " pl-60 w-full pt-16"
              : "flex-1"
          }
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { Api } from "../src/services/service";

export default function Home(props) {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [formdata, setformdata] = useState({
    username: "",
    password: "",
  });

  const submit = () => {
    props.loader(true);
    console.log(formdata);
    Api("post", "login", formdata, router).then(
      (res) => {
        console.log(res);
        if (res?.status) {
          localStorage.setItem("userDetail", JSON.stringify(res.data));
          setformdata({
            username: "",
            password: "",
          });
          router.replace("matches");
        }
        props.loader(false);
      },
      (err) => {
        console.log(err);
        props.toaster({
          type: "error",
          message: err.message,
        });
        props.loader(false);
      }
    );
  };

  return (
    <div className="flex min-h-screen bg-black justify-center items-center ">
      <div className="border-2 rounded-3xl border-red-700 md:p-10 p-5 sm:w-1.5 md:w-1/3  ">
        <p className="text-white text-center md:text-4xl text-2xl font-semibold mb-10">
          Welcome
        </p>
        <div className="flex bg-stone-800 py-2 my-4 rounded-md  md:h-14 sm:h-10 w-64 md:min-w-full ">
          <div className="flex md:mx-4 mx-2.5 justify-center md:h-10 sm:h-8 items-center ">
            <div className="md:w-5 md:h-5 w-4 h-4 relative">
              <Image
                src="/Email.png"
                width="20"
                height="20"
                alt="icon"
                layout="responsive"
              ></Image>
            </div>
          </div>
          <input
            placeholder="Email"
            value={formdata.username}
            onChange={(text) => {
              setformdata({ ...formdata, username: text.target.value });
            }}
            className="bg-stone-800 outline-none pl-2 text-white text-xs md:text-base border-l-2 border-black md:h-10 h-5"
          />
        </div>
        <div className="flex bg-stone-800 py-2 my-4 rounded-md  md:h-14 sm:h-10 min-w-full relative items-center w-64 md:min-w-full ">
          <div className="flex md:mx-4 mx-2.5  justify-center md:h-10 sm:h-8 items-center ">
            <div className="md:w-5 md:h-5 w-4 h-4 relative">
              <Image
                src="/lock.png"
                width="20"
                height="20"
                alt="icon"
                layout="responsive"
              ></Image>
            </div>
          </div>
          <input
            placeholder="Password"
            value={formdata.password}
            onChange={(text) => {
              setformdata({ ...formdata, password: text.target.value });
            }}
            type={showPass ? "text" : "password"}
            className="bg-stone-800 outline-none pl-2 text-white text-xs md:text-base border-l-2 border-black md:h-10 h-5"
          />
          <div
            className="absolute right-3 "
            onClick={() => setShowPass(!showPass)}
          >
            <div className="md:w-5 md:h-3.5 w-3.5 h-2.5 relative">
              <Image
                src={showPass ? "/eye.png" : "/eye-1.png"}
                width="20"
                height="15"
                alt="icon"
                layout="responsive"
              ></Image>
            </div>
          </div>
        </div>

        <div className=" mt-10 grid grid-cols-2 gap-8">
          <div className="items-start">
            <p className="text-white text-left md:text-4xl text-2xl font-semibold ">
              Sign in
            </p>
          </div>
          <div className="flex justify-end" onClick={() => submit()}>
            <div className="md:w-10 md:h-10 w-8 h-8 relative">
              <Image
                src="/next.png"
                width="40"
                height="40"
                alt="icon"
                layout="responsive"
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

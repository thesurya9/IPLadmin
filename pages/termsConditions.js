import React from "react";
import { Api } from "../src/services/service";
import { useRouter } from "next/router";

const TermsConditions = () => {
  const router = useRouter();
  const [TermsConditionsdata, setTermsConditionsdata] = useState({});

  const createTermsConditions = () => {
    props.loader(true);
    console.log(TermsConditionsdata);
    Api("post", "jobs/saveNews", TermsConditionsdata, router).then(
      (res) => {
        console.log(res);
        if (res?.status) {
          TermsConditionsdata({
            // title: "",
            // date: "",
            // location: "",
            // news: "",
          });
        }
        props.loader(false);
      },
      (err) => {
        console.log(err);
        props.loader(false);
      }
    );
  };

  return (
    <div className=" min-h-screen bg-black md:-mt-16 overflow-x-auto">
      <div className="pt-20 pb-5 px-5">
        <div className="grid grid-cols-2 bg-stone-900 md:px-5 p-3 rounded-sm  border-t-4 border-red-700 ">
          <div>
            <p className="text-white font-bold md:text-3xl text-lg">
              Terms & Conditions
            </p>
          </div>
        </div>
        <div className=" border-2 border-red-700 rounded-sm p-5">
          <div>
            <input
              value={PrivacyPolicydata}
              onChange={(text) => {
                setTermsConditionsdata({
                  ...TermsConditionsdata,
                  privacyPolicy: text.target.value,
                });
              }}
              placeholder="Enter Terms & Conditions"
              className="rounded-md border-2 border-red-900 mt-1 outline-none text-white bg-black p-1.5 w-full"
              rows="10"
            ></input>
            <div className="flex justify-end mt-4">
              <button
                className="text-white bg-red-700 rounded-sm  text-md py-21 w-32 h-10"
                onClick={() => {
                  createTermsConditions();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;

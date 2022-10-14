import React, { useState } from "react";
import { Api } from "../src/services/service";
import { useRouter } from "next/router";
import {
  checkForEmptyKeys,
  checkEmail,
} from "../src/services/InputsNullChecker";

const PrivacyPolicy = (props) => {
  const router = useRouter();
  const [PrivacyPolicydata, setPrivacyPolicydata] = useState({
    matchScore: "",
    privacyPolicy: "",
    tandc: "",
  });

  const createPrivacyPolicy = () => {
    console.log(PrivacyPolicydata);

    let { anyEmptyInputs, errorString } = checkForEmptyKeys(PrivacyPolicydata);
    console.log(errorString);
    if (anyEmptyInputs.length > 0) {
      props.toaster({ type: "error", message: errorString });
      return;
    }

    props.loader(true);
    console.log(PrivacyPolicydata);
    Api("post", "jobs/saveOtherInfo", PrivacyPolicydata, router).then(
      (res) => {
        console.log(res);
        if (res?.status) {
          setPrivacyPolicydata({
            matchScore: "",
            privacyPolicy: "",
            tandc: "",
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
              Privacy Policy
            </p>
          </div>
        </div>
        <div className=" border-2 border-red-700 rounded-sm p-5">
          <div>
            <p className="text-white text-lg font-semibold mt-1">
              {" "}
              Privacy Policy
            </p>
            <input
              value={PrivacyPolicydata.privacyPolicy}
              onChange={(text) => {
                setPrivacyPolicydata({
                  ...PrivacyPolicydata,
                  privacyPolicy: text.target.value,
                });
              }}
              placeholder="Enter Privacy Policy"
              className="rounded-md border-2 border-red-900 mt-1 outline-none text-white bg-black p-1.5 w-full"
              rows="10"
            ></input>
          </div>

          <div>
            <p className="text-white text-lg font-semibold mt-1">
              {" "}
              Terms & Conditions
            </p>
            <input
              value={PrivacyPolicydata.tandc}
              onChange={(text) => {
                setPrivacyPolicydata({
                  ...PrivacyPolicydata,
                  tandc: text.target.value,
                });
              }}
              placeholder="Enter Terms & Conditions"
              className="rounded-md border-2 border-red-900 mt-1 outline-none text-white bg-black p-1.5 w-full"
              rows="10"
            ></input>
          </div>

          <div>
            <p className="text-white text-lg font-semibold mt-1">
              {" "}
              Match Score
            </p>
            <input
              value={PrivacyPolicydata.matchScore}
              onChange={(text) => {
                setPrivacyPolicydata({
                  ...PrivacyPolicydata,
                  matchScore: text.target.value,
                });
              }}
              placeholder="Enter Match Score"
              className="rounded-md border-2 border-red-900 mt-1 outline-none text-white bg-black p-1.5 w-full"
              rows="10"
            ></input>
          </div>

          <div className="flex justify-end mt-4">
            <button
              className="text-white bg-red-700 rounded-sm  text-md py-21 w-32 h-10"
              onClick={() => {
                createPrivacyPolicy();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

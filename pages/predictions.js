/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Api } from "../src/services/service";

const Predictions = (props) => {
  const router = useRouter();
  const [teamsList, setTeamsList] = useState([]);

  const [formdata, setformdata] = useState({
    id: "",
    prediction: "",
  });

  const createPredictions = () => {
    props.loader(true);
    console.log(formdata);
    Api("post", "jobs/prediction", formdata, router).then(
      (res) => {
        console.log(res);
        if (res?.status) {
        }
        props.loader(false);
      },
      (err) => {
        console.log(err);
        props.loader(false);
      }
    );
  };

  useEffect(() => {
    getAllMatch();
  }, []);

  const getAllMatch = () => {
    const userDetail = JSON.parse(localStorage.getItem("userDetail"));
    const data = { id: userDetail.id };
    Api("post", "jobs/getAllMatch", data, router).then(
      (res) => {
        console.log(res);
        if (res?.status) {
          setTeamsList(res.data.matchList);
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
              Predictions
            </p>
          </div>
        </div>
        <div className=" border-2 border-red-700 rounded-sm p-5">
          <div>
            <select
              value={formdata.id}
              onChange={(text) => {
                setformdata({ ...formdata, id: text.target.value });
              }}
              className="rounded-md border-2 border-red-900 mt-1 outline-none text-white bg-black p-1.5 w-52"
            >
              {teamsList.map((match) => (
                <option key={match._id} value={match._id}>
                  {match.teamA} vs {match.teamB}
                </option>
              ))}
            </select>
            <textarea
              value={formdata.prediction}
              onChange={(text) => {
                setformdata({ ...formdata, prediction: text.target.value });
              }}
              placeholder="Enter Predictions"
              className="rounded-md border-2 border-red-900 mt-1 outline-none text-white bg-black p-1.5 w-full"
              rows="10"
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                className="text-white bg-red-700 rounded-sm  text-md py-21 w-32 h-10"
                onClick={() => {
                  createPredictions();
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

export default Predictions;

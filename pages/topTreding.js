/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import CreateSeries from "../src/components/topTreding/createSeries";
import SeriesList from "../src/components/topTreding/seriesList";
import { Api } from "../src/services/service";
import { useRouter } from "next/router";
import moment from "moment/moment";

const TopTreding = (props) => {
  const router = useRouter();
  const [teamsList, setTeamsList] = useState([]);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getAllMatch();
  }, []);

  const getAllMatch = () => {
    const userDetail = JSON.parse(localStorage.getItem("userDetail"));
    const data = { id: userDetail.id };
    Api("post", "jobs/getAllSeries", data, router).then(
      (res) => {
        console.log(res);
        if (res?.status) {
          res.data.seriesList.forEach((element) => {
            element.startDate = moment(element.startDate).format("DD-MM-YYYY");
            element.endDate = moment(element.endDate).format("DD-MM-YYYY");
          });
          setTeamsList(res.data.seriesList);
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
      {showForm && (
        <CreateSeries
          setShowForm={setShowForm}
          {...props}
          title="Top Trending Series"
          getAllMatch={getAllMatch}
        />
      )}
      <div className="pt-20 pb-5 px-5">
        <button
          className="bg-red-700 text-white rounded p-1.5 mt-1 ml-5 px-5"
          onClick={() => {
            setShowForm(true);
          }}
        >
          Add Series
        </button>
        <div className="p-5 mt">
          <div className="grid grid-cols-2 bg-stone-900 md:px-5 p-3 rounded-sm  border-t-4 border-red-700 ">
            <div>
              <p className="text-white font-bold md:text-3xl text-lg">
                Series List
              </p>
            </div>
          </div>
          <SeriesList data={teamsList} />
        </div>
      </div>
    </div>
  );
};

export default TopTreding;

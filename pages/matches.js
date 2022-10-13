/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CreactTaems from "../src/components/topTreding/creactTaems";
import TeamsList from "../src/components/topTreding/teamsList";
import { Api } from "../src/services/service";
import { useRouter } from "next/router";

const Matches = (props) => {
  const router = useRouter();
  const [teamsList, setTeamsList] = useState([
    {
      series_name: "abcd",
      start_date: "12/9/2022",
      end_date: "20/9/2022",
      location: "Australia",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

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
      {showForm && (
        <CreactTaems setShowForm={setShowForm} title="Matches" {...props} />
      )}
      <div className="pt-20 pb-5 px-5">
        <button
          className="bg-red-700 text-white rounded p-1.5 mt-1 ml-5 px-5"
          onClick={() => {
            setShowForm(true);
          }}
        >
          Add Match
        </button>
        <div className="p-5 mt">
          <div className="grid grid-cols-2 bg-stone-900 md:px-5 p-3 rounded-sm  border-t-4 border-red-700 ">
            <div>
              <p className="text-white font-bold md:text-3xl text-lg">
                Matche List
              </p>
            </div>
          </div>
          <TeamsList data={teamsList} />
        </div>
      </div>
    </div>
  );
};

export default Matches;

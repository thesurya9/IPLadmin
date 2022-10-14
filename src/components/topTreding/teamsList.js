import Table, { indexID } from "../../../src/components/table"; // new
import React, { useMemo } from "react";

const TeamsList = (props) => {
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        Cell: indexID,
      },
      {
        Header: "Series Name",
        accessor: "seriesName",
      },
      {
        Header: "Team A",
        accessor: "teamA",
      },
      {
        Header: "Team B",
        accessor: "teamB",
      },
      {
        Header: "Start Date",
        accessor: "startDate",
      },
      // {
      //   Header: "End Date",
      //   accessor: "endDate",
      // },
      {
        Header: "Location",
        accessor: "location",
      },

      {
        Header: "Action",
        Cell: ActionSection,
      },
    ],
    []
  );

  function ActionSection({ row }) {
    console.log(row);
    return (
      <div className="flex ">
        {/* <div className="h-7 w-9 bg-white rounded-sm  flex justify-center items-center">
          <IoEyeSharp className="text-red-700 h-4 w-4 " />
        </div> */}
        <div
          className="h-7 w-9 bg-red-700 rounded-sm ml-2 flex justify-center items-center"
          onClick={() => {
            props.setSigleData(row.original);
            props.setShowForm(true);
            props.goToTop();
          }}
        >
          Edit
        </div>
      </div>
    );
  }
  return <Table columns={columns} data={props.data} />;
};

export default TeamsList;

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
    ],
    []
  );
  return <Table columns={columns} data={props.data} />;
};

export default TeamsList;

import React, { useMemo } from "react";
import { useTable } from "react-table";
import "./SubmissionTable.css";

function SubmissionTable({ submissions }) {
  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Service", accessor: "service" },
      { Header: "Beverage", accessor: "beverage" },
      { Header: "Cleanliness", accessor: "cleanliness" },
      { Header: "Overall Experience", accessor: "overallExperience" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: submissions });

  return (
    <div className="submission-table-container">
      <table {...getTableProps()} className="submission-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th key={column.id} {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}


export default SubmissionTable;
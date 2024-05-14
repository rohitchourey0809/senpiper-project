// SubmissionTable.js

import React, { useMemo, useState, useEffect } from "react";
import { useTable, useFilters } from "react-table";
import { RiSearchLine } from "react-icons/ri";
import "./SubmissionTable.css";

function SubmissionTable() {
  const [submissions, setSubmissions] = useState(
    JSON.parse(localStorage.getItem("submissions")) || []
  );
  const [filterInput, setFilterInput] = useState("");

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Service", accessor: "service" },
      // { Header: "Beverage", accessor: "beverage" },
      // { Header: "Cleanliness", accessor: "cleanliness" },
      // { Header: "Overall Experience", accessor: "overallExperience" },
    ],
    []
  );

  useEffect(() => {
    localStorage.setItem("submissions", JSON.stringify(submissions));
  }, [submissions]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setFilter,
  } = useTable({ columns, data: submissions }, useFilters);

  const handleFilterChange = (e) => {
    const value = e.target.value || "";
    setFilter("name", value);
    setFilterInput(value);
  };

  return (
    <div className="submission-table-wrapper">
      <div className="header-container">
        <div className="filter-container">
          <input
            value={filterInput}
            onChange={handleFilterChange}
            placeholder="Search by name..."
            className="filter-input"
          />
          <RiSearchLine className="search-icon" />
        </div>
      </div>
      <div className="content">
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
    </div>
  );
}

export default SubmissionTable;

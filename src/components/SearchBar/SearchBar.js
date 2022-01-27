import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
// SearchBar Actions
import axios from "axios";
// urls
import { JOB_URL} from '../../enviroment';

export const SearchBar = () => {
  
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Hacemos peticion de los trabajos en el back
    axios.get(JOB_URL)
      .then(jobs => setJobs(jobs.data))

  }, []);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = jobs.filter((value) => {
      return value.job_name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">

      <div className="searchInputs">
        <input
          type="text"
          placeholder="Buscar..."
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a key={value.job_id} href={`/job/${value.job_id}`} className="dataItem" rel="noreferrer">
                <p>{value.job_name} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};
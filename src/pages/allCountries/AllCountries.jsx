import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AllCountries.module.css";

const AllCountries = () => {
  const [countries, setCountries] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        console.log(data);
      });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const regionChange = (e) => {
    setRegion(e.target.value);
  };
  return (
    <>
      <div className={styles.filter}>
        <div className={styles.searchBar}>
          <i className="fi fi-rs-search"></i>
          <input
            type="text"
            name="countrySearchInput"
            id="countrySearch"
            placeholder="Search for a country"
            value={search}
            onChange={handleChange}
          />
        </div>
        <select
          className={styles.filterRegion}
          onChange={regionChange}
          name=""
          value={region}
          id="filterRegion"
        >
          <option value="">Filter by region</option>
          <option value="africa">Africa</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="america">America</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
      <div id={styles.countryContainer} className={styles.countryContainer}>
        {countries &&
          countries
            .filter((item) => {
              const nameMatch = item.name.common.toLowerCase().includes(search);

              const regionMatch = region === "" || item.region.toLowerCase() === region;
              return nameMatch && regionMatch
            })
            .map((item) => {
              return (
                <Link
                  to={`${item.name.common}`}
                  className={styles.eachCard}
                  key={item.name.common}
                >
                  <img
                    src={item.flags.png}
                    alt={`${item.name.common}`}
                    className={styles.eachCardImg}
                  />

                  <div className={styles.cardDetails}>
                    <h4>{item.name.common}</h4>

                    <p>
                      <strong>Population</strong>: {item.population}
                    </p>
                    <p>
                      <strong>Region</strong>: {item.region}
                    </p>
                    <p>
                      <strong>Capital</strong>: {item.capital}
                    </p>
                  </div>
                </Link>
              );
            })}
      </div>
    </>
  );
};

export default AllCountries;
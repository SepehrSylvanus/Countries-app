import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./EachCountry.module.css";
import Country from '../../types'
import { Skeleton, Typography } from "@mui/material";
const EachCountry = () => {
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        console.log("data:", data)
        const soberName = getSoberPathName();
        console.log(soberName)
        
        const getSelectedCountry = data.find(
          (item) => item.name.common.split(' ').join('').toLowerCase() === soberName
        );
        console.log('Selected Country:',getSelectedCountry)
        setLoading(false);
        setCountry(getSelectedCountry);
      });
  }, []);

  const location = useLocation();
  function getSoberPathName() {
    const { pathname } = location;
    console.log("Pathname:",pathname)
    const soberPathName = pathname.split("%20").join('').split('').splice(1).join('').toLowerCase();
    console.log('soberPathName:',soberPathName)
    return soberPathName;
  }

  const navigate = useNavigate();

  function separateNumber(number) {
    const str = number.toString();
    const regex = /\B(?=(\d{3})+(?!\d))/g;
    return str.replace(regex, ",");
  }
  if (loading) {
    return (
      <>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <i className="fi fi-rr-arrow-small-left"></i> Back
        </button>
        <div className={styles.pageContainer}>
          <div
            className={styles.oneDetails}
            style={loading ? { position: "relative" } : { position: "unset" }}
          >
            <div className={styles.imgContainer}>
              <Skeleton width={288} height={144} variant="rectangular" />
            </div>
            <div className={styles.detailsContainer}>
              <Typography variant="h1" style={{ float: "left" }}>
                <Skeleton width={100} height={50} style={{ float: "left" }} />
              </Typography>
              <div className={styles.littleDetails}>
                <Typography variant="body1">
                  <Skeleton width={50} height={20} />
                </Typography>
                <Typography variant="body1">
                  <Skeleton width={50} height={20} />
                </Typography>
                <Typography variant="body1">
                  <Skeleton width={50} height={20} />
                </Typography>
                <Typography variant="body1">
                  <Skeleton width={50} height={20} />
                </Typography>
                <Typography variant="body1">
                  <Skeleton width={50} height={20} />
                </Typography>
                <Typography variant="body1">
                  <Skeleton width={50} height={20} />
                </Typography>
                <Typography variant="body1">
                  <Skeleton width={50} height={20} />
                </Typography>
                <Typography variant="body1">
                  <Skeleton width={50} height={20} />
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!loading) {
    // retrieving object values
console.log(country)
    // retrieving native names
    const name = country?.name?.nativeName?.common || "";
    const nativeNames = Object.keys(country?.name?.nativeName || {}).map(
      (key) => (country?.name?.nativeName ? country.name.nativeName[key] : "")
    );

    // retrieve currencies
    const currencies = country?.currencies;
  
    const currenciesKeys = Object.keys(currencies || {});
    
    const currencyValue = currencies ? currencies[currenciesKeys[0]] : null;
 

    // retrieving languages
    const languages = Object.keys(country?.languages || {}).map(
      (key) => country?.languages ? country.languages[key] : ""
    );
    
    return (
      <>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <i className="fi fi-rr-arrow-small-left"></i> Back
        </button>
        <div className={styles.pageContainer}>
          <div className={styles.oneDetails}>
            <div className={styles.imgContainer}>
              <img src={country?.flags.png} alt={name} />
            </div>
            <div className={styles.detailsContainer}>
              <h1>{name}</h1>
              <div className={styles.littleDetails}>
                <p>
                  <strong>Native Name</strong>:{" "}
                  {nativeNames.map((item) => item.common).join(", ")}
                </p>
                <p>
                  <strong>Population</strong>:{" "}
                  {separateNumber(country?.population)}
                </p>
                <p>
                <strong>Region</strong>: {country?.region ?? "N/A"}
                </p>
                <p>
                  <strong>Sub Region</strong>: {country?.subregion}
                </p>
                <p>
                  <strong>Capital</strong>: {country?.capital}
                </p>
                <p>
                  <strong>Top Level Domain</strong>: {country?.tld[0]}
                </p>
                <p>
                  <strong>Currencies</strong>:{" "}
                  {`${currencyValue?.name} - ${currencyValue?.symbol}`}
                </p>
                <p>
                  <strong>Languages</strong>: {languages.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default EachCountry;

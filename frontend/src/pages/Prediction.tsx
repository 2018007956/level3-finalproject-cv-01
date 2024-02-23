import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import Select from 'react-select';
import styles from "./Prediction.module.css";
import { companyOptions, periodOptions, intervalOptions } from '../docs/prediction_data';

const PredictionWithSelect: FunctionComponent = () => {
  const navigate = useNavigate();

  const onHomeContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onAboutUsContainerClick = useCallback(() => {
    navigate("/about-us");
  }, [navigate]);

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  return (
    <div className={styles.prediction}>
      <div className={styles.header}>
        <div className={styles.home} onClick={onHomeContainerClick}>
          <i className={styles.home1}>HOME</i>
        </div>
        <div className={styles.frameContainer}>
          <i className={styles.stockPrediction}>Stock Prediction</i>
        </div>
        <div className={styles.aboutUs} onClick={onAboutUsContainerClick}>
          <i className={styles.aboutUs1}>About Us</i>
        </div>
      </div>
      
    <div className={styles.selectContainer}>
      <div className={styles.selectBlock}>
        <label className={styles.selectLabel}>Stock</label>
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={companyOptions[0]}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="color"
          options={companyOptions}
        />
        
      </div>
    </div>


    <div className={styles.selectContainer}>
      <div className={styles.selectBlock}>
        <label className={styles.selectLabel}>Period</label>
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={periodOptions[0]}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="color"
          options={periodOptions}
        />
        
    </div>
        

        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={intervalOptions[0]}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="color"
          options={intervalOptions}
        />
      </div>
    </div>
  );
};

export default PredictionWithSelect;
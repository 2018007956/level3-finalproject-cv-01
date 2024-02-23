import React, { FunctionComponent, useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import styles from './Prediction.module.css';
import { companyOptions, periodOptions, intervalOptionsMap } from '../docs/prediction_data';

const Prediction: FunctionComponent = () => {
  const navigate = useNavigate();

  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [selectedInterval, setSelectedInterval] = useState<string | null>(null);
  const [intervalOptions, setIntervalOptions] = useState<{ label: string, value: string }[]>([]);

  // 출력값을 저장할 state
  const [predictionResult, setPredictionResult] = useState<string>('');


  const handleIntervalChange = (option: { value: string; label: string } | null) => {
    setSelectedInterval(option ? option.value : null);
  };

  useEffect(() => {
    if (selectedPeriod) {
      const options = intervalOptionsMap[selectedPeriod as keyof typeof intervalOptionsMap];
      if (options) {
        const newIntervalOptions = options.map(interval => ({
          label: interval, value: interval
        }));
        setIntervalOptions(newIntervalOptions);
        setSelectedInterval(newIntervalOptions[0].value);
      }
    } else {
      setIntervalOptions([]);
      setSelectedInterval(null);

    }
  }, [selectedPeriod]);

  const onHomeContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onAboutUsContainerClick = useCallback(() => {
    navigate("/about-us");
  }, [navigate]);

  // Predict 버튼 클릭 핸들러
  const handlePredictClick = () => {
    // 모든 값을 선택했는지 확인합니다.
    if (!selectedStock || !selectedPeriod || !selectedInterval) {
      const missingSelections = [];
      if (!selectedStock) missingSelections.push('Stock');
      if (!selectedPeriod) missingSelections.push('Period');
      if (!selectedInterval) missingSelections.push('Interval');
      setPredictionResult(`Please select ${missingSelections.join(', ')}`);
    } else {
      setPredictionResult(`Stock: ${selectedStock}, Period: ${selectedPeriod}, Interval: ${selectedInterval}`);
    }
  };

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  return (
    <div className={styles.prediction}>
      <div className={styles.menuBar}>
        <div className={styles.home} onClick={onHomeContainerClick}>
          HOME
        </div>
        <div className={styles.frameContainer}>
          Stock Prediction
        </div>
        <div className={styles.aboutUs} onClick={onAboutUsContainerClick}>
          About Us
        </div>
      </div>

      <div className={styles.selectContainer}>
        <div className={styles.selectBlock}>
          <label className={styles.selectLabel}>Stock</label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            value={selectedStock ? companyOptions.find(option => option.value === selectedStock) : null}
            onChange={(option) => setSelectedStock(option?.value || null)}
            options={companyOptions}
            placeholder="Select..."
            isClearable={isClearable}
            isDisabled={isDisabled}
            isLoading={isLoading}
            isRtl={isRtl}
            isSearchable={isSearchable}
            name="stock"
          />
        </div>

        <div className={styles.selectBlock}>
          <label className={styles.selectLabel}>Period</label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            value={selectedPeriod ? periodOptions.find(option => option.value === selectedPeriod) : null}
            onChange={(option) => setSelectedPeriod(option?.value || null)}
            options={periodOptions}
            placeholder="Select..."
            isClearable={isClearable}
            isDisabled={isDisabled}
            isLoading={isLoading}
            isRtl={isRtl}
            isSearchable={isSearchable}
            name="period"
          />
        </div>


        <div className={styles.selectBlock}>
          <label className={styles.selectLabel}>Interval</label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            value={selectedInterval ? intervalOptions.find(option => option.value === selectedInterval) : null}
            onChange={(option) => setSelectedInterval(option?.value || null)}
            options={intervalOptions}
            placeholder="Select..."
            isClearable={isClearable}
            isDisabled={isDisabled}
            isLoading={isLoading}
            isRtl={isRtl}
            isSearchable={isSearchable}
            name="interval"
          />
        </div>

      </div>

      <button className={styles.predictBtn} onClick={handlePredictClick}>
        Predict
      </button>

      <div className={styles.predictionResult}>
        {predictionResult}
      </div>
    </div>
  );
};

export default Prediction;

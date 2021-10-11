import React, { useState, useRef } from 'react';
import './styles.css';

const ResponseCheck = () => {
  const [flag, setFlag] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.');
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef(null);
  const endTime = useRef(null);

  const onClickScreen = (e) => {
    if (flag === 'waiting') {
      setFlag('ready');
      setMessage('초록색이 되면 클릭하세요.');
      timeout.current = setTimeout(() => {
        setFlag('now');
        setMessage('지금 클릭');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000 + 2000));
    } else if (flag === 'ready') {
      clearTimeout(timeout.current);
      setFlag('waiting');
      setMessage('너무 성급하시군요! 초록색이 되면 클릭하세요.');
    } else {
      endTime.current = new Date();
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
      setFlag('waiting');
      setMessage('클릭해서 시작하세요.');
    }
  };

  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
    );
  };

  return (
    <>
      <div id="screen" className={flag} onClick={onClickScreen}>
        {message}
      </div>
      {result.length !== 0 && <div>{renderAverage()}</div>}
    </>
  );
};

export default ResponseCheck;

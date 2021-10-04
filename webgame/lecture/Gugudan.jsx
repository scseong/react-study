const React = require('react');
const { useState, useRef } = React;

const Gugudan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    if (parseInt(value) === first * second) {
      setResult('딩동댕');
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');
    } else {
      setResult('땡!');
    }

    inputRef.current.focus();
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        {first} 곱하기 {second}는?
      </div>
      <input type="number" value={value} onChange={onChange} ref={inputRef} />
      <button>입력!</button>
      <div>{result}</div>
    </form>
  );
};

module.exports = Gugudan;

const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState('리액트');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    if (value[0] === word[word.length - 1]) {
      setResult('딩동댕');
      setWord(value);
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
      <div>{word}</div>
      <input type="text" value={value} onChange={onChange} ref={inputRef} />
      <button>입력!</button>
      <div>{result}</div>
    </form>
  );
};

module.exports = WordRelay;

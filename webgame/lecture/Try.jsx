import React from 'react';

const Try = React.memo((props) => {
  return (
    <li>
      <div>{props.tryInfo.try}</div>
      <div>{props.tryInfo.result}</div>
    </li>
  );
});

export default Try;

import React from 'react';
import Tr from './Tr';
import './styles.css';

const Table = ({ onClick, tableData, dispatch }) => {
  return (
    <table onClick={onClick}>
      {Array(tableData.length)
        .fill()
        .map((tr, i) => (
          <Tr rowData={tableData[i]} rowIndex={i} dispatch={dispatch} />
        ))}
    </table>
  );
};

export default Table;

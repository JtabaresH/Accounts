import React, { useState } from 'react';

const ExpenseTable = ({ expenses, togglePaid }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Descripción</th>
          <th scope="col">Valor</th>
          <th scope="col">Pagado</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => (
          <tr key={index}>
            <td>{expense.description}</td>
            <td>{expense.amount}</td>
            <td>
              <input type="checkbox" checked={expense.paid} onChange={() => togglePaid(index)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTable;

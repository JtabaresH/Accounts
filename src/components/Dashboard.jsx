import React, { useState } from 'react';
import ExpenseTable from './ExpenseTable';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);

  const handleAddExpense = (e) => {
    e.preventDefault();
    setExpenses([...expenses, { description, amount: parseFloat(amount), paid: false }]);
    setDescription('');
    setAmount(0);
  };

  const togglePaid = (index) => {
    const newExpenses = expenses.map((expense, i) => {
      if (i === index) {
        return { ...expense, paid: !expense.paid };
      }
      return expense;
    });
    setExpenses(newExpenses);
  };

  const balance = income - expenses.filter(e => e.paid).reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <form onSubmit={handleAddExpense}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción</label>
          <input type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Valor</label>
          <input type="number" className="form-control" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Agregar Gasto</button>
      </form>

      <div className="mb-3">
        <label htmlFor="income" className="form-label">Ingreso Quincenal</label>
        <input type="number" className="form-control" id="income" value={income} onChange={(e) => setIncome(e.target.value)} />
      </div>

      <h3>Balance: {balance}</h3>

      <ExpenseTable expenses={expenses} togglePaid={togglePaid} />
    </div>
  );
};

export default Dashboard;

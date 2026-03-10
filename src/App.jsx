import { useState, useEffect } from "react";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("expenses");
    if (saved) setExpenses(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (!name || !amount) return;

    const newExpense = {
      id: Date.now(),
      name,
      amount: parseFloat(amount)
    };

    setExpenses([...expenses, newExpense]);
    setName("");
    setAmount("");
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Expense Tracker</h1>

      <input
        placeholder="Expense name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={addExpense}>Add</button>

      <h2>Expenses</h2>

      {expenses.map(e => (
        <div key={e.id} style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{e.name} - ₹{e.amount}</span>
          <button onClick={() => removeExpense(e.id)}>Delete</button>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>
    </div>
  );
}
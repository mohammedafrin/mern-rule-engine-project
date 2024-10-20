import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 
//import { FaMoon } from 'react-icons/fa'; Importing React Icon

const App = () => {
  const [ruleString, setRuleString] = useState('');  // Rule string input
  const [age, setAge] = useState('');                // Age input
  const [salary, setSalary] = useState('');          // Salary input
  const [experience, setExperience] = useState('');  // Experience input
  const [department, setDepartment] = useState('');  // Department input
  const [ast, setAst] = useState(null);              // Store the generated AST
  const [result, setResult] = useState(null);        // Evaluation result
  const [theme, setTheme] = useState('light');       // Theme toggle state

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Function to create the AST based on the rule string
  const handleCreateAst = async () => {
    try {
      const response = await axios.post('https://backend-rule-engine-1.onrender.com/api/rules/create', { ruleString:ruleString });
      setAst(response.data);  // Store the generated AST
      alert('AST created successfully!');
    } catch (error) {
      console.error('Error creating AST:', error);
      alert('Failed to create AST');
    }
  };

  // Function to evaluate the rule with the form data
  const handleEvaluateAst = async () => {
    if (!ast) {
      alert('Please create the AST first.');
      return;
    }

    try {
      const response = await axios.post('https://backend-rule-engine-1.onrender.com/api/rules/evaluate', {
        ast:ast.ast,
        data: { age: parseInt(age), salary: parseInt(salary), experience: parseInt(experience), department:department}
      });
      setResult(response.data.result);  //Store the evaluation result
      
    } catch (error) {
      console.error('Error evaluating AST:', error);
      alert('Failed to evaluate the rule.');
    }
  };

  return (
    <div className={`app ${theme}`}>
      <div className="card">
        <h1 className="heading">Rule Engine with AST</h1>

        {/* Theme toggle button with React icon */}
        <button className="theme-toggle" onClick={toggleTheme}>
          
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
          
        </button>

        {/* Rule String Input */}
        <div className="input-group">
          <label className="form-label">Rule String:</label>
          <input
            type="text"
            value={ruleString}
            onChange={(e) => setRuleString(e.target.value)}
            placeholder="Enter rule string"
          />
          <button className="btn" onClick={handleCreateAst}>Create AST</button>
        </div>

        {/* Form Inputs */}
        <div className="input-group">
          <label className="form-label">Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
          />
        </div>
        <div className="input-group">
          <label className="form-label">Salary:</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Enter salary"
          />
        </div>
        <div className="input-group">
          <label className="form-label">Experience:</label>
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Enter experience"
          />
        </div>
        <div className="input-group">
          <label className="form-label">Department:</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Enter department"
          />
        </div>

        {/* Evaluate AST Button */}
        <button className="btn" onClick={handleEvaluateAst}>Evaluate AST</button>

        {/* Display Evaluation Result */}
        {result !== null && (
          <div className="result">
            <h2>The User is {result ? '' : 'not'} eligible</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
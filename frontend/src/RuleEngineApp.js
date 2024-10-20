import React, { useState } from 'react';
import axios from 'axios';
import RuleInputForm from './components/RuleInputForm';

const RuleEngineApp = () => {
  const [rule, setRule] = useState('');
  const [ast, setAst] = useState(null);
  const [data, setData] = useState({ age: '', department: '', salary: '', experience: '' });
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const createRule = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/rules/create', { ruleString: rule });
      setAst(response.data.ast);
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating rule:', error);
      setErrorMessage("Something went wrong! Please check your inputs and try again.");
    }
  };

  const evaluateRule = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/rules/evaluate', { ast, data });
      setResult(response.data.result);
      setErrorMessage('');
    } catch (error) {
      console.error('Error evaluating rule:', error);
      setErrorMessage("Something went wrong! Please check your inputs and try again.");
    }
  };

  return (
    <div className="container">
      <h1>Rule Engine - Frontend</h1>
      <RuleInputForm
        rule={rule}
        setRule={setRule}
        data={data}
        handleInputChange={handleInputChange}
        createRule={createRule}
        evaluateRule={evaluateRule}
        result={result}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default RuleEngineApp;
import React, { useState } from 'react';

import Input from './components/common/Input/Input';
import BarChart from './components/BarChart/BarChart';

import './App.scss';

function App() {
  const defaultState = {
    chartValues: [],
    name: '',
    value: '',
    touched: {
      name: false,
      value: false
    }
  };

  const [state, setState] = useState(defaultState);

  const submitForm = (e) => {
    e.preventDefault();

    const labelIndex = state.chartValues.findIndex(item => item.name === state.name);

    // sum up the values for existing items
    if (labelIndex > -1) {
      const value = Number(state.value) + state.chartValues[labelIndex].value;
      
      updateCharValues.splice(labelIndex, 1, {
        name: state.name,
        value
      });
      
      const updateCharValues = [...state.chartValues];
      
      return setState({ ...defaultState, chartValues: updateCharValues });
    }

    const newValue = {
      name: state.name,
      value: Number(state.value)
    };

    // insert new bar for new item
    const updateCharValues = [...state.chartValues, newValue];

    setState({ ...defaultState, chartValues: updateCharValues });
  };

  const handleInput = (field) => {
    if (field.name === "value" && field.value < 0) return null;

    setState({ ...state, [field.name]: field.value });
  };

  const handleTouched = (fieldName) => {
    if (!state.touched[fieldName]) {
      setState({
        ...state,
        touched: {
          ...state.touched,
          [fieldName]: true
        }
      });
    }
  };

  const isAddEnabled = Boolean(state.name && state.value);

  return <div className="app__container">
    <form className="c-row">
      <Input
        fieldName="name"
        type="text"
        inputValue={state.name}
        touched={state.touched.name}
        onFieldChanged={handleInput}
        onBlur={handleTouched}
      />

      <Input
        fieldName="value"
        type="number"
        inputValue={state.value}
        touched={state.touched.value}
        onFieldChanged={handleInput}
        onBlur={handleTouched}
      />

      <button
        type="submit"
        className="c-cta"
        onClick={submitForm}
        disabled={!isAddEnabled}
      >
        Add
      </button>
    </form>

    <BarChart values={state.chartValues} />
  </div>
};

export default App;

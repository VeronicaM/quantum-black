import React, { useState } from 'react';

import Input from './components/common/Input/Input';
import BarChart from './components/BarChart/BarChart';

import './App.scss';

function App() {
  const defaultState = {
    chartValues: [{
      name: 'banana',
      value: 20
    }, {
      name: 'apple',
      value: 110
    }, {
      name: 'pear',
      value: 90
    }, {
      name: 'orange',
      value: 50
    }, {
      name: 'lemon',
      value: 200
    }, {
      name: 'pineapple',
      value: 150
    }],
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

      const updateCharValues = [...state.chartValues];

      updateCharValues.splice(labelIndex, 1, {
        name: state.name,
        value
      });

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
    <header>
      <h1> Responsive D3 BarChart </h1>
      <p> Fill in a text as label, e.g. banana, an a positive numberic value, e.g. 100 and press Add once the button becomes enabled. </p>
    </header>
    <main>
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
    </main>
    <footer>
      Created by @Veronica Mihai 2020 with ☕ and 🎵
    </footer>
  </div>
};

export default App;

import React from 'react';
import { render } from '@testing-library/react';
import BarChart from './BarChart.js';

import { chartValues, testExistingItem, testNewItem } from './testData/data.js';

test('the component is rendered correctly for the passed in props', () => {
    const { container } = render(<BarChart values={chartValues} />);
    // contains one bar for each value
    expect(container.querySelectorAll('rect').length).toBe(chartValues.length);

    // contains 2 labels for each value
    expect(container.querySelectorAll('text').length).toBe(chartValues.length * 2);
});

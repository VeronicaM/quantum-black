import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './Input.js';

const mockFunc = () => { };
const inputTestId = "custom-input";
const inputErrorId = "input-error";

test("text inputs can be created", () => {
    const textInput = () => render(<Input
        fieldName="name"
        type="text"
        inputValue="apple"
        touched={false}
        onFieldChanged={mockFunc}
        onBlur={mockFunc}
    />);
    expect(textInput).not.toThrowError();
});

test("number inputs can be created", () => {
    const numberInput = () => render(<Input
        fieldName="value"
        type="number"
        inputValue="10"
        touched={false}
        onFieldChanged={mockFunc}
        onBlur={mockFunc}
    />);
    expect(numberInput).not.toThrowError();
});

test("other input types which are not text or number throw an error ", () => {
    const fileInput = () => render(<Input
        fieldName="your CV"
        type="file"
        inputValue={{}}
        touched={false}
        onFieldChanged={mockFunc}
        onBlur={mockFunc}
    />)

    expect(fileInput).toThrowError();
});

test("negative numbers are not allowed in number type inputs", () => {
    const { getByTestId } = render(<Input
        fieldName="value"
        type="number"
        inputValue=""
        touched={false}
        onFieldChanged={mockFunc}
        onBlur={mockFunc}
    />);

    const inputField = getByTestId(inputTestId);
    fireEvent.change(inputField, { target: { value: -23 } });

    expect(inputField.value).toBe("");
});

test('input value is reset when empty inputValue is passed in', () => {
    const { getByTestId, rerender } = render(<Input
        fieldName="value"
        type="number"
        inputValue="20"
        touched={false}
        onFieldChanged={mockFunc}
        onBlur={mockFunc}
    />);

    const inputField = getByTestId(inputTestId);

    expect(inputField.value).toBe("20");

    rerender(<Input inputValue="" />)

    expect(inputField.value).toBe("");
});


test("an error message is shown if input has been touched and is invalid, i.e. empty", () => {
    const { getByTestId } = render(<Input
        fieldName="value"
        type="number"
        inputValue=""
        touched={true}
        onFieldChanged={mockFunc}
        onBlur={mockFunc}
    />);

    const errorElement = getByTestId(inputErrorId);

    expect(errorElement.textContent.trim()).toBe("Please fill in number for value");
});

test("the error message cannot be found if the input value is valid", () => {
    const { getByTestId } = render(<Input
        fieldName="value"
        type="number"
        inputValue="10"
        touched={true}
        onFieldChanged={mockFunc}
        onBlur={mockFunc}
    />);

    const errorElement = () => getByTestId(inputErrorId);

    expect(errorElement).toThrowError();
});

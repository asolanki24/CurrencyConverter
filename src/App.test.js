import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Calculator } from './calculator/calculator';

it("Renders Correctly", () => {
  const { queryByTestId, queryByPlaceholderText } = render(<Calculator />);
  expect(queryByTestId("sourceCurrSeelct")).toBeTruthy();
});

describe("Source Amount change", () => {
  it("Source Amount Changes", () => {
    const { queryByTestId } = render(<Calculator />);
    const sourceInput = queryByTestId("txtAmount");
    fireEvent.change(sourceInput, { target: { value: '10' } });
    expect(sourceInput.value).toBe('10');
  });
});

describe("Source currency changes", () => {
  it("Source Currency Changes", () => {
    const { queryByTestId } = render(<Calculator />);
    const sourceCurr = queryByTestId("sourceCurrSeelct");
    fireEvent.change(sourceCurr, { target: { value: "AUD" } });
    expect(sourceCurr.value).toBe("AUD");
  });
});

describe("Target Currency Change", () => {
  it("Target Currency Change", () => {
    const { queryByTestId } = render(<Calculator />);
    const targetCurr = queryByTestId("currToConvertSelect");
    fireEvent.change(targetCurr, { target: { value: "AUD" } });
    expect(targetCurr.value).toBe("AUD");
  });
});

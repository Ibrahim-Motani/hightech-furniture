import { useState } from "react";

const useInput = validateValue => {
  const [enteredValue, setEnteredValue] = useState("");
  const [valueIsTouched, setValueIsTouched] = useState(false);

  const isValid = validateValue(enteredValue);

  const hasError = !isValid && valueIsTouched;

  const valueChangeHandler = event => {
    setEnteredValue(event.target.value);
  };

  const valueBlurHandler = event => {
    setValueIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setValueIsTouched(false);
  };

  return {
    enteredValue,
    isValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInput;

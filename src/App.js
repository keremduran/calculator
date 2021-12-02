import "./styles.css";
import { useReducer } from "react";
import CalculatorButton from "./CalculatorButton";

const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

const CALCULATOR_BUTTONS = [
  { title: "AC", action: ACTIONS.CLEAR, className: "span-two" },
  { title: "DEL", action: ACTIONS.ADD_DIGIT },
  { title: "÷", action: ACTIONS.CHOOSE_OPERATION },
  { title: "1", action: ACTIONS.ADD_DIGIT },
  { title: "2", action: ACTIONS.ADD_DIGIT },
  { title: "3", action: ACTIONS.ADD_DIGIT },
  { title: "*", action: ACTIONS.CHOOSE_OPERATION },
  { title: "4", action: ACTIONS.ADD_DIGIT },
  { title: "5", action: ACTIONS.ADD_DIGIT },
  { title: "6", action: ACTIONS.ADD_DIGIT },
  { title: "+", action: ACTIONS.CHOOSE_OPERATION },
  { title: "7", action: ACTIONS.ADD_DIGIT },
  { title: "8", action: ACTIONS.ADD_DIGIT },
  { title: "9", action: ACTIONS.ADD_DIGIT },
  { title: "-", action: ACTIONS.CHOOSE_OPERATION },
  { title: ".", action: ACTIONS.ADD_DIGIT },
  { title: "0", action: ACTIONS.ADD_DIGIT },
  { title: "=", action: ACTIONS.ADD_DIGIT, className: "span-two" },
];

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      let digit = payload.title;
      if (digit === "0" && state.currentOperand === "0") return state;

      if (payload.title === "." && state.currentOperand.includes("."))
        return state;

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.title,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.CLEAR:
      return {};
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const current = parseFloat(currentOperand);
  const prev = parseFloat(previousOperand);
  if (isNaN(previousOperand) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }

  return computation.toString();
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      {CALCULATOR_BUTTONS.map((button) => {
        return (
          <CalculatorButton
            title={button.title}
            dispatch={dispatch}
            action={button.action}
            className={button.className}
          >
            {button.title}
          </CalculatorButton>
        );
      })}
    </div>
  );
}

export default App;

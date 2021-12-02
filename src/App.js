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
  { title: "DEL", action: ACTIONS.DELETE_DIGIT },
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
  { title: "=", action: ACTIONS.EVALUATE, className: "span-two" },
];

function formatOperand(operand) {
  if (operand == null) return;

  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      let digit = payload.title;
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: digit,
          overwrite: false,
        };
      }
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
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.title,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.title,
        currentOperand: null,
      };
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.currentOperand == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.CLEAR:
      return {};
    default:
      return state;
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
    default:
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
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      {CALCULATOR_BUTTONS.map((button, index) => {
        return (
          <CalculatorButton
            title={button.title}
            dispatch={dispatch}
            action={button.action}
            className={button.className}
            key={`${index}-${button.title}`}
          >
            {button.title}
          </CalculatorButton>
        );
      })}
    </div>
  );
}

export default App;

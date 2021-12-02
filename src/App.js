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
  { title: "AC", action: ACTIONS.ADD_DIGIT, className: "span-two" },
  { title: "DEL", action: ACTIONS.ADD_DIGIT },
  { title: "÷", action: ACTIONS.ADD_DIGIT },
  { title: "1", action: ACTIONS.ADD_DIGIT },
  { title: "2", action: ACTIONS.ADD_DIGIT },
  { title: "3", action: ACTIONS.ADD_DIGIT },
  { title: "*", action: ACTIONS.ADD_DIGIT },
  { title: "4", action: ACTIONS.ADD_DIGIT },
  { title: "5", action: ACTIONS.ADD_DIGIT },
  { title: "6", action: ACTIONS.ADD_DIGIT },
  { title: "+", action: ACTIONS.ADD_DIGIT },
  { title: "7", action: ACTIONS.ADD_DIGIT },
  { title: "8", action: ACTIONS.ADD_DIGIT },
  { title: "9", action: ACTIONS.ADD_DIGIT },
  { title: "-", action: ACTIONS.ADD_DIGIT },
  { title: ".", action: ACTIONS.ADD_DIGIT },
  { title: "0", action: ACTIONS.ADD_DIGIT },
  { title: "=", action: ACTIONS.ADD_DIGIT, className: "span-two" },
];

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
  }
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
            digit={button.title}
            dispatch={dispatch}
            action={button.action}
            className={button.className}
          >
            {button.title}
          </CalculatorButton>
        );
      })}
      {/* <button className="span-two">AC</button>
      <button>DEL</button>
      <button>1</button>
      <CalculatorButton digit="÷" action={action} />
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className="span-two">=</button> */}
    </div>
  );
}

export default App;

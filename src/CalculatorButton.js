export default function CalculatorButton({
  action,
  dispatch,
  digit,
  className,
}) {
  return (
    <button
      className={className}
      onClick={() => dispatch({ type: action, payload: { digit } })}
    >
      {digit}
    </button>
  );
}

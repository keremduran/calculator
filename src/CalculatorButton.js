export default function CalculatorButton({
  action,
  dispatch,
  title,
  className,
}) {
  return (
    <button
      className={className}
      onClick={() => dispatch({ type: action, payload: { title } })}
    >
      {title}
    </button>
  );
}

interface Props {
  value: number;
  max: number;
  onChange: (v: number) => void;
}

export default function QuantityControl({ value, max, onChange }: Props) {
  const minus = () => {
    if (value > 1) onChange(value - 1);
  };

  const plus = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "16px 0" }}>
      <button onClick={minus} style={{ width: "32px", height: "32px" }}>-</button>
      <span>{value}</span>
      <button onClick={plus} style={{ width: "32px", height: "32px" }}>+</button>
    </div>
  );
}
interface Props {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

export default function VariantSelect({ label, options, value, onChange }: Props) {
  return (
    <div style={{ margin: "16px 0" }}>
      <p style={{ fontWeight: 500 }}>{label}</p>
      <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            style={{
              padding: "6px 14px",
              border: value === opt ? "2px solid #000" : "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
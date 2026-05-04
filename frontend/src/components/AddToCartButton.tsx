interface Props {
  disabled: boolean;
  onClick: () => void;
  stock: number;
}

export default function AddToCartButton({ disabled, onClick, stock }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "12px",
        backgroundColor: disabled ? "#ccc" : "#27ae60",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        fontSize: "16px",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {stock === 0 ? "Out of Stock" : "Add to Cart"}
    </button>
  );
}
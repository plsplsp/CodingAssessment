interface Props {
  message: string;
}

export default function LoadingError({ message }: Props) {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      {message}
    </div>
  );
}
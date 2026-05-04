interface Props {
  src: string;
  alt: string;
}

export default function ProductImage({ src, alt }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: "100%", borderRadius: "8px" }}
    />
  );
}
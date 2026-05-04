import { useState, useEffect } from "react";

const mockProduct = {
  id: "p001",
  name: "Premium Casual Shoes",
  image: "https://picsum.photos/500/500",
  description: "Comfortable, breathable, stylish daily sneakers.",
  variants: [
    { color: "Black", size: "39", price: 129, stock: 10 },
    { color: "Black", size: "40", price: 129, stock: 5 },
    { color: "White", size: "39", price: 119, stock: 0 },
    { color: "White", size: "40", price: 119, stock: 12 },
  ],
};

const fetchProduct = () => {
  return new Promise((resolve) => setTimeout(() => resolve(mockProduct), 500));
};

const addToCartAPI = () => {
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 300));
};

function App() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [currentSku, setCurrentSku] = useState(null);
  const [qty, setQty] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProduct().then((data) => {
      setProduct(data);
      setSelectedColor(data.variants[0].color);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!product) return;
    const sizes = [...new Set(product.variants.filter(v => v.color === selectedColor).map(v => v.size))];
    setSelectedSize("");
    setCurrentSku(null);
  }, [selectedColor, product]);

  useEffect(() => {
    if (!product || !selectedColor || !selectedSize) return;
    const sku = product.variants.find(
      (v) => v.color === selectedColor && v.size === selectedSize
    );
    setCurrentSku(sku || null);
    setQty(1);
  }, [selectedSize, selectedColor, product]);

  const handleAddCart = async () => {
    if (!currentSku || currentSku.stock === 0) return;
    await addToCartAPI();
    setCartCount(prev => prev + qty);
    setMessage("✅ Add to cart success!");
    setTimeout(() => setMessage(""), 2000);
  };

  if (loading) return <div style={{ padding: 50, textAlign: "center" }}>Loading...</div>;

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        <div>
          <img src={product.image} style={{ width: "100%", borderRadius: 8 }} />
        </div>

        <div>
          <h1 style={{ fontSize: "2rem", margin: "0 0 20px 0" }}>{product.name}</h1>

          <div style={{ margin: "16px 0" }}>
            <p>Color</p>
            {[...new Set(product.variants.map(v => v.color))].map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  padding: "6px 14px",
                  marginRight: 8,
                  border: selectedColor === color ? "2px solid #000" : "1px solid #ccc",
                  borderRadius: 4
                }}
              >
                {color}
              </button>
            ))}
          </div>

          <div style={{ margin: "16px 0" }}>
            <p>Size</p>
            {[...new Set(product.variants.filter(v => v.color === selectedColor).map(v => v.size))].map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                style={{
                  padding: "6px 14px",
                  marginRight: 8,
                  border: selectedSize === size ? "2px solid #000" : "1px solid #ccc",
                  borderRadius: 4
                }}
              >
                {size}
              </button>
            ))}
          </div>

          {currentSku && (
            <>
              <h2 style={{ color: "#e53e3e" }}>${currentSku.price}</h2>
              <p>Stock: {currentSku.stock}</p>

              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0" }}>
                <button onClick={() => setQty(q > 1 ? q - 1 : q)} style={{ width: 32, height: 32 }}>-</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q < currentSku.stock ? q + 1 : q)} style={{ width: 32, height: 32 }}>+</button>
              </div>

              <button
                onClick={handleAddCart}
                disabled={currentSku.stock === 0}
                style={{
                  width: "100%",
                  padding: 12,
                  backgroundColor: currentSku.stock === 0 ? "#ccc" : "#27ae60",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  fontSize: 16
                }}
              >
                {currentSku.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>

              {message && <p style={{ marginTop: 12 }}>{message}</p>}
            </>
          )}

          <div style={{ marginTop: 30 }}>
            <h3>Description</h3>
            <p style={{ color: "#666" }}>{product.description}</p>
          </div>
        </div>
      </div>

      <div style={{ position: "fixed", top: 20, right: 30, fontSize: 18 }}>
        🛒 Cart: {cartCount}
      </div>
    </div>
  );
}

export default App;
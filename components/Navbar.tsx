import Link from "next/link";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        gap: "10px",
        padding: "10px",
        background: "black",
      }}
    >
      <Link
        href="/add-location"
        style={{ color: "white", textDecoration: "none" }}
      >
        📍 Konum Ekle
      </Link>
      <Link
        href="/locations"
        style={{ color: "white", textDecoration: "none" }}
      >
        📌 Konum Listesi
      </Link>
      <Link
        href="/edit-location"
        style={{ color: "white", textDecoration: "none" }}
      >
        📍 Konum Düzenleme
      </Link>
      <Link href="/route" style={{ color: "white", textDecoration: "none" }}>
        🗺 Rota Göster
      </Link>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#000",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    padding: 0,
    margin: 0,
  },
  navItem: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "8px 12px",
    borderRadius: "5px",
    backgroundColor: "#333",
    transition: "0.3s",
  },
};

export default Navbar;

import React from 'react';

// Sample product data (should match Navbar)
const sampleProducts = [
  {
    id: 1,
    name: "Casual Denim Jacket",
    category: "Casual Wear",
    price: "₹1,999",
    image: "/images/CasualWears/c1.jpg"
  },
  {
    id: 2,
    name: "Casual T-Shirt",
    category: "Casual Wear",
    price: "₹799",
    image: "/images/CasualWears/c2.jpg"
  },
  {
    id: 3,
    name: "Casual Hoodie",
    category: "Casual Wear",
    price: "₹1,499",
    image: "/images/CasualWears/c3.jpg"
  }
];

function useQuery() {
  return new URLSearchParams(window.location.search);
}

const SearchResults = () => {
  const query = useQuery().get('q') || '';
  const filtered = sampleProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4">Search Results for "{query}"</h2>
      {filtered.length === 0 ? (
        <div className="alert alert-info">No products found.</div>
      ) : (
        <div className="row">
          {filtered.map(product => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card h-100">
                <img src={product.image} className="card-img-top" alt={product.name} style={{objectFit: 'cover', height: '250px'}} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted">{product.category}</p>
                  <p className="card-text text-primary fw-bold">{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults; 
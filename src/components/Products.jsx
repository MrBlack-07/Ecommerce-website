// components/Products.jsx
const Products = () => {
    const product = {
      id: 1,
      name: "Denim Jacket",
      price: "Rs.99.99",
      oldPrice: "Rs.149.99",
      image: "/images/CasualWears/c1.jpg",
      badge: "Best Seller",
    };
  
    return (
      <>
        {/* Top Selling */}
        <section className="py-5 bg-light">
          <div className="d-flex justify-content-between align-items-center mb-4 px-3 px-md-4">
            <h2 className="display-6 fs-3 fs-md-2 mb-0 border-bottom border-3 border-primary pb-2">Top Selling Products</h2>
            <a href="#" className="btn btn-outline-primary rounded-pill px-3 px-md-4 hover-scale-110">View More</a>
          </div>
  
          <div className="row g-3 g-md-4 px-2 px-md-4">
            <div className="col-6 col-md-3 col-lg-2">
              <div className="card h-100 border-0 shadow-sm">
                <div className="position-relative">
                  <img src={product.image} className="card-img-top" alt={product.name} style={{ height: 180, objectFit: "cover" }} />
                  <div className="position-absolute top-0 start-0 m-2">
                    <span className="badge bg-primary rounded-pill px-2 px-md-3">{product.badge}</span>
                  </div>
                  <div className="position-absolute top-0 end-0 m-2">
                    <button className="btn btn-light btn-sm rounded-circle p-1 shadow-sm opacity-75 hover-opacity-100 wishlist-toggle">
                      <i className="bi bi-heart"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body p-2 p-md-3">
                  <h5 className="card-title fs-6 mb-1 text-truncate">{product.name}</h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-primary fs-6">{product.price}</span>
                  </div>
                  <button className="btn btn-outline-primary rounded-pill w-100 shadow-sm fs-7 fs-md-6 hover-scale-110 add-to-cart">
                    <i className="bi bi-cart-plus me-2"></i>Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* You can add other sections like New Arrivals, Hot Deals similarly if needed */}
      </>
    );
  };
  
export default Products;
  
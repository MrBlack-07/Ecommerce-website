import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

const Navbar = ({ isGuest, onProtectedAction }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showCart, setShowCart] = useState(false);

  // Sample product data with your actual images
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

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call with sample data
        const filteredResults = sampleProducts.filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        );
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setSearchResults(filteredResults);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
        setError('Failed to fetch search results');
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Redirect to search page
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  // Handle suggestion click
  const handleSuggestionClick = (name) => {
    window.location.href = `/search?q=${encodeURIComponent(name)}`;
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Handle add to wishlist
  const handleAddToWishlist = (product) => {
    if (isGuest) {
      onProtectedAction();
      return;
    }
    setWishlist(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    if (isGuest) {
      onProtectedAction();
      return;
    }
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Handle remove from wishlist
  const handleRemoveFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  // Handle remove from cart
  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  // Handle update cart quantity
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prev => prev.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
    return total + (price * item.quantity);
  }, 0);

  return (
    <nav className="navbar navbar-expand-lg bg-dark bg-gradient fixed-top">
      <div className="container-fluid px-3 px-lg-5">
        <button className="navbar-toggler border-0 d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#sideMenu">
          <i className="fas fa-bars text-white"></i>
        </button>
        <a className="navbar-brand mx-auto mx-lg-0" href="#">
          <img src="/logo.PNG" alt="Logo" width="100" className="img-fluid" />
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto me-auto">
            <li className="nav-item">
              <a className="nav-link text-white active" href="#">Home</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link text-white dropdown-toggle" href="#categories" role="button" data-bs-toggle="dropdown" aria-expanded="false">Categories</a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark bg-gradient">
                <li><a className="dropdown-item" href="#">Casual Wear</a></li>
                <li><a className="dropdown-item" href="#">Active Wear</a></li>
                <li><a className="dropdown-item" href="#">Accessories</a></li>
                <li><a className="dropdown-item" href="#">Formal Wear</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#categories">View All Categories</a></li>
              </ul>
            </li>
            <li className="nav-item"><a className="nav-link text-white-50" href="#">New Arrivals</a></li>
            <li className="nav-item"><a className="nav-link text-white-50" href="#">Deals</a></li>
            <li className="nav-item"><a className="nav-link text-white-50" href="#">Contact</a></li>
          </ul>
          <form className="d-flex me-3 position-relative search-container" onSubmit={handleSearch}>
            <div className="input-group">
              <input 
                type="search" 
                className="form-control border-0" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={handleInputChange}
                aria-label="Search"
              />
              <button className="btn btn-light" type="submit">
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                  <i className="fas fa-search"></i>
                )}
              </button>
            </div>
            
            {/* Search Results Dropdown */}
            {showResults && (
              <div className="search-results position-absolute top-100 start-0 w-100 mt-1 bg-white rounded shadow-lg">
                {error ? (
                  <div className="p-3 text-danger">{error}</div>
                ) : isLoading ? (
                  <div className="p-3">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="d-flex align-items-center p-2 mb-2">
                        <div className="skeleton-image me-3 rounded" style={{ width: '50px', height: '50px' }}></div>
                        <div className="flex-grow-1">
                          <div className="skeleton-text mb-1" style={{ width: '70%', height: '16px' }}></div>
                          <div className="skeleton-text mb-1" style={{ width: '50%', height: '14px' }}></div>
                          <div className="skeleton-text" style={{ width: '30%', height: '14px' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : searchResults.length > 0 ? (
                  <>
                {searchResults.map((result) => (
                      <div 
                    key={result.id} 
                        className="d-flex align-items-center p-3 text-decoration-none text-dark border-bottom hover-bg-light"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleSuggestionClick(result.name)}
                  >
                    <img 
                      src={result.image} 
                      alt={result.name} 
                          className="me-3 rounded" 
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                    />
                        <div className="flex-grow-1">
                      <div className="fw-bold">{result.name}</div>
                          <div className="text-muted small">{result.category}</div>
                          <div className="text-primary fw-bold">{result.price}</div>
                        </div>
                      </div>
                    ))}
                    <div className="p-2 text-center border-top">
                      <a href={`/search?q=${encodeURIComponent(searchQuery)}`} className="text-decoration-none">
                        View all results
                      </a>
                    </div>
                  </>
                ) : searchQuery.trim() && (
                  <div className="p-3 text-muted">No results found</div>
                )}
              </div>
            )}
          </form>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className="dropdown">
            <button 
              className="btn btn-link text-white position-relative me-2" 
              onClick={() => {
                if (isGuest) {
                  onProtectedAction();
                  return;
                }
                setShowCart(!showCart);
                setShowWishlist(false);
              }}
            >
            <i className="fas fa-shopping-cart fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </button>
            {showCart && (
              <div className="dropdown-menu dropdown-menu-end p-3" style={{ width: '300px' }}>
                <h6 className="mb-3">Shopping Cart</h6>
                {cart.length === 0 ? (
                  <p className="text-muted mb-0">Your cart is empty</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="d-flex align-items-center mb-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="rounded me-2" 
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                        />
                        <div className="flex-grow-1">
                          <div className="fw-bold small">{item.name}</div>
                          <div className="text-primary fw-bold">{item.price}</div>
                          <div className="d-flex align-items-center mt-1">
                            <button 
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button 
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button 
                          className="btn btn-link text-danger p-0 ms-2"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          <i className="fas fa-times"></i>
          </button>
                      </div>
                    ))}
                    <hr />
                    <div className="d-flex justify-content-between mb-3">
                      <span>Total:</span>
                      <span className="fw-bold">₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <button className="btn btn-primary w-100">Checkout</button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="dropdown">
            <button 
              className="btn btn-link text-white position-relative me-2" 
              onClick={() => {
                if (isGuest) {
                  onProtectedAction();
                  return;
                }
                setShowWishlist(!showWishlist);
                setShowCart(false);
              }}
            >
            <i className="fas fa-heart fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {wishlist.length}
              </span>
            </button>
            {showWishlist && (
              <div className="dropdown-menu dropdown-menu-end p-3" style={{ width: '300px' }}>
                <h6 className="mb-3">Wishlist</h6>
                {wishlist.length === 0 ? (
                  <p className="text-muted mb-0">Your wishlist is empty</p>
                ) : (
                  <>
                    {wishlist.map(item => (
                      <div key={item.id} className="d-flex align-items-center mb-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="rounded me-2" 
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                        />
                        <div className="flex-grow-1">
                          <div className="fw-bold small">{item.name}</div>
                          <div className="text-primary fw-bold">{item.price}</div>
                        </div>
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-sm btn-primary"
                            onClick={() => handleAddToCart(item)}
                          >
                            <i className="fas fa-shopping-cart"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveFromWishlist(item.id)}
                          >
                            <i className="fas fa-times"></i>
          </button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="dropdown">
            <button className="btn btn-link text-white" type="button" data-bs-toggle="dropdown">
              <i className="fas fa-user fs-5"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark bg-gradient">
              {isGuest ? (
                <>
                  <li><a className="dropdown-item" href="#">Sign In</a></li>
                  <li><a className="dropdown-item" href="#">Create Account</a></li>
                </>
              ) : (
                <>
                  <li><a className="dropdown-item" href="#">Your Account</a></li>
                  <li><a className="dropdown-item" href="#">Switch Accounts</a></li>
                  <li><a className="dropdown-item" href="#">Your Orders</a></li>
                  <li><a className="dropdown-item" href="#">Your Wish List</a></li>
                  <li><a className="dropdown-item" href="#">Keep Shopping</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item text-danger" href="/">Sign Out</a></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Add this CSS at the end of the file, before the export statement
const styles = `
  .skeleton-image {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }

  .skeleton-text {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
  }

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Navbar;
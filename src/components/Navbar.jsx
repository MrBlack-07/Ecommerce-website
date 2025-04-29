const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark bg-gradient fixed-top">
      <div className="container-fluid px-3 px-lg-5">
        <button className="navbar-toggler border-0 d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#sideMenu">
          <i className="fas fa-bars text-white"></i>
        </button>
        <a className="navbar-brand mx-auto mx-lg-0" href="#">
          <img src="logo.PNG" alt="Logo" width="100" className="img-fluid" />
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
          <form className="d-flex me-3">
            <div className="input-group">
              <input type="search" className="form-control border-0" placeholder="Search products..." />
              <button className="btn btn-light" type="submit"><i className="fas fa-search"></i></button>
            </div>
          </form>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-link text-white position-relative me-2">
            <i className="fas fa-shopping-cart fs-5"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">0</span>
          </button>
          <button className="btn btn-link text-white position-relative me-2">
            <i className="fas fa-heart fs-5"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">0</span>
          </button>
          <div className="dropdown">
            <button className="btn btn-link text-white" type="button" data-bs-toggle="dropdown">
              <i className="fas fa-user fs-5"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark bg-gradient">
              <li><a className="dropdown-item" href="#">Your Account</a></li>
              <li><a className="dropdown-item" href="#">Switch Accounts</a></li>
              <li><a className="dropdown-item" href="#">Your Orders</a></li>
              <li><a className="dropdown-item" href="#">Your Wish List</a></li>
              <li><a className="dropdown-item" href="#">Keep Shopping</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item text-danger" href="/">Sign Out</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
const Hero = () => {
    return (
      <div id="heroCarousel" className="carousel slide mt-5" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="position-relative" style={{ height: "90vh" }}>
              <img src="/images/CasualWears/CasualWear.jpg" className="w-100 h-100 object-fit-cover img-fluid" alt="Casual Collection" />
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>
              <div className="carousel-caption text-start position-absolute top-50 translate-middle-y">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6">
                      <span className="badge bg-danger mb-3 fs-6">New Collection</span>
                      <h1 className="display-4 fw-bold mb-4">Casual Collection 2025</h1>
                      <p className="lead mb-4">Discover our latest casual wear collection. Comfortable, stylish, and perfect for every day.</p>
                      <div className="d-flex gap-3">
                        <button className="btn btn-primary btn-lg px-4">Shop Now</button>
                        <a href="#" className="btn btn-outline-light btn-lg px-4">Learn More</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="position-relative" style={{ height: "90vh" }}>
              <img src="/images/ActiveWears/a1.jpg" className="w-100 h-100 object-fit-cover img-fluid" alt="Active Wear Collection" />
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>
              <div className="carousel-caption text-start position-absolute top-50 translate-middle-y">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6">
                      <span className="badge bg-warning text-dark mb-3 fs-6">Featured</span>
                      <h1 className="display-4 fw-bold mb-4">Active Lifestyle</h1>
                      <p className="lead mb-4">Premium activewear designed for performance and style. Move with confidence.</p>
                      <div className="d-flex gap-3">
                        <button className="btn btn-primary btn-lg px-4">Shop Collection</button>
                        <a href="#" className="btn btn-outline-light btn-lg px-4">View Details</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="position-relative" style={{ height: "90vh" }}>
              <img src="/images/Accessories/acc1.jpg" className="w-100 h-100 object-fit-cover img-fluid" alt="Accessories Collection" />
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>
              <div className="carousel-caption text-start position-absolute top-50 translate-middle-y">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6">
                      <span className="badge bg-success mb-3 fs-6">Special Offer</span>
                      <h1 className="display-4 fw-bold mb-4">Complete Your Look</h1>
                      <p className="lead mb-4">Elevate your style with our premium accessories. The perfect finishing touch.</p>
                      <div className="d-flex gap-3">
                        <button className="btn btn-primary btn-lg px-4">Explore Now</button>
                        <a href="#" className="btn btn-outline-light btn-lg px-4">Learn More</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    );
  };
  
export default Hero;
  
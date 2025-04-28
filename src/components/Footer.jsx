// components/Footer.jsx
const Footer = () => {
    return (
      <footer>
        {/* Footer Top */}
        <div className="bg-dark bg-gradient py-3 text-center">
          <a href="#top" className="text-white text-decoration-none small hover-scale-110">Back to top</a>
        </div>
  
        {/* Footer Main */}
        <div className="bg-dark py-5">
          <div className="px-4">
            <div className="row g-4 mb-3">
              {/* Logo & Social */}
              <div className="col-12 col-md-4 text-center text-md-start">
                <img src="logo.PNG" alt="Logo" className="img-fluid mb-3" style={{ maxWidth: 120 }} />
                <p className="text-white-50 mb-3">Your one-stop fashion destination</p>
                <div className="d-flex justify-content-center justify-content-md-start gap-3">
                  <a href="#" className="text-white-50"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="text-white-50"><i className="fab fa-instagram"></i></a>
                  <a href="#" className="text-white-50"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
  
              {/* Quick Links */}
              <div className="col-6 col-md-4">
                <h6 className="mb-3 text-uppercase text-white">Quick Links</h6>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Home</a></li>
                  <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Shop</a></li>
                  <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">New Arrivals</a></li>
                  <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Contact</a></li>
                </ul>
              </div>
  
              {/* Contact Info */}
              <div className="col-6 col-md-4">
                <h6 className="mb-3 text-uppercase text-white">Contact</h6>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2 text-white-50"><i className="fas fa-phone me-2"></i>9360056346</li>
                  <li className="mb-2 text-white-50"><i className="fas fa-envelope me-2"></i>[email&#160;protected]</li>
                  <li className="text-white-50"><i className="fas fa-map-marker-alt me-2"></i>123 Fashion St, NY</li>
                </ul>
              </div>
            </div>
  
            {/* Copyright */}
            <div className="row border-top border-secondary pt-3">
              <div className="col-12 text-center">
                <p className="mb-0 text-white-50">&copy; 2025 All-bird. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
export default Footer;
  
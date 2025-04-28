// components/Categories.jsx
const Categories = () => {
    const categories = [
      {
        label: "Casual Wear",
        image: "/images/CasualWears/c1.jpg",
      },
      {
        label: "Active Wear",
        image: "/images/ActiveWears/a1.jpg",
      },
      {
        label: "Accessories",
        image: "/images/Accessories/acc1.jpg",
      },
      {
        label: "Formal Wear",
        image: "/images/FormalWears/s1.jpg",
      },
    ];
  
    return (
      <section id="categories" className="py-5 bg-secondary bg-gradient text-white">
        <div className="container px-4">
          <h2 className="display-6 mb-5 position-relative pb-3 border-bottom border-3 border-primary" style={{ width: "fit-content" }}>
            Shop by Category
          </h2>
          <div className="row g-4">
            {categories.map((category, index) => (
              <div className="col-6 col-lg-3" key={index}>
                <div className="position-relative rounded-4 overflow-hidden shadow-sm h-100">
                  <img
                    src={category.image}
                    className="w-100 h-100 object-fit-cover img-fluid"
                    alt={category.label}
                    style={{ minHeight: "300px" }}
                  />
                  <div className="position-absolute bottom-0 start-0 w-100 p-4 bg-dark bg-opacity-50">
                    <h3 className="h5 text-white mb-2">{category.label}</h3>
                    <a
                      href="Product_Page.html"
                      className="btn btn-sm btn-light rounded-pill hover-scale-110"
                    >
                      View Collection
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
export default Categories;
  
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Footer from "../components/Footer";

// function Home() {
//   return (
//     <>
//       <Navbar />
//       <Hero />
//       <Categories />
//       <Products />
//       <Footer />
//     </>
//   );
// }

// export default Home;
function Home({ requireAuth, isGuest }) {
  const handleProtectedAction = () => {
    if (requireAuth()) {
      // Action will only proceed if logged in or guest
      console.log("Action allowed");
    }
  };

  return (
    <>
      <Navbar 
        isGuest={isGuest}
        onProtectedAction={handleProtectedAction} 
      />
      <Hero />
      <Categories 
        onItemClick={() => requireAuth() && console.log("Category accessed")}
      />
      <Products />
      <Footer />
    </>
  );
}
export default Home;
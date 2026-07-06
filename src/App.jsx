import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Products from './components/Products.jsx';
import OrderForm from './components/OrderForm.jsx';
import Faq from './components/Faq.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Products />
        <OrderForm />
        <Faq />
      </main>
      <Footer />
    </>
  );
}

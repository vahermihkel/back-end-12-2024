import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { CartSumContext } from '../store/CartSumContext';
import { AuthContext } from '../store/AuthContext';

function NavigationBar() {
  const { t, i18n } = useTranslation();
  const {cartSum} = useContext(CartSumContext);
  const {admin, loggedIn, logout} = useContext(AuthContext);

  // return <h1>{t('Welcome to React')}</h1>

  function changeLang(newLanguage) {
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  }

  function logOut() {
    logout();
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Veebipood</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {loggedIn === true && admin === true &&
            <>
              <Nav.Link as={Link} to="/lisa-toode">{t("nav.add-product")}</Nav.Link>
              <Nav.Link as={Link} to="/halda-tooteid">{t("nav.manage-products")}</Nav.Link>
              <Nav.Link as={Link} to="/halda-kategooriaid">{t("nav.manage-categories")}</Nav.Link>
            </>}
            <Nav.Link as={Link} to="/ostukorv">{t("nav.ostukorv")}</Nav.Link>
          </Nav>
          <Nav>
            {loggedIn === false && 
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            </>}
            {loggedIn === true && 
            <>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
              <Nav.Link onClick={logOut}>Logout</Nav.Link>
            </>}
            <Nav.Link>
              <img className="icon" onClick={() => changeLang("en")} src="/english.png" alt="" />
              <img className="icon" onClick={() => changeLang("et")} src="/estonian.png" alt="" />
            </Nav.Link>
            <div>{cartSum.toFixed(2)} €</div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
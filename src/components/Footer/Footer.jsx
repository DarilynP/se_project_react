import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>Developed by Darlyn Peguero</p>
        <p>{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

export default Footer;

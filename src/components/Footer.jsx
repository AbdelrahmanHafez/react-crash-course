import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer>
      <p>Copyright &copy; 2021</p>
      <Link to="/about">About</Link>
    </footer>
  );
}

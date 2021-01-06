import Link from 'next/link';

const Navbar = () => (
  <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
    <div className="container">
      <a className="navbar-brand" href="#">Gamefolio</a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link href="/signup"><a className="nav-link">Signup</a></Link>
          </li>
          <li className="nav-item">
            <Link href="/login"><a className="nav-link">Login</a></Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
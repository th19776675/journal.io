import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import Leader from "../Leader"
import "./nav.css"

const Nav = () => {

  return (
    <nav className="nav-wrapper">
      <section className="nav-block-right">
        <div className="nav-link-container">
          <Link to="profile" className="nav-links">
            <Leader>
              <p>My Profile</p>
              <p>1</p>
            </Leader>
          </Link>
          <Link to="daily" className="nav-links">
            <Leader>
              <p>My Daily Journal</p>
              <p>2</p>
            </Leader>
          </Link>
          <Link to="journals/user" className="nav-links">
            <Leader>
              <p>My Journals</p>
              <p>3</p>
            </Leader>
          </Link>
        </div>
      </section>
      <section className="nav-block-left">
        <div className="nav-link-container">
          <Link to="journals" className="nav-links">
              <Leader>
                <p>Journal View</p>
                <p>4</p>
              </Leader>
            </Link>
            <Link to="users" className="nav-links">
              <Leader>
                <p>User View</p>
                <p>5</p>
              </Leader>
            </Link>
            {/* <Link to="pages" className="nav-links">
              <Leader>
                <p>Page View</p>
                <p>6</p>
              </Leader>
            </Link>   */}
        </div>
      </section>
    </nav>
  )
}

export default Nav;
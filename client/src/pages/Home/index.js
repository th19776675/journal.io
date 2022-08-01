import Leader from "../../components/Leader";

import "./home.css"
const Home = () => {
  return (
    <>
      <div className="home-wrapper">
        <div className="home-box">
          <Leader>
            <h1 className="home-text">journ</h1>
            <h1 className="home-text">al</h1>
          </Leader>
          <p className="home-body">
            Welcome to journ.al. Click around and explore what our dedicated community has shared.
          </p>
        

        </div>
      </div>
    </>
  )
}

export default Home;
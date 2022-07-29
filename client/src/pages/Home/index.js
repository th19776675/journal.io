import Leader from "../../components/Leader";
import "./home.css"
const Home = () => {
  return (
    <>
    <div className="home-wrapper">
      <div className="home-box">
        <Leader>
          <h1>Welcome</h1>
          <h1>0</h1>
        </Leader>
        <p className="home-text">
          Write your own journal entries and discover others, but don't forget to always write in your daily journal!
        </p>
        <Leader>
          <h1>Welcome</h1>
          <h1>1</h1>
        </Leader>
      </div>
    </div>

    </>
  )
}

export default Home;
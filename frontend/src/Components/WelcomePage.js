import image from "../images/image.svg"
export default function WelcomePage() {
  return (
    <div className="welcomePage">

      <div className="imageContainer">
        <img className="image" src={image} alt="" />
      </div>


      <div className="textContainer">
        <h2>Sign up for free!</h2>
        <h2>Create your own library!</h2>
        <h2>Share recommendations to others!</h2>
      </div>

    </div>
  )
}

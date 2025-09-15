import "./About.css";
import aboutImage from "../../assets/About-image.png";

function About({ user }) {
  return (
    <section
      className={`about__section ${
        user ? "about--logged-in" : "about--logged-out"
      }`}
    >
      <div className="about__image-container">
        <img src={aboutImage} alt="Author" className="about__image" />
      </div>
      <div className="about__info">
        <h2 className="about__title">About the author</h2>
        <p className="about__description">
          My name is Melissa Feeney and I am an aspiring software engineer,
          currently preparing to complete a Software Engineer bootcamp through
          TripleTen. Over the course of my studies, I have gained hands-on
          experience with full-stack development, including HTML, CSS,
          JavaScript, React, and Node.js. I am passionate about building
          user-friendly applications and continuously expanding my technical
          skills.
        </p>
        <p className="about__description">
          My journey with TripleTen has equipped me with the tools and
          confidence to tackle real-world projects and collaborate effectively
          in dynamic environments.
        </p>
      </div>
    </section>
  );
}

export default About;

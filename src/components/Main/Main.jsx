import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import Navigation from "../Navigation/Navigation";

function Main({ onSignIn, user, onSaveArticle, onSearch }) {
  return (
    <main className={`main${user ? " main_logged-in" : ""}`}>
      {!user && <Navigation onSignIn={onSignIn} />}
      <h1 className="main__title">What's going on in the world?</h1>
      <p className="main__subtitle">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <SearchForm
        user={user}
        onSaveArticle={onSaveArticle}
        onSearch={onSearch}
      />
    </main>
  );
}
export default Main;

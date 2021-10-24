import "./App.css";
import { Switch, Route, useLocation } from "react-router-dom";
import AdminControlPage from "./pages/admin-control";
import Navbar from "./components/navbar";
import UserFeedPage from "./pages/user-feed";
import AdminListingsPage from "./pages/admin-listings";
import UserFeedItemPreviewPage from "./pages/user-feed-item-preview";
import Login from "./pages/login";
import Registration from "./pages/registration";

function App() {
  return (
    <section>
      <Switch>
        <Route path="/" exact={true}>
          <UserFeedPage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
        <Route path="/m/:id">
          <UserFeedItemPreviewPage />
        </Route>
        <Route path="/admin" exact={true}>
          <AdminListingsPage />
        </Route>
        <Route path="/admin/post">
          <AdminControlPage />
        </Route>
      </Switch>
    </section>
  );
}

export default App;

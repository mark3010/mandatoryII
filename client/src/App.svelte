<script>
  import { Router, Link, Route } from 'svelte-navigator';
  import PrivateRoute from "./components/PrivateRoute.svelte";

  import Navbar from './components/Nav.svelte';
  import LoginPage from './pages/Login/Login.svelte';
  import SignupPage from './pages/Signup/Signup.svelte';
  import HomePage from './pages/Home/Home.svelte';
  import RecoverPasswordPage from './pages/RecoverPassword/RecoverPassword.svelte';
  import DatabasePage from './pages/Database/Database.svelte';
</script>
<main>
  <Router>
    <Navbar></Navbar>

    <div class="page">
      <Route path="/"><HomePage /></Route>
      <Route path="/login"><LoginPage /></Route>
      <Route path="/register"><SignupPage /></Route>
      <Route path="/recoverPassword"><RecoverPasswordPage /></Route>
      <PrivateRoute path="/database"><DatabasePage /></PrivateRoute>
    </div>

  </Router>

</main>
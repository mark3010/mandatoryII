<script>
  import { Router, Link, Route } from 'svelte-navigator';
  import PrivateRoute from "./components/PrivateRoute.svelte";

  import Navbar from './components/Nav.svelte';
  import LoginPage from './pages/Login/Login.svelte';
  import SignupPage from './pages/Signup/Signup.svelte';
  import HomePage from './pages/Home/Home.svelte';
  import RecoverPasswordPage from './pages/RecoverPassword/RecoverPassword.svelte';
  import DatabasePage from './pages/Database/Database.svelte';
  import ProfilePage from './pages/Profile/Profile.svelte';
  import StockPage from './pages/Stock/Stock.svelte';
  import NotificationPage from './pages/Notifications/Notifications.svelte';

    //TOASTR OPTIONS INIT 
    toastr.options = {
          "closeButton": true,
          "debug": false,
          "newestOnTop": false,
          "progressBar": false,
          "positionClass": "toast-bottom-right",
          "preventDuplicates": false,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "1000",
          "timeOut": "5000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        }
</script>
<main>
  <Router>
    <Navbar></Navbar>

    <div class="page">
      <Route path="/"><HomePage /></Route>
      <Route path="/login"><LoginPage /></Route>
      <Route path="/register"><SignupPage /></Route>
      <Route path="/recoverPassword"><RecoverPasswordPage /></Route>
      <PrivateRoute path="/user/:uuid"><ProfilePage /></PrivateRoute>
      <PrivateRoute path="/stock/:ticker"><StockPage /></PrivateRoute>
      <PrivateRoute path="/user/:uuid/messages"><NotificationPage /></PrivateRoute>
      <PrivateRoute path="/database"><DatabasePage /></PrivateRoute>
    </div>

  </Router>

</main>
<script>
  import { UUID } from "../../store/auth";
  import { BASE_URL } from "../../store/globals.js";
  import { onMount, afterUpdate } from "svelte";
  import Search from '../../components/Search.svelte';
  import QuickSearch from "../../components/QuickSearch.svelte";

  let stockFlag = false

  let _name = "*";
  let _ticker = "*";
  let _industry = "*";
  
  //BREADTEXT
  //TODO: pull from other sources later
  let breadText = "are you sure you entered the correct ticker symbol? feel free to try again";
  let callToActionLoggedIn = "start searching for your favorite stocks now with our stock browser";
  
  async function fetchStock() {
    let ticker = location.pathname.split("/")[2];
    let url = `${$BASE_URL}/v1/stocks/${ticker}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });

      //success response
      if (response.status === 200) {
        stockFlag = true;

        response.json().then((data) => {
          _name = data.companyName;
          _industry = data.sector;
          _ticker = data.symbol;
        })
      }
  }

  onMount(fetchStock);
</script>

<Search></Search>

{#if stockFlag}
    <div class="container py-5"> 
        <h3> ${_ticker}</h3>
        <div class="row">
          <div class="col-lg-4">
            <div class="card mb-4">
                <!--INSERT SOCKET HERE-->
              
            </div>
            <div class="card mb-4 mb-lg-0">
              <div class="card-body p-0">
                <ul class="list-group list-group-flush rounded-3">
                  <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i class="fas fa-globe fa-lg text-warning"></i>
                    <p class="mb-0">https://mdbootstrap.com</p>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i class="fab fa-github fa-lg" style="color: #333333;"></i>
                    <p class="mb-0">mdbootstrap</p>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i class="fab fa-twitter fa-lg" style="color: #55acee;"></i>
                    <p class="mb-0">@mdbootstrap</p>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i class="fab fa-instagram fa-lg" style="color: #ac2bac;"></i>
                    <p class="mb-0">mdbootstrap</p>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i class="fab fa-facebook-f fa-lg" style="color: #3b5998;"></i>
                    <p class="mb-0">mdbootstrap</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="card mb-4">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Company name</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">{_name}</p>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Sector</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">{_industry}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="card mb-4 mb-md-0">
                  <div class="card-body">
                    <p class="mb-4">Comment section</p>
                    <!--INSERT COMMENTS SECTION HERE-->
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card mb-4 mb-md-0">
                  <div class="card-body">
                    <p class="mb-4"><span class="text-primary font-italic me-1">vote</span> User Sentiment
                    </p>
                    <p class="mb-1" style="font-size: .77rem;">Value</p>
                    <div class="progress rounded" style="height: 5px;">
                      <div class="progress-bar" role="progressbar" style="width: 80%" aria-valuenow="80"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p class="mt-4 mb-1" style="font-size: .77rem;">Hype</p>
                    <div class="progress rounded" style="height: 5px;">
                      <div class="progress-bar" role="progressbar" style="width: 72%" aria-valuenow="72"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  {:else}
  <h3 class="text-center">Stock {_ticker} not found...</h3>
  <p class="text-center text-wrap" >{breadText}</p>
  <p class="text-center">{callToActionLoggedIn}</p>
  {/if}
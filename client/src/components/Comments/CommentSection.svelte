<script>
    import { data } from '../../store/index.js';
    import List from '../../components/Comments/List.svelte';
</script>


<main class="container">
    <List comments={$data.comments} />
  </main>

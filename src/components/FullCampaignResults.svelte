<script>
  import ResultCard from './ResultCard.svelte';
  import { results } from '../stores/rows';

  export let cols = 4;
</script>

<ul class="cards" class:col3={cols === 3} class:col4={cols === 4}>
  {#each $results as result}
    <ResultCard {...result} />
  {/each}
</ul>

<style>
  .cards {
    list-style: none;
    display: grid;
    row-gap: 1.5rem;
    padding: 0;
  }

  @media (min-width: 640px) {
    .cards {
      row-gap: unset;
      gap: 1.5rem;
    }

    .cards.col3 {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .cards.col4 {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
</style>

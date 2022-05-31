<script>
  import Label from './Label.svelte';
  import { rows } from '../stores/rows';
</script>

<table id="quarterly_results">
  <colgroup>
    <col style="width: 40%;" />
  </colgroup>
  <thead>
    <tr>
      <th />
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
      <th scope="col">Q3</th>
      <th scope="col">Q4</th>
      <th scope="col">TOTAL</th>
    </tr>
  </thead>
  <tbody>
    {#each $rows as { rowHeader, rowDesc, idPrefix, numFormat, data }}
      <tr>
        <th scope="row">
          <Label title={rowHeader} desc={rowDesc} />
        </th>
        {#each data as { id, value }}
          <td data-col-label={id.toUpperCase()}>
            {#if !isFinite(value) || isNaN(value)}
              <div class="error">Cannot compute: Invalid input.</div>
            {:else}
              <output
                id={`${idPrefix}${id}`}
                name={`${idPrefix}${id}`}
                class="cell-quarter"
                class:loss={value < 0}
                class:total={id === 'total'}
                >{new Intl.NumberFormat('en-US', numFormat).format(
                  value
                )}</output
              >
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .cell-quarter.loss {
    color: rgba(250, 69, 14, 0.9);
  }

  table {
    display: table;
    border-collapse: collapse;
    box-sizing: border-box;
    text-indent: initial;
    border-spacing: 2px;
    border-color: grey;
    border: 1px solid rgba(95, 115, 128, 0.2);
  }

  thead th {
    padding: 15px;
    background-color: #196ed9;
    color: white;
    font-weight: bold;
    font-family: Lato, sans-serif;
  }

  tbody tr {
    vertical-align: baseline;
    border-bottom: 1px solid rgba(95, 115, 128, 0.2);
    background: transparent;
  }

  td {
    font-size: 16px;
    border: none;
  }

  tbody td {
    color: black;
    text-align: center;
    padding-left: 25px;
    padding-right: 25px;
    font-family: Lato, sans-serif;
  }

  tbody tr > th:first-child {
    padding: 1rem;
  }

  tbody tr > td:last-child {
    font-weight: bold;
    color: #014e89;
  }

  .error {
    font-family: 'Lato', sans-serif;
    font-size: 0.875rem;
    font-weight: normal;
    color: rgba(250, 69, 14, 0.9);
  }
</style>

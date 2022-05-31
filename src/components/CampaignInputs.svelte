<script>
  import Label from './Label.svelte';
  import InputNumber from './InputNumber.svelte';
  import Range from './RangeSlider.svelte';
  import {
    totalTargetAccounts,
    campaignSetupCost,
    costPerTerm,
    termcontract,
    totalInvestment,
    costPerTermTotal,
  } from '../stores/CampaignInputsStore';

  let numbers = [4, 8, 12, 16];
</script>

<table>
  <colgroup>
    <col style="width: 40%;" />
    <col style="width: 30%;" />
    <col style="width: 30%;" />
  </colgroup>
  <tbody>
    <!-- Total Target Accounts -->
    <tr>
      <th scope="row">
        <Label
          title="Total Target Accounts"
          desc="Number of potential accounts to be targeted in the campaign"
        />
      </th>
      <td>
        <Range
          id="close_ratio_slider"
          atts={{ min: 1000, max: 5000 }}
          bind:value={$totalTargetAccounts}
        />
      </td>
      <td>
        <InputNumber
          id="target_population_number"
          atts={{ min: 1000, max: 5000 }}
          bind:value={$totalTargetAccounts}
        />
      </td>
    </tr>
    <!-- Number of Terms Per Contract -->
    <tr>
      <th scope="row">
        <Label
          title="Number of Terms Per Contract"
          desc="How many quarters the campaign will be carried out as stated in the contract"
        />
      </th>
      <td>
        <select class="rc-select" bind:value={$termcontract}>
          {#each numbers as number}
            <option value={number}>
              {number}
            </option>
          {/each}
        </select>
      </td>
    </tr>
    <!-- Campaign Setup Costs -->
    <tr>
      <th scope="row">
        <Label
          title="Campaign Setup Costs"
          desc="Total costs incurred in preparing for the campaign (excluding contract price)"
        />
      </th>
      <td class="grid-dollars">
        <InputNumber
          id="close_ratio_number"
          symbol="$"
          atts={{ min: 500, max: 5000 }}
          bind:value={$campaignSetupCost}
        />
      </td>
    </tr>
    <!-- Number of Terms Per Contract -->
    <tr>
      <th scope="row">
        <Label
          title="Cost Per Term"
          desc="Amount Callbox charges in each campaign term"
        />
      </th>
      <td class="grid-dollars">
        <InputNumber
          id="cost_per_term_number"
          symbol="$"
          bind:value={$costPerTerm}
        />
      </td>
    </tr>
    <!-- Total Investment -->
    <tr>
      <th scope="row">
        <Label
          title="Total Investment"
          desc="The total costs you incur in the entire campaign, plus campaign setup costs"
        />
      </th>
      <td>
        <p class="rc-output">
          <output
            id="total_investment"
            name="total_investment"
            class="rc-output"
            for="number_of_terms_per_contract cost_per_term_number startup_cost_number"
            >{new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format($totalInvestment)}</output
          >
        </p>
      </td>
    </tr>
    <tr>
      <th scope="row">
        <Label
          title="Total Cost Per Term"
          desc="The total investment divided by the number of terms stated in the contract"
        />
      </th>
      <td>
        <p class="rc-output">
          <output
            id="cost_per_term_total"
            name="cost_per_term_total"
            class="rc-output"
            for="total_investment number_of_terms_per_contract"
            >{new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format($costPerTermTotal)}</output
          >
        </p>
      </td>
    </tr>
  </tbody>
</table>

<style>
  table {
    border-collapse: collapse;
    width: 100%;
    padding: 0;
    margin: 0 0 20px 0;
    font-size: 13px;
  }

  tbody tr {
    vertical-align: baseline;
    border-bottom: 1px solid rgba(95, 115, 128, 0.2);
    background: transparent;
  }

  tbody tr > th:first-child {
    padding: 1.25rem;
  }

  table td {
    text-align: left;
  }

  select {
    -webkit-appearance: none;
    border-radius: 0px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAANCAYAAAC+ct6XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjBBRUQ1QTQ1QzkxMTFFMDlDNDdEQzgyNUE1RjI4MTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjBBRUQ1QTU1QzkxMTFFMDlDNDdEQzgyNUE1RjI4MTEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGMEFFRDVBMjVDOTExMUUwOUM0N0RDODI1QTVGMjgxMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGMEFFRDVBMzVDOTExMUUwOUM0N0RDODI1QTVGMjgxMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pk5mU4QAAACUSURBVHjaYmRgYJD6////MwY6AyaGAQIspCieM2cOjKkIxCFA3A0TSElJoZ3FUCANxAeAWA6IOYG4iR5BjWwpCDQCcSnNgxoIVJCDFwnwA/FHWlp8EIpHSKoGgiggLkITewrEcbQO6mVAbAbE+VD+a3IsJTc7FQAxDxD7AbEzEF+jR1DDywtoCr9DbhwzDlRZDRBgACYqHJO9bkklAAAAAElFTkSuQmCC);
    background-position: center right;
    background-repeat: no-repeat;
    border-radius: 2px;
    outline: none;
    font: 1em 'HelveticaNeue', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #777;
    margin: 0;
    width: 100%;
    /* display: block; */
    margin-bottom: 20px;
  }

  select.rc-select {
    width: 30%;
    padding: 5px;
    background-color: transparent;
    border: 1px solid rgba(95, 115, 128, 0.7);
    font-family: 'Lato', sans-serif;
    color: #777;
  }

  p.rc-output {
    font-weight: bold;
    font-size: 1.25rem;
    color: #014e89;
    letter-spacing: 0.04em;
    font-family: 'Work Sans', sans-serif;
    padding-right: 4rem;
  }
</style>

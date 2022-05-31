<script>
  import Label from './Label.svelte';
  import InputNumber from './InputNumber.svelte';
  import Range from './RangeSlider.svelte';
  import { Average } from '../stores/CompanyDynamicStore';
  import { ratio } from '../stores/CompanyDynamicStore';
</script>

<body id="top">
  <div id="wrap_all">
    <div class="all-colors">
      <table>
        <colgroup>
          <col style="width: 40%;" />
          <col style="width: 30%;" />
          <col style="width: 30%;" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">
              <Label
                title="Average Deal Size"
                desc="Average dollar amount of each won deal, or a year’s worth of subscription revenues"
              />
            </th>
            <td>
              <Range
                id="avg_deal_size_range"
                atts={{ max: 100000 }}
                bind:value={$Average}
              />
            </td>
            <td class="grid-dollars">
              <InputNumber
                id="avg_deal_size_number"
                symbol="$"
                atts={{ max: 100000 }}
                bind:value={$Average}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <Label
                title="Close Ratio"
                desc="Percentage of total leads your reps can turn into customers"
              />
            </th>
            <td>
              <Range
                id="close_ratio_slider"
                atts={{ min: 10, max: 100 }}
                bind:value={$ratio}
              />
            </td>
            <td>
              <InputNumber
                id="close_ratio_number"
                symbol="%"
                atts={{ max: 100 }}
                bind:value={$ratio}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</body>

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
    padding: 1rem;
  }

  table td {
    text-align: left;
  }
</style>

import { derived, writable } from 'svelte/store';
import { Average, ratio } from './CompanyDynamicStore';
import {
  totalTargetAccounts,
  totalInvestment,
  costPerTermTotal,
} from '../stores/CampaignInputsStore';

export const leadsGenerated = writable([
  { id: 'q1', value: 10 },
  { id: 'q2', value: 30 },
  { id: 'q3', value: 30 },
  { id: 'q4', value: 30 },
]);

export const percentRatio = derived(ratio, ($ratio) => $ratio / 100);
export const leadsGeneratedTotal = derived(leadsGenerated, ($leadsGenerated) =>
  $leadsGenerated.reduce((prev, { value }) => prev + value, 0)
);
export const leadsConvertedTotal = derived(
  [leadsGenerated, percentRatio],
  ([$leadsGenerated, $percentRatio]) =>
    $leadsGenerated.reduce((prev, { value }) => prev + value * $percentRatio, 0)
);
export const grossConversionRate = derived(
  [leadsGeneratedTotal, totalTargetAccounts],
  ([$leadsGeneratedTotal, $totalTargetAccounts]) =>
    $leadsGeneratedTotal / $totalTargetAccounts
);
export const netConversionRate = derived(
  [leadsConvertedTotal, totalTargetAccounts],
  ([$leadsConvertedTotal, $totalTargetAccounts]) =>
    $leadsConvertedTotal / $totalTargetAccounts
);
export const grossAdditionalSales = derived(
  [Average, leadsConvertedTotal],
  ([$Average, $leadsConvertedTotal]) => $Average * $leadsConvertedTotal
);
export const leadGenerationCost = derived(
  [totalInvestment, leadsConvertedTotal],
  ([$totalInvestment, $leadsConvertedTotal]) =>
    ($totalInvestment / $leadsConvertedTotal) * $leadsConvertedTotal
);
export const netAdditionalSales = derived(
  [grossAdditionalSales, leadGenerationCost],
  ([$grossAdditionalSales, $leadGenerationCost]) =>
    $grossAdditionalSales - $leadGenerationCost
);
export const grossROI = derived(
  [grossAdditionalSales, totalInvestment],
  ([$grossAdditionalSales, $totalInvestment]) =>
    $grossAdditionalSales / $totalInvestment
);

export const netROI = derived(
  [netAdditionalSales, totalInvestment],
  ([$netAdditionalSales, $totalInvestment]) =>
    $netAdditionalSales / $totalInvestment
);

export const rows = derived(
  [
    Average,
    leadsGeneratedTotal,
    leadsGenerated,
    percentRatio,
    costPerTermTotal,
    leadsConvertedTotal,
    totalInvestment,
  ],
  ([
    $Average,
    $leadsGeneratedTotal,
    $leadsGenerated,
    $percentRatio,
    $costPerTermTotal,
    $leadsConvertedTotal,
    $totalInvestment,
  ]) => [
    {
      rowHeader: 'Number of Leads Generated',
      rowDesc: 'Increases as campaign progresses and tactics improve',
      idPrefix: 'num_leads_generated_',
      numFormat: { style: 'decimal' },
      data: [...$leadsGenerated, { id: 'total', value: $leadsGeneratedTotal }],
    },
    {
      rowHeader: 'Number of Deal Conversions',
      rowDesc:
        'Projected number of won deals based on leads generated and close ratio',
      idPrefix: 'num_converted_',
      numFormat: { style: 'decimal' },
      data: [
        ...$leadsGenerated.map(({ id, value }) => ({
          id,
          value: value * $percentRatio,
        })),
        {
          id: 'total',
          value: $leadsGenerated.reduce(
            (prev, { value }) => prev + value * $percentRatio,
            0
          ),
        },
      ],
    },
    {
      rowHeader: 'Gross Cost Per Lead',
      rowDesc:
        'Total costs divided by the number of leads generated; decreases as the campaign progresses',
      idPrefix: 'gross_cost_per_lead_',
      numFormat: {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol',
        currencySign: 'accounting',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
      data: [
        ...$leadsGenerated.map(({ id, value }) => ({
          id,
          value: $costPerTermTotal / value,
        })),
        { id: 'total', value: $totalInvestment / $leadsGeneratedTotal },
      ],
    },
    {
      rowHeader: 'Cost Per Customer Added',
      rowDesc:
        'Total costs divided by number of deal conversions; also decreases as the campaign proceeds',
      idPrefix: 'cost_per_closed_lead_',
      numFormat: {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol',
        currencySign: 'accounting',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
      data: [
        ...$leadsGenerated.map(({ id, value }) => ({
          id,
          value: $costPerTermTotal / (value * $percentRatio),
        })),
        { id: 'total', value: $totalInvestment / $leadsConvertedTotal },
      ],
    },
    {
      rowHeader: 'Additional Sales',
      rowDesc:
        'Projected dollar amount of sales from customers acquired in the campaign. This only shows first campaign',
      idPrefix: 'additional_sales_',
      numFormat: {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol',
        currencySign: 'accounting',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
      data: [
        ...$leadsGenerated.map(({ id, value }) => ({
          id,
          value: $Average * value * $percentRatio,
        })),
        { id: 'total', value: $Average * $leadsConvertedTotal },
      ],
    },
    {
      rowHeader: 'Lead Generation Costs',
      rowDesc: 'Total investment per term/quarter',
      idPrefix: 'less_lead_gen_cost_',
      numFormat: {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol',
        currencySign: 'accounting',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
      data: [
        ...$leadsGenerated.map(({ id, value }) => ({
          id,
          value:
            ($costPerTermTotal / (value * $percentRatio)) *
            (value * $percentRatio),
        })),
        {
          id: 'total',
          value:
            ($totalInvestment / $leadsConvertedTotal) * $leadsConvertedTotal,
        },
      ],
    },
    {
      rowHeader: 'Net Additional Revenue',
      rowDesc: 'The additional sales amount minus the total costs per term',
      idPrefix: 'net_additional_revenue_',
      numFormat: {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol',
        currencySign: 'accounting',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
      data: [
        ...$leadsGenerated.map(({ id, value }) => ({
          id,
          value:
            $Average * value * $percentRatio -
            ($costPerTermTotal / (value * $percentRatio)) *
              (value * $percentRatio),
        })),
        {
          id: 'total',
          value:
            $Average * $leadsConvertedTotal -
            ($totalInvestment / $leadsConvertedTotal) * $leadsConvertedTotal,
        },
      ],
    },
  ]
);

export const results = derived(
  [
    leadsGeneratedTotal,
    leadsConvertedTotal,
    grossConversionRate,
    netConversionRate,
    grossAdditionalSales,
    netAdditionalSales,
    grossROI,
    netROI,
  ],
  ([
    $leadsGeneratedTotal,
    $leadsConvertedTotal,
    $grossConversionRate,
    $netConversionRate,
    $grossAdditionalSales,
    $netAdditionalSales,
    $grossROI,
    $netROI,
  ]) => [
    {
      title: 'Number of Leads Generated',
      desc: 'The total lead count at the end of the campaign',
      value: $leadsGeneratedTotal,
      numFormat: { style: 'decimal' },
    },
    {
      title: 'Gross Conversion Rate',
      desc: 'Total number of leads generated divided by the total target accounts',
      value: $grossConversionRate,
      numFormat: { style: 'percent' },
    },
    {
      title: 'Number of Deal Conversions',
      desc: 'The total number of leads generated in the campaign that turned into customers',
      value: $leadsConvertedTotal,
      numFormat: { style: 'decimal' },
    },
    {
      title: 'Net Conversion Rate',
      desc: 'Number of deal conversions divided by the total target accounts',
      value: $netConversionRate,
      numFormat: { style: 'percent', minimumFractionDigits: 1 },
    },
    {
      title: 'Gross Additional Sales Closed',
      desc: 'The total amount of new business acquired in the campaign',
      value: $grossAdditionalSales,
      numFormat: {
        style: 'currency',
        currencySign: 'accounting',
        currency: 'USD',
        minimumFractionDigits: 0,
      },
    },
    {
      title: 'Net Additional Sales Closed',
      desc: 'The amount of new business generated by the campaign minus total campaign costs',
      value: $netAdditionalSales,
      numFormat: {
        style: 'currency',
        currencySign: 'accounting',
        currency: 'USD',
        minimumFractionDigits: 0,
      },
    },
    {
      title: 'Gross ROI',
      desc: 'The ratio of gross additional sales closed over total investment',
      value: $grossROI,
      numFormat: { style: 'percent', minimumFractionDigits: 0 },
    },
    {
      title: 'Net ROI',
      desc: 'The ratio of net additional sales closed over total investment',
      value: $netROI,
      numFormat: { style: 'percent', minimumFractionDigits: 0 },
    },
  ]
);

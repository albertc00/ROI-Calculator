<script>
    export let average;
    export let ratio;
    export let costperTermtotal;
    export let totalInvestment;

    //leads generated
    export let leadsGenerated;
    
    export function calcLeadsGenerated(q) {
        if (q >= 1 && q <= 4) {
            return parseFloat(leadsGenerated[q - 1]);
        }

        return leadsGenerated.reduce((prev, curr) => prev + curr, 0);
    }

    //leads converted
    function calcLeadsConverted({ q = null, ratio }) {
        if (q >= 1 && q <= 4) {
            return (calcLeadsGenerated(q) * ratio) / 100;
        }

        return parseInt(calcLeadsConverted({ q: 1, ratio }) + calcLeadsConverted({ q: 2, ratio }) + calcLeadsConverted({ q: 3, ratio }) + calcLeadsConverted({ q: 4, ratio }));
    }

    //gross cost per lead
    function calcGrossCostPerLead({ q = null, costperTermtotal, totalInvestment }) {
        if (q >= 1 && q <= 4) {
            return Math.round(costperTermtotal / calcLeadsGenerated(q));
        }
        
        return Math.round(totalInvestment  / calcLeadsGenerated());
    }

    //cost per customer added
    function calcCostPerClosedLead({ q = null, costperTermtotal, totalInvestment, ratio }) {
        if (q >= 1 && q <= 4) {
        return Math.round(costperTermtotal / calcLeadsConverted({q, ratio}));
        }

        return Math.round(totalInvestment  / calcLeadsConverted({ratio}));
    }

    // additional sales
    function calcAdditionalSales({ q = null, average, ratio }) {
        if (q >= 1 && q <= 4) {
        return Math.round(parseFloat(average) * calcLeadsConverted({ q , ratio }));
        }

        return Math.round(parseFloat(average) * calcLeadsConverted({ ratio }));

    }

    // lead generation costs
    function calcLessLeadGenCost({ q = null, costperTermtotal, ratio, totalInvestment }) {
        if (q >= 1 && q <= 4) {
        return Math.round(calcCostPerClosedLead({ q, costperTermtotal, ratio }) * calcLeadsConverted({ q, ratio }));
        }

        return Math.round(calcCostPerClosedLead({ totalInvestment, ratio }) * calcLeadsConverted({ ratio }) );
    }

    // net additional revenue
    function calcNetAdditionalRevenue({ q = null, average, ratio, costperTermtotal, totalInvestment }) {
        if (q >= 1 && q <= 4) {
        return Math.round(calcAdditionalSales({ q, average, ratio }) - calcLessLeadGenCost({ q, costperTermtotal, ratio }));
        }

        return Math.round(calcAdditionalSales({ average, ratio }) - calcLessLeadGenCost({ totalInvestment, ratio }));

    }

    let leadsGenerated2 = [
        { id: 1, label: "Q1", value: 10 },
        { id: 2, label: "Q2", value: 20 },
        { id: 3, label: "Q3", value: 30 },
        { id: 4, label: "Q4", value: 40 },
    ];

    let rows = [
        {
            rowHeader: 'Number of Leads Generated',
            rowDesc: 'Increases as campaign progresses and tactics improve',
            idPrefix: 'num_leads_generated_',
            data: [
                { id: 'q1', value: 10 },
                { id: 'q2', value: 20 },
                { id: 'q3', value: 30 },
                { id: 'q4', value: 40 },
                { id: 'total', value: 100 }
            ]
        },
        {
            rowHeader: 'Number of Deal Conversions',
            rowDesc: 'Projected number of won deals based on leads generated and close ratio',
            idPrefix: 'num_converted_',
            data: [
                { id: 'q1', value: 2.5 },
                { id: 'q2', value: 7.5 },
                { id: 'q3', value: 7.5 },
                { id: 'q4', value: 7.5 },
                { id: 'total', value: 25 }
            ]
        },
    ];
</script>

<table id="quarterly_results">
    <colgroup>
        <col style="width: 40%;">
    </colgroup>
    <thead>
        <tr>
            <th></th>
            <th scope="col">Q1</th>
            <th scope="col">Q2</th>
            <th scope="col">Q3</th>
            <th scope="col">Q4</th>
            <th scope="col">TOTAL</th>
        </tr>
    </thead>
    <tbody>
        {#each rows as { rowHeader, rowDesc, idPrefix, data }}
            <tr>
                <th scope="row">
                    <p class="rc-label"><strong>{rowHeader}</strong></p>
                    <p class="rc-description">{rowDesc}</p>
                </th>
                {#each data as { id, label, value }}
                    <td data-col-label={id.toUpperCase()}>
                        <output id={`${idPrefix}${id}`} name={`${idPrefix}${id}`} class="cell-quarter" class:total={id === 'total'}>{value}</output>
                    </td>
                {/each}
            </tr>
        {/each}
        <tr>
            <th scope="row">
                <p class="rc-label"><strong>Number of Leads Generated</strong></p>
                <p class="rc-description">Increases as campaign progresses and tactics improve</p>
            </th>
            {#each leadsGenerated2 as { id, label, value }}
                <td data-col-label={label}>
                    <output id={`num_leads_generated_q${id}`} name={`num_leads_generated_q${id}`} class="num-leads-generated-quarter">{value}</output>
                </td>
            {/each}
            <td data-col-label="Q1">
                <output id="num_leads_generated_q1" name="num_leads_generated_q1" class="num-leads-generated-quarter">{calcLeadsGenerated(1)}</output>
            </td>
            <td data-col-label="Q2">
                <output id="num_leads_generated_q2" name="num_leads_generated_q2" class="num-leads-generated-quarter">{calcLeadsGenerated(2)}</output>
            </td>
            <td data-col-label="Q3">
                <output id="num_leads_generated_q3" name="num_leads_generated_q3" class="num-leads-generated-quarter">{calcLeadsGenerated(3)}</output>
            </td>
            <td data-col-label="Q4">
                <output id="num_leads_generated_q4" name="num_leads_generated_q4" class="num-leads-generated-quarter">{calcLeadsGenerated(4)}</output>
            </td>
            <td data-col-label="TOTAL">
                <output id="total_num_leads_generated" name="total_num_leads_generated" for="num_leads_generated_q1 num_leads_generated_q2 num_leads_generated_q3 num_leads_generated_q4">{calcLeadsGenerated()}</output>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <p class="rc-label">
                    <strong>Number of Deal Conversions</strong>
                </p>
                <p class="rc-description">Projected number of won deals based on leads generated and close ratio</p>
            </th>
            <td data-col-label="Q1">
                <output id="num_converted_q1" class="num-converted-quarter" for="num_leads_generated_q1 close_ratio_number">{calcLeadsConverted({ q: 1, ratio })}</output>
            </td>
            <td data-col-label="Q2">
                <output id="num_converted_q2" class="num-converted-quarter" for="num_leads_generated_q2 close_ratio_number">{calcLeadsConverted({ q: 2, ratio })}</output>
            </td>
            <td data-col-label="Q3">
                <output id="num_converted_q3" class="num-converted-quarter" for="num_leads_generated_q3 close_ratio_number">{calcLeadsConverted({ q: 3, ratio })}</output>
            </td>
            <td data-col-label="Q4">
                <output id="num_converted_q4" class="num-converted-quarter" for="num_leads_generated_q4 close_ratio_number">{calcLeadsConverted({ q: 4, ratio })}</output>
            </td>
            <td data-col-label="TOTAL">
                <output id="total_num_converted" name="total_num_converted" for="num_converted_q1 num_converted_q2 num_converted_q3 num_converted_q4">{calcLeadsConverted({ ratio })}</output>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <p class="rc-label">
                    <strong>Gross Cost Per Lead</strong>
                </p>
                <p class="rc-description">Total costs divided by the number of leads generated; decreases as the campaign progresses</p>
            </th>
            <td data-col-label="Q1">
                <span class="rc-symbol rc-symbol-dollar">$</span>
                <output id="gross_cost_per_lead_q1" name="gross_cost_per_lead_q1" class="gross-cost-per-lead-quarter" for="cost_per_term_total num_leads_generated_q1">{calcGrossCostPerLead({ q: 1 , costperTermtotal })}</output>
            </td>
            <td data-col-label="Q2">
                <span class="rc-symbol rc-symbol-dollar">$</span>
                <output id="gross_cost_per_lead_q2" name="gross_cost_per_lead_q2" class="gross-cost-per-lead-quarter" for="cost_per_term_total num_leads_generated_q2">{calcGrossCostPerLead({ q: 2 , costperTermtotal })}</output>
            </td>
            <td data-col-label="Q3">
                <span class="rc-symbol rc-symbol-dollar">$</span>
                <output id="gross_cost_per_lead_q3" name="gross_cost_per_lead_q3" class="gross-cost-per-lead-quarter" for="cost_per_term_total num_leads_generated_q3">{calcGrossCostPerLead({ q: 3 , costperTermtotal })}</output>
            </td>
            <td data-col-label="Q4">
                <span class="rc-symbol rc-symbol-dollar">$</span>
                <output id="gross_cost_per_lead_q4" name="gross_cost_per_lead_q4" class="gross-cost-per-lead-quarter" for="cost_per_term_total num_leads_generated_q4">{calcGrossCostPerLead({ q: 4 , costperTermtotal })}</output>
            </td>
            <td data-col-label="TOTAL">
                <span class="rc-symbol rc-symbol-dollar">$</span>
                <output id="total_gross_cost_per_lead" name="total_gross_cost_per_lead" for="gross_cost_per_lead_q1 gross_cost_per_lead_q2 gross_cost_per_lead_q3 gross_cost_per_lead_q4">{calcGrossCostPerLead({  totalInvestment })}</output>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <p class="rc-label">
                    <strong>Cost Per Customer Added</strong>
                </p>
                <p class="rc-description">Total costs divided by number of deal conversions; also decreases as the campaign proceeds</p>
            </th>
            <td data-col-label="Q1">
                <span class="rc-symbol rc-symbol-dollar">$</span>
                <output id="cost_per_closed_lead_q1" name="cost_per_closed_lead_q1" class="cost-per-closed-lead-quarter">{calcCostPerClosedLead({ q: 1, costperTermtotal, ratio })}</output>
            </td>
            <td data-col-label="Q2">
                <span class="rc-symbol rc-symbol-dollar">$</span>
                <output id="cost_per_closed_lead_q2" name="cost_per_closed_lead_q2" class="cost-per-closed-lead-quarter">{calcCostPerClosedLead({ q: 2, costperTermtotal, ratio })}</output>
            </td>
            <td data-col-label="Q3">
                <span class="rc-symbol rc-symbol-dollar">$</span>
                <output id="cost_per_closed_lead_q3" name="cost_per_closed_lead_q3" class="cost-per-closed-lead-quarter">{calcCostPerClosedLead({ q: 3, costperTermtotal, ratio })}</output>
            </td>
            <td data-col-label="Q4">
                <span class="rc-symbol rc-symbol-dollar">$</span>
                <output id="cost_per_closed_lead_q4" name="cost_per_closed_lead_q4" class="cost-per-closed-lead-quarter">{calcCostPerClosedLead({ q: 4, costperTermtotal, ratio })}</output>
            </td>
            <td data-col-label="TOTAL">
                <span class="rc-symbol rc-symbol-dollar">$</span>
                <output id="total_cost_per_closed_lead" name="total_cost_per_closed_lead" for="total_investment total_num_converted">{calcCostPerClosedLead({ totalInvestment, ratio })}</output>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <p class="rc-label">
                    <strong>Additional Sales</strong>
                </p>
                <p class="rc-description">Projected dollar amount of sales from customers acquired in the campaign</p>
            </th>
            <td data-col-label="Q1">
                <span class="rc-symbol rc-symbol-dollar">$</span>
                <output id="additional_sales_q1" name="additional_sales_q1" class="additional-sales-quarter" for="avg_deal_size_number num_converted_q1">{calcAdditionalSales({ q:1, average, ratio })}</output>
            </td>
            <td data-col-label="Q2">
                <span class="rc-symbol rc-symbol-dollar">$</span>
                <output id="additional_sales_q2" name="additional_sales_q2" class="additional-sales-quarter" for="avg_deal_size_number num_converted_q2">{calcAdditionalSales({ q:2, average, ratio })}</output>
            </td>
            <td data-col-label="Q3">
                <span class="rc-symbol rc-symbol-dollar">$</span>
                <output id="additional_sales_q3" name="additional_sales_q3" class="additional-sales-quarter" for="avg_deal_size_number num_converted_q3">{calcAdditionalSales({ q:3, average, ratio })}</output>
            </td>
            <td data-col-label="Q4">
                <span class="rc-symbol rc-symbol-dollar">$</span>
                <output id="additional_sales_q4" name="additional_sales_q4" class="additional-sales-quarter" for="avg_deal_size_number num_converted_q4">{calcAdditionalSales({ q:4, average, ratio })}</output>
            </td>
            <td data-col-label="TOTAL">
                <span class="rc-symbol rc-symbol-dollar">$</span>
                <output id="total_additional_sales" name="total_additional_sales" for="avg_deal_size_number total_num_converted">{calcAdditionalSales({average, ratio })}</output>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <p class="rc-label"><strong>Lead Generation Costs</strong></p>
                <p class="rc-description">Total investment per term/quarter</p>
            </th>
            <td data-col-label="Q1">
                <span class="rc-symbol rc-symbol-dollar">$</span>
                <output id="less_lead_gen_cost_q1" name="less_lead_gen_cost_q1" class="less-lead-gen-cost-quarter" for="cost_per_closed_lead_q1 num_converted_q1">{calcLessLeadGenCost({ q: 1, costperTermtotal, ratio })}</output>
            </td>
            <td data-col-label="Q2">
                <span class="rc-symbol rc-symbol-dollar">$</span>
                <output id="less_lead_gen_cost_q2" name="less_lead_gen_cost_q2" class="less-lead-gen-cost-quarter" for="cost_per_closed_lead_q2 num_converted_q2">{calcLessLeadGenCost({ q: 2, costperTermtotal, ratio })}</output>
            </td>
            <td data-col-label="Q3">
                <span class="rc-symbol rc-symbol-dollar">$</span>
                <output id="less_lead_gen_cost_q3" name="less_lead_gen_cost_q3" class="less-lead-gen-cost-quarter" for="cost_per_closed_lead_q3 num_converted_q3">{calcLessLeadGenCost({ q: 3, costperTermtotal, ratio })}</output>
            </td>
            <td data-col-label="Q4">
                <span class="rc-symbol rc-symbol-dollar">$</span>
                <output id="less_lead_gen_cost_q4" name="less_lead_gen_cost_q4" class="less-lead-gen-cost-quarter" for="cost_per_closed_lead_q4 num_converted_q4">{calcLessLeadGenCost({ q: 4, costperTermtotal, ratio })}</output>
            </td>
            <td data-col-label="TOTAL">
                <span class="rc-symbol rc-symbol-dollar">$</span>
                <output id="total_less_lead_gen_cost" name="total_less_lead_gen_cost" for="total_cost_per_closed_lead total_num_converted">{calcLessLeadGenCost({ totalInvestment, ratio })}</output>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <p class="rc-label"><strong>Net Additional Revenue</strong></p>
                <p class="rc-description">The additional sales amount minus the total costs per term</p>
            </th>
            <td data-col-label="Q1">
                <span class="rc-container-parenthesis">
                    <span class="rc-symbol rc-symbol-dollar">$</span>
                    <output id="net_additional_revenue_q1" name="net_additional_revenue_q1" class="net-additional-revenue-quarter" for="additional_sales_q1 less_lead_gen_cost_q1">{calcNetAdditionalRevenue({ q: 1, average, ratio, costperTermtotal })}</output>
                </span>
            </td>
            <td data-col-label="Q2">
                <span class="rc-container-parenthesis">
                    <span class="rc-symbol rc-symbol-dollar">$</span>
                    <output id="net_additional_revenue_q2" name="net_additional_revenue_q2" class="net-additional-revenue-quarter" for="additional_sales_q2 less_lead_gen_cost_q2">{calcNetAdditionalRevenue({ q: 2, average, ratio, costperTermtotal })}</output>
                </span>
            </td>
            <td data-col-label="Q3">
                <span class="rc-container-parenthesis">
                    <span class="rc-symbol rc-symbol-dollar">$</span>
                    <output id="net_additional_revenue_q3" name="net_additional_revenue_q3" class="net-additional-revenue-quarter" for="additional_sales_q3 less_lead_gen_cost_q3">{calcNetAdditionalRevenue({ q: 3, average, ratio, costperTermtotal })}</output>
                </span>
            </td>
            <td data-col-label="Q4">
                <span class="rc-container-parenthesis">
                    <span class="rc-symbol rc-symbol-dollar">$</span>
                    <output id="net_additional_revenue_q4" name="net_additional_revenue_q4" class="net-additional-revenue-quarter" for="additional_sales_q4 less_lead_gen_cost_q4">{calcNetAdditionalRevenue({ q: 4, average, ratio, costperTermtotal })}</output>
                </span>
            </td>
            <td data-col-label="TOTAL">
                <span class="rc-container-parenthesis">
                    <span class="rc-symbol rc-symbol-dollar">$</span>
                    <output id="total_net_additional_revenue" name="total_net_additional_revenue" for="total_additional_sales total_less_lead_gen_cost">{calcNetAdditionalRevenue({ average, ratio, totalInvestment })}</output>
                </span>
            </td>
        </tr>
    </tbody>
</table>
<script>
  import Companydynamics from './CompanyDynamics.svelte';
  import Campaigninputs from './CampaignInputs.svelte';
  import QuarterResults from './QuarterResults.svelte';
  import FullCampaignResults from './FullCampaignResults.svelte';
</script>

<div id="cb_roi_calculator">
  <div class="cboxContainer cboxContainerX cboxContainerY">
    <section id="company-dynamics">
      <h2 class="section-header">Company Dynamics</h2>

      <Companydynamics />
    </section>

    <section id="campaign-inputs">
      <h2 class="section-header">Campaign Inputs</h2>
      <Campaigninputs />
    </section>

    <section id="quarterly-results">
      <h2 class="section-header">Quarterly Results</h2>
      <QuarterResults />
    </section>

    <section id="full-campaign-results">
      <h2 class="section-header">Full Campaign Results</h2>
      <FullCampaignResults />
    </section>
  </div>
</div>

<style lang="scss">
  @use '../styles/app';

  @include app.reset;

  @include app.root {
    #cb_roi_calculator {
      text-align: center;
      padding: 1rem;
      max-width: 240px;
      margin: 0 auto;

      @include app.screen-sm {
        max-width: none;
      }
    }

    section {
      padding: 1.875rem 1.25rem;
    }

    .section-header {
      font-family: 'Work Sans', work-sans, sans-serif;
      font-size: 2.25rem;
      color: #231f20;
      font-weight: bold;
      margin: 0.5rem 0 1.5rem;
      line-height: 2.75rem;
      text-align: left;
    }
  }
</style>

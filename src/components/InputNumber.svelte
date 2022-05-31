<script>
    export let value;
    export let id;
    export let symbol = '';
    export let atts = {};
    $: attribs = {  min: 0, step: 1, ...atts };
    $: error = isNaN(value);

    function handleInput({ target: { value, validity: { valid } } }) {
        error = !valid;
    }
</script>

<div class="number-wrapper" class:dollar={symbol === '$'} class:percent={symbol === '%'}>
    {#if (symbol === '$')}
        <span class="symbol">$</span>
    {/if}
    <input class="number" class:invalid={error} type="number" {id} name={id} {...attribs} required bind:value on:input={handleInput} />
    {#if (symbol === '%')}
        <span class="symbol">%</span>
    {/if}
</div>
    {#if (error && attribs.max) }
        <div class="error" class:leftPadding={symbol === '$'}>{`Please enter a valid number between ${attribs.min || 1} and ${attribs.max}.`}</div>
    {:else if (error)}
        <div class="error" class:leftPadding={symbol === '$'}>{`Please enter a number greater or equal to ${attribs.min || 1}.`}</div>
    {/if}


<style>
    .number-wrapper {
        display: grid;
        gap: 0.375rem;
        align-items: center;
        grid-template-columns: 27ch max-content ;
    }

    .number-wrapper.dollar {
        grid-template-columns: max-content 20ch;
    }

    .number-wrapper.percent {
        grid-template-columns: 12ch max-content ;
    }

    .number {
        background-color: #e8e8e8;
        border: unset;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom: 1px solid rgb(6, 48, 96);
        color: #444;
        padding: 5px;
        font-size: 1rem;
        margin: 0;
    }

    .number::-webkit-inner-spin-button,
    .number::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0; 
    }

    .number:active,
    .number:focus,
    .number:hover {
        border: unset;
        box-shadow: 0;
        outline: none;
        border-bottom: 1px solid rgb(6, 48, 96);
    }

    .symbol {
        color: #063060;
        font-family: 'Lato', sans-serif;
        font-weight: 600;
        font-size: 1.2rem;
    }

    .error {
        font-size: 0.75rem;
        line-height: 1rem;
        font-family: 'Lato', sans-serif;
        color: rgba(250, 69, 14, 0.9);
        padding: 0.375rem 0 0 0;
    }

    .error.leftPadding {
        padding-left: 2.5ch;
    }
</style>


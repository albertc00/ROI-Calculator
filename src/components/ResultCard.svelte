<script>
    import Label from './Label.svelte';

    export let title;
    export let desc;
    export let value;
    export let numFormat;

    $: error = !isFinite(value) || isNaN(value);
</script>

<li class="card">
    <Label {title} {desc} center />
    {#if (error)}
        <div class="error">Cannot compute: Invalid input.</div>
    {:else}
        <output class="output" class:loss={value < 0}>{(new Intl.NumberFormat('en-US', numFormat)).format(value)}</output>
    {/if}
</li>

<style>
        
    .card {
        border: 1px solid #14b37d;
        border-radius: 1.5rem;
        transition: background-color 0.3s ease;
        padding: 1.5rem;
    }

    .card:hover {
        background-color: rgba(20, 179, 125, 0.03);
    }

    .output {
        font-family: 'Lato', sans-serif;
        font-size: 2.25rem;
        margin-top: 1rem;
        color: #14b37d;
    }

    .output.loss {
        color: rgba(250, 69, 14, 0.9);
    }

    .error {
        font-family: 'Lato', sans-serif;
        font-size: 1rem;
        margin-top: 1rem;
        color: rgba(250, 69, 14, 0.9);
    }
</style>
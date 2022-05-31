<script>
    export let value;
    export let id;
    export let atts = {};
    $: attribs = {  min: 0, step: 1, ...atts };


</script>

<div class="range-wrapper">

    <input class="range" type="range" {id} name={id} {...attribs} bind:value /> 

</div>

<style>

    .range {
        cursor: pointer;
        width: 100%;
        background: transparent;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
    @media screen and (min-width: 991px){
        .range-wrapper {
        width: calc(100% - 20px);
        color: #a2b3be;
        }
    }

    input[type=range]::-webkit-slider-thumb{
        -webkit-appearance: none;
        border: 1px solid #a2b3be;
        height: 20px;
        width: 20px;
        border-radius: 100%;
        background: #a2b3be;
        cursor: pointer;
        margin-top: -8px;

    }
    input[type=range]::-moz-range-thumb{
        border: 1px solid #a2b3be;
        height: 20px;
        width: 20px;
        border-radius: 100%;
        background: #a2b3be;
        cursor: pointer;
    }

    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 6px;
        background-clip: padding-box;
        cursor: pointer;
        background: rgba(95,115,128,0.15);
        border-radius: 15px;
    }

    input[type=range]:focus::-webkit-slider-runnable-track {
        background: rgba(95,115,128,0.15);
    }

    input[type=range]::-moz-range-track {
        width: 100%;
        height: 6px;
        cursor: pointer;
        background: rgba(95,115,128,0.15);
        border-radius: 15px;
    }
    
    .range-wrapper:hover .range::-webkit-slider-thumb {
        box-shadow: 0 0 0 12px rgba(162, 179, 190, 0.09);
        transition: box-shadow 0.2s ease;
    
    }

    .range-wrapper:hover .range:-moz-range-thumb {
        box-shadow: 0 0 0 12px rgba(162, 179, 190, 0.09);
        transition: box-shadow 0.2s ease;
    }

</style>
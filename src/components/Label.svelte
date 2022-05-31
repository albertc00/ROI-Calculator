<script>
    export let title;
    export let desc;
    export let center = false;
</script>

<h3 class="title" class:center>{title}</h3>
<p class="desc" class:center>{desc}</p>

<style>
.title {
    font-family: 'Work Sans', work-sans, sans-serif;
    font-size: 1.125rem;
    color: #231f20;
    font-weight: bold;
    text-align: left;
}

.desc {
    font-family: 'Lato', sans-serif;
    font-size: 0.875rem;
    color: #5f7380;
    font-weight: 400;
    font-style: italic;
    text-align: left;
}

.center {
    text-align: center;
}
</style>

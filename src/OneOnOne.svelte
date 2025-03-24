<script>
  import {onMount} from "svelte"
  let {position} = $props();
  import { finalists, eventBus } from "./sharedState.svelte";
  let nombre = $state(finalists[position]);

  eventBus.subscribe((value) => {
    if (value.ind === position) {
      nombre = value.nombre;
      $state.snapshot(nombre);
    }
  })

  let element;
  onMount(() => {
    $inspect(element.classList);
  })

</script>

<style>
  p {
    margin: 0;
    font-size: 1.5em;
    color: red;
  }

  .revealed {
    position: absolute;
    z-index: 2;
  }
</style>

<div
  class="one-on-one {nombre ? 'revealed': ''}"
  bind:this={element}>
  {#if nombre}
    <p>{nombre}</p>
  {:else}
    <p> This is position {position}</p>
  {/if}
</div>

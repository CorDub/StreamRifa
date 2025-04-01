<script>
  let {stage, position} = $props();
  import { quarterfinalists, eventBus } from "./sharedState.svelte";
  let nombre = $state(quarterfinalists[position]);
  let isEditOpen = $state(false);
  let ready = $state("");

  eventBus.subscribe((value) => {
    if (value.ind === position && value.stage === stage) {
      nombre = value.nombre;
    }
  })

  eventBus.subscribe((value) => {
    if (value.type === "getReady") {
      if (value.index === position) {
        if (position < 4) {
          ready = "vamos-left";
        } else {
          ready = "vamos-right";
        }
      }
    }
  })

  let element;

  function deleteFinalist() {
    quarterfinalists[position] = "";
    nombre  = "";
    eventBus.set({type: "reset", ind: position, nombre: nombre});
  }

  function openEditFinalist() {
    isEditOpen = true;
  }

  function changeName(e) {
    console.log(e)
    if (e.key === "Enter") {
      quarterfinalists[position] = e.target.value;
      nombre = e.target.value;
      isEditOpen = false;
    }
  }

</script>

<style>
  .one-on-one {
    transition: 2s;
  }

  p {
    margin: 0;
    font-size: 1.5em;
    color: black;
  }

  .revealed {
    position: absolute;
    z-index: 2;
  }

  .finalist-spot {
    border: 1px solid black;
    border-radius: 15px;
    padding: 1rem;
    display: flex;
  }

  .finalist-cancel {
    border: none;
    background-color: transparent;
    margin-left: 0.5rem;
    font-size: 0.75em;
  }

  .finalist-cancel:hover {
    cursor: pointer;
  }

  .vamos-left {
    transform: translateX(-50vh);
  }

  .vamos-right {
    transform: translateX(50vh);
  }
</style>

<div
  class="one-on-one {nombre ? 'revealed': ''} {ready ? ready : ''}"
  bind:this={element}>
  {#if nombre}
    <div class="finalist-spot">
      {#if !isEditOpen}
        <p class="finalist-name"
          onclick={openEditFinalist}
          >{nombre}</p>
      {:else}
        <input
          type="text"
          value={nombre}
          onkeydown={(e) => changeName(e)}/>
      {/if}
      <button class="finalist-cancel"
        onclick={deleteFinalist}
        >X</button>
    </div>
  {:else}
    <p>Posicion disponible</p>
  {/if}
</div>

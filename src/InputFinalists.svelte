<script>
  import { quarterfinalists, eventBus } from "./sharedState.svelte";
  let available_positions = $state([0,1,2,3,4,5,6,7]);
  let nombre = $state("");
  let error = $state("");
  let startMouseX = $state(null);
  let startMouseY = $state(null);
  let tracking = $state(false);
  let trackingMouseX = $state(0);
  let trackingMouseY = $state(0);
  let topDiff = $state();
  let leftDiff = $state();

  eventBus.subscribe((value) => {
    if (value.type === "reset") {
      available_positions.splice(value.ind, 0, value.ind);
    }
  })

  function distributeFinalists() {
    if (checkDouble() === true) {
      return;
    };

    if (available_positions.length === 0) {
      error = "Todos los finalistas han estado seleccionados."
      return;
    };

    const randomIndex = Math.floor(Math.random() * available_positions.length);
    const ind = available_positions[randomIndex];
    const new_ap = available_positions.filter(elem => elem !== available_positions[randomIndex]);
    available_positions = new_ap;

    quarterfinalists[ind] = nombre;

    eventBus.set({ind: ind, nombre: nombre, stage:"quarterfinal"});
    nombre = "";

    if (available_positions.length === 0) {
      eventBus.set({type:"readyForMatches"});
    }
  }

  function checkDouble() {
    for (const finalist of quarterfinalists) {
      if (finalist === nombre) {
        return true;
      }
    }
    return false;
  }

  let form;

  function setStart(event) {
    startMouseX = event.clientX;
    startMouseY = event.clientY;
    leftDiff = startMouseX - form.getBoundingClientRect().left;
    topDiff = startMouseY - form.getBoundingClientRect().top;
    tracking = true;

    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', drop);
  }

  function drag(event) {
    if (tracking === true) {
      trackingMouseX = event.clientX
      trackingMouseY = event.clientY
      form.style.left = (trackingMouseX - leftDiff).toString() + "px"
      form.style.top = (trackingMouseY - topDiff).toString() + "px"
    }
  }

  function drop(event) {
    tracking = false;

    window.removeEventListener("mousemove", drag);
    window.removeEventListener("mouseup", drop);
  }

</script>

<style>
  .input-finalists {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    z-index: 2;
    position: absolute;
    background-color: transparent;
    transition: 2s;
  }

  .retire {
    transform: translateY(-100vh);
  }

  .form {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid grey;
    padding: 1rem;
    border-radius: 15px;
    background-color: white;
  }

  .form:hover {
    cursor: pointer;
  }

  .form-label {
    margin-bottom: 0.5rem;
  }

  .form-input {
    border-radius: 15px;
    width: 100%;
    margin-bottom: 0.5rem;
    border: 1px solid grey;
  }

  .form-button {
    border-radius: 15px;
    border: 1px solid grey;
    width: 50%;
  }

  .ya-quedan {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .ya-quedan p {
    margin: 0;
  }

  .ya-quedan-number {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 3em;
  }

</style>

<div class="input-finalists {available_positions.length === 0 ? 'retire' : ''}">
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <form
    bind:this={form}
    class="form"
    onmousedown={setStart}
    onmousemove={drag}
    onmouseup={drop}>
    <label
      for="finalista"
      class="form-label">
        Ingrese los finalistas por favor señora
    </label>
    <input
      type='text'
      id="finalista"
      class="form-input"
      placeholder="Nombre"
      bind:value={nombre}/>
    <button
      type="button"
      class="form-button"
      onclick={distributeFinalists}>
        Ingresar
    </button>
    <div class="ya-quedan">
      <div>
        {#if available_positions.length > 1}
          <p>Ya quedan</p>
        {:else}
          <p>Ya queda</p>
        {/if}
      </div>
      <div class="ya-quedan-number">{available_positions.length}</div>
      <div>
        {#if available_positions.length > 1}
          <p>spots</p>
        {:else}
          <p>spot</p>
        {/if}
      </div>
    </div>
  </form>
</div>

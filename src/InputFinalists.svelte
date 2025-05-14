<script>
    import { onMount } from "svelte";
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
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}";
  let char_values = {};
  let primaryColor = $state("rgb(255,255,255)");

  $effect(() => {
    console.log("primaryColor", primaryColor);
  });

  onMount(() => {
    doubleNaiveCharValue();
    console.log(char_values);
  });

  function naiveCharValue() {
    for (let i = 0; i < chars.length; i++) {
      char_values[chars[i]] = ((i * 255) / chars.length)/2;
    };
  }

  function doubleNaiveCharValue() {
    for (let i = 0; i < chars.length; i++) {
      char_values[chars[i]] = ((i * 255) / chars.length)*2;
    };
  }

  function linearMultCharValue() {
    for (let i = 0; i < chars.length; i++) {
      char_values[chars[i]] = [
        (i * 255) / (chars.length * 1),
        (i * 255) / (chars.length * 2),
        (i * 255) / (chars.length * 3),
      ]
    }
  }

  function towerPrimaryColor() {
    if (nombre.length === 0) {
      primaryColor = `rgb(${255}, ${255}, ${255})`;
      return;
    }

    let total = 0;
    for (let i = 0; i < nombre.length; i++) {
      if (nombre[i] === " ") {
        continue;
      }
      total += char_values[nombre[i]]
    };

    let floor = Math.trunc(total/255);
    if (floor > 8) {
      floor = floor % 8;
    }

    const remaining = total % 255;

    let rgb = {
      r: 0,
      g: 0,
      b: 0
    }

    switch (floor) {
      case 0:
        rgb.r = 255 - remaining;
        rgb.r = clampRGBValue(rgb.r);
        rgb.g = 255 - remaining;
        rgb.g = clampRGBValue(rgb.g);
        rgb.b = 255 - remaining;
        rgb.b = clampRGBValue(rgb.b);
        break;
      case 1:
        rgb.r = 0 + remaining;
        rgb.r = clampRGBValue(rgb.r);
        rgb.g = 0;
        rgb.g = clampRGBValue(rgb.g);
        rgb.b = 0;
        rgb.b = clampRGBValue(rgb.b);
        break;
      case 2:
        rgb.r = 255 - (remaining / 3);
        rgb.r = clampRGBValue(rgb.r);
        rgb.g = 0 + remaining + (remaining / 3);
        rgb.g = clampRGBValue(rgb.g);
        rgb.b = 0 + (remaining / 3);
        rgb.b = clampRGBValue(rgb.b);
        break;
      case 3:
        rgb.r = 255 - remaining - (remaining / 3);
        rgb.r = clampRGBValue(rgb.r);
        rgb.g = 255 - (remaining / 3);
        rgb.g = clampRGBValue(rgb.g);
        rgb.b = 0 + (remaining / 3);
        rgb.b = clampRGBValue(rgb.b);
        break;
      case 4:
        rgb.r = 0 + (remaining / 3);
        rgb.r = clampRGBValue(rgb.r);
        rgb.g = 255 - (remaining / 3);
        rgb.g = clampRGBValue(rgb.g);
        rgb.b = 0 + remaining + (remaining / 3);
        rgb.b = clampRGBValue(rgb.b);
        break;
      case 5:
        rgb.r = 0 + (remaining / 3);
        rgb.r = clampRGBValue(rgb.r);
        rgb.g = 255 - remaining - (remaining / 3);
        rgb.g = clampRGBValue(rgb.g);
        rgb.b = 255 - (remaining / 3);
        rgb.b = clampRGBValue(rgb.b);
        break;
      case 6:
        rgb.r = 0 + remaining +(remaining / 3);
        rgb.r = clampRGBValue(rgb.r);
        rgb.g = 0 + (remaining / 3);
        rgb.g = clampRGBValue(rgb.g);
        rgb.b = 255 - (remaining / 3);
        rgb.b = clampRGBValue(rgb.b);
        break;
      case 7:
        rgb.r = 255 - (remaining / 3);
        rgb.r = clampRGBValue(rgb.r);
        rgb.g = 0 +(remaining / 3);
        rgb.g = clampRGBValue(rgb.g);
        rgb.b = 255 - remaining - (remaining / 3);
        rgb.b = clampRGBValue(rgb.b);
        break;
      case 8:
        rgb.r = 255;
        rgb.r = clampRGBValue(rgb.r);
        rgb.g = 0 + remaining;
        rgb.g = clampRGBValue(rgb.g);
        rgb.b = 0 + remaining;
        rgb.b = clampRGBValue(rgb.b);
        break;
    }

    console.log("rgb", rgb);
    primaryColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }

  function leakyContainerPrimaryColor() {
    let rgb = {
      r: 0,
      g: 0,
      b: 0
    }

    for (let i = 0; i < nombre.length; i++) {
      if (rgb.r < 255 && rgb.g === 0 && rgb.b === 0) {
        rgb.r += char_values[nombre[i]];
        if (rgb.r > 255) {
          rgb.g += rgb.r-255;
          rgb.r = 255;
        };
      } else if (rgb.r === 255 && rgb.g < 255 && rgb.b === 0) {
        rgb.g += char_values[nombre[i]];
        if (rgb.g > 255) {
          rgb.r -= rgb.g-255;
          rgb.g = 255;
        };
      } else if (rgb.r > 0 && rgb.g === 255 && rgb.b === 0) {
        rgb.r -= char_values[nombre[i]];
        if (rgb.r < 0) {
          rgb.b += 0 - rgb.r;
          rgb.r = 0;
        }
      } else if (rgb.r === 0 && rgb.g === 255 && rgb.b < 255) {
        rgb.b += char_values[nombre[i]];
        if (rgb.b > 255) {
          rgb.g -= rgb.b-255;
          rgb.b = 255;
        };
      } else if (rgb.r === 0 && rgb.g < 255 && rgb.b === 255) {
        rgb.g -= char_values[nombre[i]];
        if (rgb.g < 0) {
          rgb.r += 0 - rgb.g;
          rgb.g = 0;
        }
      } else if (rgb.r < 255 && rgb.g === 0 && rgb.b === 255) {
        rgb.r += char_values[nombre[i]];
        if (rgb.r > 255) {
          rgb.b -= rgb.r - 255;
          rgb.r = 255;
        }
      } else if (rgb.r === 255 && rgb.g === 0 && rgb.b < 255) {
        rgb.b -= char_values[nombre[i]];
        if (rgb.b < 0) {
          rgb.g += 0 - rgb.b;
          rgb.b = 0;
        }
      }
    }

    rgb.r = Math.trunc(rgb.r);
    rgb.g = Math.trunc(rgb.g);
    rgb.b = Math.trunc(rgb.b);
    console.log(rgb);

    primaryColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }

  function linearMultPrimaryColor() {
    let rgb = {
      r: 0,
      g: 0,
      b: 0
    }

    for (let i = 0; i < nombre.length; i++) {
      if (nombre[i] === " ") {
        continue;
      };

      rgb.r += char_values[nombre[i]][0],
      rgb.r = clampRGBValue(rgb.r);
      rgb.g += char_values[nombre[i]][1],
      rgb.g = clampRGBValue(rgb.g);
      rgb.b += char_values[nombre[i]][2],
      rgb.b = clampRGBValue(rgb.b);
    }

    console.log(rgb);
    primaryColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }

  function determinePrimaryColor() {
    let rgb = {
      r: 0,
      g: 0,
      b: 0
    };

    if (nombre.length === 1) {
      rgb.r += char_values[nombre];
      rgb.g += char_values[nombre];
      rgb.b += char_values[nombre];
      console.log(rgb);
      primaryColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      return;
    }

    if (nombre.length === 2) {
      rgb.r += char_values[nombre[0]];
      rgb.g += char_values[nombre[1]];
      rgb.b += char_values[nombre[0]] + char_values[nombre[1]];
      console.log(rgb);
      primaryColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      return;
    }

    let counter = 0;
    for (let i = 0; i < nombre.length; i++) {
      if (nombre[i] === " ") {
        continue;
      };

      counter += 1;
      if (counter === 1) {
        rgb.r += char_values[nombre[i]];
        rgb.r = clampRGBValue(rgb.r);
      } else if (counter === 2) {
        rgb.g += char_values[nombre[i]];
        rgb.g = clampRGBValue(rgb.g);
      } else {
        rgb.b += char_values[nombre[i]];
        rgb.b = clampRGBValue(rgb.b);
        counter = 0;
      }
    }
    console.log(rgb);
    primaryColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    return;
  }

  function clampRGBValue(value) {
    if (value < 255 && value >= 0) {
      return value;
    }

    if (value < 0) {
      return 0;
    }

    let res = value % nombre.length;
    return clampRGBValue(res);
  }

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
    /* background-color: rgb(180,3,241); */
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
    style="background-color: {primaryColor}"
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
      oninput={towerPrimaryColor}
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

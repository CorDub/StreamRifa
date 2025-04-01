<script>
  import {
    quarterfinalists,
    semifinalists,
    availableSemiSpots,
    eventBus } from "./sharedState.svelte";
  let {position} = $props();
  let ready = $state("");
  let name = $state("");

  eventBus.subscribe((value) => {
    if (value.type === "getReady" && value.position === position) {
      name = quarterfinalists[value.index]
      if (position === "left") {
        ready = "revealed-left"
      } else {
        ready = "revealed-right"
      }
    }
  });

  function chooseWinner() {
    const randomIndex = Math.floor(Math.random() * availableSemiSpots.length);
    const ind = availableSemiSpots[randomIndex];
    availableSemiSpots.filter(elem => elem !== availableSemiSpots[randomIndex]);
    semifinalists[ind] = name;
    eventBus.set({ind : ind, stage: "semifinal", nombre: name});
  }
</script>

<style>
  .contestant {
    transition: 2s;
    position: absolute;
    z-index: 2;
    border: 1px solid black;
    border-radius: 15px;
    padding: 1rem;
    display: flex;
    top: 50%;
  }

  .contestant:hover {
    cursor: pointer;
  }

  .left {
    left: -25%;
  }

  .revealed-left {
    transform: translateX(100vh)
  }

  .right {
    left: 125%;
  }

  .revealed-right {
    transform: translateX(-100vh)
  }

</style>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="contestant
  {ready ? ready : ''}
  {position === 'left' ? 'left' : 'right' }"
  onclick={chooseWinner}>
  <p>{name ? name : 'Gilles'}</p>
</div>

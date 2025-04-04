<script>
  import { onMount } from 'svelte';
  import {
    quarterfinalists,
    semifinalists,
    availableSemiSpots,
    finalists,
    eventBus } from "./sharedState.svelte";
  let {position} = $props();
  let ready = $state("");
  let name = $state("");
  let stage = $state("");
  let element;
  let halfWidth = $state(0);
  let halfHeight = $state(0);

  onMount(() => {
    halfWidth = element.getBoundingClientRect().width / 2;
    halfHeight = element.getBoundingClientRect().height / 2;
    element.style.setProperty('--halfWidth', halfWidth + "px");
    element.style.setProperty('--halfHeight', halfHeight + "px");
  })

  eventBus.subscribe((value) => {
    if (value.type === "getReady" && value.position === position) {
      if (value.stage === "quarterfinal") {
        name = quarterfinalists[value.index]
        if (position === "left") {
          ready = "revealed-left"
        } else {
          ready = "revealed-right"
        }
      } else if (value.stage === "semifinal") {
        stage = "semifinal";
        name = semifinalists[value.index]
        if (position === "left") {
          ready = "revealed-left"
        } else {
          ready = "revealed-right"
        }
      } else if (value.stage === "final") {
        stage = "final"
        name = finalists[value.index]
        if (position === "left") {
          ready = "revealed-left"
        } else {
          ready = "revealed-right"
        }
      }
    }
  });

  eventBus.subscribe((value) => {
    if (value.type === "retire") {
      ready = "";
    }
  })

  function chooseWinner() {

    if (stage === 'semifinal') {
      let ind;
      if (finalists[0] === "") {
        finalists[0] = name;
        ind = 0;
      } else {
        finalists[1] = name;
        ind = 1;
      }
      eventBus.set({ind : ind, stage: "final", nombre: name});
      eventBus.set({type: "readyForMatches"});
      eventBus.set({type: "retire"});
      return;
    } else if (stage === "final") {
      eventBus.set({type: "retire"});
      eventBus.set({type: "winner", winner: name});
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableSemiSpots.length);
    const ind = availableSemiSpots[randomIndex];
    availableSemiSpots.splice(randomIndex, 1);
    semifinalists[ind] = name;
    eventBus.set({ind : ind, stage: "semifinal", nombre: name});
    eventBus.set({type: "readyForMatches"});
    eventBus.set({type: "retire"});
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
    top: calc(50% - var(--halfHeight));
  }

  .contestant:hover {
    cursor: pointer;
  }

  .contestant p {
    font-size: 1.5em;
  }

  .left {
    left: calc(-25% - var(--halfWidth));
  }

  .revealed-left {
    transform: translateX(100vh)
  }

  .right {
    left: calc(125% - var(--halfWidth));
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
  onclick={chooseWinner}
  bind:this={element}>
  <p>{name ? name : 'Gilles'}</p>
</div>

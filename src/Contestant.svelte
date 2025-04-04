<script>
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

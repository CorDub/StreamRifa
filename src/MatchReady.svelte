<script>
  import { onMount } from "svelte";
  import { eventBus } from "./sharedState.svelte";
  let ready = $state('');
  let element;
  let halfWidth = $state(0);
  let halfHeight = $state(0);
  let availableStartingPositions = $state([0,2,4,6])

  onMount(() => {
    halfWidth = element.getBoundingClientRect().width / 2;
    halfHeight = element.getBoundingClientRect().height / 2;
    element.style.setProperty('--halfWidth', halfWidth + "px");
    element.style.setProperty('--halfHeight', halfHeight + "px");
  })

  eventBus.subscribe((value) => {
    if (value.type === "readyForMatches") {
      ready = value.type;
    }
  })

  function startMatch() {
    const randomIndex = Math.floor(Math.random() * availableStartingPositions.length);
    const ind = availableStartingPositions[randomIndex];
    const newASP = availableStartingPositions.filter(elem => elem !== availableStartingPositions[randomIndex]);
    availableStartingPositions = newASP;
    ready = "";

    eventBus.set({type:"getReady", index: ind, position: "left"});
    setTimeout(() => {
      eventBus.set({type:"getReady", index: ind + 1, position: "right"});
    }, 100);

  }
</script>

<style>
  .match-ready {
    position: absolute;
    z-index: 2;
    top: calc(-50% - var(--halfHeight));
    left: calc(50% - var(--halfWidth));
    border: 1px solid grey;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    transition: 2s;
    background-color: white;
  }

  .bring {
    transform: translateY(100vh);
  }

  .match-ready-button {
    border-radius: 15px;
    border: 1px solid grey;
  }
</style>

<div
  class="match-ready {ready === "readyForMatches" ? 'bring' : ''}"
  bind:this={element}>
  <p>Listo?</p>
  <button
    class="match-ready-button"
    onclick={startMatch}
    >Empezar</button>
</div>

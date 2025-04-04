<script>
  import { onMount } from "svelte";
  import { eventBus } from "./sharedState.svelte";
  let name = $state('');
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
    if (value.type === "winner") {
      name = value.winner;
    }
  })
</script>

<style>
  .winner {
    position: absolute;
    background-color: white;
    z-index: 4;
    top: calc(-50% - var(--halfHeight));
    left: calc(50% - var(--halfWidth));
    border: 1px solid black;
    border-radius: 15px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.5s;
  }

  .displayed {
    transform: translateY(100vh);
  }

  .winner-word {
    font-size: 2em;
  }

  .winner-name {
    font-size: 3em;
  }

</style>

<div class="winner
  {name ? 'displayed' : ''}"
  bind:this={element}>
  <div class="winner-word">
    <p>Winner</p>
  </div>
  <div class="winner-name">
    <p>{name}</p>
  </div>
</div>

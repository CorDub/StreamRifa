<script>
  import { eventBus } from "./sharedState.svelte";
  let name = $state('');

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
    top: -50%;
    left: 50%;
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
  {name ? 'displayed' : ''}">
  <div class="winner-word">
    <p>Winner</p>
  </div>
  <div class="winner-name">
    <p>{name}</p>
  </div>
</div>

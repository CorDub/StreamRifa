<script>
  import InputFinalists from "./InputFinalists.svelte";
  import Bracket from "./Bracket.svelte";
  import GlassPanel from "./GlassPanel.svelte"
</script>

<svelte:head>
  <style>
    html, body, #app {
      height: 100vh;
      margin: 0;
    }
  </style>
</svelte:head>

<div id="app">
  <InputFinalists />
  <GlassPanel />
  <Bracket />
</div>

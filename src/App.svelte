<script>
  import InputFinalists from "./InputFinalists.svelte";
  import Bracket from "./Bracket.svelte";
  import GlassPanel from "./GlassPanel.svelte";
  import MatchReady from "./MatchReady.svelte";
  import Contestant from "./Contestant.svelte";
  import Winner from "./Winner.svelte";
</script>

<svelte:head>
  <style>
    html, body, #app {
      height: 100vh;
      margin: 0;
      overflow: hidden;
    }
  </style>
</svelte:head>

<div id="app">
  <InputFinalists />
  <GlassPanel />
  <Bracket />
  <MatchReady />
  <Contestant position="left"/>
  <Contestant position="right"/>
  <Winner />
</div>

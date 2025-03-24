<script>
  import OneOnOne from "./OneOnOne.svelte";

  // let positions = Array.from({length: 14})
  // for (let i = 0; i < positions.length; i++) {
  //   positions[i] = i
  // }
</script>

<style>
  .bracket {
    height: 100%;
    width: 100%;
    display: flex;
  }

  .bracket-half {
    border: 1px solid black;
    width: 50%;
    display: flex;
  }

  .bracket-third {
    border: 1px solid black;
    width: 33.3%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .bracket-corner {
    border: 1px solid black;
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

</style>

<div class="bracket">
  <div class="bracket-half">
    <div class="bracket-third">
      <div class="bracket-corner">
        <div class="bracket-corner">
          <OneOnOne position={0} />
        </div>
        <div class="bracket-corner">
          <OneOnOne position={1} />
        </div>
      </div>

      <div class="bracket-corner">
        <div class="bracket-corner">
          <OneOnOne position={2} />
        </div>
        <div class="bracket-corner">
          <OneOnOne position={3} />
        </div>
      </div>
    </div>

    <div class="bracket-third">
      <div class="bracket-corner">
        <OneOnOne position={"semi-final1"} />
      </div>
      <div class="bracket-corner">
        <OneOnOne position={"semi-final2"} />
      </div>
    </div>

    <div class="bracket-third">
      <OneOnOne position={"final1"} />
    </div>
  </div>

  <div class="bracket-half">
    <div class="bracket-third">
      <OneOnOne position={"final1"} />
    </div>

    <div class="bracket-third">
      <div class="bracket-corner">
        <OneOnOne position={"semi-final3"} />
      </div>
      <div class="bracket-corner">
        <OneOnOne position={"semi-final4"} />
      </div>
    </div>

    <div class="bracket-third">
      <div class="bracket-corner">
        <div class="bracket-corner">
          <OneOnOne position={4} />
        </div>
        <div class="bracket-corner">
          <OneOnOne position={5} />
        </div>
      </div>

      <div class="bracket-corner">
        <div class="bracket-corner">
          <OneOnOne position={6} />
        </div>
        <div class="bracket-corner">
          <OneOnOne position={7} />
        </div>
      </div>
    </div>
  </div>
</div>

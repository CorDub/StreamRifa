<script>
  import OneOnOne from "./OneOnOne.svelte";
</script>

<style>
  .bracket {
    height: 100%;
    width: 100%;
    display: flex;
  }

  .bracket-half {
    width: 50%;
    display: flex;
  }

  .bracket-third {
    width: 33.3%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .bracket-corner {
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

<script lang="ts">
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types";
  import Chart from "chart.js/auto";

  export let data: PageData;

  let ctx: HTMLCanvasElement | undefined;
  let chart: Chart | undefined;

  let showAge = true;
  let showWeight = true;
  let showHeight = true;
  let chartType: "line" | "bar" = "line";

  $: if (ctx) {
    if (chart) {
      chart.destroy();
    }

    chart = new Chart(ctx, {
      type: chartType,
      data: {
        labels: data.users.map((user) => `${user.firstName} ${user.lastName}`),
        datasets: [
          {
            label: "User's age",
            data: data.users.map(({ age }) => age),
            borderWidth: 2,
            hidden: !showAge,
          },
          {
            label: "User's height",
            data: data.users.map(({ height }) => height),
            borderWidth: 2,
            hidden: !showHeight,
          },
          {
            label: "User's weight",
            data: data.users.map(({ weight }) => weight),
            borderWidth: 2,
            hidden: !showWeight,
            indexAxis: "x",
          },
        ],
      },
      options: {
        animation: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
</script>

<div class="canvas-container">
  {#key [showAge, showHeight, showWeight, chartType]}
    <canvas bind:this={ctx} width="100" height="50" in:fade></canvas>
  {/key}
</div>

<div>
  <select bind:value={chartType}>
    <option value="line">Line</option>
    <option value="bar">Bar</option>
  </select>
</div>

<div>
  <label for="age">
    <input type="checkbox" bind:checked={showAge} id="age" />
    <span>Show age</span>
  </label>
</div>

<div>
  <label for="height">
    <input type="checkbox" bind:checked={showHeight} id="height" />
    <span>Show height</span>
  </label>
</div>

<div>
  <label for="weight">
    <input type="checkbox" bind:checked={showWeight} id="weight" />
    <span>Show Weight</span>
  </label>
</div>

{#if ctx}
  <a href={ctx.toDataURL()} target="_blank" download="graph.png">
    Open graph png
  </a>
{/if}

<style>
  .canvas-container {
    width: 700px;
  }
</style>

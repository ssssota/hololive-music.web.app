<script lang="ts">
  export let color: string;

  const baseSize = 100;
  const size = baseSize * 0.4;
  const half = baseSize * 0.5;
  const cos60 = size * Math.cos(Math.PI / 3);
  const sin60 = size * Math.sin(Math.PI / 3);

  let right = `${half + size},${half}`;
  $: right = `${half + size},${half}`;
  let top = `${half - cos60},${half - sin60}`;
  $: top = `${half - cos60},${half - sin60}`;
  let bottom = `${half - cos60},${half + sin60}`;
  $: bottom = `${half - cos60},${half + sin60}`;
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {baseSize} {baseSize}">
  <path
    d="M {right} {top} {bottom} z"
    fill={color}
    stroke-width={size / 2}
    stroke={color}
    stroke-linejoin="round"
    stroke-linecap="round"
  />
</svg>

<style>
  svg {
    width: 100%;
    height: 100%;
  }
</style>

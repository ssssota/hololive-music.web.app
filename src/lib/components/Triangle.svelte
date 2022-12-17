<script lang="ts" context="module">
  const baseSize = 100;
  const size = baseSize * 0.4;
  const half = baseSize * 0.5;
  const cos60 = size * Math.cos(Math.PI / 3);
  const sin60 = size * Math.sin(Math.PI / 3);

  const right = `${half + size},${half}`;
  const top = `${half - cos60},${half - sin60}`;
  const bottom = `${half - cos60},${half + sin60}`;
</script>

<script lang="ts">
  export let color: string;
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

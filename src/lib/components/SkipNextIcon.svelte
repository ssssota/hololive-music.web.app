<script lang="ts" context="module">
  const baseSize = 100;
  const unit = baseSize / 10;
  const size = baseSize * 0.4;
  const half = baseSize * 0.5;
  const cos60 = size * Math.cos(Math.PI / 3);
  const sin60 = size * Math.sin(Math.PI / 3);

  const right = `${half - unit + size},${half}`;
  const top = `${half - unit - cos60},${half - sin60}`;
  const bottom = `${half - unit - cos60},${half + sin60}`;
  const rightTop = `${half + size},${half - sin60}`;
  const rightBottom = `${half + size},${half + sin60}`;
</script>

<script lang="ts">
  export let color: string;
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {baseSize} {baseSize}">
  <path
    d="M {right} {top} {bottom} z"
    fill={color}
    stroke-width={unit * 1.5}
    stroke={color}
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <path
    d="M {rightTop} {rightBottom}"
    stroke-width={unit * 1.5}
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

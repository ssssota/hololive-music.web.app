<script lang="ts" context="module">
  const baseSize = 100;
  const size = baseSize * 0.45;
  const half = baseSize * 0.5;
  const unit = baseSize / 10;
  const cos60 = size * Math.cos(Math.PI / 4);
  const sin60 = size * Math.sin(Math.PI / 4);

  // left side rectangle
  const leftLeftTop = `${half - cos60},${half - sin60}`;
  const leftLeftBottom = `${half - cos60},${half + sin60}`;
  const leftRightTop = `${half - cos60 + unit},${half - sin60}`;
  const leftRightBottom = `${half - cos60 + unit},${half + sin60}`;

  // right side rectangle
  const rightRightBottom = `${half + cos60},${half + sin60}`;
  const rightRightTop = `${half + cos60},${half - sin60}`;
  const rightLeftTop = `${half + cos60 - unit},${half - sin60}`;
  const rightLeftBottom = `${half + cos60 - unit},${half + sin60}`;
</script>

<script lang="ts">
  export let color: string;
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {baseSize} {baseSize}">
  <path
    d="M {leftLeftTop} {leftLeftBottom} {leftRightBottom} {leftRightTop} z"
    fill={color}
    stroke-width={size / 2}
    stroke={color}
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <path
    d="M {rightRightBottom} {rightRightTop} {rightLeftTop} {rightLeftBottom} z"
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

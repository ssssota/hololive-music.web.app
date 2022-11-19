<script lang="ts" context="module">
  const baseSize = 100;
  const size = baseSize * 0.45;
  const inset = baseSize * 0.25;
  const half = baseSize * 0.5;
  const rad2PI = Math.PI * 2;
  const radHalfPI = Math.PI / 2;
  const pointCount = 5;
  const radFifthPI = rad2PI / pointCount;
  const points = Array(pointCount)
    .fill(0)
    .map((_, i) => {
      const angle = -radHalfPI + radFifthPI * i;
      const edge = [
        half + size * Math.cos(angle),
        half + size * Math.sin(angle),
      ];
      const insetAngle = -radHalfPI + radFifthPI * (i + 0.5);
      const insetEdge = [
        half + inset * Math.cos(insetAngle),
        half + inset * Math.sin(insetAngle),
      ];
      return [edge.join(','), insetEdge.join(',')].join(' ');
    });
</script>

<script lang="ts">
  export let color: string;
  export let filled = false;
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {baseSize} {baseSize}">
  <path
    d="M {points.join(' ')} z"
    fill={filled ? color : 'none'}
    stroke-width={size / 4}
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

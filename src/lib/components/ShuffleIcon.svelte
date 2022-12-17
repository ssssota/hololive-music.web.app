<script lang="ts" context="module">
  const baseSize = 100;
  const unit = baseSize / 10;
  const path = (
    [
      [
        [1, 2],
        [2, 2],
        [3, 3],
      ],
      [
        [6, 7],
        [7, 8],
        [8, 8],
      ],
      [
        [1, 8],
        [2, 8],
        [3, 7],
        [6, 3],
        [7, 2],
        [8, 2],
      ],
      [
        [8, 1],
        [9, 2],
        [8, 3],
      ],
      [
        [8, 9],
        [9, 8],
        [8, 7],
      ],
    ] as const
  )
    .map((paths) => {
      return `M ${paths.map(([x, y]) => `${x * unit},${y * unit}`).join(' ')}`;
    })
    .join(' ');
</script>

<script lang="ts">
  export let color: string;
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {baseSize} {baseSize}">
  <path
    d={path}
    fill={color}
    stroke-width={baseSize / 6}
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

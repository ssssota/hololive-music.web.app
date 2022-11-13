<script lang="ts">
  import type { PageServerData } from './$types';
  export let data: PageServerData;
</script>

<article>
  <h1>Hololive music</h1>
  <pre>{JSON.stringify(data, undefined, 2)}</pre>
</article>

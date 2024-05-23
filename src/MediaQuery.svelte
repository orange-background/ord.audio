<script>
  import { onMount } from "svelte";

  export let query;

  let mql;
  let mqlListener;
  let wasMounted = false;
  let render = false;

  onMount(() => {
    wasMounted = true;
    return () => {
      removeActiveListener();
    };
  });

  $: {
    if (wasMounted) {
      removeActiveListener();
      addNewListener(query);
    }
  }

  function addNewListener(query) {
    mql = window.matchMedia(query);
    mqlListener = (v) => (render = v.matches);
    mql.addListener(mqlListener);
    render = mql.matches;
  }

  function removeActiveListener() {
    if (mql && mqlListener) {
      mql.removeListener(mqlListener);
    }
  }
</script>

<slot {render} />

<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { WithElementRef } from "bits-ui";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLUListElement>, HTMLUListElement> = $props();
</script>

<ul
	bind:this={ref}
	data-sidebar="menu"
	class={cn("flex w-full min-w-0 flex-row content-center gap-1 justify-between", className)}
	{...restProps}
>
	{@render children?.()}
</ul>

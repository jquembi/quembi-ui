<script setup lang="ts">
withDefaults(defineProps<{ elevated?: boolean }>(), { elevated: false });
</script>
<template><div :class="['rounded-2xl border border-slate-200 bg-white p-5 text-slate-900', elevated && 'shadow-xl shadow-slate-900/5']"><slot /></div></template>

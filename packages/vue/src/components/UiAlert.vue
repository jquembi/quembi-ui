<script setup lang="ts">
import { computed } from 'vue';
type Tone = 'info' | 'success' | 'warning' | 'danger';
const props = withDefaults(defineProps<{ tone?: Tone; title: string }>(), { tone: 'info' });
const classes = computed(() => ({ info: 'border-blue-200 bg-blue-50 text-blue-950', success: 'border-emerald-200 bg-emerald-50 text-emerald-950', warning: 'border-amber-200 bg-amber-50 text-amber-950', danger: 'border-rose-200 bg-rose-50 text-rose-950' })[props.tone]);
const symbol = computed(() => ({ info: 'ⓘ', success: '✓', warning: '!', danger: '×' })[props.tone]);
</script>
<template><div :role="tone === 'danger' ? 'alert' : 'status'" :class="['flex gap-3 rounded-xl border p-4 text-sm', classes]"><span aria-hidden="true" class="mt-0.5 shrink-0">{{ symbol }}</span><div><p class="font-semibold">{{ title }}</p><div class="mt-1 opacity-80"><slot /></div></div></div></template>

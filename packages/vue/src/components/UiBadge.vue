<script setup lang="ts">
import { computed } from 'vue';
type Tone = 'neutral' | 'violet' | 'success' | 'warning' | 'danger';
const props = withDefaults(defineProps<{ tone?: Tone; dot?: boolean }>(), { tone: 'neutral', dot: false });
const toneClass = computed(() => ({ neutral: 'bg-slate-100 text-slate-700 ring-slate-200', violet: 'bg-violet-50 text-violet-700 ring-violet-200', success: 'bg-emerald-50 text-emerald-700 ring-emerald-200', warning: 'bg-amber-50 text-amber-700 ring-amber-200', danger: 'bg-rose-50 text-rose-700 ring-rose-200' })[props.tone]);
</script>
<template><span :class="['inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset', toneClass]"><span v-if="dot" aria-hidden="true" class="size-1.5 rounded-full bg-current"/><slot /></span></template>

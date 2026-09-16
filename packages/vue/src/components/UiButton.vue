<script setup lang="ts">
import { computed } from 'vue';
type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';
const props = withDefaults(defineProps<{ variant?: Variant; size?: Size; loading?: boolean; disabled?: boolean; type?: 'button' | 'submit' | 'reset' }>(), { variant: 'primary', size: 'md', type: 'button' });
const classes = computed(() => ({
  primary: 'bg-violet-600 text-white hover:bg-violet-500 shadow-sm shadow-violet-500/20',
  secondary: 'bg-slate-900 text-white hover:bg-slate-700',
  outline: 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50',
  ghost: 'text-slate-700 hover:bg-slate-100',
  danger: 'bg-rose-600 text-white hover:bg-rose-500',
})[props.variant]);
const sizing = computed(() => ({ sm: 'h-8 px-3 text-xs', md: 'h-10 px-4 text-sm', lg: 'h-12 px-5 text-base' })[props.size]);
</script>
<template>
  <button :type="type" :disabled="disabled || loading" :aria-busy="loading || undefined"
    :class="['inline-flex shrink-0 items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-300 disabled:cursor-not-allowed disabled:opacity-50', classes, sizing]">
    <svg v-if="loading" aria-hidden="true" class="size-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity=".3" stroke-width="3"/><path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg><slot />
  </button>
</template>

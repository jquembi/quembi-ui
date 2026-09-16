<script setup lang="ts">
import UiButton from './UiButton.vue';
withDefaults(defineProps<{ name: string; price: string; description: string; features: string[]; featured?: boolean; actionLabel?: string }>(), { featured: false, actionLabel: 'Começar' });
const emit = defineEmits<{ action: [] }>();
</script>
<template><article :class="['rounded-2xl border bg-white p-6 text-slate-900 shadow-sm', featured ? 'border-violet-500 ring-4 ring-violet-100' : 'border-slate-200']"><p class="text-sm font-semibold text-violet-700">{{ name }}</p><div class="mt-3 text-3xl font-bold tracking-tight">{{ price }}</div><p class="mt-2 min-h-10 text-sm text-slate-500">{{ description }}</p><ul class="my-6 space-y-3"><li v-for="feature in features" :key="feature" class="flex gap-2 text-sm"><span aria-hidden="true" class="text-emerald-600">✓</span>{{ feature }}</li></ul><UiButton :variant="featured ? 'primary' : 'outline'" class="w-full" @click="emit('action')">{{ actionLabel }}</UiButton><slot name="footer" /></article></template>

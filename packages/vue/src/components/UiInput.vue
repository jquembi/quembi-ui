<script setup lang="ts">
import { computed, useId } from 'vue';
const props = defineProps<{ label: string; modelValue?: string; id?: string; type?: string; placeholder?: string; required?: boolean; hint?: string; error?: string }>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
const generatedId = useId();
const inputId = computed(() => props.id ?? generatedId);
const descriptionId = computed(() => `${inputId.value}-description`);
</script>
<template><div class="flex w-full flex-col gap-1.5 text-sm"><label :for="inputId" class="font-medium text-slate-800">{{ label }}<span v-if="required" aria-hidden="true" class="ml-1 text-rose-600">*</span></label>
  <input :id="inputId" :type="type ?? 'text'" :value="modelValue" :placeholder="placeholder" :required="required" :aria-invalid="!!error || undefined" :aria-describedby="error || hint ? descriptionId : undefined"
    :class="['h-11 w-full rounded-xl border bg-white px-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100', error ? 'border-rose-500' : 'border-slate-300']"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
  <p v-if="error || hint" :id="descriptionId" :class="['text-xs', error ? 'text-rose-600' : 'text-slate-500']">{{ error || hint }}</p></div></template>

# @quembi-ui/vue

Componentes Vue 3 source-first, Tailwind CSS 4. **Ainda não publicado no npm**. Para consumir ficheiros `.vue` é necessário o plugin Vue no build da aplicação. Os exemplos abaixo destinam-se ao uso deste pacote num monorepo ou após copiar o código-fonte.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { UiButton, UiBadge, UiInput } from '@quembi-ui/vue';
const email = ref('');
</script>
<template>
  <UiBadge tone="success">Activo</UiBadge>
  <UiInput v-model="email" label="E-mail" type="email" />
  <UiButton>Guardar</UiButton>
</template>
```

Carregue Tailwind CSS 4 no projecto e configure `@source` para a pasta `packages/vue/src`; veja `docs/ARCHITECTURE.md`. MIT aplica-se ao código Free, não ao Premium.

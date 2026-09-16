# @quembi-ui/react

Biblioteca **source-first** de componentes React + Tailwind CSS 4. Ainda não publicada no npm. O pacote é utilizado directamente pelo website dentro do monorepo via npm workspaces.

```tsx
import { Button, Badge, Input } from '@quembi-ui/react';

export function Example() {
  return <div className="space-y-3"><Badge tone="success">Activo</Badge><Input label="E-mail" type="email" /><Button>Guardar</Button></div>;
}
```

A aplicação consumidora deve carregar Tailwind CSS 4 e indicar a pasta desta biblioteca para detecção de classes, por exemplo em `src/styles.css`: `@import "tailwindcss"; @source "../../../packages/react/src";` (ajuste o caminho ao projecto). Componentes estão licenciados sob MIT; código Premium não está incluído.

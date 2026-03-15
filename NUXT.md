# Arquitetura do Cliente — Nuxt

Este projeto usa **Nuxt** com arquitetura **modular orientada a domínio**, com `srcDir: "src/"` e separação de responsabilidades entre `core`, `modules`, `pages`, `components`, `composables` e `stores`.

Objetivos principais:

- escalabilidade por domínio
- manutenção previsível
- contratos tipados de API
- SEO e metadados com Nuxt
- internacionalização desde o início

---

# Estrutura Oficial

```
src/
 ├ app.vue
 ├ pages/
 │   └ index.vue
 │
 ├ core/
 │   ├ api/
 │   │   └ http-client.ts
 │   ├ config/
 │   │   └ runtime.config.ts
 │   ├ plugins/
 │   │   └ vue-query.ts
 │   ├ middleware/
 │   │   └ auth.global.ts
 │   ├ utils/
 │   │   └ date.util.ts
 │   └ types/
 │       └ pagination.type.ts
 │
 ├ modules/
 │   ├ auth/
 │   │   ├ stores/
 │   │   │   └ auth.store.ts
 │   │   └ types.ts
 │   │
 │   └ users/
 │       ├ components/
 │       │   └ users-workbench.vue
 │       ├ composables/
 │       │   └ use-users.composable.ts
 │       ├ repository/
 │       │   └ users.repository.ts
 │       ├ stores/
 │       │   └ users.store.ts
 │       ├ dto/
 │       │   ├ list-users.request.dto.ts
 │       │   └ list-users.response.dto.ts
 │       └ types.ts
 │
 ├ components/
 │   └ app-shell.vue
 ├ composables/
 │   └ use-locale-switcher.composable.ts
 ├ stores/
 │   └ app.store.ts
 ├ i18n/
 │   └ locales/
 │       ├ pt.json
 │       ├ en.json
 │       └ es.json
 └ assets/
     └ css/
         └ main.css
```

---

# Stack Oficial

Base:

- Nuxt + Vue + TypeScript
- Nuxt UI
- Tailwind CSS v4

Estado e dados:

- Pinia
- Vue Query (TanStack Query)

Produtividade e validação:

- VueUse
- Zod
- Dayjs

SEO e i18n:

- Nuxt SEO
- Nuxt i18n

Componentes e UX avançada:

- TanStack Table
- ECharts + vue-echarts
- Tiptap
- Fuse.js
- Vue Draggable Plus

---

# Internacionalização

Idiomas iniciais suportados:

- Português (`pt`, padrão)
- English (`en`)
- Español (`es`)

Configuração:

- `strategy: "no_prefix"`
- `vueI18n: "./i18n.config.ts"` com mensagens `pt/en/es`
- seleção de idioma no frontend

---

# Convenções de Arquitetura

- Regras de domínio ficam em `modules/<dominio>`
- Páginas em `pages/` orquestram módulos e SEO
- Lógica de negócio em `composables`
- Chamadas de API em `repository`
- Contratos explícitos via DTO de request/response
- Estado compartilhado em `stores` (global ou por módulo)
- `core` concentra infraestrutura reutilizável

Fluxo padrão:

```
Page
 ↓
Composable
 ↓
Repository
 ↓
API
```

Fluxo com contrato:

```
Page
 ↓
Composable
 ↓
Repository
 ↓
Request DTO -> API -> Response DTO
 ↓
Mapeamento para tipos de domínio/UI
```

---

# Decisões de Configuração do Nuxt

- `srcDir` aponta para `src/`
- `runtimeConfig.public.apiBase` centraliza URL base da API
- `plugins` registra Vue Query globalmente
- `imports.dirs` inclui composables/stores de módulos
- `components` inclui componentes globais e de módulos

---

# Próximos passos recomendados

- criar módulo `analytics` para telemetria e eventos
- criar módulo `billing` com DTOs explícitos
- adicionar testes unitários para composables e repositories
- adicionar testes de contrato para validações Zod

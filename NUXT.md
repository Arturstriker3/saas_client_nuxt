# Arquitetura do Cliente — Nuxt

Este projeto usa **Nuxt** com arquitetura **modular orientada a domínio**, com `srcDir: "app/"` e separação de responsabilidades entre `core`, `modules`, `pages`, `components`, `composables` e `stores`.

Objetivos principais:

- escalabilidade por domínio
- manutenção previsível
- contratos tipados de API
- metadados com Nuxt em arquitetura client-only
- internacionalização desde o início

---

# Estrutura Oficial

```
app/
 ├ app.vue
 ├ app.config.ts
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
 │   │   ├ date.util.ts
 │   │   └ parse-api-error.util.ts
 │   └ types/
 │       └ pagination.type.ts
 │
 ├ modules/
 │   ├ auth/
 │   │   ├ repository/
 │   │   │   └ auth.repository.ts
 │   │   ├ queries/
 │   │   │   ├ auth.keys.ts
 │   │   │   └ use-me.query.ts
 │   │   ├ mutations/
 │   │   │   ├ use-login.mutation.ts
 │   │   │   ├ use-register-and-sign-in.mutation.ts
 │   │   │   ├ use-complete-google-oauth.mutation.ts
 │   │   │   └ use-logout.mutation.ts
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
 │   ├ app-icon-preload.vue
 │   └ app-shell.vue
 ├ composables/
 │   ├ use-app-toast.composable.ts
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
- Nuxt Fonts
- Nuxt Icon
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

Princípios gerais:

- TanStack Query é a fonte de verdade para server state
- Pinia é usado para client/UI state
- Repository fica responsável por comunicação com API, validação DTO e mapeamento
- Query/Mutation orquestra estado assíncrono
- UI consome hooks, sem lógica de API no componente

Regra de ouro:

| Tipo de estado | Ferramenta     |
| -------------- | -------------- |
| Dados da API   | TanStack Query |
| Sessão (user)  | TanStack Query |
| Estado de UI   | Pinia          |
| Estado local   | ref/computed   |

Padrões por tipo de operação:

- GET deve usar `useQuery`
- POST/PUT/DELETE deve usar `useMutation`
- Após mutações relevantes, invalidar queries relacionadas
- Evitar strings soltas em query key; centralizar keys por domínio

Exemplo de query key por domínio:

```ts
export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};
```

Estrutura recomendada por módulo:

```bash
modules/
  auth/
    repository/
    queries/
      auth.keys.ts
      use-me.query.ts
    mutations/
      use-login.mutation.ts
      use-register-and-sign-in.mutation.ts
      use-complete-google-oauth.mutation.ts
      use-logout.mutation.ts
```

Camadas:

- `core/api/http-client.ts` centraliza auth header, refresh token, interceptors e tratamento global de erro
- `repository` valida payload de entrada, chama endpoint e faz parse/mapeamento de DTO
- `queries` e `mutations` encapsulam loading/error/success e sincronização de cache

Sessão do usuário:

- A fonte de verdade de sessão é a query `me`
- Store de sessão, quando existir, deve ser apenas espelho opcional
- Login/register/oauth deve pré-carregar `me` com `fetchQuery` e `staleTime`
- Logout deve limpar cache de sessão com `removeQueries(authKeys.me())`

Prefetch para rotas privadas:

```ts
await queryClient.prefetchQuery({
  queryKey: authKeys.me(),
  queryFn: getMe,
});
```

Padronização de erros:

```ts
function parseApiError(error: unknown): AppError;
```

```ts
onError: (error) => {
  const parsed = parseApiError(error);
};
```

Padrão de feedback visual:

```ts
const appToast = useAppToast();
```

```ts
onSuccess: () => {
  appToast.success({ title: "Operação concluída" });
};
onError: (error) => {
  appToast.apiError(error, { title: "Falha na operação" });
};
```

- Todos os títulos/descrições de toast devem usar i18n (`auth.toasts.*` e `auth.errors.*`)
- Detalhe técnico de erro (ex: `[POST] /auth/login ...`) fica oculto por padrão
- Para debug manual, ativar `NUXT_PUBLIC_SHOW_TECHNICAL_API_ERRORS=true`

Política de cache:

- Definir `staleTime` e `gcTime` por domínio
- Evitar defaults genéricos para toda aplicação

---

# Decisões de Configuração do Nuxt

- `srcDir` aponta para `app/`
- `ssr: false` define execução client-only sem runtime SSR no servidor
- `nitro.preset: "static"` gera saída estática para deploy sem processo Node do Nuxt
- `runtimeConfig.public.apiBase` centraliza URL base da API
- `plugins` registra Vue Query globalmente
- `imports.dirs` inclui composables/stores de módulos
- `components` inclui componentes globais e de módulos
- `app.config.ts` centraliza tokens de tema e branding
- Ícones críticos de navegação e idioma são pré-carregados no bootstrap para evitar atraso visual em sidebar/dropdowns

---

# Próximos passos recomendados

- criar módulo `analytics` para telemetria e eventos
- criar módulo `billing` com DTOs explícitos
- adicionar testes unitários para composables e repositories
- adicionar testes de contrato para validações Zod

# LearnFlix

> Aplicativo mobile educacional desenvolvido com React Native, Expo e Firebase para centralizar informações acadêmicas em uma única plataforma.

O **LearnFlix** é um aplicativo desenvolvido inicialmente como projeto acadêmico da disciplina **Desenvolvimento Front-End com Frameworks** e posteriormente aprimorado para compor meu portfólio pessoal. O objetivo do projeto é permitir que estudantes acompanhem disciplinas, módulos, conteúdos, notas, frequência, histórico escolar e informações do perfil em uma interface moderna e intuitiva.

---

## Objetivo

- O objetivo do LearnFlix é reunir, em um aplicativo mobile, funcionalidades voltadas ao acompanhamento acadêmico de estudantes, como disciplinas, módulos, conteúdos, notas, frequência, histórico escolar e perfil.

- O projeto foi iniciado em contexto acadêmico, durante a disciplina Desenvolvimento Front-End com Frameworks, e depois aprimorado de forma independente para portfólio, com foco em React Native, Expo, Firebase, navegação mobile, Context API, notificações e uso da câmera do dispositivo.

---

## Tecnologias utilizadas

| Tecnologia              | Descrição               |
| ----------------------- | ----------------------- |
| React Native            | Desenvolvimento Mobile  |
| Expo SDK 54             | Plataforma de execução  |
| React Navigation        | Navegação               |
| Firebase Authentication | Autenticação e controle |
| React Hook Form         | Gerenciamento/validação |
| Context API             | Tema global             |
| Expo Image Picker       | Câmera ou galeria       |
| Expo Notifications      | Notificações locais     |
| AsyncStorage            | Persistência local      |
| Expo Linear Gradient    | Gradientes na UI        |
| Ionicons                | Ícones                  |
| JSON local              | Dados simulados         |
| JavaScript (JSX)        | Linguagem principal     |

---

## Funcionalidades

- **Autenticação** — login com e-mail e senha via Firebase Auth; controle de acesso às telas internas
- **Disciplinas** — listagem em cards com navegação para os módulos da disciplina
- **Módulos** — cards de módulos com acesso ao conteúdo completo
- **Conteúdos** — tela dedicada de leitura do conteúdo do módulo
- **Notas** — visualização das notas por disciplina
- **Frequência** — acompanhamento de presença por disciplina
- **Histórico Escolar** — resumo do desempenho acadêmico
- **Perfil** — exibição dos dados do usuário logado com alteração de foto de perfil
- **Câmera nativa** — uso do Expo Image Picker com tratamento de permissões específico para iOS e Android (`Platform.OS`)
- **Tema claro/escuro** — alternável globalmente via `ModoProvider` (Context API)
- **Notificação local** — agendada via Expo Notifications com controle por AsyncStorage para não repetir

---

## Destaques técnicos

- **Context API** para propagação do tema em toda a árvore de componentes sem prop drilling
- **Firebase Auth** para autenticação segura, com fluxo de login e redirecionamento por navigator
- **Expo Image Picker** com tratamento diferenciado de permissões por plataforma (`Platform.OS`)
- **Expo Notifications** com agendamento e verificação via `AsyncStorage` para controle de estado persistido
- **Organização modular**: `screens`, `components`, `context`, `data`, `infra` e `navigation` separados por responsabilidade
- **Evolução incremental** seguindo backlog de requisitos — de protótipo web a app mobile nativo

---

## Estrutura do projeto

```
mobile/
├── App.jsx                        # Entrada principal
├── index.js / index.jsx           # Registro do app
├── app.json                       # Configuração Expo
├── babel.config.js
├── metro.config.js
├── assets/                        # Ícones e splash screen
└── src/
    ├── components/
    │   ├── DisciplineCard.jsx      # Card de disciplina
    │   └── ModuleCard.jsx          # Card de módulo
    ├── context/
    │   └── modo.jsx                # Contexto global de tema (claro/escuro)
    ├── data/
    │   ├── disciplinas.json
    │   ├── modulos.json
    │   ├── notas.json
    │   ├── frequencia.json
    │   └── historicoEscolar.json
    ├── infra/
    │   └── firebase.js             # Configuração e exportação do Firebase
    ├── navigation/
    │   └── AppNavigator.jsx        # Stack Navigator + Tab Navigator
    └── screens/
        ├── LoginScreen.jsx
        ├── DisciplinasScreen.jsx
        ├── ModulosScreen.jsx
        ├── VerConteudoScreen.jsx
        ├── NotasScreen.jsx
        ├── FrequenciaScreen.jsx
        ├── HistoricoEscolarScreen.jsx
        └── PerfilScreen.jsx
```

---

## Navegação

```
Stack Navigator
├── Login
└── Tabs
    ├── Disciplinas
    │   └── Módulos
    │       └── Ver Conteúdo
    └── Perfil
        ├── Notas
        ├── Frequência
        └── Histórico Escolar
```

---


## Configuração do Firebase

As credenciais estão em `src/infra/firebase.js`. Para usar seu próprio projeto Firebase, substitua o objeto `firebaseConfig` pelas configurações do seu console em [console.firebase.google.com](https://console.firebase.google.com).

> Em produção, recomenda-se utilizar variáveis de ambiente (ex.: via `.env` com `expo-constants`) e configurar corretamente as **Regras de Segurança** do Firebase.

---

## Dados do projeto

Os dados educacionais (disciplinas, módulos, notas, frequência e histórico escolar) são simulados em arquivos JSON locais em `src/data/`. O foco do projeto está na interface, na navegação, na autenticação e nas funcionalidades acadêmicas — não na integração com um backend de dados real.

---

## Competências demonstradas

* React Native
* Expo
* React Navigation
* Firebase Authentication
* Context API
* React Hook Form
* Expo Image Picker
* Expo Notifications
* AsyncStorage
* Desenvolvimento Mobile
* Gerenciamento de estado global
* Tratamento de permissões para iOS e Android
* Navegação Stack e Bottom Tabs
* Desenvolvimento incremental inspirado em Scrum

---

## Metodologia

O projeto foi desenvolvido de forma incremental durante os Testes de Performance da disciplina Desenvolvimento Front-End com Frameworks, utilizando conceitos inspirados em Scrum, incluindo:

* Histórias de usuário;
* Backlog priorizado;
* Revisão de requisitos;
* Entregas incrementais;
* Evolução contínua do produto.

---

## Como executar

**Pré-requisitos:** Node.js 18+ e o app [Expo Go](https://expo.dev/go) no celular (ou emulador).

```bash
cd mobile
npm install
npx expo start
```

Escaneie o QR Code exibido no terminal com o Expo Go (Android) ou a câmera (iOS) para abrir o app no dispositivo.

```bash
# Ou rode diretamente em plataformas específicas:
npx expo start --android
npx expo start --ios
npx expo start --web
```

---

## Autor

**Rainer Sacks De Almeida Caram Jaime**

Engenharia de Software • React Native • Firebase

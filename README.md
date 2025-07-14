# 🎓 EduPortal — Sistema Educacional Full Stack

![Status](https://img.shields.io/badge/status-online-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/frontend-React.js-blue)
![Node.js](https://img.shields.io/badge/backend-Node.js-green)
![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-blueviolet)

**EduPortal** é uma plataforma educacional full stack moderna, responsiva e 100% funcional. Ideal para demonstrar competências em autenticação, controle de acesso, dashboards dinâmicos e usabilidade para múltiplos perfis.

🔗 **Projeto em Produção:**  
👉 [https://fabulous-mooncake-afc58b.netlify.app](https://fabulous-mooncake-afc58b.netlify.app)

---

## 📸 Demonstrações Visuais

| Tela de Login                    | Dashboard Estudante                     |
|----------------------------------|-----------------------------------------|
| ![Login](./assets/login.png)     | ![Dashboard](./assets/dashboard.png)    |

> 💡 *Substitua as imagens por capturas reais do seu projeto em `./assets/`.*

---

## 🚀 Funcionalidades

### 🔐 Autenticação e Controle de Acesso
- Login, logout e registro de novos usuários
- Contas demo com preenchimento automático
- Validações robustas e feedback visual
- Rotas protegidas por tipo de usuário

### 👤 Perfis e Acessos

| Perfil         | Email                | Senha   | Funcionalidades                                                        |
|----------------|----------------------|---------|------------------------------------------------------------------------|
| 🎓 Estudante   | joao@student.com     | 123456  | Dashboard, Cursos, Tarefas, Notas, Agenda                             |
| 👩‍🏫 Professor | maria@teacher.com    | 123456  | Dashboard, Gestão de Cursos e Alunos, Agenda                          |
| 🛠️ Administrador | admin@portal.com     | 123456  | Dashboard, Usuários, Relatórios, Eventos                              |

### 📊 Dashboards e Métricas
- Indicadores visuais por perfil
- Gráficos de desempenho
- Informações contextuais e organizadas

### 📂 Gestão de Dados
- Filtros e buscas funcionais
- Estados de loading, erro e vazio
- Dados mockados com realismo para simulações

### 💻 Experiência do Usuário
- Design moderno e acessível com Tailwind
- Animações suaves com Framer Motion
- Navegação adaptativa com menu lateral e breadcrumbs
- Componentes reutilizáveis e tipados

---

## 🧱 Estrutura do Projeto

```bash
Portal-Educacional/
│
├── public/                # Arquivos estáticos
├── src/
│   ├── assets/            # Imagens e ícones
│   ├── components/        # Componentes reutilizáveis
│   ├── contexts/          # Context API (auth, user, etc.)
│   ├── pages/             # Páginas (Login, Dashboard, etc.)
│   ├── routes/            # Rotas e proteção de páginas
│   ├── services/          # Integrações com APIs e dados mock
│   ├── utils/             # Utilitários diversos
│   └── App.tsx            # Componente principal
│
├── .gitignore
├── README.md
├── package.json
└── tsconfig.json

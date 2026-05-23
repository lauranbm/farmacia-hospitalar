# Sistema de Farmácia Hospitalar

Sistema web fullstack desenvolvido como projeto integrador acadêmico para controle e gerenciamento da farmácia hospitalar, permitindo o cadastro de medicamentos, gerenciamento de receitas médicas, controle de retiradas e administração de funcionários.

A aplicação foi desenvolvida utilizando React + TypeScript no frontend e Spring Boot no backend, com persistência de dados em PostgreSQL e comunicação assíncrona através do RabbitMQ.

O sistema possui dashboard administrativo, controle de acesso por perfil, gerenciamento de estoque, acompanhamento de receitas e interface responsiva para diferentes dispositivos.

O projeto segue arquitetura em camadas, separando frontend, backend, banco de dados e mensageria, proporcionando melhor organização, manutenção e escalabilidade da aplicação.

---

# Tecnologias Utilizadas

## Frontend

- React
- TypeScript
- Vite
- CSS3
- Fetch API

## Backend

- Java 21
- Spring Boot
- Spring Data JPA
- Maven

## Banco de Dados

- PostgreSQL

## Mensageria

- RabbitMQ

## Containerização

- Docker
- Docker Compose

## Ferramentas e Desenvolvimento

- Git
- GitHub
- VS Code
- IntelliJ IDEA
- Postman

---

# Funcionalidades

## Login e controle de acesso

- Login com validação de e-mail, senha e cargo
- Controle de acesso por perfil de usuário
- Perfis de médico, farmacêutico, enfermeiro e administrador
- Exibição de menus e ações conforme o perfil logado
- Logout do sistema

## Dashboard

- Cards com métricas reais do sistema
- Quantidade de receitas cadastradas
- Quantidade de medicamentos cadastrados
- Total de retiradas realizadas
- Alertas de estoque baixo
- Atividades recentes do sistema
- Layout responsivo

## Receitas

- Cadastro de receitas médicas
- Seleção de medicamentos cadastrados
- Controle de paciente, médico, medicamento, dosagem, quantidade e observações
- Status de receita criada e retirada
- Listagem de receitas com dados vindos do backend
- Ordenação por status e ID

## Medicamentos

- Cadastro de medicamentos
- Listagem de medicamentos cadastrados
- Controle de nome, dosagem, forma farmacêutica e quantidade em estoque
- Persistência no banco de dados
- Identificação de estoque baixo

## Retirada de medicamentos

- Confirmação de retirada pelo perfil de enfermagem
- Atualização do status da receita para RETIRADA
- Envio de mensagem para fila RabbitMQ
- Integração com o fluxo de baixa de estoque

## Funcionários

- Cadastro de funcionários
- Listagem de funcionários cadastrados
- Controle de nome, e-mail, senha e cargo
- Persistência no banco de dados
- Tela acessível apenas para administrador

## Configurações

- Preferências visuais do sistema
- Controle visual de notificações
- Controle visual de alerta de estoque
- Informações do sistema
- Área de segurança e sessão
- Logout do sistema

# Estrutura do projeto

```text
frontend/
 ├── src/
 ├── public/
 └── package.json

backend/
 ├── src/main/java/
 ├── src/main/resources/
 └── pom.xml
```

---

# Como executar o projeto

Para executar o sistema de Farmácia Hospitalar, é necessário iniciar o Docker, o backend e o frontend.

O projeto utiliza:
- PostgreSQL para banco de dados;
- RabbitMQ para mensageria;
- Spring Boot no backend;
- React + TypeScript no frontend.

---

## 1. Iniciar Docker

Na pasta principal do projeto, onde está localizado o arquivo `docker-compose.yml`, execute:

```bash
docker-compose up
```

Esse comando iniciará os containers necessários para o funcionamento do sistema, incluindo:
- PostgreSQL
- RabbitMQ

RabbitMQ disponível em:

```text
http://localhost:15672
```

Credenciais padrão do RabbitMQ:

```text
guest
```

---

## 2. Executar o backend

Abra outro terminal e entre na pasta do backend:

```bash
cd backend
```

Execute o Spring Boot:

### Windows

```powershell
.\mvnw.cmd spring-boot:run
```

### Linux/Mac

```bash
./mvnw spring-boot:run
```

O backend ficará disponível em:

```text
http://localhost:8080
```

---

## 3. Executar o frontend

Abra outro terminal e entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute a aplicação React:

```bash
npm run dev
```

O frontend ficará disponível em:

```text
http://localhost:5173
```

---

## Banco de Dados

O sistema utiliza PostgreSQL para persistência dos dados.

As configurações do banco podem ser alteradas no arquivo:

```text
src/main/resources/application.properties
```

Exemplo:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/farmacia_hospitalar
spring.datasource.username=postgres
spring.datasource.password=senha
```

---

# Responsividade

O sistema foi desenvolvido com interface responsiva, permitindo adaptação para diferentes tamanhos de tela e dispositivos.

A aplicação possui suporte para:
- desktop
- notebooks
- tablets
- dispositivos móveis

Foram aplicadas técnicas de responsividade utilizando CSS e media queries, garantindo melhor experiência de uso em diferentes resoluções.

# Melhorias futuras

- Separação da aplicação em componentes React reutilizáveis
- Implementação completa de autenticação integrada ao banco de dados
- Dashboard com gráficos e métricas avançadas
- Histórico completo de movimentações e retiradas
- Sistema de notificações em tempo real
- Controle de permissões mais detalhado por perfil
- Integração com APIs e sistemas hospitalares externos
- Implementação de testes automatizados
- Melhorias de acessibilidade e usabilidade
- Deploy completo da aplicação em ambiente cloud

---

# Autores

Laura Neves Bittencourt Moreira
Daniel Josh
Marianna Bianchini

Projeto desenvolvido para disciplina de Projeto Integrador / Farmácia Hospitalar.

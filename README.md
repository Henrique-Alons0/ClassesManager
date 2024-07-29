# ClassesManager

ClassesManager é um aplicativo React Native para gerenciar turmas, onde os usuários podem criar, visualizar e gerenciar participantes em diferentes turmas.

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Uso](#rodando-o-aplicativo)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Testes](#testes)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Licença](#licença)

## Visão Geral

O ClassesManager permite aos usuários:
- Criar novas turmas.
- Adicionar e remover participantes das turmas.
- Separar participantes em dois times (A e B).

## Funcionalidades

- **Criar Turma:** Crie novas turmas e adicione participantes.
- **Gerenciamento de Participantes:** Adicione ou remova participantes de uma turma.
- **Divisão em Times:** Separe os participantes em dois times distintos.

## Instalação

### Pré-requisitos

- Node.js
- React Native CLI
- Android Studio ou Xcode (para rodar em dispositivos/emuladores)

### Passos

1. Clone o repositório:

   ```bash
      git clone https://github.com/seu-usuario/ClassesManager.git
      cd ClassesManager
   ```

2. Instale as dependências:

   ```bash
      npm install
   ```

## Rodando o Aplicativo

   ```bash
      npx react-native run-android
   ```

## Testes

Para rodar os testes, use o comando:

   ```bash
      npm run test
   ```

Para gerar um relatorio de cobertura de testes:

   ```bash
      npm run test:coverage
   ```

## Tecnologias Utilizadas

   -  React Native: Framework para construir aplicativos móveis.
   -  TypeScript: Superset do JavaScript que adiciona tipagem estática.
   -  Jest: Framework de testes para JavaScript.
   -  React Navigation: Biblioteca de navegação para React Native.
   -  React Context API: Gerenciamento de estado.

## Licença

Este projeto está licenciado sob a MIT License.
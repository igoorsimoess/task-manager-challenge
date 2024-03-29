

<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/igoorsimoess/task-manager-challenge">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Gerenciador de Tarefas</h3>

  <p align="center">
    <a href="https://github.com/igoorsimoess/task-manager-challenge"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/igoorsimoess/task-manager-challenge">View Demo</a>
    ·
    <a href="https://github.com/igoorsimoess/task-manager-challenge/issues">Report Bug</a>
    ·
    <a href="https://github.com/igoorsimoess/task-manager-challenge/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
# Gerenciador de Tarefas
#### O projeto

Esse projeto tem como intenção construir um simples Gerenciador de Tarefas para servir como base para o desenvolvimento da discussão sobre Design patterns, escalabilidade, implementação de testes e integração contínua.

Abaixo, estão listadas as ferramentas utilizadas no desenvolvimento do projeto e os passos necessários para ter acesso à aplicação.
<div>
    <img src="images/Screenshot from 2024-01-15 17-42-28.png" alt="Logo" width="300" height="200">
    <img src="images/Screenshot from 2024-01-15 17-43-16.png" alt="Logo" width="300" height="200">
    <img src="images/Screenshot from 2024-01-15 17-42-43.png" alt="Logo" width="400" height="200" align-items="center">
</div>


### Construido com


[![My Skills](https://skillicons.dev/icons?i=ruby,rails,ts,js,react,tailwind,docker,vite,html,css)](https://skillicons.dev)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Prerequisites

1. Install Docker and docker-compose 
    * [Windows](https://docs.docker.com/windows/started)
    * [OS X](https://docs.docker.com/mac/started/)
    * [Linux](https://docs.docker.com/linux/started/)

### Instalação e uso

2. Clone the repo
   ```sh
   git clone git@github.com:igoorsimoess/task-manager-challenge.git
   ```
3. Navege até a raiz do projeto e suba os containers
   ```sh
   docker-compose up
   ```
4. No navegador, vá para
```sh
    http://localhost:5173/
```
*Tudo certo!*

<p align="right">(<a href="#readme-top">back to top</a>)</p>


#### Volumes

O banco de dados está configurado para persistir dados. O volume do postgres está localizado aqui
* `/var/lib/postgresql/data` 

<!-- USAGE EXAMPLES -->
## Arquitetura 
                            +---------------------------+
                            |        Load Balancer      |
                            +---------------------------+
                                       |
                            +---------------------------+
                            |     Application Server    |
                            |                           |
                            |   +-------------------+   |
                            |   |    Rails (API)    |   |
                            |   |-------------------|   |
                            |   |   Caching Layer   |   |
                            |   |     (Redis)       |   |
                            |   +-------------------+   |
                            |   |  Database Layer   |   |
                            |   |     (Postgres)    |   |
                            |   +-------------------+   |
                            +---------------------------+
                                       |
                            +---------------------------+
                            |        Frontend           |
                            |         (React)           |
                            +---------------------------+

Nesta sessão, discuto a implementação e decisão da arquitetura do projeto e futuras melhorias a serem implementadas.

O Ruby on Rails, como base de sistema constrói a aplicação usando a MVC.
A fim de tirar proveito desse recurso, o sistema foi pensado em cima desta arquitetura.

Os padrões de design que podem ser implementados nesse sistema futuramente são vários.
O *State Pattern*, que leva em consideração o estado do componente parece ser um dos mais interessantes. Dado que uma tarefa pode ter um status de "A fazer", "fazendo" ou "Concluído", o estado dessa aplicação pode movê-la para outra coluna na UI a depender dos requisitos do sistema.

No front, conta com typescript para garantir tipos de dados, o que afeta e mantenabilidade do sistema como um todo no longo prazo, tornando mais fácil adicionar novos componentes.


Em termos de **banco de dados**:
Para este projeto, foi decidido que uma esquematização estática do banco de dados reflete a melhor decisão para o cenário. Portanto, um banco de dados relacional encaixa-se melhor nesse requisito. 

A decisão é baseada na natureza da aplicação. Os campos disponíveis na UI + API foram construídos de forma fixa. Isso garante o tipo e garante que a aplicação não ficará sujeita à grandes quebras.

Em um cenário em que o schema da aplicação fosse dinâmico, um banco de dados não relacional seria melhor encaixado.

- As requisições de *PATCH* para update de uma task garantem que apenas o campo atualizado será enviado. Isso diminui o payload da requisição.

Para **escalonamento** da aplicação:

Já no cenário em que haja uma grande quantidade de objetos do tipo tarefa no banco de dados, dado que a página inicial da aplicação requere todas as registros do banco de dados, faz-se necessária a implementação de busca no cache -a fim de garantir que as sejam buscadas e registradas na memória rápida do sistema- + paginação dos resultados a fim de limitar a quantidade da response.
Para esta aplicação, o cache será implementado usando *Redis*.

Em um cenário em que o número de requisições cresça exponencialmente, faz-se necessário o load balancing dos servers a fim de distribuir e equilibrar

Também, na hipótese em que as métricas do sistema acusem requisições de lugares geograficamente distantes aos servers, faz-se necessária a contratação de serviços que implementam CDN a fim de garantir que requisições.

Para fins de **segurança**

- A autenticação e autorização da aplicação foi implementada por meio de JWT (Json Web Tokens) que garantem que cada usuário só terá acesso à aplicação sob login e registro e que terá acesso apenas às tarefas associadas ao seu usuário.

- A configuração de CORS está restrita apenas para uma porta

- Algumas precauções adicionais ainda devem ser tomadas como colocar em variáveis de ambiente as credenciais do banco de dados por meio de um arquivo .env (Como o banco e API estão contidos no docker, esse requisito faz mais diferença em ambientes de produção).
- Também devem ser tomadas medidas de precaução contra SQL injections ou outros tipos de ataques como denial of Service

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## To do

- [x] Back-end
    - [x] Autenticação e Autorização 
    - [x] Autenticação e Autorização 
- [x] Front-end
    - [x] type-checking
- [x] Banco de dados
  - [ ] DB Indexing 
  - [ ] Camada de Cache 
- [x] Dockerizar
- [x] Design da Arquitetura 
- [ ] Testes
    - [ ] Integração
    - [ ] Unidade 
- [x] Documentar decisões de Projeto
- [ ] Configurar Integração Contínua



<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Testes
#### WIP

<!-- CONTRIBUTING -->
## Contribuindo para o projeto
Este projeto é um trabalho em andamento. Como dito, a intenção é um estudo sobre design patterns e implementação de melhorias à nível do banco de dados e caching. 
Qualquer sugestão de modificação e melhorias são **realmente bem-vindas**


1. Fork o projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas modificações (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



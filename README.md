# Gerenciador de Tarefas 

<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/igoorsimoess/task-manager-challenge">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">project_title</h3>

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

Esse projeto tem como intenção construir um simples Gerenciador de Tarefas para servir como base para o desenvolvimento da discussão sobre Design Systems, escalabilidade, implementação de testes e integração contínua.

Abaixo, estão listadas as ferramentas utilizadas no desenvolvimento do projeto e os passos necessários para ter acesso à aplicação.
<div>
    <img src="images/Screenshot from 2024-01-15 17-42-28.png" alt="Logo" width="300" height="200">
    <img src="images/Screenshot from 2024-01-15 17-43-16.png" alt="Logo" width="300" height="200">
    <img src="images/Screenshot from 2024-01-15 17-42-43.png" alt="Logo" width="400" height="200" align-items="center">
</div>


### Construido com


[![My Skills](https://skillicons.dev/icons?i=ruby,rails,ts,js,react,tailwind,html,css)](https://skillicons.dev)

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

Nesta sessão, discuto a implementação e decisão da arquitetura do projeto e futuras melhorias a serem implementadas.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## To do

- [x] Front-end
- [x] Back-end
- [x] Dockerizar
- [x] Design da Arquitetura 
- [ ] Testes
    - [ ] Integração
    - [ ] Unidade 
- [ ] Camada de Cache 
- [ ] DB Indexing 
- [x] Documentar decisões de Projeto



<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Testes
#### WIP

<!-- CONTRIBUTING -->
## Contribuindo para o projeto
Este projeto é um trabalho em andamento. Como dito, a intenção é um estudo sobre design systems e implementação de melhorias à nível do banco de dados e caching. 
Qualquer sugestão de modificação e melhorias são **realmente bem-vindas**


1. Fork o projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas modificações (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Para mais informações visite nossa página [dulce](https://fga-gpp-mds.github.io/2018.1-Dulce_App/index.html)
# User
![Build Status](https://travis-ci.org/Dulce-Work-Schedule/2018.1-Dulce_User.svg?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/01b319bb89eb74d039dc/maintainability)](https://codeclimate.com/github/Dulce-Work-Schedule/2018.1-Dulce_User/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/Dulce-Work-Schedule/2018.1-Dulce_User/badge.svg?branch=)](https://coveralls.io/github/Dulce-Work-Schedule/2018.1-Dulce_User?branch=master)

### Microsserviços de gerenciamento de usuário

Para contribuir com esse mircosserviço você deve seguir as seguintes instruções:  

#### 1 - Primeiro leia o nosso [guia de contribuição](CONTRIBUTING.md) onde são explicados todos os passos para contribuir. Ahh, não esquece de ler nosso [código de conduta](CODE_OF_CONDUCT.md).   
Caso reste duvidas você também pode entrar em contato conosco criando uma issue ou pelo email dulce.application@gmail.com.  

#### 2 - Em seguida siga os comandos para executar o ambiente de produção:  

```bash
$ cd 2018.1-Dulce_User/Docker/Dev
```
```bash
$ sudo docker-compose -f build.yml  build  
```

```bash
$ sudo docker-compose -f start-deps.yml up -d
```

```bash
$ sudo docker-compose -f start-user.yml up -d
```
Pronto o seu ambiente de trabalho já está funcionando, acessar o ambiente de teste pelo terminal digite o seguinte comando:

```bash
$ sudo docker exec -it **NomeDoServiço** bash
```

#### Para rodar e escrever os testes você deve abrir o docker de testes, para isso siga as sguintes instruções:


```bash
$ cd 2018.1-Dulce_User/Docker/Test
```
```bash
$ sudo docker-compose -f build.yml  build
```
```bash
$ sudo docker-compose -f start-deps.yml up -d
```
```bash
$ sudo docker-compose -f start-user.yml up -d
```
Pronto o seu ambiente de trabalho já está funcionando, acessar o ambiente de teste pelo terminal digite o seguinte comando:

```bash
$ sudo docker exec -it **NomeDoServiço** bash
```

#### Para fechar e encerrar os dockers utilize o seguinte comando:
OBS: esse comando para todos os dockers que estão rodando em sua máquina.

```bash
$ sudo docker stop $(sudo docker ps -q)
```

## OBS
Os serviços estão rodando em background devido a flag ```-d ```, se desejar rodar o docker e verificar o andamento basta retirar essa flag da execução.

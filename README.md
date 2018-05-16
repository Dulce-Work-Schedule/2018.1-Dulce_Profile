### Para mais informações visite nossa página [dulce](https://fga-gpp-mds.github.io/2018.1-Dulce_App/index.html)
# User
![Build Status](https://travis-ci.org/Dulce-Work-Schedule/2018.1-Dulce_User.svg?branch=master)

### Microsserviços de gerenciamento de usuário

Para contribuir com esse mircosserviço você deve seguir as seguintes instruções:  

1 - Entra na pasta Dev se for para
$ cd 2018.1-Dulce_User/Docker/Test (ou /Dev ou /Prod)   
$ sudo docker-compose -f build.yml  build  
$ sudo docker-compose -f start-user.yml up -d



#### Para rodar e escrever os testes você deve abrir o docker de testes, para isso siga as sguintes instruções:

$ cd 2018.1-Dulce_User/Docker/Test
$ sudo docker-compose -f build.yml  build  
$ sudo docker-compose -f start-deps.yml up -d
$ sudo docker-compose -f start-user.yml up -d

#### Para fechar e encerrar os dockers utilize o seguinte comando:
OBS: esse comando para todos os dockers que estão rodando em sua máquina.

$ sudo docker stop $(sudo docker ps -q)

Os servidores rodarão em Background. Para visualizar o processo, basta rodar sem a flag -d

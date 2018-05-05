# User

Microsserviços de gerenciamento de usuário

Para utilizar esse mircosserviço você deve seguir as seguintes instruções :

$ cd 2018.1-Dulce_User/Docker/Test (ou /Dev ou /Prod)   
$ sudo docker-compose -f build.yml  build  
$ sudo docker-compose -f start-user.yml up -d  
$ sudo docker-compose -f start-user.yml logs -f  

Os servidores rodarão em Background. Para visualizar o processo, basta rodar sem a flag -d

Vagrant Front-end Stack
=====
Ambiente de desenvolvimento front-end com Maquina Virtual (Vagrant). Ele começou com colaboração de outros desenvolvedores da Sirius Interativa, empresa onde comecei minha jornada como estagiario e depois desenvolvedr front-end jr. Tivemos a ideia de unir todas ferramentas que utilizamos em uma maquina virtual (Vagrant) para sempre que for iniciar um novo projeto não precisar criar tudo do zero.

Resumindo tudo, é uma maquina vagrant com node e bower para instalar as dependencias front-end e gulp para automatizar as tarefas.

Oque tem no padrão
-----
- Yeoman (generator-webapp)
- Bower( jQuery, Modernizr, Susy, Fancybox, Animatewithsass, Font-Awesome, Picturefill)
- Nodejs
- Gulp
- Pug
- Sass (Node-sass)

Templates e Componentes:
-----

Templates:
- Landing Page
- Paralax
- Full Width

Componentes:
- Grid (Susy)
- Modal (Fancybox 3.0.47)
- Icones (Font-Awesome)
- Animações (Animatewithsass)
- Botões

VagrantFile
-----

Instalação
-----
Segue passo a passo para levantar a maquina vagrant:

1- Abra o terminal e acesse a pasta com o projeto que contem o arquivo Vagrantfile e rode o comando vagrant up para inicar a maquina vagrant e instalar as dependencias front-end.

2- Terminando de instalar tudo, vamos acessar nossa maquina virtual via ssh usando o comando vagrant ssh.

3- Agora vamos instalar as dependencias do node acessando a pasta frontend onde se encontra o arquivo package.json e rodar o comando npm install.

4- Terminando de instalar as dependencias, vamos rodar o comando npm rebuild node-sass.

5- Para finalizar agora vamos instalar as dependencias do Bower com o comando bower install.

6- Com tudo instalado, agora só rodar o comando gulp serve para levantar o servidor. Voce pode acessar o projeto em http://localhost:9000/

Para gerar um pacote com o projeto compilado, só executar o comando gulp build.

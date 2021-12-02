# Projeto Roman - Gestão de projetos 📚
- O Projeto Roman é uma plataforma parar organização/gestão de ideias de projetos escolares.
- Após realizar o login, professores cadastrados podem cadastrar ideias de projetos que podem ser utilizados nas escolas.

## Integrantes da equipe
- Gustavo Lima - <a href='https://github.com/tavinlima'>tavinlima</a>
- Lucas Mendes - <a href='https://github.com/Mendessc'>Mendessc</a>
- Samuel Oliveira - <a href='https://github.com/Samel-OP'>Samel-OP</a>

## Tecnologias utilizadas:
### Banco de Dados:
- <img align="center" alt="SQL" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/sql/sql.png" /> - SQL
### Back-end (API): 
- <img align="center" alt="logo-Csharp" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg"> - C# 
- <img align="center" alt="logo_visual_studio" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/9f4f5cdb393299a81125eb5127929ea7bfe42889/icons/visualstudio/visualstudio-plain.svg"> - Visual Studio

### Layouts (alta fidelidade): 
- <img align="center" alt="logo_figma" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/9f4f5cdb393299a81125eb5127929ea7bfe42889/icons/figma/figma-original.svg">- Figma

### Mobile: 
- <img align="center" alt="logo-React" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"> - ReactNative
- <img align="center" alt="logo_VS_code" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/9f4f5cdb393299a81125eb5127929ea7bfe42889/icons/vscode/vscode-original.svg"> - Visual Studio Code

## Como executar:
O primeiro passo é clonar esse repositório na sua máquina. Dê um git clone em uma pasta do seu computador e puxe todo o conteúdo do repositório:
![image](https://user-images.githubusercontent.com/82414372/143623940-4cab0d19-6b2f-4b9c-ad39-14c0c0c4f6e2.png)
![image](https://user-images.githubusercontent.com/82414372/143623981-a40860e7-9cd2-4432-922e-f78ce833b8d4.png)
![image](https://user-images.githubusercontent.com/82414372/144103088-8ee91d7e-a615-4673-9709-c9b06fca20a1.png)

- Abra o ssms no seu computador e abra os scripts localizados na pasta 'BD';
![image](https://user-images.githubusercontent.com/82414372/144103377-3bc860ea-cd2c-4f6c-add5-30be470a302b.png)

- Crie a database e execute os 3 scripts para conferir se está tudo funcionando;
![image](https://user-images.githubusercontent.com/82414372/144103509-73b8b674-a92f-4d89-ab49-5a055b138f70.png)
![image](https://user-images.githubusercontent.com/82414372/144103526-2e6e647e-198c-4b96-884d-5483466816f1.png)

- Após o banco responder, abra o VS Code na solução que se encontra na pasta 'Back-End';
![image](https://user-images.githubusercontent.com/82414372/144103639-74e1916c-ce81-430a-a068-30f9382170ae.png)

- Vá direto para a pasta de contexto e troque a string de conexão para a que conecte ao seu banco de dados (incluindo login e senha);
![image](https://user-images.githubusercontent.com/82414372/144120226-71d9adb3-9dfb-4537-95fa-4cba9ed7f9d7.png)

- Dentro do arquivo 'launchSettings.json', troque o valor 'localhost' de "applicationUrl": "http://localhost:5000", para o endreço do seu IP.

- Para não sobrecarregar o processamento, feche a aplicação e a partir da barra de endereço da pasta onde se encontram os aquivos, abra o cmd e digite 'dotnet run';
![image](https://user-images.githubusercontent.com/82414372/144120370-0ab582f7-1d9c-4ff6-a1c8-bb5db7a2f74a.png)
![image](https://user-images.githubusercontent.com/82414372/144120452-84cab445-0e45-4a0e-9101-41fbc218efeb.png)

- Abra o arquivo 'ProjetoRomanMobile' no vsCode para trocar a barra de endereço no arquivo 'api', dentro da pasta 'services', dentro de 'assets' para o seu endereço de IP;
![image](https://user-images.githubusercontent.com/82414372/144120578-81e9896f-9adb-43fc-bba6-b9df7436408d.png)

- Para abrir o aplicativo mobile, abra o cmd na pasta 'ProjetoRomanMobile' e de um 'npm i' para instalar todos os módulos utilizados na aplicação;

- Em seguida digite 'npm react-native run-android' para rodar a aplicação.

## Como utilizar:
- Após iniciar o aplicativo, insira seu email e senha cadastrados no banco e faça login;
- Na tela inicial, você terá uma listagem com todos os projetos cadastrados;
- Caso queira fazer um novo cadastro, clique em "sugerir projeto" na parte de cima da tela;
- Esse botão abrirá uma mini tela, nela você conseguirá colocar um título, a descrição e um tema;
- Clique em "Enviar" para cadastrar sua sugestão no banco;
- Você poderá navegar para uma segunda tela através do footer;
- Na tela de perfil você poderá ver seu nome e sua senha, e um botão que fará você deslogar do sistema :)

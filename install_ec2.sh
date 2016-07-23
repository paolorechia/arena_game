# bash script para configurar o ec2 automagicamente
sudo yum -y update
sudo yum -y install git
curl --silent --location https://rpm.nodesource.com/setup_6.x |sudo bash -
sudo yum -y install nodejs
git clone https://bitbucket.org/diogomiloco/arena_game/
cd arena_game
npm install express
npm install jade
npm install favicon
npm install cookie-parser
npm install body-parser
npm install socket.io
npm install serve-favicon
npm install morgan 

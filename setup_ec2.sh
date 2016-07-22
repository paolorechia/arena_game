#!/bin/bash
scp -i ~/.ssh/paoloaws-key.pem ~/arena_game/install_e2.sh ec2-user@$1:~/
ssh -i ~/.ssh/paoloaws-key.pem ec2-user@$1
chmod 700 install_ec2.sh
./install_ec2.sh

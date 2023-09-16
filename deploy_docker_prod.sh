#!/bin/sh

ssh -o StrictHostKeyChecking=no ubuntu@$PROD_SERVER << 'ENDSSH'
  cd /home/ubuntu/production/cns-front
  aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 782057639577.dkr.ecr.eu-west-2.amazonaws.com
  aws --version
  docker info
  docker --version
  docker pull 782057639577.dkr.ecr.eu-west-2.amazonaws.com/cns-front-prod:latest
  docker rm -f cns-front-prod
  docker run -itd --name cns-front-prod -p 3003:80 782057639577.dkr.ecr.eu-west-2.amazonaws.com/cns-front-prod:latest
ENDSSH

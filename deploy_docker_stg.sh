#!/bin/sh

ssh -o StrictHostKeyChecking=no ubuntu@$STAGING_SERVER << 'ENDSSH'
  cd /home/ubuntu/staging/cns-front
  aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 782057639577.dkr.ecr.eu-west-2.amazonaws.com
  aws --version
  docker info
  docker --version
  docker pull 782057639577.dkr.ecr.eu-west-2.amazonaws.com/cns-front-stg:latest
  docker rm -f cns-front-stg
  docker run -itd --name cns-front-stg -p 3001:80 782057639577.dkr.ecr.eu-west-2.amazonaws.com/cns-front-stg:latest
ENDSSH

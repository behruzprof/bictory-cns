#!/bin/sh

#echo GENERATE_SOURCEMAP=false >> .env
#echo NODE_ENV=production >> .env
#echo REACT_APP_API_ENDPOINT='https://staging-cns-api.ccd.domains/api/v1/' >> .env
#echo REACT_APP_IS_STAGING=true >> .env
#echo REACT_APP_IS_PRODUCTION='' >> .env
#echo REACT_APP_BRIDGE_CONNECTION_KEY='' >> .env


echo GENERATE_SOURCEMAP=false >> .env.staging
echo NODE_ENV=production >> .env.staging
echo REACT_APP_API_ENDPOINT='https://staging-cns-api.ccd.domains/api/v1/' >> .env.staging
echo REACT_APP_IS_PRODUCTION='' >> .env.staging
echo REACT_APP_IS_STAGING=true >> .env.staging
echo REACT_APP_BRIDGE_CONNECTION_KEY=$REACT_APP_BRIDGE_CONNECTION_KEY_STG >> .env.staging


#echo REACT_APP_MQTT_BASE=b-6ef46c22-45e4-4167-818d-e2fb5fd86178-1.mq.eu-west-2.amazonaws.com >> .env.staging
#echo REACT_APP_MQTT_PORT='61619' >> .env.staging

echo REACT_APP_MQTT_BASE=$REACT_APP_MQTT_BASE_STG >> .env.staging
echo REACT_APP_MQTT_PORT='61619' >> .env.staging

echo REACT_APP_CCD_SCAN_URL='https://testnet.ccdscan.io/?dcount=1&dentity=account&daddress=' >> .env.staging

echo REACT_APP_CCD_TX_URL=https://dashboard.testnet.concordium.com/lookup/ >> .env.staging

echo REACT_APP_NFT_URL=https://staging.bictory.art/ >> .env.staging

echo REACT_APP_LINKEDIN_CLIENT_ID=773qvtihr48it3 >> .env.staging

echo REACT_APP_MQTT_PASSWORD=$REACT_APP_MQTT_PASSWORD_STG >> .env.staging

echo REACT_APP_MQTT_USERNAME=$REACT_APP_MQTT_USERNAME_STG >> .env.staging


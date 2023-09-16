#!/bin/sh

#echo GENERATE_SOURCEMAP=false >> .env
#echo NODE_ENV=production >> .env
#echo REACT_APP_API_ENDPOINT='https://cns-api.ccd.domains/api/v1/' >> .env
#echo REACT_APP_IS_STAGING=true >> .env
#echo REACT_APP_IS_PRODUCTION='' >> .env
#echo REACT_APP_BRIDGE_CONNECTION_KEY='' >> .env


echo GENERATE_SOURCEMAP=false >> .env.production
echo NODE_ENV=production >> .env.production
echo REACT_APP_API_ENDPOINT='https://cns-api.ccd.domains/api/v1/' >> .env.production
echo REACT_APP_IS_PRODUCTION='true' >> .env.production
#echo REACT_APP_BRIDGE_CONNECTION_KEY='' >> .env.production


echo REACT_APP_BRIDGE_CONNECTION_KEY=$REACT_APP_BRIDGE_CONNECTION_KEY_PROD >> .env.production


#echo REACT_APP_MQTT_BASE=b-6ef46c22-45e4-4167-818d-e2fb5fd86178-1.mq.eu-west-2.amazonaws.com
#echo REACT_APP_MQTT_PORT='61619'

echo REACT_APP_MQTT_BASE=$REACT_APP_MQTT_BASE_PROD >> .env.production
echo REACT_APP_MQTT_PORT='61619'  >> .env.production

echo REACT_APP_CCD_SCAN_URL='https://ccdscan.io/?dcount=1&dentity=account&daddress=' >> .env.production

echo REACT_APP_CCD_TX_URL=https://dashboard.mainnet.concordium.software/lookup/ >> .env.production

echo REACT_APP_NFT_URL=https://bictory.art/ >> .env.production

echo REACT_APP_LINKEDIN_CLIENT_ID=$REACT_APP_LINKEDIN_CLIENT_ID >> .env.production

echo REACT_APP_MQTT_USERNAME=$REACT_APP_MQTT_USERNAME_PROD >> .env.production
echo REACT_APP_MQTT_PASSWORD=$REACT_APP_MQTT_PASSWORD_PROD >> .env.production


#echo REACT_APP_CCD_SCAN_URL=https://ccdscan.io/?dcount=1&dentity=account&daddress= >> .env.production

#echo REACT_APP_CCD_TX_URL=https://dashboard.mainnet.concordium.software/lookup/ >> .env.production






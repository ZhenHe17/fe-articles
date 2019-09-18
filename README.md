# FE Articles

## QuickStart

### Development

start mysql and nginx by docker

``` bash
docker-compose -f docker-compose-dev.yml up
```

start webapp and api

``` bash
cd server
npm i
npm run dev

# cd webapp
# npm i
# npm start
```

nginx proxy:

webapp: http://localhost:3000/ => http://localhost/
api: http://localhost:7001/ => http://localhost/api/



### Deploy

``` bash
docker-compose up
```

webapp: http://localhost/
api: http://localhost/api/

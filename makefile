depoly:
	git pull --rebase
	docker stop fe-articles_fe_article_server_1
	docker stop nginx
	docker stop redis
	docker stop fe-articles_db_1
	docker-compose build 
	docker-compose up -d
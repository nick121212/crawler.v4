container :
	# cp ../../base/base.js .
	docker build -t crawler.plugin.downloader .
	docker images | grep crawler.plugin.downloader

run-single-base0:
	docker service create --replicas 1 --network downloader --name base0 -e TAG=base0 -e PORT=39000 -e HOST=base0 -e BASES=base0:39000,base1:39000 crawler.plugin.downloader

run-single-base1:
	docker service create --replicas 1 --network downloader --name base1 -e TAG=base1 -e PORT=39000 -e HOST=base1 -e BASES=base0:39000,base1:39000 crawler.plugin.downloader

rm-single-base0:
	docker service rm base0

rm-single-base1:
	docker service rm base1

clean :
	rm -f *~
	rm -f *.js
	rm -f *.json


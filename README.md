# pp-timer-svc
Pixel Playoffs Timer Service

## Setup
Still developing the comms/docker/microsvc strategies. For now...

```bash
docker network create pixel
docker run -d -p 6379:6379 --name redis --net=pixel redis
docker build -t timer .
docker run -d -p 3001:3001 --name timer --net=pixel timer
docker run -d --name stream -p 3002:3002 --net=pixel stream

```
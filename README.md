# KTHB Static
Static files(html,js, css, images etc)

##

###

#### Dependencies
nginx

#### Porteus 
https://porteus-kiosk.org/  

Burn ISO to USB: win32diskimager  

På DEll datorer BIOS:
- disable secure boot
- SATA Operation from "RAID" to "AHCI" in the BIOS
På samtliga:
- Kolla boot order

##### Installation

1.  Skapa folder på server med namnet på repot: "/local/docker/static"
2.  Skapa och anpassa docker-compose.yml i foldern
```
version: "3.6"

services:
  static:
    container_name: "static"
    image: ghcr.io/kth-biblioteket/static:${REPO_TYPE}
    restart: "always"
    env_file:
      - static.env
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - ./.htpasswd:/etc/nginx/.htpasswd
      - ./porteusconfig_guest.txt:/usr/share/nginx/html/porteus/porteusconfig_guest.txt
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.static.rule=Host(`${DOMAIN_NAME}`)"
      - "traefik.http.routers.static.entrypoints=websecure"
      - "traefik.http.routers.static.tls=true"
      - "traefik.http.routers.static.tls.certresolver=myresolver"
    networks:
      - "apps-net"

networks:
  apps-net:
    external: true
```
3.  Skapa och anpassa .env(för composefilen) i foldern
```
REPO_TYPE=ref
PATHPREFIX=/
DOMAIN_NAME=static-ref.lib.kth.se
```
4.  Skapa och anpassa static.env i foldern
```
ENVIRONMENT=development

```
5. Skapa nginx.conf i foldern
6. Skapa .htpasswd i foldern (sudo htpasswd -c .htpasswd kthb)
7. Skapa porteus configfiler i foldern (porteusconfig.txt etc)
8. Skapa deploy_ref.yml i github actions
8. Skapa deploy_prod.yml i github actions
10. Github Actions bygger en dockerimage i github packages
11. Starta applikationen med docker compose up -d --build i "local/docker/static"


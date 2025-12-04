#!/bin/bash

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}   Initialisation Let's Encrypt SSL${NC}"
echo -e "${GREEN}============================================${NC}"

# Charger les variables d'environnement
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

domains=("$DOMAIN_LANDING" "$DOMAIN_SURVEY")
rsa_key_size=4096
data_path="./certbot"
email="$CERTBOT_EMAIL"
staging=0 # Mettre à 1 pour tester avec staging

# Vérifier si les certificats existent déjà
if [ -d "$data_path/conf/live/$DOMAIN_LANDING" ]; then
  echo -e "${YELLOW}⚠️  Certificats existants trouvés pour $DOMAIN_LANDING${NC}"
  read -p "Voulez-vous les remplacer ? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi

# Créer les dossiers nécessaires
echo -e "${GREEN}📁 Création des dossiers...${NC}"
mkdir -p "$data_path/conf"
mkdir -p "$data_path/www"
mkdir -p "nginx/logs"

# Télécharger les paramètres TLS recommandés
if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
  echo -e "${GREEN}⬇️  Téléchargement des paramètres TLS recommandés...${NC}"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
fi

# Créer des certificats dummy pour démarrer Nginx
echo -e "${GREEN}🔐 Création de certificats temporaires...${NC}"
for domain in "${domains[@]}"; do
  path="/etc/letsencrypt/live/$domain"
  mkdir -p "$data_path/conf/live/$domain"

  if [ ! -e "$data_path/conf/live/$domain/fullchain.pem" ]; then
    docker-compose run --rm --entrypoint "\
      openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1 \
        -keyout '$path/privkey.pem' \
        -out '$path/fullchain.pem' \
        -subj '/CN=localhost'" certbot
    echo -e "${GREEN}✅ Certificat temporaire créé pour $domain${NC}"
  fi
done

# Démarrer Nginx
echo -e "${GREEN}🚀 Démarrage de Nginx...${NC}"
docker-compose up -d nginx

# Attendre que Nginx soit prêt
echo -e "${YELLOW}⏳ Attente du démarrage de Nginx (10s)...${NC}"
sleep 10

# Supprimer les certificats dummy
echo -e "${GREEN}🗑️  Suppression des certificats temporaires...${NC}"
for domain in "${domains[@]}"; do
  docker-compose run --rm --entrypoint "\
    rm -Rf /etc/letsencrypt/live/$domain && \
    rm -Rf /etc/letsencrypt/archive/$domain && \
    rm -Rf /etc/letsencrypt/renewal/$domain.conf" certbot
done

# Obtenir les vrais certificats
echo -e "${GREEN}🔒 Obtention des certificats Let's Encrypt...${NC}"
for domain in "${domains[@]}"; do
  echo -e "${YELLOW}   → $domain${NC}"

  domain_args="-d $domain"

  # Ajouter www. pour le domaine principal
  if [ "$domain" == "$DOMAIN_LANDING" ]; then
    domain_args="$domain_args -d www.$domain"
  fi

  # Mode staging ou production
  staging_arg=""
  if [ $staging != "0" ]; then staging_arg="--staging"; fi

  docker-compose run --rm --entrypoint "\
    certbot certonly --webroot -w /var/www/certbot \
      $staging_arg \
      $domain_args \
      --email $email \
      --rsa-key-size $rsa_key_size \
      --agree-tos \
      --force-renewal \
      --non-interactive" certbot

  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Certificat obtenu pour $domain${NC}"
  else
    echo -e "${RED}❌ Échec pour $domain${NC}"
    exit 1
  fi
done

# Recharger Nginx
echo -e "${GREEN}🔄 Rechargement de Nginx...${NC}"
docker-compose exec nginx nginx -s reload

echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}✅ Configuration SSL terminée !${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo -e "Vos sites sont maintenant accessibles en HTTPS :"
echo -e "  → ${GREEN}https://$DOMAIN_LANDING${NC}"
echo -e "  → ${GREEN}https://$DOMAIN_SURVEY${NC}"

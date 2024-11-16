#!/bin/bash

function ctrl_c () {
  echo "Saliendo..."
  tput cnorm
  exit 0
}

trap ctrl_c SIGINT

# URL del endpoint
URL="https://apps2.mef.gob.pe/consulta-vfp-webapp/actionConsultaExpediente.jspx"

# Datos del formulario
ANO_EJE="2024"
SEC_EJEC="300684"
EXPEDIENTE="5289"
J_CAPTCHA="abcrd"

# Headers y cookies
ACCEPT="text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
ACCEPT_ENCODING="gzip, deflate, br, zstd"
ACCEPT_LANGUAGE="es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,es-PE;q=0.5"
CACHE_CONTROL="max-age=0"
CONNECTION="keep-alive"
CONTENT_TYPE="application/x-www-form-urlencoded"
COOKIE="JSESSIONID=8099E5877B438AF57260C0EB2295E873; visid_incap_2825906=5qirtWHRSeqTeo9dQ917WoZl5GYAAAAAQUIPAAAAAAAe3mlr9+lS8FtwPxzfHJgX; __utma=239101148.1662689021.1726244233.1726496353.1727284061.2; __utmz=239101148.1727284061.2.2.utmcsr=bing|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); _ga=GA1.3.1662689021.1726244233; _ga_RG781QWMQW=GS1.1.1727447068.20.0.1727447220.0.0.0; dtCookie=v_4_srv_1_sn_19C8D7090D1BF85CDEDCB974523AD5B2_perc_100000_ol_0_mul_1_app-3A4af229b397c40f48_1; rxVisitor=1727753003244CSW6RLQDD4PMQ7A038CDBONLA06DELGE; dtSa=-; rxvt=1727791980272|1727790172800; dtPC=1$390180150_896h-vLQARKWQQNAKLQMGGWJQOPQIKMKUCRHRG-0e0"
HOST="apps2.mef.gob.pe"
ORIGIN="https://apps2.mef.gob.pe"
REFERER="https://apps2.mef.gob.pe/consulta-vfp-webapp/consultaExpediente.jspx"

# Función para hacer la petición y procesar el HTML
function check_contabilidad() {
  # Hacer la petición POST
  response=$(curl -s -X POST $URL \
    -H "Accept: $ACCEPT" \
    -H "Accept-Encoding: $ACCEPT_ENCODING" \
    -H "Accept-Language: $ACCEPT_LANGUAGE" \
    -H "Cache-Control: $CACHE_CONTROL" \
    -H "Connection: $CONNECTION" \
    -H "Content-Type: $CONTENT_TYPE" \
    -H "Cookie: $COOKIE" \
    -H "Host: $HOST" \
    -H "Origin: $ORIGIN" \
    -H "Referer: $REFERER" \
    -d "anoEje=$ANO_EJE" \
    -d "secEjec=$SEC_EJEC" \
    -d "expediente=$EXPEDIENTE" \
    -d "j_captcha=$J_CAPTCHA")

  echo "$response"

  # Extraer el contenido de la tabla usando xmllint y grep para localizar el tercer tr y el 11eavo td
  # Usamos xmllint para estructurar el HTML en XML
  value=$(echo "$response" | xmllint --html --xpath "//table//tr[3]/td[11]/text()" - 2>/dev/null)

  # Evaluar el valor encontrado
  if [ "$value" == "A" ]; then
    echo -e "\e[32mA por la mac!\e[0m"  # Mensaje en verde
  elif [ "$value" == "F" ]; then
    echo -e "\e[31mOtro dia sin mac...\e[0m"  # Mensaje en rojo
  else
    echo "No se encontró el valor esperado"
  fi
}

tput civis
# Loop para hacer las llamadas cada 3 segundos
while true; do
  check_contabilidad
  sleep 5  # Esperar 3 segundos antes de la próxima ejecución
done


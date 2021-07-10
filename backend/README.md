# Proyecto de título 2021
## Pre-requisitos:
node.js v12 o superior.
#
## Pasos para instalación en ambiente de desarrollo local

### `crear archivo .env para setear variables de entorno (archivo de ejemplo ya incluído)`

este archivo contiene las variables de entorno necesarias para ejecutar la aplicación.
localmente.
**ejemplo** **de** **archivo** **.env**:
```
DB_PASSWORD=contraseña_base_de_datos
DB_NAME=nombre_base_de_datos
DB_USER_NAME=nombre_usuario_base_de_datos
DB_HOST=host_o_direccion_ip_base_de_datos
APP_PORT=puerto_en_el_que_corre_la_aplicacion
DB_PORT=puerto_base_de_datos
DB_DIALECT=postgres
JTW_SECRET=clave_secreta_para_jwt
EMAIL_DOMIAN=dominio_verificado_para_enviar_mails
MAILGUN_API_KEY=llave_api_mail_gun_para_enviar_mails
AWS_ACCESS_KEY_ID=id_clave_acceso_aws
AWS_SECRET_ACCESS_KEY=clave_de_acceso_secreta_aws
S3_BUCKET_NAME=nombre_bucket_s3_para_almacenar_archivos_subidos
AWS_REGION=region_aws_en_la_que_esta_el_bucket
```


### `ejecutar comando npm install`

Este comando instala las dependencias necesarias para ejecutar la aplicación.

### `ejecutar comando npm start`

Este comando inicia la aplicación en un servidor local.


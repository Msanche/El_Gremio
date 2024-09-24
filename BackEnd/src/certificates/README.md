# Generación de certificados

```bash
# Generar la clave privada
openssl genrsa -out clave-privada.key 2048

# Crear la solicitud de firma de certificado (CSR)
openssl req -new -key clave-privada.key -out solicitud-certificado.csr

# Generar un certificado autofirmado (válido por 365 días)
openssl x509 -req -days 365 -in solicitud-certificado.csr -signkey clave-privada.key -out certificado-autofirmado.crt
```

# Notas importantes
*certificado-autofirmado.crt* es solo para DESARROLLO

# Depencias instaladas para esto:
```bash
npm install https
```

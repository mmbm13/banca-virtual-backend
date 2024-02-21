import { DocumentBuilder } from '@nestjs/swagger';

const securityHeader = 'security.header';
const proxyHeader = 'proxy.header';

export const swaggerConfig = (serviceUrl: string, prefix: string) =>
  new DocumentBuilder()
    .setTitle('API de Gestión de Intercambio de Criptomonedas - Wallet BTCLN.')
    .setDescription(
      'API de Gestión de Intercambio de Criptomonedas - Wallet BTCLN.',
    )
    .addServer(`${serviceUrl}${prefix}`)
    .addSecurity(securityHeader, {
      type: 'apiKey',
      name: securityHeader,
      in: 'header',
      description: `Para acceder a la API se debe pasar un ID de acceso válido en todas las consultas. La siguiente sintaxis se debe utilizar en el encabezado 
        ${securityHeader}: <TOKEN>`,
    })
    .addSecurity(proxyHeader, {
      type: 'apiKey',
      name: proxyHeader,
      in: 'header',
      description: `Para acceder a la API se debe pasar un token válido de apigee en todas las consultas. La siguiente sintaxis se debe utilizar en el encabezado 
        ${proxyHeader}: <TOKEN>`,
    })
    .setVersion('1.0')
    .build();

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { codegen } = require('swagger-axios-codegen')

codegen({
    methodNameMode: 'operationId',
    remoteUrl: 'http://localhost:8082/v3/api-docs',
    outputDir: './generate',
    strictNullChecks: false,
    modelMode: 'interface'
})
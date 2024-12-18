// eslint-disable-next-line @typescript-eslint/no-var-requires
const { codegen } = require('swagger-axios-codegen')

codegen({
    methodNameMode: 'operationId',
    remoteUrl: 'http://localhost:8083/v3/api-docs',
    outputDir: './generate',
    strictNullChecks: false,
    modelMode: 'interface'
})
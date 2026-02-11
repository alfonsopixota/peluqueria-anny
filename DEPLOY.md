const https = require('https');

// Crear proyecto en Vercel
const createVercelProject = () => {
  const data = JSON.stringify({
    name: 'peluqueria-anny',
    framework: 'nextjs',
    gitRepository: {
      type: 'github',
      repo: 'alfonsopixota/peluqueria-anny'
    },
    rootDirectory: 'client',
    environmentVariables: [
      {
        key: 'NEXT_PUBLIC_API_URL',
        value: 'https://peluqueria-anny-backend.onrender.com',
        target: ['production', 'preview']
      }
    ]
  });

  const options = {
    hostname: 'api.vercel.com',
    port: 443,
    path: '/v9/projects',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer VERCEL_TOKEN_AQUI',
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = https.request(options, res => {
    console.log(`Status: ${res.statusCode}`);
    res.on('data', d => {
      process.stdout.write(d);
    });
  });

  req.on('error', error => {
    console.error(error);
  });

  req.write(data);
  req.end();
};

console.log('Para desplegar en Vercel:');
console.log('1. Ve a https://vercel.com/new');
console.log('2. Conecta tu repositorio: alfonsopixota/peluqueria-anny');
console.log('3. Configura Root Directory: client');
console.log('4. Añade variable de entorno: NEXT_PUBLIC_API_URL');
console.log('5. Despliega!');

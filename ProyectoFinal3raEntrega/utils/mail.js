const mailRegistration = (user) =>
	`
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title></title>
    </head>
    <body>
      <h1>Nuevo registro:</h1>
      <ul>
        <li><p><span style="font-weight: bold;">Name:</span> ${user.lastname}</p></li>
        <li><p><span style="font-weight: bold;">Email:</span> ${user.email}</p></li>
        <li><p><span style="font-weight: bold;">IdCart:</span> ${user.myCart}</p></li>
        <li><p><span style="font-weight: bold;">Address:</span> ${user.address}</p></li>
        <li><p><span style="font-weight: bold;">Age:</span> ${user.age}</p></li>
        <li><p><span style="font-weight: bold;">Tel:</span> ${user.tel}</p></li>
      </ul>
    </body>
  </html>
`.trim();

import app from "./app";

const PORT = (process.env.PORT && parseInt(process.env.PORT)) || 8000;

app.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}...`);
});

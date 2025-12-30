require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// 1. TUS RUTAS DE API
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/student", require("./routes/student.routes"));
app.use("/api/coord", require("./routes/coordination.routes"));

// 2. SERVIR FRONTEND (Para que se levanten ambos)
const frontendPath = path.join(__dirname, "../../frontend/dist");
app.use(express.static(frontendPath));

app.get("*", (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(frontendPath, "index.html"));
});

// 3. PUERTO FIJO 1510 (El 80 es de GitLab)
const PORT = 1510;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor Unificado en puerto ${PORT}`);
});
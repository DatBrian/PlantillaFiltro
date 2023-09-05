import App from "./app.js";
import AreaRoutes from "./routes/AreaRoutes.js";
import MedicamentoRoutes from "./routes/MedicamentoRoutes.js";

const app = new App([new MedicamentoRoutes]);
app.listen();

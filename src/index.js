import App from "./app.js";
import AreaRoutes from "./routes/AreaRoutes.js";

const app = new App([new AreaRoutes()]);
app.listen();

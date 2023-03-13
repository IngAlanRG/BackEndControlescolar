import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import aspirantes_archivoOcultar from "./routes/aspirantes_archivo.routes.js";
import aspirantes_casoemergencia from "./routes/aspirantes_casoemergencia.routes.js";
import aspirantes_datos_adicionales from "./routes/aspirantes_datos_adicionales.routes.js";
import aspirantes_documentos from "./routes/aspirantes_documentos.routes.js";
import aspirantes_domicilios from "./routes/aspirantes_domicilios.routes.js";
import aspirantes_historial_academico from "./routes/aspirantes_historial_academico.routes.js";
import aspirantes_infopadres from "./routes/aspirantes_infopadres.routes.js";
import aspirantes_informacion from "./routes/aspirantes_informacion.routes.js";
import aspirantes_preregistros from "./routes/aspirantes_preregistros.routes.js";
import aspirantes_socioeconomico from "./routes/aspirantes_socioeconomico.routes.js";
import aspirantes_usuarios from "./routes/aspirantes_usuarios.routes.js";
import aspirantes_validacion_doc from "./routes/aspirantes_validacion_doc.routes.js";
import aspirantes_validacion_info from "./routes/aspirantesValidacionInfo.routes.js";
import catalogo_estados from "./routes/catalogo_estados.routes.js";
import catalogo_prepas from "./routes/catalogo_prepas.routes.js";
import catalogo_ubicaciones from "./routes/catalogo_ubicaciones.routes.js";
import gen_folios_ingenieria_electromecanica from "./routes/gen_folios_ingenieria_electromecanica.routes.js";
import gen_folios_ingenieria_electronica from "./routes/gen_folios_ingenieria_electronica.routes.js";
import gen_folios_ingenieria_en_sistemas_computacionales from "./routes/gen_folios_ingenieria_en_sistemas_computacionales.routes.js";
import gen_folios_ingenieria_en_sistemas_semipresencial from "./routes/gen_folios_ingenieria_en_sistemas_semipresencial.routes.js"
import gen_folios_ingenieria_industrial from "./routes/gen_folios_ingenieria_industrial.routes.js"
import gen_folios_ingenieria_industrial_semipresencial from "./routes/gen_folios_ingenieria_industrial_semipresencial.routes.js";
import gen_folios_ingenieria_informatica from "./routes/gen_folios_ingenieria_informatica.routes.js";
import gen_folios_licenciatura_informatica from "./routes/gen_folios_licenciatura_informatica.routes.js";
import gen_matriculas_ingenieria_electromecanica from "./routes/gen_matriculas_ingenieria_electromecanica.routes.js";
import gen_matriculas_ingenieria_electronica from "./routes/gen_matriculas_ingenieria_electronica.routes.js";
import gen_matriculas_ingenieria_en_sistemas_computacionales from "./routes/gen_matriculas_ingenieria_en_sistemas_computacionales.routes.js";
import gen_matriculas_ingenieria_en_sistemas_semipresencial from "./routes/gen_matriculas_ingenieria_en_sistemas_semipresencial.routes.js";
import gen_matriculas_ingenieria_industrial from "./routes/gen_matriculas_ingenieria_industrial.routes.js";
import gen_matriculas_ingenieria_industrial_semipresencial from "./routes/gen_matriculas_ingenieria_industrial_semipresencial.routes.js";
import gen_matriculas_ingenieria_informatica from "./routes/gen_matriculas_ingenieria_informatica.routes.js";
import gen_matriculas_licenciatura_en_informatica from "./routes/gen_matriculas_licenciatura_en_informatica.routes.js";
import tecnologico_alumnos from "./routes/tecnologico_alumnos.routes.js";
import tecnologico_asignaturas from "./routes/tecnologico_asignaturas.routes.js";
import tecnologico_carreras from "./routes/tecnologico_carreras.routes.js";
import tecnologico_docentes from "./routes/tecnologico_docentes.routes.js";
import tecnologico_edificios from "./routes/tecnologico_edificios.routes.js";
import tecnologico_especialidades from "./routes/tecnologico_especialidades.routes.js";
import tecnologico_fases from "./routes/tecnologico_fases.routes.js";
import tecnologico_fichas_ceneval from "./routes/tecnologico_fichas_ceneval.routes.js";
import tecnologico_grupos from "./routes/tecnologico_grupos.routes.js";
import tecnologico_horarios from "./routes/tecnologico_horarios.routes.js";
import tecnologico_horas from "./routes/tecnologico_horas.routes.js";
import tecnologico_periodos from "./routes/tecnologico_periodos.routes.js";
import tecnologico_planes_estudios from "./routes/tecnologico_planes_estudios.routes.js";
import tecnologico_salones from "./routes/tecnologico_salones.routes.js";
import tecnologico_semestres from "./routes/tecnologico_semestres.routes.js";
// import tecnologico_usuarios from "./routes/tecnologico_usuarios.routes.js";

dotenv.config();

const PORT = process.env.APP_PORT;

const app = express();

app.use(express.json());
app.use(morgan("dev"));






app.listen(PORT,() => {
    console.log(`👨‍💻La app esta 🏃 en el puerto http://localhost:${PORT}`)
})
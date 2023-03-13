import { pool } from "../db/conection.js";

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM aspirantes_documentos ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM aspirantes_documentos WHERE curp_asp = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Task not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { 
        curp_asp,
        const_estudios,
        certificado_prepa,
        curp_d,
        identidad_ofi,
        comprobante_do,
        acta_nac,
        pago_derecho_examen,
        doc_vali,
        foto_asp,
        solicitud_ins,
        contrato_estudiante,
        num_ss,
        certificado_medico,
        formato_pago_inscripcion
     } = req.body;
    const [result] = await pool.query(
      `INSERT INTO aspirantes_documentos(
        curp_asp,
        const_estudios,
        certificado_prepa,
        curp_d,
        identidad_ofi,
        comprobante_do,
        acta_nac,
        pago_derecho_examen,
        doc_vali,
        foto_asp,
        solicitud_ins,
        contrato_estudiante,
        num_ss,
        certificado_medico,
        formato_pago_inscripcion
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        curp_asp,
        const_estudios,
        certificado_prepa,
        curp_d,
        identidad_ofi,
        comprobante_do,
        acta_nac,
        pago_derecho_examen,
        doc_vali,
        foto_asp,
        solicitud_ins,
        contrato_estudiante,
        num_ss,
        certificado_medico,
        formato_pago_inscripcion
      ]
    );
    res.json({
        curp_asp,
        const_estudios,
        certificado_prepa,
        curp_d,
        identidad_ofi,
        comprobante_do,
        acta_nac,
        pago_derecho_examen,
        doc_vali,
        foto_asp,
        solicitud_ins,
        contrato_estudiante,
        num_ss,
        certificado_medico,
        formato_pago_inscripcion
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const result = await pool.query("UPDATE aspirantes_documentos SET ? WHERE curp_asp = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM aspirantes_documentos WHERE curp_asp = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
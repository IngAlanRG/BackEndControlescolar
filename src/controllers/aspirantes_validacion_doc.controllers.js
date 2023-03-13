import { pool } from "../db/conection.js";

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM aspirantes_validacion_doc ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM aspirantes_validacion_doc WHERE curp_asp = ?", [
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
        check_const_estudios,
        check_certificado_prepa,
        check_curp,
        check_identidad_ofi,
        check_comprobante_dom,
        check_acta_nac,
        check_pago_prere,
        check_docvali,
        check_foto_asp,
        check_solicitud_insc,
        check_contrato_estudiante,
        check_num_ss,
        check_certificado_medico,
        check_formato_pago,
        check_boleta
     } = req.body;
    const [result] = await pool.query(
      `INSERT INTO aspirantes_validacion_doc(
        curp_asp,
        check_const_estudios,
        check_certificado_prepa,
        check_curp,
        check_identidad_ofi,
        check_comprobante_dom,
        check_acta_nac,
        check_pago_prere,
        check_docvali,
        check_foto_asp,
        check_solicitud_insc,
        check_contrato_estudiante,
        check_num_ss,
        check_certificado_medico,
        check_formato_pago,
        check_boleta
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        curp_asp,
        check_const_estudios,
        check_certificado_prepa,
        check_curp,
        check_identidad_ofi,
        check_comprobante_dom,
        check_acta_nac,
        check_pago_prere,
        check_docvali,
        check_foto_asp,
        check_solicitud_insc,
        check_contrato_estudiante,
        check_num_ss,
        check_certificado_medico,
        check_formato_pago,
        check_boleta
      ]
    );
    res.json({
        curp_asp,
        check_const_estudios,
        check_certificado_prepa,
        check_curp,
        check_identidad_ofi,
        check_comprobante_dom,
        check_acta_nac,
        check_pago_prere,
        check_docvali,
        check_foto_asp,
        check_solicitud_insc,
        check_contrato_estudiante,
        check_num_ss,
        check_certificado_medico,
        check_formato_pago,
        check_boleta
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const result = await pool.query("UPDATE aspirantes_validacion_doc SET ? WHERE curp_asp = ?", [
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
    const [result] = await pool.query("DELETE FROM aspirantes_validacion_doc WHERE curp_asp = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
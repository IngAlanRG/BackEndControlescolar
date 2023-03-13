import { pool } from "../db/conection.js";

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM aspirantes_validacion_info ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM aspirantes_validacion_info WHERE curp_asp = ?", [
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
        check_info_basica,
        check_info_padres,
        check_info_emergencia,
        check_socioeconomico,
        check_ubicacion
     } = req.body;
    const [result] = await pool.query(
      `INSERT INTO aspirantes_validacion_info(
        curp_asp,
        check_info_basica,
        check_info_padres,
        check_info_emergencia,
        check_socioeconomico,
        check_ubicacion
      ) VALUES (?,?,?,?,?,?)`,
      [
        curp_asp,
        check_info_basica,
        check_info_padres,
        check_info_emergencia,
        check_socioeconomico,
        check_ubicacion
      ]
    );
    res.json({
        curp_asp,
        check_info_basica,
        check_info_padres,
        check_info_emergencia,
        check_socioeconomico,
        check_ubicacion
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const result = await pool.query("UPDATE aspirantes_validacion_info SET ? WHERE curp_asp = ?", [
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
    const [result] = await pool.query("DELETE FROM aspirantes_validacion_info WHERE curp_asp = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
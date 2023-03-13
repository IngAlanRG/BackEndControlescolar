import { pool } from "../db/conection.js";

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM aspirantes_casoemergencia ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM aspirantes_casoemergencia WHERE curp_asp = ?", [
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
        emer_nombre,
        emer_colonia,
        emer_calle,
        emer_num_ext,
        emer_tel,
        emer_tel_trabajo,
        emer_lugar_trabajo
     } = req.body;
    const [result] = await pool.query(
      `INSERT INTO aspirantes_casoemergencia(
        curp_asp,
        emer_nombre,
        emer_colonia,
        emer_calle,
        emer_num_ext,
        emer_tel,
        emer_tel_trabajo,
        emer_lugar_trabajo
      ) VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        curp_asp,
        emer_nombre,
        emer_colonia,
        emer_calle,
        emer_num_ext,
        emer_tel,
        emer_tel_trabajo,
        emer_lugar_trabajo
      ]
    );
    res.json({
        curp_asp,
        emer_nombre,
        emer_colonia,
        emer_calle,
        emer_num_ext,
        emer_tel,
        emer_tel_trabajo,
        emer_lugar_trabajo
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const result = await pool.query("UPDATE aspirantes_casoemergencia SET ? WHERE curp_asp = ?", [
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
    const [result] = await pool.query("DELETE FROM aspirantes_casoemergencia WHERE curp_asp = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
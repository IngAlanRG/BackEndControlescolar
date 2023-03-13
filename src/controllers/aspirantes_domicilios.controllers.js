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
        id_ubicacion,
        dir_calle,
        num_int,
        num_ext,
        entre_calle1,
        entre_calle2,
        dir_referencia
    } = req.body;
    const [result] = await pool.query(
      `INSERT INTO Tasks(
        curp_asp,
        id_ubicacion,
        dir_calle,
        num_int,
        num_ext,
        entre_calle1,
        entre_calle2,
        dir_referencia
      ) VALUES (?,?,?,?,?,?,?,?)`,
      [
        curp_asp,
        id_ubicacion,
        dir_calle,
        num_int,
        num_ext,
        entre_calle1,
        entre_calle2,
        dir_referencia
      ]
    );
    res.json({
        curp_asp,
        id_ubicacion,
        dir_calle,
        num_int,
        num_ext,
        entre_calle1,
        entre_calle2,
        dir_referencia
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
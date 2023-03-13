import { pool } from "../db/conection.js";

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM aspirantes_preregistros ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM aspirantes_preregistros WHERE curp_asp = ?", [
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
        folio_preregistro,
        metodo_admi,
        primera_opcion,
        turno1,
        segunda_opcion,
        turno2,
        periodo_inscripcion,
        usuario_ceneval,
        password_ceneval
    } = req.body;
    const [result] = await pool.query(
      `INSERT INTO aspirantes_preregistros(
        curp_asp,
        folio_preregistro,
        metodo_admi,
        primera_opcion,
        turno1,
        segunda_opcion,
        turno2,
        periodo_inscripcion,
        usuario_ceneval,
        password_ceneval
      ) VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [
        curp_asp,
        folio_preregistro,
        metodo_admi,
        primera_opcion,
        turno1,
        segunda_opcion,
        turno2,
        periodo_inscripcion,
        usuario_ceneval,
        password_ceneval
      ]
    );
    res.json({
        curp_asp,
        folio_preregistro,
        metodo_admi,
        primera_opcion,
        turno1,
        segunda_opcion,
        turno2,
        periodo_inscripcion,
        usuario_ceneval,
        password_ceneval
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const result = await pool.query("UPDATE aspirantes_preregistros SET ? WHERE curp_asp = ?", [
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
    const [result] = await pool.query("DELETE FROM aspirantes_preregistros WHERE curp_asp = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
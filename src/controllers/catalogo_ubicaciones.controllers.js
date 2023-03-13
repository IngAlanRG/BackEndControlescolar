import { pool } from "../db/conection.js";

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM catalogo_ubicaciones ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM catalogo_ubicaciones WHERE id_ubicacion = ?", [
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
        id_ubicacion,
        id_estado,
        municipio,
        asentamiento,
        codigo_postal
    } = req.body;
    const [result] = await pool.query(
      `INSERT INTO catalogo_ubicaciones(
        id_ubicacion,
        id_estado,
        municipio,
        asentamiento,
        codigo_postal
      ) VALUES (?, ?)`,
      [
        id_ubicacion,
        id_estado,
        municipio,
        asentamiento,
        codigo_postal
      ]
    );
    res.json({
        id_ubicacion,
        id_estado,
        municipio,
        asentamiento,
        codigo_postal
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const result = await pool.query("UPDATE catalogo_ubicaciones SET ? WHERE id_ubicacion = ?", [
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
    const [result] = await pool.query("DELETE FROM catalogo_ubicaciones WHERE id_ubicacion = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
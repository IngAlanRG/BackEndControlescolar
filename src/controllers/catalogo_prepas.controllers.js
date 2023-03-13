import { pool } from "../db/conection.js";

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM catalogo_prepas ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM catalogo_prepas WHERE id_catalogo_prepas = ?", [
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
        id_catalogo_prepas,
        cct_plantel,
        nombre_institucion,
        tipo_sector
    } = req.body;
    const [result] = await pool.query(
      `INSERT INTO catalogo_prepas(
        id_catalogo_prepas,
        cct_plantel,
        nombre_institucion,
        tipo_sector
      ) VALUES (?, ?, ?, ?)`,
      [
        id_catalogo_prepas,
        cct_plantel,
        nombre_institucion,
        tipo_sector
      ]
    );
    res.json({
        id_catalogo_prepas,
        cct_plantel,
        nombre_institucion,
        tipo_sector
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const result = await pool.query("UPDATE catalogo_prepas SET ? WHERE id_catalogo_prepas = ?", [
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
    const [result] = await pool.query("DELETE FROM catalogo_prepas WHERE id_catalogo_prepas = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
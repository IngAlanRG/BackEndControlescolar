import { pool } from "../db/conection.js";

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM gen_folios_ingenieria_informatica ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM gen_folios_ingenieria_informatica WHERE id_folio = ?", [
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
        metodo_admi,
        anio,
        id_periodo,
        id_carrera,
        id_fase
    } = req.body;
    const [result] = await pool.query(
      `INSERT INTO gen_folios_ingenieria_informatica(
        curp_asp,
        metodo_admi,
        anio,
        id_periodo,
        id_carrera,
        id_fase
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        curp_asp,
        metodo_admi,
        anio,
        id_periodo,
        id_carrera,
        id_fase
      ]
    );
    res.json({
      id: result.insertId,
      curp_asp,
      metodo_admi,
      anio,
      id_periodo,
      id_carrera,
      id_fase
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const result = await pool.query("UPDATE gen_folios_ingenieria_informatica SET ? WHERE id_folio = ?", [
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
    const [result] = await pool.query("DELETE FROM gen_folios_ingenieria_informatica WHERE id_folio = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
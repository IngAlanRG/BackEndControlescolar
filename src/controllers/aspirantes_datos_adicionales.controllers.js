import { pool } from "../db/conection.js";

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM aspirantes_datos_adicionales ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM aspirantes_datos_adicionales WHERE curp_asp = ?", [
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
        incapacidad,
        zona_procedencia,
        zona_afrodescendiente,
        eres_indigena,
        zona_indigena,
        dialecto,
        beca,
        programa_oportunidades
    } = req.body;
    const [result] = await pool.query(
      `INSERT INTO aspirantes_datos_adicionales(
        curp_asp,
        incapacidad,
        zona_procedencia,
        zona_afrodescendiente,
        eres_indigena,
        zona_indigena,
        dialecto,
        beca,
        programa_oportunidades
      ) VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        curp_asp,
        incapacidad,
        zona_procedencia,
        zona_afrodescendiente,
        eres_indigena,
        zona_indigena,
        dialecto,
        beca,
        programa_oportunidades
      ]
    );
    res.json({
        curp_asp,
        incapacidad,
        zona_procedencia,
        zona_afrodescendiente,
        eres_indigena,
        zona_indigena,
        dialecto,
        beca,
        programa_oportunidades
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const result = await pool.query("UPDATE aspirantes_datos_adicionales SET ? WHERE curp_asp = ?", [
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
    const [result] = await pool.query("DELETE FROM aspirantes_datos_adicionales WHERE curp_asp = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
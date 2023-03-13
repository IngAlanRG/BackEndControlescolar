import { pool } from "../db/conection.js";

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM aspirantes_socioeconomico ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM aspirantes_socioeconomico WHERE curp_asp = ?", [
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
        ocupacion_padre,
        ocupacion_madre,
        otro_trabajo_p,
        otro_trabajo_m,
        dependes_eco,
        pertenencia_casa,
        dependientes,
        personas_viven,
        ingreso_padre,
        ingreso_madre,
        ingreso_hermanos,
        ingreso_propios,
        ingreso_otros,
        ingreso_total,
        num_habitaciones,
        num_personas
     } = req.body;
    const [result] = await pool.query(
      `INSERT INTO aspirantes_socioeconomico(
        curp_asp,
        ocupacion_padre,
        ocupacion_madre,
        otro_trabajo_p,
        otro_trabajo_m,
        dependes_eco,
        pertenencia_casa,
        dependientes,
        personas_viven,
        ingreso_padre,
        ingreso_madre,
        ingreso_hermanos,
        ingreso_propios,
        ingreso_otros,
        ingreso_total,
        num_habitaciones,
        num_personas
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        curp_asp,
        ocupacion_padre,
        ocupacion_madre,
        otro_trabajo_p,
        otro_trabajo_m,
        dependes_eco,
        pertenencia_casa,
        dependientes,
        personas_viven,
        ingreso_padre,
        ingreso_madre,
        ingreso_hermanos,
        ingreso_propios,
        ingreso_otros,
        ingreso_total,
        num_habitaciones,
        num_personas
      ]
    );
    res.json({
        curp_asp,
        ocupacion_padre,
        ocupacion_madre,
        otro_trabajo_p,
        otro_trabajo_m,
        dependes_eco,
        pertenencia_casa,
        dependientes,
        personas_viven,
        ingreso_padre,
        ingreso_madre,
        ingreso_hermanos,
        ingreso_propios,
        ingreso_otros,
        ingreso_total,
        num_habitaciones,
        num_personas
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const result = await pool.query("UPDATE aspirantes_socioeconomico SET ? WHERE curp_asp = ?", [
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
    const [result] = await pool.query("DELETE FROM aspirantes_socioeconomico WHERE curp_asp = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
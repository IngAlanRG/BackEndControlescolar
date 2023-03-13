import { pool } from "../db/conection.js";

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM aspirantes_infopadres ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM aspirantes_infopadres WHERE curp_asp = ?", [
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
        nom_padre,
        apell_paterno_p,
        apell_materno_p,
        correo_padre,
        vive_padre,
        nom_madre,
        apell_paterno_m,
        apell_materno_m,
        correo_madre,
        vive_madre,
        estudios_padre,
        otros_estudios_p,
        estudios_madre,
        otros_estudios_m,
        vives_con
     } = req.body;
    const [result] = await pool.query(
      `INSERT INTO aspirantes_infopadres(
        curp_asp,
        nom_padre,
        apell_paterno_p,
        apell_materno_p,
        correo_padre,
        vive_padre,
        nom_madre,
        apell_paterno_m,
        apell_materno_m,
        correo_madre,
        vive_madre,
        estudios_padre,
        otros_estudios_p,
        estudios_madre,
        otros_estudios_m,
        vives_con
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        curp_asp,
        nom_padre,
        apell_paterno_p,
        apell_materno_p,
        correo_padre,
        vive_padre,
        nom_madre,
        apell_paterno_m,
        apell_materno_m,
        correo_madre,
        vive_madre,
        estudios_padre,
        otros_estudios_p,
        estudios_madre,
        otros_estudios_m,
        vives_con
      ]
    );
    res.json({
        curp_asp,
        nom_padre,
        apell_paterno_p,
        apell_materno_p,
        correo_padre,
        vive_padre,
        nom_madre,
        apell_paterno_m,
        apell_materno_m,
        correo_madre,
        vive_madre,
        estudios_padre,
        otros_estudios_p,
        estudios_madre,
        otros_estudios_m,
        vives_con
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const result = await pool.query("UPDATE aspirantes_infopadres SET ? WHERE curp_asp = ?", [
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
    const [result] = await pool.query("DELETE FROM aspirantes_infopadres WHERE curp_asp = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
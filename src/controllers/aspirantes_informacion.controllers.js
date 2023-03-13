import { pool } from "../db/conection.js";

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM aspirantes_informacion ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM aspirantes_informacion WHERE id = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "aspirantes_informacion not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { 
            curp_asp,
            primer_nombre_asp,
            segundo_nombre_asp,
            tercer_nombre_asp,
            apellido_paterno_asp,
            apellido_materno_asp,
            fecha_nac_asp,
            edad_asp,
            nacionalidad_asp,
            tel_celular_asp,
            tel_casa_asp,
            num_segurosocial_asp,
            num_clinica_asp,
            estado_civil_asp,
            sexo_asp
     } = req.body;
    const [result] = await pool.query(
      `INSERT INTO aspirantes_informacion(
            curp_asp,
            primer_nombre_asp,
            segundo_nombre_asp,
            tercer_nombre_asp,
            apellido_paterno_asp,
            apellido_materno_asp,
            fecha_nac_asp,
            edad_asp,
            nacionalidad_asp,
            tel_celular_asp,
            tel_casa_asp,
            num_segurosocial_asp,
            num_clinica_asp,
            estado_civil_asp,
            sexo_asp
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
            curp_asp,
            primer_nombre_asp,
            segundo_nombre_asp,
            tercer_nombre_asp,
            apellido_paterno_asp,
            apellido_materno_asp,
            fecha_nac_asp,
            edad_asp,
            nacionalidad_asp,
            tel_celular_asp,
            tel_casa_asp,
            num_segurosocial_asp,
            num_clinica_asp,
            estado_civil_asp,
            sexo_asp
      ]
    );
    res.json({
            curp_asp,
            primer_nombre_asp,
            segundo_nombre_asp,
            tercer_nombre_asp,
            apellido_paterno_asp,
            apellido_materno_asp,
            fecha_nac_asp,
            edad_asp,
            nacionalidad_asp,
            tel_celular_asp,
            tel_casa_asp,
            num_segurosocial_asp,
            num_clinica_asp,
            estado_civil_asp,
            sexo_asp
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const result = await pool.query("UPDATE aspirantes_informacion SET ? WHERE id = ?", [
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
    const [result] = await pool.query("DELETE FROM aspirantes_informacion WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "aspirantes_informacion not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
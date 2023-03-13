import { pool } from "../db/conection.js";

export const getTasks = async (req, res) => {
    try {
        const [result] = await pool.query(
            "SELECT * FROM catalogo_estados ORDER BY createAt ASC"
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM catalogo_estados WHERE id = ?", [
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
            id_estado,
            clave_estado,
            nombre_estado,
            abreviatura_estado,
            activo_estado
        } = req.body;
        const [result] = await pool.query(
            `INSERT INTO catalogo_estados(
        id_estado,
        clave_estado,
        nombre_estado,
        abreviatura_estado,
        activo_estado
      ) VALUES (?, ?, ?, ?, ?)`,
            [id_estado,
                clave_estado,
                nombre_estado,
                abreviatura_estado,
                activo_estado]
        );
        res.json({
            id_estado,
            clave_estado,
            nombre_estado,
            abreviatura_estado,
            activo_estado
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const result = await pool.query("UPDATE catalogo_estados SET ? WHERE id = ?", [
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
        const [result] = await pool.query("DELETE FROM catalogo_estados WHERE id = ?", [
            req.params.id,
        ]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Task not found" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
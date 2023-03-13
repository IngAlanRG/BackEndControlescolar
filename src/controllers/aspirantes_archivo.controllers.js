import { pool } from "../db/conection.js";

export const getTasks = async (req, res) => {
    try {
        const [result] = await pool.query(
            "SELECT * FROM aspirantes_archivo"
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM `aspirantes_archivo` WHERE curp_asp = ?", [
            req.params.id,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "usuario no encontrado" });

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createTask = async (req, res) => {
    try {
        let {
            curp_asp,
            emer_nombre,
            emer_colonia,
            emer_calle,
            emer_num_ext,
            emer_tel,
            emer_tel_trabajo,
            emer_lugar_trabajo,
            incapacidad,
            zona_procedencia,
            otra_zona_procedencia,
            dialecto,
            otro_dialecto,
            beca,
            otra_beca,
            programa_oportunidades,
            dir_calle,
            num_int,
            num_ext,
            entre_calle1,
            entre_calle2,
            dir_referencia,
            promedio_prepa,
            egreso_prepa,
            nom_padre,
            apell_paterno_p,
            apell_materno_p,
            vive_padre,
            nom_madre,
            apell_paterno_m,
            apell_materno_m,
            vive_madre,
            estudios_padre,
            otros_estudios_p,
            estudios_madre,
            otros_estudios_m,
            vives_con,
            primer_nombre_asp,
            segundo_nombre_asp,
            tercer_nombre_asp,
            apellido_paterno_asp,
            apellido_materno_asp,
            fecha_nac_asp,
            edad_asp,
            correo_asp,
            nacionalidad_asp,
            tel_celular_asp,
            tel_casa_asp,
            num_segurosocial_asp,
            num_clinica_asp,
            estado_civil_asp,
            sexo_asp,
            metodo_admi,
            primera_opcion,
            turno1,
            segunda_opcion,
            turno2,
            periodo_inscripcion,
            status_preregistro,
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
            Num_habitaciones,
            Num_personas,
            folio
        } = req.body;
        const [result] = await pool.query(
            `INSERT INTO aspirantes_archivo(
                curp_asp,
                emer_nombre,
                emer_colonia,
                emer_calle,
                emer_num_ext,
                emer_tel,
                emer_tel_trabajo,
                emer_lugar_trabajo,
                incapacidad,
                zona_procedencia,
                otra_zona_procedencia,
                dialecto,
                otro_dialecto,
                beca,
                otra_beca,
                programa_oportunidades,
                dir_calle,
                num_int,
                num_ext,
                entre_calle1,
                entre_calle2,
                dir_referencia,
                promedio_prepa,
                egreso_prepa,
                nom_padre,
                apell_paterno_p,
                apell_materno_p,
                vive_padre,
                nom_madre,
                apell_paterno_m,
                apell_materno_m,
                vive_madre,
                estudios_padre,
                otros_estudios_p,
                estudios_madre,
                otros_estudios_m,
                vives_con,
                primer_nombre_asp,
                segundo_nombre_asp,
                tercer_nombre_asp,
                apellido_paterno_asp,
                apellido_materno_asp,
                fecha_nac_asp,
                edad_asp,
                correo_asp,
                nacionalidad_asp,
                tel_celular_asp,
                tel_casa_asp,
                num_segurosocial_asp,
                num_clinica_asp,
                estado_civil_asp,
                sexo_asp,
                metodo_admi,
                primera_opcion,
                turno1,
                segunda_opcion,
                turno2,
                periodo_inscripcion,
                status_preregistro,
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
                Num_habitaciones,
                Num_personas,
                folio) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
            curp_asp,
            emer_nombre,
            emer_colonia,
            emer_calle,
            emer_num_ext,
            emer_tel,
            emer_tel_trabajo,
            emer_lugar_trabajo,
            incapacidad,
            zona_procedencia,
            otra_zona_procedencia,
            dialecto,
            otro_dialecto,
            beca,
            otra_beca,
            programa_oportunidades,
            dir_calle,
            num_int,
            num_ext,
            entre_calle1,
            entre_calle2,
            dir_referencia,
            promedio_prepa,
            egreso_prepa,
            nom_padre,
            apell_paterno_p,
            apell_materno_p,
            vive_padre,
            nom_madre,
            apell_paterno_m,
            apell_materno_m,
            vive_madre,
            estudios_padre,
            otros_estudios_p,
            estudios_madre,
            otros_estudios_m,
            vives_con,
            primer_nombre_asp,
            segundo_nombre_asp,
            tercer_nombre_asp,
            apellido_paterno_asp,
            apellido_materno_asp,
            fecha_nac_asp,
            edad_asp,
            correo_asp,
            nacionalidad_asp,
            tel_celular_asp,
            tel_casa_asp,
            num_segurosocial_asp,
            num_clinica_asp,
            estado_civil_asp,
            sexo_asp,
            metodo_admi,
            primera_opcion,
            turno1,
            segunda_opcion,
            turno2,
            periodo_inscripcion,
            status_preregistro,
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
            Num_habitaciones,
            Num_personas,
            folio
        ]);
        res.json({
            curp_asp,
            emer_nombre,
            emer_colonia,
            emer_calle,
            emer_num_ext,
            emer_tel,
            emer_tel_trabajo,
            emer_lugar_trabajo,
            incapacidad,
            zona_procedencia,
            otra_zona_procedencia,
            dialecto,
            otro_dialecto,
            beca,
            otra_beca,
            programa_oportunidades,
            dir_calle,
            num_int,
            num_ext,
            entre_calle1,
            entre_calle2,
            dir_referencia,
            promedio_prepa,
            egreso_prepa,
            nom_padre,
            apell_paterno_p,
            apell_materno_p,
            vive_padre,
            nom_madre,
            apell_paterno_m,
            apell_materno_m,
            vive_madre,
            estudios_padre,
            otros_estudios_p,
            estudios_madre,
            otros_estudios_m,
            vives_con,
            primer_nombre_asp,
            segundo_nombre_asp,
            tercer_nombre_asp,
            apellido_paterno_asp,
            apellido_materno_asp,
            fecha_nac_asp,
            edad_asp,
            correo_asp,
            nacionalidad_asp,
            tel_celular_asp,
            tel_casa_asp,
            num_segurosocial_asp,
            num_clinica_asp,
            estado_civil_asp,
            sexo_asp,
            metodo_admi,
            primera_opcion,
            turno1,
            segunda_opcion,
            turno2,
            periodo_inscripcion,
            status_preregistro,
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
            Num_habitaciones,
            Num_personas,
            folio
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const result = await pool.query("UPDATE aspirantes_archivo SET ? WHERE curp_asp = ?", [
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
        const [result] = await pool.query("DELETE FROM aspirantes_archivo WHERE curp_asp = ?", [
            req.params.id,
        ]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Usuario no encontrado" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

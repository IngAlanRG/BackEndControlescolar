import { pool } from "../db/conection.js";
import jwt from "jsonwebtoken";
import promisify from "util";
import bcrypt from "bcryptjs"

export const createTecU = async (req, res) => {
    try {
        let {
            nombre_user,
            apellidoP_user,
            apellidoM_user,
            corre_user,
            tipo_user,
            password_user
        } = req.body;

        password_user = await bcrypt.hash(password_user, 8);

        const [result] = await pool.query(
            `INSERT INTO tecnologico_usuarios(
                nombre_user,
                apellidoP_user,
                apellidoM_user,
                corre_user,
                tipo_user,
                password_user) 
            VALUES (?,?,?,?,?,?)`, [
            nombre_user,
            apellidoP_user,
            apellidoM_user,
            corre_user,
            tipo_user,
            password_user
        ]);
        res.json({
            id: result.insertId,
            nombre_user,
            apellidoP_user,
            apellidoM_user,
            corre_user,
            tipo_user,
            password_user
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const loginTecU = async (req, res) => {
    try {
        let {
            nombre_user,
            password_user
        } = req.body;
        if (!nombre_user || !password_user) {
            res.render('login', {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        } else {
            conexion.query('SELECT * FROM tecnologico_usuarios WHERE user = ?', [nombre_user], async (error, results) => {
                if (results.length == 0 || !(await bcrypt.compare(password_user, results[0].password_user))) {
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o Password incorrectas",
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    })
                } else {
                    //inicio de sesión OK
                    const id = results[0].id
                    const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    //generamos el token SIN fecha de expiracion
                    //const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
                    console.log("TOKEN: " + token + " para el USUARIO : " + nombre_user)

                    const cookiesOptions = {
                        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookiesOptions)
                    res.render('login', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡LOGIN CORRECTO!",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 800,
                        ruta: ''
                    })
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
};
export const isAuthenticatedTecU = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM users WHERE id = ?', [decodificada.id], (error, results) => {
                if (!results) { return next() }
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    } else {
        res.redirect('/login')
    }
};

// export const updateTecU = async (req, res) => {
    //     try {
        //         const result = await pool.query("UPDATE tecnologico_usuarios SET ? WHERE id_usuario = ?", [
            //             req.body,
//             req.params.id,
//         ]);
//         res.json(result);
//     } catch (error) {
    //         return res.status(500).json({ message: error.message });
//     }
// };


// export const deleteTecU = async (req, res) => {
//     try {
    //         const [result] = await pool.query("DELETE FROM tecnologico_usuarios WHERE id_usuario = ?", [
        //             req.params.id,
        //         ]);

        //         if (result.affectedRows === 0)
//             return res.status(404).json({ message: "Usuario no encontrado" });

//         return res.sendStatus(204);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const getTecU = async (req, res) => {
//     try {
//         const [result] = await pool.query(
//             "SELECT * FROM tecnologico_usuarios"
//         );
//         res.json(result);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const getTecUs = async (req, res) => {
//     try {
//         const [result] = await pool.query("SELECT * FROM `tecnologico_usuarios` WHERE id_usuario = ?", [
//             req.params.id,
//         ]);
//         console.log("Hola")

//         if (result.length === 0)
//             return res.status(404).json({ message: "usuario no encontrado" });

//         res.json(result[0]);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };
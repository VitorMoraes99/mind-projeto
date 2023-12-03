import {db} from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM Curso";

    db.query (q, (err, data) =>{
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    const q =
    "INSERT INTO Curso (`nome`, `professor_responsável`, `categoria`, `descricao`, `imagem`) VALUES (?)";

    const VALUES = [
        req.body.nome,
        req.body.professor_resposavel,
        req.body.categoria,
        req.body.descricao,
        req.body.imagem,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json (err)
        return res.status (200).json ("Curso Criado com Sucesso.");
    });
};

    export const updateUser = (req, res) => {
        const q =
            "UPDATE curso SET `nome` = ?, `professor_responsavel`= ?, `categoria`= ?, `descricao`= ?, `imagem`= ? WHERE `id` =?";
    
        const values = [
            req.body.nome,
            req.body.professor_responsavel,
            req.body.categoria,
            req.body.descricao,
            req.body.imagem,
        ];
    
        db.query(q, [...values, req.params.id], (err) => {
            if (err) return res.json(err);
    
            return res.status(200).json("Curso Atualizado com Sucesso.");
        });
    };       
export const deleteUser =(req, res) => {
    const q = "DELETE FROM curso WHERE `id` = ?";

    db.query (q, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json ("Usuario Deletado com Sucesso.")
    })
}
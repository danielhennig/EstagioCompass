
// methods: create, destroy, get, getAll, update
/*
index: listagem de sessoes
store: criar uma sessionStorage
show: quando queremos listar uma unica sessao
update: alterar uma sessao
destroy: deletar uma sessao
*/

import User from '../models/User.js';
class SessionController {

    async store(req, res) {

        const { email } = req.body;

        let user = await User.create({ email });

        return res.json(user);

    }
}

export default new SessionController();
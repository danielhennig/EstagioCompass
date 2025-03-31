
// methods: create, destroy, get, getAll, update
/*
index: listagem de sessoes
store: criar uma sessionStorage
show: quando queremos listar uma unica sessao
update: alterar uma sessao
destroy: deletar uma sessao
*/
class SessionController {

    store(req, res) {
        return res.json({ message: 'Minha api!' });

    }
}

export default new SessionController();
<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Usuario.php';

$usuarioModel = new Usuario($conn);

header('Content-Type: application/json');

$request_body = file_get_contents('php://input');
$dados = json_decode($request_body, true);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode($usuarioModel->listar());

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';

    if ($usuarioModel->inserir($nome, $email)) {
        echo json_encode(["sucesso" => true, "mensagem" => "Usuário cadastrado com sucesso!"]);
    } else {
        echo json_encode(["erro" => "Erro ao cadastrar usuário. Verifique se o e-mail já existe."]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $id = $dados['id'] ?? 0;
    $nome = $dados['nome'] ?? '';
    $email = $dados['email'] ?? '';

    if ($usuarioModel->atualizar($id, $nome, $email)) {
        echo json_encode(["sucesso" => true, "mensagem" => "Usuário atualizado com sucesso!"]);
    } else {
        echo json_encode(["erro" => "Erro ao atualizar usuário."]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $dados['id'] ?? 0;

    if ($usuarioModel->excluir($id)) {
        echo json_encode(["sucesso" => true, "mensagem" => "Usuário excluído com sucesso!"]);
    } else {
        echo json_encode(["erro" => "Erro ao excluir usuário."]);
    }
}
?>
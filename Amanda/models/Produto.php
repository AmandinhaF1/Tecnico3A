<?php
class Produto {
    private $conn;
    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function listar() {
        $sql = "SELECT id, nome, quantidade, preco FROM produtos";
        $resultado = $this->conn->query($sql);
        $produtos = [];
        if ($resultado) {
            while ($linha = $resultado->fetch_assoc()) {
                $produtos[] = $linha;
            }
        }
        return $produtos;
    }
    public function inserir($nome, $quantidade, $preco) {
        $sql = "INSERT INTO produtos (nome, quantidade, preco) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        if ($stmt === false) {
            die('Erro na preparação da query: ' . $this->conn->error);
        }
        $stmt->bind_param("sii", $nome, $quantidade, $preco);
        $resultado = $stmt->execute();
        $stmt->close();
        return $resultado;
    }
    public function atualizar($id, $nome, $quantidade, $preco) {
        $sql = "UPDATE produtos SET nome = ?, quantidade = ?, preco = ? WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        if ($stmt === false) {
            die('Erro na preparação da query: ' . $this->conn->error);
        }
        $stmt->bind_param("siid", $nome, $quantidade, $preco, $id);
        $resultado = $stmt->execute();
        $stmt->close();
        return $resultado;
    }

    public function excluir($id) {
        $sql = "DELETE FROM produtos WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        if ($stmt === false) {
            die('Erro na preparação da query: ' . $this->conn->error);
        }
        $stmt->bind_param("i", $id);
        $resultado = $stmt->execute();
        $stmt->close();
        return $resultado;
    }
}
?>
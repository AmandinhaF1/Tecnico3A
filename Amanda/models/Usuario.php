<?php
class Usuario {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function listar() {
        $sql = "SELECT id, nome, email FROM usuarios";
        $resultado = $this->conn->query($sql);
        $usuarios = [];
        if ($resultado) {
            while ($linha = $resultado->fetch_assoc()) {
                $usuarios[] = $linha;
            }
        }
        return $usuarios;
    }

    public function inserir($nome, $email) {
        $sql = "INSERT INTO usuarios (nome, email) VALUES (?, ?)";
        $stmt = $this->conn->prepare($sql);
        if ($stmt === false) {
            die('Erro na preparação da query: ' . $this->conn->error);
        }
        $stmt->bind_param("ss", $nome, $email);
        $resultado = $stmt->execute();
        $stmt->close();
        return $resultado;
    }

    public function atualizar($id, $nome, $email) {
        $sql = "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        if ($stmt === false) {
            die('Erro na preparação da query: ' . $this->conn->error);
        }
        $stmt->bind_param("ssi", $nome, $email, $id);
        $resultado = $stmt->execute();
        $stmt->close();
        return $resultado;
    }

    public function excluir($id) {
        $sql = "DELETE FROM usuarios WHERE id = ?";
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
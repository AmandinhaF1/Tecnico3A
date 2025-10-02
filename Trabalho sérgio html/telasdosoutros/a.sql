CREATE TABLE plano_contas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    descricao TEXT
);
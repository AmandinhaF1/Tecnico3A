CREATE TABLE `nb_airlines`.`ultimas_compras` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `codigo_produto` INT NOT NULL,
  `nome_produto` VARCHAR(100) NOT NULL,
  `data_compra` DATE NOT NULL,
  `valor` DECIMAL(10, 2) NOT NULL, -- Alterado de DOUBLE para DECIMAL para maior precisão monetária.
  `descricao_produto` VARCHAR(255) NOT NULL, -- Aumentado de 100 para 255 para descrições mais longas.
  `quantidade_produto` INT NOT NULL,
  `nome_fornecedor` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
)
<?php

class Comida
{
    public $nome;
    public $tempero;
    public $lugar_de_origem;
    public $preco;
    public $acompanhamento;
    
    public function comprar()
    {
        echo "Um prato X saindo";
    }
    public function definirNome($nome)
    {
        $this->nome = $nome;
    }
    public function alterarTempero($tempero)
    {
        $this->tempero = $tempero;
    }
    public function alterarPreco($preco)
    {
        $this->preco = $preco;
    }
    public function alterarAcompanhamento($acompanhamento)
    {
        $this->acompanhamento = $acompanhamento;
    }
}

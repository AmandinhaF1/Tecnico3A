<?php

$linguagens = ["PHP","C#","JAVA"];

$linguagens2 = array("PHP","C#","JAVA");

$curso = ["curso de fundamentos de PHP", 8.1, 40, true];

$curso = [
   "nome_curso"=> "curso de fundamentos de PHP",
   "versao_ferramenta" =>8.1,
   "carga_horario" => 40,
   "status" => true
];
$numeros = [
    [1,2,3,4],     //0
    [5,6,7,8,9],   //1
    [10,[11,12,13]]//2
];

$curso = [
    "php" => [
    "nome_curso" => "curso de fundamentos de PHP",
    "versao_ferramenta" => 8.1,
    "carga_horario" => 40,
   "status" => true
    ],
    "Java"=>[
        "nome_curso"=> "curso de fundamento de Java",
        "versão_ferramenta"=>11.4,
        "carga_horario"=>30,
        "status"=>true
    ]

 ];

 echo $curso["Java"] ["nome_curso"];

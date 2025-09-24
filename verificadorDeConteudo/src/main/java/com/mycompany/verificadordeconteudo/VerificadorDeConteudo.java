package com.mycompany.verificadordeconteudo;

import java.util.Scanner;

public class VerificadorDeConteudo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Digite uma frase:");
        String frase = scanner.nextLine();

        System.out.println("Digite uma palavra para verificar se ela está na frase:");
        String palavra = scanner.nextLine();

        if (frase.contains(palavra)) {
            System.out.println("A frase contém a palavra '" + palavra + "'.");
        } else {
            System.out.println("A frase NÃO contém a palavra '" + palavra + "'.");
        }

        scanner.close();
    }
}
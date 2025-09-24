package com.mycompany.verificadordepalindromos;

import java.util.Scanner;

public class VerificadorDePalindromos {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Digite uma palavra para verificar se é um palíndromo:");
        String palavra = scanner.nextLine();

        String palavraLimpa = palavra.toLowerCase();

        String palavraInvertida = new StringBuilder(palavraLimpa).reverse().toString();

        if (palavraLimpa.equals(palavraInvertida)) {
            System.out.println("A palavra \"" + palavra + "\" é um palíndromo.");
        } else {
            System.out.println("A palavra \"" + palavra + "\" não é um palíndromo.");
        }

        scanner.close();
    }
}

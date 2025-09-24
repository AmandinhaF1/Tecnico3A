package com.mycompany.extracaodesubstring;

import java.util.Scanner;

public class ExtracaoDeSubstring {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Digite uma frase:");
        String frase = scanner.nextLine();

        if (frase.length() >= 5) {
            String primeirosCaracteres = frase.substring(0, 5);
            System.out.println("Os 5 primeiros caracteres são: " + primeirosCaracteres);
        } else {
            System.out.println("A frase é muito curta. A frase completa é: " + frase);
        }

        scanner.close();
    }
}
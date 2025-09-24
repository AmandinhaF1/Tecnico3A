package com.mycompany.substituicaodecaracteres;

import java.util.Scanner;

public class SubstituicaoDeCaracteres {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Digite uma frase:");
        String fraseOriginal = scanner.nextLine();

        String fraseModificada = fraseOriginal.replace('a', 'e');

        System.out.println("\nFrase original: " + fraseOriginal);
        System.out.println("Frase modificada: " + fraseModificada);

        scanner.close();
    }
}
package com.mycompany.contadordecaracteres;

import java.util.Scanner;

public class ContadorDeCaracteres {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Por favor, digite uma frase:");
        
        String frase = scanner.nextLine();

        int numeroDeCaracteres = frase.length();

        System.out.println("A frase digitada tem " + numeroDeCaracteres + " caracteres.");

        scanner.close();
    }
}
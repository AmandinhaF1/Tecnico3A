package com.mycompany.conversordeletras;

import java.util.Scanner;

public class ConversorDeLetras {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Por favor, digite uma palavra ou frase:");
        String textoOriginal = scanner.nextLine();

        String textoMaiusculo = textoOriginal.toUpperCase();

        String textoMinusculo = textoOriginal.toLowerCase();

        System.out.println("\n--- Versões Convertidas ---");
        System.out.println("Em letras maiúsculas: " + textoMaiusculo);
        System.out.println("Em letras minúsculas: " + textoMinusculo);

        scanner.close();
    }
}
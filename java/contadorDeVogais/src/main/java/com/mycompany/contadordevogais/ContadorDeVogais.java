package com.mycompany.contadordevogais;
import java.util.Scanner;

public class ContadorDeVogais {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Digite uma frase para contar as vogais:");
        String fraseOriginal = scanner.nextLine();

        String fraseMinuscula = fraseOriginal.toLowerCase();

        int contadorVogais = 0;

        for (int i = 0; i < fraseMinuscula.length(); i++) {
            char caractere = fraseMinuscula.charAt(i);

            if (caractere == 'a' || caractere == 'e' || caractere == 'i' || caractere == 'o' || caractere == 'u') {
                contadorVogais++;
            }
        }

        System.out.println("A frase tem " + contadorVogais + " vogais.");

        scanner.close();
    }
}
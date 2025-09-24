package com.mycompany.removedordeespacos;

import java.util.Scanner;

public class RemovedorDeEspacos {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Digite seu nome completo (com espaços extras no início ou fim, se desejar):");
        String nomeComEspacos = scanner.nextLine();

        String nomeLimpo = nomeComEspacos.trim();

        System.out.println("\nNome original (com espaços): '" + nomeComEspacos + "'");
        System.out.println("Nome limpo (sem espaços nas extremidades): '" + nomeLimpo + "'");

        scanner.close();
    }
}
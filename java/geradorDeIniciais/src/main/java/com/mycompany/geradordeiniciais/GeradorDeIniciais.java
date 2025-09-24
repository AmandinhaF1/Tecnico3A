package com.mycompany.geradordeiniciais;

import java.util.Scanner;

public class GeradorDeIniciais {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Digite seu nome completo:");
        String nomeCompleto = scanner.nextLine();

        String[] partesDoNome = nomeCompleto.trim().split(" ");

        String iniciais = "";

        for (String parte : partesDoNome) {
            if (!parte.isEmpty()) {
                iniciais += parte.substring(0, 1).toUpperCase();
            }
        }

        System.out.println("As iniciais do nome são: " + iniciais);

        scanner.close();
    }
}
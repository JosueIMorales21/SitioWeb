package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmbeddedTomcatApplication {

    public static void main(String[] args) {
        System.out.println("HOLA MUNDO!");
        SpringApplication.run(EmbeddedTomcatApplication.class, args);
    }
}

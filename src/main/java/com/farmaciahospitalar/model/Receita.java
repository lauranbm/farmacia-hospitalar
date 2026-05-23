package com.farmaciahospitalar.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Receita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomePaciente;

    private String nomeMedico;

    private String medicamento;

    private String dosagem;

    private Integer quantidade;

    private String observacoes;

    private String status;

    private LocalDateTime dataCriacao;
}
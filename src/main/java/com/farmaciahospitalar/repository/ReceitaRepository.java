package com.farmaciahospitalar.repository;

import com.farmaciahospitalar.model.Receita;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {
}
package com.farmaciahospitalar.repository;

import com.farmaciahospitalar.model.Medicamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicamentoRepository extends JpaRepository<Medicamento, Long> {
}
package com.farmaciahospitalar.service;

import com.farmaciahospitalar.model.Medicamento;
import com.farmaciahospitalar.repository.MedicamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicamentoService {

    @Autowired
    private MedicamentoRepository medicamentoRepository;

    public Medicamento salvar(Medicamento medicamento) {
        return medicamentoRepository.save(medicamento);
    }

    public List<Medicamento> listar() {
        return medicamentoRepository.findAll();
    }
}
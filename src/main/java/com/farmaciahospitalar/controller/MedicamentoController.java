package com.farmaciahospitalar.controller;

import com.farmaciahospitalar.model.Medicamento;
import com.farmaciahospitalar.service.MedicamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicamentos")
public class MedicamentoController {

    @Autowired
    private MedicamentoService medicamentoService;

    @PostMapping
    public Medicamento salvar(@RequestBody Medicamento medicamento) {
        return medicamentoService.salvar(medicamento);
    }

    @GetMapping
    public List<Medicamento> listar() {
        return medicamentoService.listar();
    }
}
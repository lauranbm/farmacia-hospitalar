package com.farmaciahospitalar.controller;

import com.farmaciahospitalar.model.Receita;
import com.farmaciahospitalar.service.ReceitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receitas")
public class ReceitaController {

    @Autowired
    private ReceitaService receitaService;

    @PostMapping
    public Receita criar(@RequestBody Receita receita) {
        return receitaService.criar(receita);
    }

    @GetMapping
    public List<Receita> listar() {
        return receitaService.listar();
    }

    @PutMapping("/{id}/retirada")
    public Receita confirmarRetirada(@PathVariable Long id) {
        return receitaService.confirmarRetirada(id);
    }
}
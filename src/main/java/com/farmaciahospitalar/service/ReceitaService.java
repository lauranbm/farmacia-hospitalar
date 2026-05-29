package com.farmaciahospitalar.service;

import com.farmaciahospitalar.messaging.BaixaEstoqueProducer;
import com.farmaciahospitalar.messaging.ReceitaProducer;
import com.farmaciahospitalar.model.Receita;
import com.farmaciahospitalar.repository.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReceitaService {

    @Autowired
    private ReceitaRepository receitaRepository;

    @Autowired
    private ReceitaProducer receitaProducer;

    @Autowired
    private BaixaEstoqueProducer baixaEstoqueProducer;

    public Receita criar(Receita receita) {
        receita.setStatus("CRIADA");
        receita.setDataCriacao(LocalDateTime.now());

        Receita receitaSalva = receitaRepository.save(receita);

        receitaProducer.enviarReceitaCriada(receitaSalva);

        return receitaSalva;
    }

    public List<Receita> listar() {
        List<Receita> receitas = receitaRepository.findAll();

        for (Receita receita : receitas) {
            if ("CRIADA".equals(receita.getStatus()) &&
                    receita.getDataCriacao() != null &&
                    receita.getDataCriacao().isBefore(LocalDateTime.now().minusDays(5))) {
                receita.setStatus("VENCIDA");
            }
        }

        return receitas;
    }

    public Receita confirmarRetirada(Long idReceita) {
        Receita receita = receitaRepository.findById(idReceita)
                .orElseThrow(() -> new RuntimeException("Receita não encontrada"));

        receita.setStatus("RETIRADA");

        Receita receitaAtualizada = receitaRepository.save(receita);

        baixaEstoqueProducer.enviarBaixaEstoque(receitaAtualizada.getId());

        return receitaAtualizada;
    }
}
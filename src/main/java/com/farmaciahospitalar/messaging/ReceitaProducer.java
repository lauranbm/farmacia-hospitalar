package com.farmaciahospitalar.messaging;

import com.farmaciahospitalar.config.RabbitMQConfig;
import com.farmaciahospitalar.model.Receita;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReceitaProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void enviarReceitaCriada(Receita receita) {
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.FILA_RECEITAS_CRIADAS,
                receita.getId()
        );
    }
}
package com.farmaciahospitalar.messaging;

import com.farmaciahospitalar.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BaixaEstoqueProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void enviarBaixaEstoque(Long idReceita) {

        rabbitTemplate.convertAndSend(
                RabbitMQConfig.FILA_BAIXA_ESTOQUE,
                idReceita
        );
    }
}
package com.farmaciahospitalar.messaging;

import com.farmaciahospitalar.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class BaixaEstoqueConsumer {

    @RabbitListener(queues = RabbitMQConfig.FILA_BAIXA_ESTOQUE)
    public void receberBaixaEstoque(Long idReceita) {

        System.out.println("Baixa de estoque recebida na fila:");
        System.out.println("ID da receita retirada: " + idReceita);
    }
}
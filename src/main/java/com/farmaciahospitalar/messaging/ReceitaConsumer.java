package com.farmaciahospitalar.messaging;

import com.farmaciahospitalar.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class ReceitaConsumer {

    @RabbitListener(queues = RabbitMQConfig.FILA_RECEITAS_CRIADAS)
    public void receberReceitaCriada(Long idReceita) {

        System.out.println("Receita recebida na fila:");
        System.out.println("ID da receita: " + idReceita);
    }
}
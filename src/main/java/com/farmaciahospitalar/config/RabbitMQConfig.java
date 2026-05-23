package com.farmaciahospitalar.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String FILA_RECEITAS_CRIADAS = "fila-receitas-criadas";

    public static final String FILA_BAIXA_ESTOQUE = "fila-baixa-estoque";

    @Bean
    public Queue filaReceitasCriadas() {
        return new Queue(FILA_RECEITAS_CRIADAS, true);
    }

    @Bean
    public Queue filaBaixaEstoque() {
        return new Queue(FILA_BAIXA_ESTOQUE, true);
    }
}
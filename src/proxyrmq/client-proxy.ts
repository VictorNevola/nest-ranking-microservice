import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientProxySmartRanking {

    constructor(){}

    getClientProxyAdminBackendInstance(): ClientProxy {

        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_URL}`],
                queue: 'admin-backend'
            }
        })
    }

    getClientProxyDesafiosInstance(): ClientProxy {

        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_URL}`],
                queue: 'desafios'
            }
        })
    }

    getClientProxyRankingsInstance(): ClientProxy {

        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_URL}`],
                queue: 'rankings'
            }
        })
    }

    getClientProxyNotificacoesInstance(): ClientProxy {

        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_URL}`],
                queue: 'notificacoes'
            }
        })
    }

}
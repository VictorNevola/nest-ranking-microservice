import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';
import { Categoria } from './interfaces/categoria.interface';
import { Partida } from './interfaces/partida.interface';
import { Ranking } from './interfaces/ranking.schema';
import { EventoNome } from './evento-nome.enum';

@Injectable()
export class RankingsService {

    constructor(
        @InjectModel('Ranking') private readonly desafioModel: Model<Ranking>,
        private clientProxySmartRanking: ClientProxySmartRanking
    ) { }

    private readonly logger = new Logger(RankingsService.name);
    private clientAdminBackEnd = this.clientProxySmartRanking.getClientProxyAdminBackendInstance();

    async processarPartida(idPartida: string, partida: Partida): Promise<void> {

        try {
            const categoria: Categoria = await this.clientAdminBackEnd.send('consultar-categorias', partida.categoria).toPromise();

            await Promise.all(partida.jogadores.map(async jogador => {
                const ranking = new this.desafioModel();

                ranking.categoria = partida.categoria;
                ranking.desafio = partida.desafio;
                ranking.partida = idPartida;
                ranking.jogador = jogador

                if (jogador === partida.def) {
                    const eventoVitoria = categoria.eventos.find(evento => evento.nome === EventoNome.VITORIA);

                    ranking.event = EventoNome.VITORIA;
                    ranking.operacao = eventoVitoria.operacao;
                    ranking.pontos = eventoVitoria.valor;

                } else {
                    const eventoDerrota = categoria.eventos.find(evento => evento.nome === EventoNome.DERROTA);

                    ranking.event = EventoNome.DERROTA;
                    ranking.operacao = eventoDerrota.operacao;
                    ranking.pontos = eventoDerrota.valor;
                }

                this.logger.log(`ranking: ${JSON.stringify(ranking)}`);

                await ranking.save();

            }));

        } catch (error) {
            this.logger.error(`Error: ${error}`)
            throw new RpcException(error);
        }

    }

}

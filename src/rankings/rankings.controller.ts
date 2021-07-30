import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Partida } from './interfaces/partida.interface';
import { RankingsService } from './rankings.service';

const ackErrors: string[]  = ['E11000'];

@Controller()
export class RankingsController {

    constructor(
        private readonly rankingService: RankingsService,
    ){}

    private readonly logger = new Logger(RankingsController.name)

    @EventPattern('processar-partida')
    async processarPartida(
        @Payload() data: any,
        @Ctx() context: RmqContext
    ) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        try {
            this.logger.log(`data: ${JSON.stringify(data)}`);
            const idPartida: string = data.idPartida;
            const partida: Partida = data.partida;

            await this.rankingService.processarPartida(idPartida, partida)
            await channel.ack(originalMsg);

        } catch (error) {
            const filterAckError = ackErrors.filter(ackError => error.message.includes(ackError));

            if(filterAckError.length > 0) await channel.ack(originalMsg)
        }
    }

}

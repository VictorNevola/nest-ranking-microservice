import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true, collection: 'rankings' })
export class Ranking extends mongoose.Document {

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    desafio: string

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    jogador: string

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    partida: string

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    categoria: string

    @Prop({ type: mongoose.Schema.Types.String })
    event: string

    @Prop({ type: mongoose.Schema.Types.String })
    operacao: string

    @Prop({ type: mongoose.Schema.Types.Number })
    pontos: number

}

export const RankingSchema = SchemaFactory.createForClass(Ranking);
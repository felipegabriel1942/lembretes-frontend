import { Usuario } from './usuario';

export class Lembrete {
  constructor(public pkLembrete?: number,
              public titulo?: string,
              public texto?: string,
              public fkUsuario?: Usuario,
              public dataLembrete?: Date) {}
}

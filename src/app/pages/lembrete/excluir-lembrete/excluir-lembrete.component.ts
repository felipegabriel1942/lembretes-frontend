import { Component, OnInit } from '@angular/core';
import { LembreteService } from '../lembrete.service';

@Component({
  selector: 'app-excluir-lembrete',
  templateUrl: './excluir-lembrete.component.html',
  styleUrls: ['./excluir-lembrete.component.css']
})
export class ExcluirLembreteComponent implements OnInit {

  constructor(private lembreteService: LembreteService) { }

  ngOnInit() {
  }

  excluir() {
    this.lembreteService.confirmarExclusao.emit();
  }

  cancelar() {
    this.lembreteService.cancelarExclusao.emit();
  }

}

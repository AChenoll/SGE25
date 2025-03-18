import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { CLOSE } from 'src/app/shared/messages';

@Component({
  selector: 'app-ficha-unidad-centro',
  templateUrl: './ficha-unidad-centro.component.html',
  styleUrls: ['./ficha-unidad-centro.component.scss']
})
export class FichaUnidadCentroComponent implements OnInit {

  @ViewChild(RouterOutlet, {static:false}) outlet: RouterOutlet;
  route: string;
  lastRoute= '';
  unidadCentroForm: FormGroup;

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public fichaUnidadCentro: UnidadesCentro,
    private unidadesCentroService: UnidadesCentroService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FichaUnidadCentroComponent>
  ) { }

  ngOnInit(): void {
    this.route= this.router.url.substring(1);
    this.route= this.route.split('/')[0];
    this.router.navigate([`/${this.route}`, {outlets: {sidebar: 'datos-unidad-centro'}}]);

    this.router.events.subscribe(e => {
      if(e instanceof ActivationStart && e.snapshot.outlet !== this.lastRoute){
        this.lastRoute = this.route;
        this.outlet.deactivate();
      }
    });
    this.unidadesCentroService.setUnidadCentro(this.fichaUnidadCentro);
  }

  navigate(route:string){
    this.router.navigate([`/${this.route}`, {outlets: {sidebar:route}}]);
  }

  async save(){
    const RESPONSE = await this.unidadesCentroService.editUnidadCentro(this.unidadesCentroService.unidadesCentro).toPromise();
    if(RESPONSE.ok){
      this.snackBar.open(RESPONSE.message, CLOSE, {duration:5000});
      this.dialogRef.close({ok: RESPONSE.ok, unidadCentro: this.fichaUnidadCentro})
    }else{
      this.snackBar.open(RESPONSE.message, CLOSE, {duration:5000})
    }
  }

  onNoClick(){
    this.dialogRef.close({unidadCentro: this.fichaUnidadCentro})
  }

}

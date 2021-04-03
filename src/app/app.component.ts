import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
    @ViewChild('image') img: ElementRef|undefined;
    @ViewChild('configs') configs: ElementRef|undefined;
    @ViewChild('trashCan') trashCan: ElementRef|undefined;
    dx = 0;
    dy = 0;
    isDown = false;
    init = false;
    txt = '';
    hoverTrashCan = false;
    hoverConfigs = false;
    error = false;
    timeout = 2000;

    constructor(private renderer: Renderer2){
        if (window.innerWidth < 800){
            this.error = true;
            this.txt = 'Para fazer o teste é necessário acessar a página por um computador ou notebook';
        }
    }

    onMousedown(evt: MouseEvent): void{
        if (!this.init){
            this.dx = evt.clientX;
            this.dy = evt.clientY;
            this.init = true;
        }

        this.isDown = true;
    }

    onMouseup(evt: MouseEvent): void{
        const final = `
            assim prejudicando a experiência de você, usuário final. Muitas
            vezes estamos procurando informações, produtos e outras coisas em sites, e por falta de
            uma imagem, ícone ou nomenclatura adequada, não encontramos
            o que procuramos, por isso é de fundamental importância que o desenvolvedor
            se atente a esses detalhes.
        `;

        this.elementsFrom(
            evt,
            () => {
                this.txt = `
                    Você não percebeu que o ícone de configurações e lixeira estão
                    trocados, com isso conseguimos ver uma falha do desenvolvedor ao colocar um
                    ícone errôneo em uma página, ${final}
                `;
            },
            () => {
                this.txt = `
                    Você acabou percebendo que o ícone de configurações e lixeira estão
                    trocados, mas isso é uma falha do desenvolvedor ao colocar um
                    ícone de semântica diferente de sua função real, ${final}
                `;
            }
        );

        this.isDown = false;
    }

    onMousemove(evt: MouseEvent): void{
        if (evt.which === 0){
            this.isDown = false;

            return;
        }

        if (this.isDown && this.img && evt.pageX !== 0 && evt.pageY !== 0) {
            this.renderer.setStyle(this.img.nativeElement, 'left', `${evt.pageX - this.dx}px`);
            this.renderer.setStyle(this.img.nativeElement, 'top', `${evt.pageY - this.dy}px`);
        }

        this.elementsFrom(
            evt,
            () => {
                this.hoverConfigs = true;
                setTimeout(() => this.hoverConfigs = false, this.timeout);
            },
            () => {
                this.hoverTrashCan = true;
                setTimeout(() => this.hoverTrashCan = false, this.timeout);
            },
        );
    }

    asd(): void{
        debugger
    }

    elementsFrom(
        evt: MouseEvent,
        cbConfigsSuc: any,
        cbTrashCanSuc: any
    ): void{
        document.elementsFromPoint(evt.pageX, evt.pageY).forEach(el => {
            if (this.configs?.nativeElement === el){
                cbConfigsSuc();
            } else if (this.trashCan?.nativeElement === el){
                cbTrashCanSuc();
            }
        });
    }
}

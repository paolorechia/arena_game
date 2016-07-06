export class Asteroide {

  //Exemplo asteroide
  position: string;
  constructor(x_inicial: number, y_inicial: number, velocidade: number, tamanho:number, versor: number[]) {
    this.position = `X: ${x_inicial}, Y: ${y_inicial}`;
  }
  show_position(){
    return `My initial position is ${this.position}!`;
  }
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal.interface';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:Animal[] = [];
  audio = new Audio();
  tiempoaudio: any;


  constructor(public navCtrl: NavController) {
      this.animales = ANIMALES.splice(0);

  }
  private pausartodos(animalSel:Animal)
  {
      clearTimeout(this.tiempoaudio);
      this.audio.pause();
      this.audio.currentTime = 0;

      for( let animal of this.animales)
      {
        if(animal.nombre != animalSel.nombre)
        {
          animal.reproduciendo = false;
        }
      }
  }

  reproducir(animal:Animal)
  {
    console.log(animal);

    this.pausartodos(animal);

    if(animal.reproduciendo)
    {
      animal.reproduciendo = false;
      return;
    }

    //let audio = new Audio();
    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.tiempoaudio = setTimeout( () => animal.reproduciendo = false, animal.duracion*1000 );
  }

}

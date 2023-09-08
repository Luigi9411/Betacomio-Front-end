import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
   templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Betacomio2';
  showScrollButton: boolean = false;
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Mostra il pulsante "Torna in cima" quando l'utente scorre verso il basso
    this.showScrollButton = window.scrollY > 200; // Puoi personalizzare il valore in base alle tue esigenze
  }
  
  scrollToTop() {
    // Funzione per tornare in cima alla pagina
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

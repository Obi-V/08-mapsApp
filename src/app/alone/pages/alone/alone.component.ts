import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterAloneComponent } from '../../components/counter-alone/counter-alone.component';
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";

@Component({
    selector: 'alone-component',
    standalone: true,
    templateUrl: './alone.component.html',
    styleUrls: ['./alone.component.css'],
    imports: [CounterAloneComponent, SideMenuComponent]
})
export class AloneComponent {

}

import {
  Component,
  ViewEncapsulation,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'app-c-loader',
  templateUrl: './c-loader.component.html',
  styleUrls: ['./c-loader.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CLoaderComponent implements OnInit {
  contador: number = 0;

  constructor(
    private dataService: DataSharedService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataService.counter.subscribe((counter) => {
      this.contador = counter;
      this.ref.detectChanges();
    });
  }
}

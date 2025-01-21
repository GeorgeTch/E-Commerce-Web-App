import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  isLoading = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading$.subscribe((loadingState) => {
      this.isLoading = loadingState;
    });
  }
}

import { Component, signal } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewsletterService } from '../../services/newsletter.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [
    BtnPrimaryComponent,
    ReactiveFormsModule
  ],
  providers: [
    NewsletterService
  ],
  templateUrl: './news-form.component.html',
  styleUrl: './news-form.component.scss'
})
export class NewsFormComponent {
  public formGroup!: FormGroup;
  public loading = signal(false);

  constructor(private service: NewsletterService) {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  onSubimit(): void {
    if (this.formGroup.valid) {
      this.loading.set(true);
      const {name, email} = this.formGroup.getRawValue()
      this.service.sendData(name, email).subscribe({
        next: (data) => {
          this.formGroup.reset()
          this.loading.set(false);
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  }
}

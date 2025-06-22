import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-meal-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Register Meal</h2>
    <label>
      Meal Type:
      <select [(ngModel)]="mealType">
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
      </select>
    </label>

    <div>
      <video #video width="300" height="200" autoplay muted></video>
    </div>

    <div *ngIf="status" [ngClass]="status">
      {{ message }}
    </div>
  `,
  styles: [
    `.success { color: green; }`,
    `.error { color: red; }`
  ]
})
export class MealRegisterComponent {
  @ViewChild('video', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;

  mealType: 'breakfast' | 'lunch' = 'breakfast';
  status: 'success' | 'error' | null = null;
  message = '';
  private detector: BarcodeDetector | null = null;
  private scanInterval: any;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.startCamera();
  }

  private async startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      this.videoRef.nativeElement.srcObject = stream;
      await this.videoRef.nativeElement.play();
      this.detector = new (window as any).BarcodeDetector({ formats: ['qr_code'] });
      this.scanInterval = setInterval(() => this.scanFrame(), 500);
    } catch (err) {
      console.error('Camera error', err);
    }
  }

  private async scanFrame() {
    if (!this.detector) {
      return;
    }

    try {
      const barcodes = await this.detector.detect(this.videoRef.nativeElement);
      if (barcodes.length > 0) {
        const studentId = barcodes[0].rawValue;
        clearInterval(this.scanInterval);
        await this.registerMeal(studentId);
        this.scanInterval = setInterval(() => this.scanFrame(), 500);
      }
    } catch (err) {
      console.error(err);
    }
  }

  private async registerMeal(studentId: string) {
    const body = {
      student_id: studentId,
      meal_type: this.mealType,
      timestamp: new Date().toISOString()
    };

    const headers = new HttpHeaders({ 'x-api-key': environment.apiKey });

    try {
      const res: any = await this.http
        .post(environment.apiUrl, body, { headers, observe: 'response' })
        .toPromise();
      if (res.status === 201) {
        this.showStatus('success', 'Meal registered');
      } else {
        this.showStatus('error', 'Failed to register');
      }
    } catch (err) {
      this.showStatus('error', 'Failed to register');
    }
  }

  private showStatus(status: 'success' | 'error', message: string) {
    this.status = status;
    this.message = message;
    setTimeout(() => {
      this.status = null;
      this.message = '';
    }, 2000);
  }
}

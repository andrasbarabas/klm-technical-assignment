import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatToolbarModule, RouterModule],
  selector: 'app-layout',
  standalone: true,
  styleUrls: ['./layout.component.scss'],
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
  title = '';

  constructor(private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.initTitle();
  }

  private initTitle(): void {
    this.title = this.activatedRoute.snapshot.firstChild?.data['title'];
  }
}

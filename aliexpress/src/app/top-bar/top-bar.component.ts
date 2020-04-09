import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../category.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  categories: any;
  constructor(
    private categoryService: CategoryService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }
}

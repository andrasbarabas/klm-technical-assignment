import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { InMemoryCache } from '@apollo/client';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { env } from 'src/env';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [ApolloModule, AppRoutingModule, BrowserModule, BrowserAnimationsModule, HttpClientModule, MatSnackBarModule, RouterModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: env.gqlUrl
          })
        };
      },
      deps: [HttpLink]
    }
  ]
})
export class AppModule {}

import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { name: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orySkate';
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  constructor(public auth: AngularFireAuth, private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges();
    this.items.forEach(val =>{
      console.log(val);
    });
  }
  addItem(item: Item) {
    this.itemsCollection.add(item);
  }
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }
}

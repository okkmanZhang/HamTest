const { Observable } = require("rxjs");


const greetingLady$ = new Observable(observer => {
  console.log('somthing is happening in observable');
  observer.next("glad meet you.");
  observer.complete();
});

console.log('before arrive.');

greetingLady$.subscribe({
  next: console.log,
  complete: () => console.log("end of conversation.")
});
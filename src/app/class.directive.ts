import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  // this selector will be used to apply the directive on some element in the template
  // we add in template just appClass without []
  selector: '[appClass]',
})
// this is a custom attribute directive to recreate the ngClass attribute directive
export class ClassDirective {
  //  This code snippet is declaring a TypeScript property called backgroundColor with the type string. The exclamation mark (!) indicates that this property is required and must have a value assigned to it.
  // @Input()
  // backgroundColor!: string;

  // Accessing elements from a Custom Directive and add some arguments / properties to our custom directive
  // This TypeScript code snippet is defining a constructor for a class. The constructor takes in a parameter called element of type ElementRef. The private keyword indicates that element is a private property of the class; it can only be accessed within the class.
  // the first argument to the constructor is going to be the element that we want to apply the directive to
  // the element here it's a direct reference to the element that we want to apply the directive to in the template
  // for ex. we can add some different styling rules to this element or even modify some classes on it (but it's not very practical, this is just for exemplification, we use CSS for that)
  constructor(private element: ElementRef) {
    // console.log('Class Directive Used!');
    // NEVER DO THIS - it's not a good practice to get access to a property after the element has actually been instantiated!!!
    // setTimeout(() => {
    //   //  this is not the actual HTML element to actually get the HTML element we have to access it through the nativeElement (a little property inside the element)
    //   this.element.nativeElement.style.backgroundColor = this.backgroundColor;
    // }, 50);
  }

  //  Intercepting a property assignment from the template element
  // Angular parse / executes the code sequentially -> e.g. it will parse the template, finds the appClass directive call and executes it - so, it will immidiatly go to the directive class and apply/execute the code from the constructor to instantiate the object / the class directive (basically this code: const directive = new ClassDirective()); then finds that we try to set the background color property to red (directive.backgroundColor = 'red';)

  // So, we can imagine that in the background there is some Angular code like this:
  // const directive = new ClassDirective();
  // directive.backgroundColor = 'red';

  // e.g. Typescript code to understand a bit more
  // class Car {
  // color = 'red'; remove this and add a setter with the name identically to the property and put the set keyword in front of it
  //  and whenever we set the property (like an event trigger) we can run some code

  //   set color(newColor: string) {

  //   }
  // }

  // create an instance of car
  // const car = new Car();
  // set the property - this step we need to somehow detect this setting event right here and run some code in response to it
  // car.color = 'blue';
  // this is kind of defining a property
  // add also Input decorator to communicate with the parent template
  // @Input() set backgroundColor(color: string) {
  //   this.element.nativeElement.style.backgroundColor = color;
  // }

  // Input Aliasing so we don't need to actually call the directive in the template using name of directive and the property name (use the same name as the directive)
  // @Input() set appClass(color: string) {
  //   this.element.nativeElement.style.backgroundColor = color;
  // }

  // Input Alias from outside world - call the Input decorator wth the string used in the template to call the directive (in this way you don't need to use also the backgroundColor property when calling the directive)
  // @Input('appClass') set backgroundColor(color: string) {
  //   this.element.nativeElement.style.backgroundColor = color;
  // }

  // change directive to use it to change classes like ngClass directive
  // This TypeScript code defines a setter method for an Angular directive. The setter method takes an input property called appClass, which is expected to be an object.
  // Inside the setter method, it loops through each key in the classObj object. If the value of a key is truthy, it adds the key as a class to the element using the classList.add() method. This allows you to dynamically add CSS classes to an element based on the values of properties passed to the directive.
  @Input('appClass') set classNames(classObj: any) {
    for (let key in classObj) {
      if (classObj[key]) {
        // use classList API to add the class
        this.element.nativeElement.classList.add(key);
      } else {
        this.element.nativeElement.classList.remove(key);
      }
    }
  }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++
// Reminder how to cummunicate from parent to child component...we will use the same logic to communcate from the template element to the directive to pass information down, we will use the property binding syntax and using the @Input decorator
// we are going to write out the name of the property that we want to set on the directive and then on the directive class we are going to use the input decorator and we are going to decorate some property tht is identically named between the two _ this is how we are going to communicate information into a custom directive

// Parent component template
// <app-card [title]=" 'SnowyMountains' "></app-card>

// Child component class
// import { Input } from 'angular'

// class ChildComponent {
//   @Input() title: string;
// }

// ++++++++++++++++++++++++++++++++++++++++++++++
// This code snippet uses the setTimeout function to delay the execution of a block of code by 50 milliseconds. Inside the delayed block, it sets the background color of an HTML element to a specified color. The this.element.nativeElement is used to access the actual HTML element and modify its style.
// The => symbol is an arrow function syntax in JavaScript. It is used to define a function in a concise way. Arrow functions are a shorthand notation for writing function expressions. The => separates the function parameters from the function body. In the code snippet you provided, the arrow function is used as a callback function for the setTimeout function.
// A callback function is a function that is passed as an argument to another function and is executed inside the function where it is passed. It allows you to specify a piece of code to be executed at a specific point in time or after a certain event has occurred. Callback functions are commonly used in asynchronous programming, event handling, and other scenarios where you want to perform an action after a certain condition is met.
// setTimeout(() => {
//   //  this is not the actual HTML element to actually get the HTML element we have to access it through the nativeElement (a little property inside the element)
//   this.element.nativeElement.style.backgroundColor = this.backgroundColor;
// }, 50);

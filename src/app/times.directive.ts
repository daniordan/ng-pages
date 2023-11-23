import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appTimes]',
})
// this is a structural directive to recreate the ngFor structural directive
// probably will be much easier for you to create another component than creating directives...also helps the other developers to understand the code
export class TimesDirective {
  constructor(
    // viewContainerRef is a reference to the element that will be used to render the content (on which we apply the directive to) - we use viewContainerRef instead of ElementRef because it allows us to easily work with the content of the element and some other elements (because it's a container for multiple elements)
    // templateRef is a reference to the template that will be used to render the content, it's a reference to whatever elements are placed inside of the element that we apply our directive to
    // e.g.
    // <ul *appTimes="5"> // viewContainerRef references the ul element (on which we apply the directive *appTimes="5")
    //   <li>Hi there!</li> // templateRef references the li element (elements placed inside the element on which we call the directive)
    // </ul>

    private ViewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  // This code snippet defines an Angular input property decorator called render with a parameter times of type number. The @Input('appTimes') decorator specifies the name of the input property in the template. The set keyword indicates that this is a setter method for the input property.
  @Input('appTimes') set render(times: number) {
    // first we clear out any elements that are currently inside our view container (delete everything already existing inside ul element)
    this.ViewContainer.clear();

    // then we are going to recreate everything inside there from scratch
    // this createEmbeddedView will take a look at our view container  and it's going to try and create some new html content inside of it which is provided by the templateRef (which is the li element in the example above)
    // { index: i } is a context object that we can use in our template to access the index of the element that we are creating
    // Context in structural directives -> we can provide multiple context objects to the template
    for (let i = 0; i < times; i++) {
      // this.ViewContainer.createEmbeddedView(this.templateRef, {
      //   index: i,
      //   color: 'red',
      // });
      this.ViewContainer.createEmbeddedView(this.templateRef, { index: i });
    }
  }
}

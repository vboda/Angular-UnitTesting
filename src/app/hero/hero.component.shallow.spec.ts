import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
//shallow testing is testing the single component none of its child components.
describe('Hero Component (Shallow Test)',()=>{
    let fixture: ComponentFixture<HeroComponent>
    
    beforeEach(()=>{
        // Test Bed is used to test both the component and its template running together
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas:[NO_ERRORS_SCHEMA] //will hide the errors from schema
        })
        fixture = TestBed.createComponent(HeroComponent);
    })

    it('should have the correct hero', ()=>{
        fixture.componentInstance.hero = {id:1, name:'ABCD', strength: 254};
        expect(fixture.componentInstance.hero.name).toEqual('ABCD');
    });

    it('should render the hero name in an anchor tag', ()=>{
        fixture.componentInstance.hero = {id:1, name:'ABCD', strength: 254};
        fixture.detectChanges(); // this tells component to detect changes and update any bindings.
        //nativeElement will directly refers to the DOM element in template
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('ABCD');
        let deA = fixture.debugElement.query(By.css('a'));
        expect(deA.nativeElement.textContent).toContain('1 ABCD');
    })
})
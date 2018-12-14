import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Input, Component } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";


describe('Heroes Component (Shallow Testing)',()=>{
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    @Component({
        selector: 'app-hero',
        template:`<div></div>`
      })
      class FakeHeroComponent {
        @Input() hero: Hero;
        // @Output() delete = new EventEmitter();
      }

    beforeEach(()=>{
        HEROES=[
            {id:1, name:'Vinay', strength:8 },
            {id:2, name:'Vijay', strength:48},
            {id:3, name:'Ajay', strength:24},
            {id:4, name:'Kamlesh', strength:89}
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero   ']);
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                FakeHeroComponent
            ],
            providers:[
                { provide:HeroService, useValue:mockHeroService}
            ],
            //schemas:[NO_ERRORS_SCHEMA]
            // this schema provides to hide us from child components. But it has some side effects
            // In this case we will create a fake child component class
        })
        fixture = TestBed.createComponent(HeroesComponent);
    })

    it('should set heroes correctly from service',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        expect(fixture.componentInstance.heroes.length).toBe(4);
    });

    it('should create a one li for each hero',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(4)
    })
})
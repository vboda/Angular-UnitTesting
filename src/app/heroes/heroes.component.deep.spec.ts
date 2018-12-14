import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Input, Component, Directive } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";
import { toBase64String } from "@angular/compiler/src/output/source_map";

@Directive({
    selector:'[routerLink]',
    host:{'(click)':'onClick()'}
})
export class RouterLinkDirectiveStub{
    @Input ('routerLink') linkParams:any;
    navigatedTo:any = null;

    onClick(){
        this.navigatedTo = this.linkParams;
    }
}

describe('Heroes Component (deep Testing)',()=>{
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

   /*  @Component({
        selector: 'app-hero',
        template:`<div></div>`
      })
      class FakeHeroComponent {
        @Input() hero: Hero;
        // @Output() delete = new EventEmitter();
      } */

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
                // FakeHeroComponent
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers:[
                { provide:HeroService, useValue:mockHeroService}
            ],
            // schemas:[NO_ERRORS_SCHEMA]
            // this schema provides to hide us from child components. But it has some side effects
            // In this case we will create a fake child component class
        })
        fixture = TestBed.createComponent(HeroesComponent);
        
    })

    it('should render each hero as a HeroComponent',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDEs.length).toBe(4);
      /*   expect(heroComponentDEs[0].componentInstance.hero.name).toEqual('Vinay');
        expect(heroComponentDEs[1].componentInstance.hero.name).toEqual('Vijay');
        expect(heroComponentDEs[2].componentInstance.hero.name).toEqual('Ajay');
        expect(heroComponentDEs[3].componentInstance.hero.name).toEqual('Kamlesh'); */
        for(let i = 0; i>heroComponentDEs.length;i++){
            expect(heroComponentDEs[i].componentInstance.hero.name).toEqual(HEROES[i]); 
        }
    });

    it(`should call heroService.deleteHero when the Hero Component's
    delete button is clicked`,()=>{
         spyOn(fixture.componentInstance,'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        
      const  heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        /* heroComponents[0].query(By.css('button'))
            .triggerEventHandler('click',{ stopPropagation:()=>{} });*/
            // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
            heroComponents[0].triggerEventHandler('delete',null)
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it('should add  a new hero to the hero list when the add button is clicked',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const name = "Prokarma"
        mockHeroService.addHero.and.returnValue(of({id:5, name: name, strength:4}));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
        inputElement.value = name;
        addButton.triggerEventHandler('click',{});
        fixture.detectChanges();
        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        // console.log(heroText);
        expect(heroText).toContain(name);
    });
    it('should have the correct route for the first hero',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        let routerLink = heroComponents[0]
            .query(By.directive(RouterLinkDirectiveStub))
            .injector.get(RouterLinkDirectiveStub);
        
        heroComponents[0].query(By.css('a')).triggerEventHandler('click',null);
        // console.log(routerLink);

        expect(routerLink.navigatedTo).toBe('/detail/1');
    })

})
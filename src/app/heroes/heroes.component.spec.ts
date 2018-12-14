import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";

describe('Heroes Component',()=>{
    let component: HeroesComponent
    let HEROES;
    let mockHeroService;


    beforeEach(()=>{
        HEROES=[
            {id:1, name:'Vinay', strength:8 },
            {id:2, name:'Vijay', strength:48},
            {id:3, name:'Ajay', strength:24},
            {id:4, name:'Kamlesh', strength:89}
        ]

        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero'])

        component = new HeroesComponent(mockHeroService);
    })

    describe('delete',()=>{
        it('should remove the indicated hero from the heroes list',()=>{
            mockHeroService.deleteHero.and.returnValue(of(true))
            component.heroes = HEROES;
          let deleteHero = HEROES[2]
            component.delete(HEROES[2]);
         expect(component.heroes.length).toBe(3);
        });
        it('should call deleteHero',()=>{
            mockHeroService.deleteHero.and.returnValue(of(true))
            component.heroes = HEROES;
            component.delete(HEROES[2]);
         expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2])
         expect(mockHeroService.deleteHero).toHaveBeenCalled();
        })
    })
})
import { TestBed, ComponentFixture, fakeAsync, tick, flush, async } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { Location } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { of } from "rxjs";


describe('Hero Detail',()=>{
    let fixture:ComponentFixture<HeroDetailComponent>;
    let mockActivatedRoute, mockHeroServie, mockLocation;
    beforeEach(()=>{
        mockActivatedRoute = {
            snapshot : { paramMap:{ get: ()=>{ return '3'; }}} 
        }
        mockHeroServie = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);
        TestBed.configureTestingModule({
            imports:[FormsModule],
            declarations:[HeroDetailComponent],
            providers:[
                {provide:ActivatedRoute, useValue:mockActivatedRoute},
                {provide:HeroService, useValue:mockHeroServie},
                {provide:Location, useValue:mockLocation}
            ]
        });
        fixture = TestBed.createComponent(HeroDetailComponent);
        mockHeroServie.getHero.and.returnValue(of({id:546, name:'Shiva', strength:45}));
    });

    it('should render the hero name in h2 tag',()=>{
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SHIVA');

    });

    // it('should call the updateHero When save is called',fakeAsync(()=>{
    //     mockHeroServie.updateHero.and.returnValue(of({}));
    //     fixture.detectChanges();
    //     fixture.componentInstance.save();
    //     /*  setTimeout(()=>{
    //         expect(mockHeroServie.updateHero).toHaveBeenCalled();
    //         done();
    //         // console.log('fsdafsd');
    //     },300) */
    //     // tick(250);
    //     flush();
    //     expect(mockHeroServie.updateHero).toHaveBeenCalled();
    // }))
    it('should call the updateHero When save is called',async(()=>{
        mockHeroServie.updateHero.and.returnValue(of({}));
        fixture.detectChanges();
        fixture.componentInstance.save();

        fixture.whenStable().then(()=>{
        expect(mockHeroServie.updateHero).toHaveBeenCalled();
        })
    }))
})
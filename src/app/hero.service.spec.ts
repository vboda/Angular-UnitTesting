import { TestBed, inject } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
describe('Hero Service',()=>{
    let mockMessageServie;
    let httpTestingController:HttpTestingController;
    let service:HeroService;
    

    beforeEach(()=>{
        mockMessageServie = jasmine.createSpyObj(['add']);
        TestBed.configureTestingModule({
            imports:[
                HttpClientTestingModule
            ],
            providers:[
                HeroService,
                {provide: MessageService, useValue:mockMessageServie}
            ]
        })
        // here get method will inject the depency injection of mentioned service. used to get the instance of a service.
        httpTestingController = TestBed.get(HttpTestingController);
        service= TestBed.get(HeroService);
        // let msgSvc = TestBed.get(MessageService);
      
    })
    
    describe('getHero',()=>{
        it('should call get with correct URL',  ()=>{
            service.getHero(4).subscribe();
            // service.getHero(3).subscribe();

            let req = httpTestingController.expectOne('api/heroes/4');
            req.flush({id:4, name:'Lenovo', strength:544});
            httpTestingController.verify();
        });

      
    })

    
})